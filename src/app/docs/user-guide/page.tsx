import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "User Guide",
  description:
    "What the current Wave VM interface can do, including machine creation, local ISO installation media, QEMU lifecycle, and the guest console.",
};

export default function UserGuidePage() {
  return (
    <DocPage href="/docs/user-guide">
      <p>
        The current desktop build implements a real local VM lifecycle. It can create a
        machine definition and a QCOW2 disk, attach a local ISO, start and stop a QEMU
        process, display the guest through a loopback noVNC console, and switch the next
        boot back to the virtual disk after installation. It is not yet a complete virtual
        machine manager.
      </p>

      <h2>Usable today</h2>
      <ul>
        <li>Inspect the host operating system, architecture, logical CPU count, and memory.</li>
        <li>See free and total space on the application data filesystem.</li>
        <li>See whether QEMU and qemu-img were found, and which version was parsed.</li>
        <li>See whether Linux KVM is available, inaccessible, or unsupported.</li>
        <li>See the application data directory and configuration path.</li>
        <li>Create a machine definition with a validated name, memory, vCPU count, guest architecture, and disk size.</li>
        <li>Create a thin-provisioned QCOW2 disk with qemu-img.</li>
        <li>Select a local ISO, attach or replace it while the machine is stopped, and choose installer or disk boot.</li>
        <li>Install a guest from your own ISO through the real guest display.</li>
        <li>Start and stop a real QEMU process with QMP lifecycle control.</li>
        <li>Open the running guest display in an interactive console with fullscreen and mouse capture.</li>
        <li>Inspect saved machines, media availability, disk presence, acceleration, and lifecycle state.</li>
      </ul>
      <p>
        Read <Link href="/docs/user-guide/virtual-machines">Virtual machines</Link> for
        creation and inspection,{" "}
        <Link href="/docs/user-guide/disks-and-media">Disks and installation media</Link>{" "}
        for local ISO attachment and boot modes,{" "}
        <Link href="/docs/user-guide/lifecycle">Machine lifecycle</Link> for start and stop
        behavior, and <Link href="/docs/user-guide/console">Graphical console</Link> for the
        guest display and input controls.
      </p>

      <h2>Not implemented</h2>
      <ul>
        <li>Downloading operating system images or maintaining a media catalogue.</li>
        <li>Checksum or signature verification, and automatic installation-completion detection.</li>
        <li>Editing or deleting a machine definition.</li>
        <li>Resetting, pausing, or snapshotting a machine.</li>
        <li>Guest networking.</li>
        <li>USB passthrough or additional driver media.</li>
        <li>Windows or macOS host support.</li>
        <li>Public releases, installers, or checksums.</li>
      </ul>

      <DocNote title="A new disk is not an installed guest" tone="info">
        The lifecycle is real, but a newly created disk is blank. Install an operating
        system from a local ISO that you provide, then switch the boot mode back to the
        virtual disk. Wave VM does not bundle guest images or detect when installation has
        finished.
      </DocNote>

      <h2>Current scope</h2>
      <p>
        Machine creation and lifecycle operations require a Linux x86_64 host and support
        x86_64 guests only. QEMU and qemu-img must be installed. KVM is optional; without
        verified acceleration, QEMU uses software emulation (TCG).
      </p>
      <p>
        The guest starts with no network device. See{" "}
        <Link href="/docs/user-guide/networking">Networking</Link> for the current
        boundary.
      </p>
    </DocPage>
  );
}
