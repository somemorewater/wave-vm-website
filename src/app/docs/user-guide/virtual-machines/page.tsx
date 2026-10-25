import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Virtual machines",
  description:
    "Create a Wave VM machine definition with validated resources and a blank QCOW2 disk.",
};

export default function VirtualMachinesPage() {
  return (
    <DocPage href="/docs/user-guide/virtual-machines">
      <p>
        The current build can create, list, and inspect local machine definitions. Each
        definition records a name, guest architecture, memory, virtual CPU count, disk
        path, disk size, and lifecycle state. Definitions are stored in the schema-v2
        configuration.
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
      </ul>
      <p>
        Creating a machine requires a Linux x86_64 host, qemu-img, and sufficient free
        space. The backend validates the input again; the dialog is not the authority.
        Wave VM creates a private machine directory and a thin-provisioned{" "}
        <code>disk.qcow2</code> file. It never overwrites an existing disk.
      </p>

      <DocNote title="The disk is blank" tone="planned">
        Wave VM does not include a guest operating system and cannot attach installation
        media yet. A new machine has an empty disk. Starting it launches real firmware and
        QEMU, but there is no installed guest to boot until a later milestone.
      </DocNote>

      <h2>Inspect a machine</h2>
      <p>
        The machine list shows lifecycle state, memory, virtual CPUs, disk size,
        acceleration when running, and any backend error. A missing disk is reported
        explicitly and disables Start. The details view shows the recorded configuration,
        disk path, format, availability, and lifecycle actions.
      </p>

      <h2>What is not available</h2>
      <ul>
        <li>Editing a machine definition after creation.</li>
        <li>Deleting a machine definition or its disk.</li>
        <li>Changing memory, CPU, or disk size.</li>
        <li>Attaching an existing disk or installation media.</li>
        <li>Reset, pause, resume, or snapshots.</li>
        <li>Guest networking or USB passthrough.</li>
      </ul>
      <p>
        Wave VM does not automatically delete VM directories or disks. If a disk is
        missing, restore it rather than deleting the machine definition.
      </p>

      <p>
        Continue with <Link href="/docs/user-guide/lifecycle">Machine lifecycle</Link> for
        start and stop behavior.
      </p>
    </DocPage>
  );
}
