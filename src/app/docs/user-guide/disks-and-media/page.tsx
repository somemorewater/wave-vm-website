import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Disks and installation media",
  description:
    "Wave VM creates QCOW2 disks and attaches local ISO installation media for read-only installer boot, with an explicit switch back to disk boot.",
};

export default function DisksAndMediaPage() {
  return (
    <DocPage href="/docs/user-guide/disks-and-media">
      <p>
        The current build has both local virtual storage and local installation media.
        Each machine receives a QCOW2 disk, and a machine that is stopped can attach an
        ISO that you already have on the host. Wave VM does not download or bundle guest
        images.
      </p>

      <h2>Virtual disks</h2>
      <ul>
        <li>Each machine definition records a disk path and size.</li>
        <li>qemu-img creates a thin-provisioned QCOW2 image at <code>vms/&lt;machine-id&gt;/disk.qcow2</code>.</li>
        <li>Existing disk files are never overwritten.</li>
        <li>On Unix, the disk file is restricted to 0600 and the machine directory to 0700.</li>
        <li>The Storage page provides a read-only inventory of disks recorded in machine definitions.</li>
        <li>A missing disk is reported and prevents the machine from starting.</li>
      </ul>
      <p>
        Disk size is validated between 1 and 1,024 GiB and against the free space reported
        on the application data filesystem. These are current implementation limits, not
        guarantees about guest capacity or performance.
      </p>

      <h2>Local installation media</h2>
      <p>
        Open <strong>Installation media</strong> from the application navigation, or use
        the machine details view. Selecting an ISO does the following:
      </p>
      <ul>
        <li>Opens the native Tauri file dialog filtered to <code>.iso</code> files.</li>
        <li>Resolves the selected path and checks that it is an absolute, readable, regular file with an <code>.iso</code> extension.</li>
        <li>Stores the canonical UTF-8 path in the schema-v3 configuration. The file stays at its original location.</li>
        <li>Switches the machine to installer boot, ready for the next start.</li>
      </ul>
      <p>
        The ISO is passed to QEMU as a read-only CD/DVD and is never copied, modified, or
        deleted by Wave VM. Attaching, replacing, or detaching media is allowed only while
        the machine is stopped, because a running QEMU process keeps the arguments it was
        started with.
      </p>

      <h2>Installer boot and disk boot</h2>
      <ul>
        <li>
          <strong>Installer boot</strong> attaches the ISO as a read-only CD/DVD and uses
          boot order <code>d</code>, so the installer starts first.
        </li>
        <li>
          <strong>Disk boot</strong> starts the QCOW2 disk without attaching the installer
          and uses boot order <code>c</code>.
        </li>
        <li>
          Switching to disk boot does not delete the recorded ISO path. Detaching the media
          clears it and selects disk boot.
        </li>
      </ul>

      <h2>Typical installation sequence</h2>
      <ol>
        <li>Create a machine and, optionally, select an ISO in the creation dialog.</li>
        <li>If needed, attach or replace the ISO while the machine is stopped.</li>
        <li>Start the machine and open the console to interact with the real installer.</li>
        <li>Complete the guest installation.</li>
        <li>Stop the machine if it is still running. QEMU is launched with <code>-no-reboot</code>, so a guest-requested restart may exit the process instead of rebooting automatically.</li>
        <li>Choose <strong>Boot from disk</strong> and start the machine again.</li>
      </ol>
      <p>
        Wave VM does not detect when installation has completed. Switching from installer
        boot to disk boot is a deliberate user action.
      </p>

      <DocNote title="The ISO is used only as installation media" tone="info">
        Wave VM does not download images, provide an OS catalogue, verify checksums or
        signatures, supply additional driver media, or guarantee that a particular
        installer supports the virtual hardware. Treat ISO files as untrusted input.
      </DocNote>

      <h2>Media validation and limits</h2>
      <p>
        A selected path must be absolute and remain valid after canonicalization. The path
        must be valid UTF-8 and must not contain a comma, newline, or carriage return,
        because those characters cannot be passed safely through QEMU&apos;s option parser.
        The file must still end in <code>.iso</code> after symlinks are resolved.
      </p>
      <ul>
        <li>No ISO downloads, media catalogue, or managed image library.</li>
        <li>No checksum or signature verification, even when a distribution publishes one.</li>
        <li>No automatic detection of installation completion or guest operating system.</li>
        <li>No multiple CD/DVD drives and no additional driver media.</li>
        <li>No attachment or replacement while a machine is running.</li>
        <li>No disk resizing, deletion, compaction, cloning, snapshots, or attaching an existing disk.</li>
      </ul>
      <p>
        The virtual disk is attached with virtio-blk. An installer without a virtio storage
        driver, including some Windows installers, may not see the disk. Wave VM does not
        currently offer an IDE/SATA disk option or a separate driver ISO.
      </p>

      <h2>No guest images are bundled</h2>
      <p>
        Wave VM will not include complete guest operating system images in the installer.
        You must provide a compatible ISO and follow the guest operating system&apos;s
        licensing terms. Managed downloads and a catalogue remain under consideration, not
        implemented work.
      </p>

      <p>
        See the roadmap for{" "}
        <Link href="/roadmap#local-installation-media">local installation media</Link> and{" "}
        <Link href="/roadmap#guest-networking">guest networking</Link>. The current QEMU
        launch attaches an installer when requested but still exposes no guest network
        device. See <Link href="/docs/user-guide/networking">Networking</Link> for that
        boundary.
      </p>
    </DocPage>
  );
}
