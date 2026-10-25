import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Machine lifecycle",
  description:
    "Wave VM QEMU launch, process supervision, and QMP lifecycle control are planned. No VM can be started today.",
};

export default function LifecyclePage() {
  return (
    <DocPage href="/docs/user-guide/lifecycle">
      <DocNote title="Planned — not implemented" tone="planned">
        The current build cannot start, stop, reset, or inspect a running virtual machine.
        There is no QEMU launch code, process supervisor, QMP client, or lifecycle
        command. Do not expect Start or Stop controls in the interface.
      </DocNote>

      <p>
        QEMU discovery and version probing are implemented. That is not lifecycle control.
        The application can report where an executable was found; it cannot run a VM.
      </p>

      <h2>What exists today</h2>
      <ul>
        <li>QEMU system emulator discovery for the host architecture.</li>
        <li>Version probing with a five-second timeout.</li>
        <li>Linux KVM verification.</li>
        <li>No QEMU argument construction, process launch, supervision, or QMP transport.</li>
      </ul>

      <h2>What the milestone must cover</h2>
      <ul>
        <li>Build QEMU arguments through typed vectors, never shell command strings.</li>
        <li>Supervise the QEMU process and verify runtime state instead of assuming success.</li>
        <li>Connect to QMP for supported start, stop, reset, and status operations.</li>
        <li>Handle launch failures, timeouts, unexpected exits, and stale runtime resources.</li>
        <li>Bind QMP to a local interface and avoid unauthenticated control.</li>
        <li>Never claim a VM is running without evidence from the process and runtime state.</li>
      </ul>

      <p>
        The lifecycle milestone depends on VM definitions and disk storage. See{" "}
        <Link href="/roadmap#qemu-lifecycle">QEMU launch and QMP lifecycle</Link> in the
        roadmap.
      </p>
    </DocPage>
  );
}
