import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Machine lifecycle",
  description:
    "Wave VM starts and stops a real QEMU process through QMP, with KVM or TCG acceleration and bounded termination fallbacks.",
};

export default function LifecyclePage() {
  return (
    <DocPage href="/docs/user-guide/lifecycle">
      <p>
        The current build starts and stops real QEMU processes. A machine is shown as
        running only while its QEMU process is alive. The lifecycle currently requires a
        Linux x86_64 host and x86_64 guests.
      </p>

      <h2>Start</h2>
      <p>
        Start validates that the recorded disk still exists and is inside the Wave VM data
        directory, confirms QEMU is available, and refuses a duplicate launch when a live
        QMP endpoint is already present. QEMU is launched with the configured memory,
        virtual CPUs, and QCOW2 disk.
      </p>
      <ul>
        <li>KVM is used when the /dev/kvm probe succeeds.</li>
        <li>If KVM is unavailable or the KVM attempt fails, QEMU is retried with TCG software emulation.</li>
        <li>QEMU starts with no guest network device.</li>
        <li>The QMP control socket is a private Unix domain socket in the machine directory.</li>
        <li>A running state is persisted only after QMP reports that QEMU is running.</li>
      </ul>

      <h2>Stop</h2>
      <p>
        Stop sends <code>system_powerdown</code> through QMP and waits for QEMU to exit.
        If it does not exit within the timeout, Wave VM sends a QMP <code>quit</code>,
        then SIGTERM, and finally a forced kill if necessary. The QMP socket is removed
        after the process exits.
      </p>

      <h2>Process tracking</h2>
      <ul>
        <li>The child process is tracked in application state while the desktop app is running.</li>
        <li>Unexpected exits are detected through polling and reflected in the persisted state.</li>
        <li>Persisted starting, running, or stopping states are reconciled when the application starts.</li>
        <li>QEMU stdout and stderr are written to <code>vms/&lt;machine-id&gt;/qemu.log</code>.</li>
      </ul>

      <DocNote title="Cleanup after a force-kill is not guaranteed" tone="warning">
        Normal application exit stops tracked QEMU processes. If the desktop process is
        force-killed, an already running QEMU child may survive. Wave VM will block a
        duplicate launch while it can detect a live QMP endpoint, but it cannot guarantee
        recovery from every orphaned process.
      </DocNote>

      <h2>Not implemented</h2>
      <ul>
        <li>Reset, pause, resume, or snapshot operations.</li>
        <li>Guest networking, port forwarding, or USB passthrough.</li>
        <li>Installing a guest operating system or attaching installation media.</li>
        <li>Automatic recovery of an orphaned QEMU process after a desktop crash.</li>
      </ul>

      <p>
        See <Link href="/docs/user-guide/console">Graphical console</Link> for the running
        guest display and <Link href="/roadmap#qemu-lifecycle">the roadmap</Link> for the
        implementation evidence.
      </p>
    </DocPage>
  );
}
