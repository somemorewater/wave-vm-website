import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "User Guide",
  description:
    "What the current Wave VM interface can show, and which virtual machine workflows are still planned.",
};

export default function UserGuidePage() {
  return (
    <DocPage href="/docs/user-guide">
      <p>
        The current desktop build is a host-readiness and foundation milestone. It is
        useful for inspecting what the host provides; it is not yet a virtual machine
        manager.
      </p>

      <h2>Usable today</h2>
      <ul>
        <li>Inspect the host operating system, architecture, logical CPU count, and memory.</li>
        <li>See free and total space on the application data filesystem.</li>
        <li>See whether QEMU and qemu-img were found, and which version was parsed.</li>
        <li>See whether Linux KVM is available, inaccessible, or unsupported.</li>
        <li>See the application data directory and configuration path.</li>
        <li>Refresh host diagnostics.</li>
      </ul>
      <p>
        Read <Link href="/docs/user-guide/host-capabilities">Host capabilities</Link> for
        the meaning of each status and warning.
      </p>

      <h2>Not implemented</h2>
      <ul>
        <li>Creating, editing, or persisting a virtual machine definition.</li>
        <li>Creating or managing virtual disks.</li>
        <li>Selecting an ISO or managing installation media.</li>
        <li>Starting, stopping, resetting, or inspecting a running VM.</li>
        <li>Controlling QEMU through QMP.</li>
        <li>Configuring networking.</li>
        <li>Displaying an interactive graphical console.</li>
      </ul>

      <DocNote title="No imaginary workflows" tone="planned">
        The guide does not provide steps for controls that do not exist. The pages for
        virtual machines, disks, lifecycle, and the console are marked planned and explain
        the current limitation instead of inventing an interface.
      </DocNote>

      <h2>Planned user guide pages</h2>
      <ul>
        <li>
          <Link href="/docs/user-guide/virtual-machines">Virtual machines</Link> — planned
          definitions and creation workflow.
        </li>
        <li>
          <Link href="/docs/user-guide/disks-and-media">Disks and installation media</Link>{" "}
          — planned storage and ISO handling.
        </li>
        <li>
          <Link href="/docs/user-guide/lifecycle">Machine lifecycle</Link> — planned QMP
          control.
        </li>
        <li>
          <Link href="/docs/user-guide/console">Graphical console</Link> — planned VNC and
          noVNC integration.
        </li>
      </ul>
    </DocPage>
  );
}
