import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Disks and installation media",
  description:
    "Wave VM creates blank QCOW2 disks today. ISO selection, installation media, and guest OS installation are planned.",
};

export default function DisksAndMediaPage() {
  return (
    <DocPage href="/docs/user-guide/disks-and-media">
      <DocNote title="Disk creation exists; media does not" tone="planned">
        The current build creates a blank QCOW2 disk for each machine. It does not select
        ISO images, download images, verify checksums or signatures, attach installation
        media, or install a guest operating system.
      </DocNote>

      <p>
        The VM lifecycle has local disk storage but no installation-media workflow. The
        two areas are documented together because they are both required before a machine
        can boot an installed guest.
      </p>

      <h2>Virtual disks today</h2>
      <ul>
        <li>Each machine definition records a disk path and size.</li>
        <li>qemu-img creates a thin-provisioned QCOW2 image under <code>vms/&lt;machine-id&gt;/disk.qcow2</code>.</li>
        <li>Existing disk files are never overwritten.</li>
        <li>On Unix, the disk file is restricted to 0600 and the machine directory to 0700.</li>
        <li>The Storage page provides a read-only inventory of disks recorded in machine definitions.</li>
        <li>A missing disk is reported and prevents the machine from starting.</li>
      </ul>

      <h2>Storage limits</h2>
      <p>
        Disk size is validated between 1 and 1,024 GiB and against the free space reported
        on the application data filesystem. These are current implementation limits, not
        guarantees about guest capacity or performance.
      </p>

      <h2>Not implemented</h2>
      <ul>
        <li>Resizing, deleting, or compacting virtual disks.</li>
        <li>Attaching an existing disk to a machine.</li>
        <li>Inspecting disk usage inside the guest.</li>
        <li>Selecting local ISO images or attaching boot media.</li>
        <li>Downloading operating system images or maintaining a media catalogue.</li>
        <li>Verifying checksums or signatures.</li>
        <li>Installing a guest operating system.</li>
      </ul>

      <DocNote title="No guest images are bundled" tone="info">
        Wave VM will not include complete guest operating system images in the installer.
        Managed downloads and a catalogue remain under consideration, not scheduled work.
      </DocNote>

      <p>
        See <Link href="/roadmap#media-networking">guest installation media and networking</Link>{" "}
        in the roadmap. The current QEMU launch does not attach an ISO or expose a guest
        network device.
      </p>
    </DocPage>
  );
}
