import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Machine lifecycle",
  description:
    "Wave VM starts and stops a real QEMU process through QMP, boots a local installer or the virtual disk, and uses KVM or TCG acceleration.",
};

export default function LifecyclePage() {
  return (
    <DocPage href="/docs/user-guide/lifecycle">
      <p>
        The current build starts and stops real QEMU processes. A machine is shown as
        running only after the QEMU process is alive and QMP reports that it is running.
        The lifecycle currently requires a Linux x86_64 host and supports x86_64 guests
        only.
      </p>

      <h2>Start</h2>
      <p>
        Start validates that the recorded disk still exists and is inside the Wave VM data
        directory. If the machine is set to installer boot, it also requires the recorded
        ISO to be present. It confirms QEMU is available and refuses a duplicate launch
        when a live QMP endpoint is already present. QEMU is launched with the configured
        memory, virtual CPUs, and QCOW2 disk.
      </p>
      <ul>
        <li>The machine uses the q35 machine type and a virtio-blk disk.</li>
        <li>Installer boot attaches the ISO as a read-only CD/DVD and boots with order <code>d</code>.</li>
        <li>Disk boot starts the virtual disk with boot order <code>c</code>.</li>
        <li>KVM is used when the <code>/dev/kvm</code> probe succeeds.</li>
        <li>If KVM is unavailable or the KVM attempt fails, QEMU is retried with TCG software emulation.</li>
        <li>QEMU starts with no guest network device (<code>-nic none</code>).</li>
        <li>The QMP control socket is a private Unix domain socket in the machine directory.</li>
        <li>QEMU runs with <code>-no-reboot</code>, so a guest-requested restart can exit the process instead of rebooting automatically.</li>
        <li>A running state is persisted only after QMP reports that QEMU is running.</li>
      </ul>

      <h2>Installer boot and disk boot</h2>
      <p>
        Installer boot is selected when installation media is attached. After the guest
        installation is complete, stop the machine if necessary and choose{" "}
        <strong>Boot from disk</strong> in the installation-media view. The next start boots
        the QCOW2 disk without the installer. The ISO path can remain recorded for later
        use, or the media can be detached.
      </p>
      <p>
        Wave VM does not detect installation completion. See{" "}
        <Link href="/docs/user-guide/disks-and-media">Disks and installation media</Link>{" "}
        for the full sequence and media limits.
      </p>

      <h2>Stop</h2>
      <p>
        Stop sends <code>system_powerdown</code> through QMP and waits for QEMU to exit.
        If it does not exit within the five-second timeout, Wave VM sends a QMP{" "}
        <code>quit</code>, waits up to three seconds, then sends SIGTERM and waits up to
        two seconds. A forced kill is the final fallback. The QMP socket is removed after
        the process exits.
      </p>

      <h2>Process tracking</h2>
      <ul>
        <li>The child process is tracked in application state while the desktop app is running.</li>
        <li>Unexpected exits are detected through polling and reflected in the persisted state.</li>
        <li>Persisted starting, running, or stopping states are reconciled when the application starts.</li>
        <li>QEMU stdout and stderr are written to <code>vms/&lt;machine-id&gt;/qemu.log</code>.</li>
        <li>The QMP socket is created at <code>vms/&lt;machine-id&gt;/qmp.sock</code> while the machine runs.</li>
      </ul>

      <DocNote title="Cleanup after a force-kill is not guaranteed" tone="warning">
        Normal application exit stops tracked QEMU processes. If the desktop process is
        force-killed, an already running QEMU child may survive. Wave VM will block a
        duplicate launch while it can detect a live QMP endpoint, but it cannot guarantee
        recovery from every orphaned process. A running QEMU process is also not adopted
        after the desktop application restarts.
      </DocNote>

      <h2>Not implemented</h2>
      <ul>
        <li>Reset, pause, resume, or snapshot operations.</li>
        <li>Automatic guest reboot handling; a guest reset can exit QEMU.</li>
        <li>Guest networking, port forwarding, or USB passthrough.</li>
        <li>Automatic recovery of an orphaned QEMU process after a desktop crash.</li>
        <li>Image downloads, media verification, or automatic installation detection.</li>
      </ul>

      <p>
        See <Link href="/docs/user-guide/console">Graphical console</Link>,{" "}
        <Link href="/docs/user-guide/networking">Networking</Link>, and{" "}
        <Link href="/roadmap#qemu-lifecycle">the roadmap</Link> for related behavior and
        implementation evidence.
      </p>
    </DocPage>
  );
}
