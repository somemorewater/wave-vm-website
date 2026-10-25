import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Wave VM project status, current VM lifecycle capabilities, and what to expect from the Milestone 2 desktop build.",
};

export default function GettingStartedPage() {
  return (
    <DocPage href="/docs/getting-started">
      <p>
        Wave VM is a local-first desktop application for creating and managing virtual
        machines. It is built with Tauri 2, a Rust backend, and a vanilla HTML, CSS, and
        JavaScript frontend. Direct QEMU integration is the virtualization path; libvirt
        is not a mandatory dependency.
      </p>
      <p>
        The project is in active development. The inspected repository is at{" "}
        <strong>Milestone 2: First Real VM Lifecycle</strong>. It is not a complete virtual
        machine manager yet, and there is no public download.
      </p>

      <h2>Current status</h2>
      <p>The current build implements:</p>
      <ul>
        <li>A Tauri 2 desktop shell with a persistent multi-page frontend.</li>
        <li>Host diagnostics for the operating system, architecture, CPU count, memory, and application-data free space.</li>
        <li>QEMU and qemu-img discovery through bundled resources, PATH, and standard platform locations.</li>
        <li>QEMU version probing with a five-second timeout.</li>
        <li>Linux KVM verification by opening /dev/kvm and issuing KVM_GET_API_VERSION.</li>
        <li>VM definitions with validated names, memory, virtual CPU counts, guest architecture, and disk size.</li>
        <li>Thin-provisioned QCOW2 disk creation with protection against overwriting existing disks.</li>
        <li>QEMU launch with KVM when verified usable, or software emulation (TCG) as a fallback.</li>
        <li>Start and stop through a private QMP Unix socket, with process tracking and bounded termination fallbacks.</li>
        <li>A genuine guest console through QEMU WebSocket VNC and bundled noVNC, bound to loopback.</li>
        <li>Schema-v2 local configuration with atomic writes and restrictive Unix permissions.</li>
      </ul>

      <DocNote title="What this build is not" tone="planned">
        The current build cannot install a guest operating system, select an ISO, attach
        installation media, download images, configure networking, edit or delete a
        machine, reset or pause it, take snapshots, or use USB passthrough. A configured
        disk is blank until an operating system is installed in a later milestone.
      </DocNote>

      <h2>What you can inspect today</h2>
      <p>
        Running the desktop application shows host readiness, saved machines, local
        storage, and application settings. You can create a machine definition, create its
        QCOW2 disk, start and stop a real QEMU process, and open the guest display while
        the machine is running.
      </p>
      <p>
        The console is a real VNC connection to the running guest, not a screenshot or a
        simulated terminal. Because no guest operating system is installed by this build,
        a new machine may display only firmware output or a no-bootable-device message.
      </p>
      <p>
        The lifecycle currently requires a Linux x86_64 host and supports x86_64 guests
        only. QEMU and qemu-img must be installed. KVM is optional; without a verified
        /dev/kvm, QEMU uses software emulation and may be slow.
      </p>

      <h2>Next steps</h2>
      <ul>
        <li>
          Read <Link href="/docs/getting-started/prerequisites">Prerequisites</Link> for
          the required tools and optional QEMU/KVM dependencies.
        </li>
        <li>
          Follow <Link href="/docs/getting-started/building">Building from source</Link>{" "}
          to run the current desktop build.
        </li>
        <li>
          Read the <Link href="/docs/user-guide/virtual-machines">virtual machine guide</Link>{" "}
          for the implemented creation workflow.
        </li>
        <li>
          See <Link href="/roadmap">the roadmap</Link> for the next planned milestone and
          the evidence behind each status.
        </li>
      </ul>
    </DocPage>
  );
}
