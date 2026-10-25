import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Wave VM project status, current capabilities, and what to expect from the Milestone 1A desktop foundation.",
};

export default function GettingStartedPage() {
  return (
    <DocPage href="/docs/getting-started">
      <p>
        Wave VM is a local-first desktop application for creating and managing virtual
        machines. It is built with Tauri 2, a Rust backend, and a vanilla HTML, CSS, and
        JavaScript frontend. Direct QEMU integration is the intended virtualization path;
        libvirt is not a mandatory dependency.
      </p>
      <p>
        The project is in active development. The inspected repository is at{" "}
        <strong>Milestone 1A: Desktop Foundation</strong>. It is not a usable virtual
        machine manager yet, and there is no public download.
      </p>

      <h2>Current status</h2>
      <p>The current build implements:</p>
      <ul>
        <li>A Tauri 2 desktop shell with a static frontend.</li>
        <li>Host diagnostics for the operating system, architecture, CPU count, memory, and application-data free space.</li>
        <li>QEMU and qemu-img discovery through bundled resources, PATH, and standard platform locations.</li>
        <li>QEMU version probing with a five-second timeout.</li>
        <li>Linux KVM verification by opening /dev/kvm and issuing KVM_GET_API_VERSION.</li>
        <li>Schema-v1 local configuration with atomic writes and restrictive Unix permissions.</li>
      </ul>

      <DocNote title="What this build is not" tone="planned">
        The current build cannot create a VM definition, create a virtual disk, select an
        ISO, launch QEMU, control a machine through QMP, configure networking, or display
        a graphical console. The interface labels future functionality rather than
        pretending it exists.
      </DocNote>

      <h2>What you can inspect today</h2>
      <p>
        Running the desktop application shows a host-readiness panel. It reports the
        host system, local storage, QEMU and qemu-img status, and Linux KVM availability.
        Missing tools and failed probes are reported explicitly. The application also
        creates a versioned configuration file in the platform application data
        directory.
      </p>
      <p>
        These checks are diagnostics, not proof that a VM can run. QEMU argument
        construction, process supervision, and QMP control do not exist yet.
      </p>

      <h2>Next steps</h2>
      <ul>
        <li>
          Read <Link href="/docs/getting-started/prerequisites">Prerequisites</Link> for
          the required tools and optional QEMU/KVM dependencies.
        </li>
        <li>
          Follow <Link href="/docs/getting-started/building">Building from source</Link>{" "}
          to run the current desktop foundation.
        </li>
        <li>
          See <Link href="/roadmap">the roadmap</Link> for the next planned milestone and
          the evidence behind each status.
        </li>
      </ul>
    </DocPage>
  );
}
