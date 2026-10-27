import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Virtual machines",
  description:
    "Create a Wave VM machine definition with validated resources, a QCOW2 disk, and optional local installation media.",
};

export default function VirtualMachinesPage() {
  return (
    <DocPage href="/docs/user-guide/virtual-machines">
      <p>
        The current build can create, list, and inspect local machine definitions. Each
        definition records a name, guest architecture, memory, virtual CPU count, disk
        path and size, optional installation ISO, boot mode, and lifecycle state.
        Definitions are stored in the schema-v3 configuration.
      </p>

      <h2>Create a machine</h2>
      <p>
        Use <strong>New machine</strong> from the Dashboard or Virtual machines page. The
        dialog accepts:
      </p>
      <ul>
        <li>
          <strong>Name</strong> — up to 64 characters. The name cannot contain control
          characters or <code>/</code>, <code>\</code>, comma, or equals characters.
        </li>
        <li>
          <strong>Guest architecture</strong> — x86_64 only in this build.
        </li>
        <li>
          <strong>Memory</strong> — 256 to 65,536 MiB, and no more than the host reports
          as total memory.
        </li>
        <li>
          <strong>Virtual CPUs</strong> — 1 to 64, and no more than the host&apos;s logical
          CPU count.
        </li>
        <li>
          <strong>Disk size</strong> — 1 to 1,024 GiB, and no more than the free space
          reported on the application data filesystem.
        </li>
        <li>
          <strong>Installation ISO</strong> — optional. Choose an existing local{" "}
          <code>.iso</code> file. If attached, the first start uses installer boot.
        </li>
      </ul>
      <p>
        Creating a machine requires a Linux x86_64 host, qemu-img, and sufficient free
        space. The backend validates the input again; the dialog is not the authority.
        Wave VM creates a private machine directory and a thin-provisioned{" "}
        <code>disk.qcow2</code> file. It never overwrites an existing disk. The selected
        ISO stays at its original path and is never copied, modified, or deleted.
      </p>

      <DocNote title="The disk starts blank" tone="info">
        Wave VM does not include a guest operating system. A new machine has an empty disk.
        Attach a local ISO and start the machine to boot its installer, then stop the
        machine and switch back to disk boot after installation.
      </DocNote>

      <h2>Inspect a machine</h2>
      <p>
        The machine list shows lifecycle state, memory, virtual CPUs, disk size,
        installation media, acceleration when running, and any backend error. A missing
        disk or missing installer ISO is reported explicitly. The details view shows the
        recorded configuration, disk path, format, media availability, boot mode, and
        lifecycle actions.
      </p>

      <h2>Change installation media</h2>
      <p>
        Installation media can be attached, replaced, or detached only while the machine
        is stopped. Installer boot attaches the ISO as a read-only CD/DVD and boots it
        first; disk boot starts the virtual disk without the installer. The ISO path is
        retained when you switch to disk boot so it can be reused later.
      </p>
      <p>
        See <Link href="/docs/user-guide/disks-and-media">Disks and installation media</Link>{" "}
        for validation details and installation limits.
      </p>

      <h2>What is not available</h2>
      <ul>
        <li>Editing a machine definition after creation.</li>
        <li>Deleting a machine definition or its disk.</li>
        <li>Changing memory, CPU, or disk size.</li>
        <li>Attaching an existing disk.</li>
        <li>Reset, pause, resume, or snapshots.</li>
        <li>Guest networking, USB passthrough, or additional driver media.</li>
        <li>Image downloads, checksum verification, or automatic installation detection.</li>
      </ul>
      <p>
        Wave VM does not automatically delete VM directories or disks. If a disk is
        missing, restore it rather than deleting the machine definition.
      </p>

      <p>
        Continue with <Link href="/docs/user-guide/disks-and-media">Disks and installation media</Link>{" "}
        or <Link href="/docs/user-guide/lifecycle">Machine lifecycle</Link>.
      </p>
    </DocPage>
  );
}
