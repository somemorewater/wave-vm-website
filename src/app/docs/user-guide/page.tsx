import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "User Guide",
  description:
    "What the current Wave VM interface can do, including machine creation, QEMU lifecycle, and the guest console.",
};

export default function UserGuidePage() {
  return (
    <DocPage href="/docs/user-guide">
      <p>
        The current desktop build implements a real local VM lifecycle. It can create a
        machine definition and a blank QCOW2 disk, start and stop a QEMU process, and open
        the running guest display in a loopback noVNC console. It is not yet a complete
        virtual machine manager.
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
        <li>Start and stop a real QEMU process with QMP lifecycle control.</li>
        <li>Open the running guest display in an interactive console.</li>
        <li>Inspect saved machines, disk presence, acceleration, and lifecycle state.</li>
      </ul>
      <p>
        Read <Link href="/docs/user-guide/virtual-machines">Virtual machines</Link> for
        creation and inspection,{" "}
        <Link href="/docs/user-guide/lifecycle">Machine lifecycle</Link> for start and
        stop behavior, and <Link href="/docs/user-guide/console">Graphical console</Link>{" "}
        for the guest display.
      </p>

      <h2>Not implemented</h2>
      <ul>
        <li>Installing a guest operating system or attaching installation media.</li>
        <li>Selecting or verifying ISO images, or downloading operating system images.</li>
        <li>Editing or deleting a machine definition.</li>
        <li>Resetting, pausing, or snapshotting a machine.</li>
        <li>Configuring guest networking.</li>
        <li>USB passthrough.</li>
        <li>Windows or macOS host support.</li>
        <li>Public releases, installers, or checksums.</li>
      </ul>

      <DocNote title="A running machine is not an installed guest" tone="planned">
        The lifecycle is real, but a newly created disk is blank. Wave VM does not install
        an operating system in this milestone. The console shows the actual guest
        framebuffer; without an installed guest, that may be firmware output or a
        no-bootable-device message.
      </DocNote>

      <h2>Current scope</h2>
      <p>
        Machine creation and lifecycle operations require a Linux x86_64 host and support
        x86_64 guests only. QEMU and qemu-img must be installed. KVM is optional; without
        verified acceleration, QEMU uses software emulation (TCG).
      </p>
      <p>
        The <Link href="/docs/user-guide/disks-and-media">Disks and installation media</Link>{" "}
        page explains what storage exists today and what remains planned.
      </p>
    </DocPage>
  );
}
