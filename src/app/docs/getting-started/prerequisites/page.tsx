import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Prerequisites",
  description:
    "Required tools and host libraries for building Wave VM, plus QEMU, WebSocket VNC, and KVM requirements.",
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
        <li>
          QEMU, including a system emulator for the host architecture and{" "}
          <code>qemu-img</code>. Both are required to create disks and run a machine.
        </li>
      </ul>
      <p>
        On Arch Linux, the relevant packages are <code>webkit2gtk-4.1</code>,{" "}
        <code>gtk3</code>, and <code>libsoup3</code>. Package names differ by
        distribution.
      </p>

      <h3>Console requirement</h3>
      <p>
        The guest console uses QEMU&apos;s WebSocket VNC transport and a bundled noVNC
        client. The installed QEMU must support WebSocket VNC. The current implementation
        was verified with QEMU 11.1.2, but no formal minimum QEMU version has been
        established.
      </p>

      <h3>Installation media</h3>
      <p>
        Guest installation uses a local <code>.iso</code> file that you provide. Wave VM
        does not bundle, download, or verify guest images. The guest must also be able to
        use the virtio-blk disk that Wave VM exposes; some Windows installers require
        storage drivers that this build does not supply.
      </p>

      <h3>Optional acceleration</h3>
      <p>
        A usable Linux KVM device at <code>/dev/kvm</code> enables hardware acceleration.
        The application verifies it by opening the device and issuing{" "}
        <code>KVM_GET_API_VERSION</code>. Without it, QEMU uses software emulation (TCG),
        which is functional but may be slow.
      </p>

      <DocNote title="The lifecycle requires Linux x86_64" tone="warning">
        Machine creation and QEMU lifecycle operations currently require a Linux x86_64
        host and accept x86_64 guests only. Other hosts are reported as unsupported before
        files or processes are created. macOS and Windows behavior has not been verified.
      </DocNote>

      <h2>Supported host environments</h2>
      <p>
        Linux x86_64 is the only host environment exercised while building the current
        lifecycle. The Linux KVM probe is implemented. Source code contains QEMU discovery
        paths for other platforms, but macOS and Windows host behavior has not been
        verified. No support claim is made for those hosts.
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
