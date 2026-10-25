import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Prerequisites",
  description:
    "Required tools and host libraries for building Wave VM, plus optional QEMU and KVM dependencies.",
};

export default function PrerequisitesPage() {
  return (
    <DocPage href="/docs/getting-started/prerequisites">
      <p>
        The desktop application and the website are independent projects. The desktop
        application has the larger set of native prerequisites; the website only needs
        Node.js and a package manager.
      </p>

      <h2>Desktop application</h2>
      <h3>Required</h3>
      <ul>
        <li>Rust stable and Cargo.</li>
        <li>Node.js 20 or newer and npm for the Tauri CLI.</li>
        <li>Tauri 2 Linux prerequisites: WebKitGTK 4.1, GTK 3, and libsoup 3.</li>
        <li>Build tools and pkg-config for compiling native dependencies.</li>
      </ul>
      <p>
        On Arch Linux, the relevant packages are <code>webkit2gtk-4.1</code>,{" "}
        <code>gtk3</code>, and <code>libsoup3</code>. Package names differ by
        distribution.
      </p>

      <h3>Optional for the current build</h3>
      <ul>
        <li>
          QEMU, including a system emulator for the host architecture and{" "}
          <code>qemu-img</code>. The current build discovers and probes them but does not
          launch a VM.
        </li>
        <li>
          A usable Linux KVM device at <code>/dev/kvm</code>. The current build verifies
          it by opening the device and issuing <code>KVM_GET_API_VERSION</code>.
        </li>
      </ul>

      <DocNote title="No minimum QEMU version has been verified" tone="warning">
        The code parses the version reported by <code>--version</code>, but the project
        has not established a minimum supported QEMU version. Do not assume that a
        discovered executable is compatible with future VM lifecycle features.
      </DocNote>

      <h2>Supported host environments</h2>
      <p>
        Linux is the only host environment exercised while building the current
        foundation. The Linux KVM probe is implemented. Source code contains QEMU
        discovery paths for other platforms, but macOS and Windows host behavior has not
        been verified. No support claim is made for those hosts.
      </p>
      <p>
        The project must not be run as root. KVM access should be granted through the
        host&apos;s normal permission model; Wave VM does not modify group membership,
        device permissions, or system configuration.
      </p>

      <h2>Website</h2>
      <ul>
        <li>Node.js 18.18 or newer.</li>
        <li>pnpm, which is the package manager used by the website lockfile.</li>
      </ul>

      <h2>Next</h2>
      <p>
        Continue with <Link href="/docs/getting-started/building">Building from source</Link>.
        If a required dependency is missing, see{" "}
        <Link href="/docs/getting-started/troubleshooting">Troubleshooting</Link>.
      </p>
    </DocPage>
  );
}
