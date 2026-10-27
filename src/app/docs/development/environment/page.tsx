import type { Metadata } from "next";
import Link from "next/link";

import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Environment",
  description:
    "Set up the Wave VM desktop and website development environments without creating a dependency between the repositories.",
};

export default function EnvironmentPage() {
  return (
    <DocPage href="/docs/development/environment">
      <p>
        The desktop application and website are developed independently. You can work on
        the website without cloning the desktop repository. If you work on both, use
        separate dependency installations.
      </p>

      <h2>Desktop application</h2>
      <p>Required:</p>
      <ul>
        <li>Rust stable and Cargo.</li>
        <li>Node.js 20 or newer and npm.</li>
        <li>Tauri 2 Linux prerequisites: WebKitGTK 4.1, GTK 3, and libsoup 3.</li>
      </ul>
      <p>Required for VM operations:</p>
      <ul>
        <li>QEMU and qemu-img. The shell can start without them, but machines cannot be created or started.</li>
        <li>An accessible Linux KVM device at /dev/kvm is optional; without it, QEMU uses software emulation.</li>
        <li>A local ISO is optional unless you want to boot an installer. Wave VM does not bundle or download guest images.</li>
      </ul>
      <pre>
        <code>{`git clone https://github.com/somemorewater/waveVM.git
cd waveVM
npm install
npm run dev`}</code>
      </pre>
      <p>
        See <Link href="/docs/getting-started/prerequisites">Prerequisites</Link> for
        distribution notes and{" "}
        <Link href="/docs/getting-started/building">Building from source</Link> for the
        full check sequence.
      </p>

      <h2>Website</h2>
      <p>
        The website uses Node.js 18.18 or newer and pnpm. It has no build-time or runtime
        dependency on the desktop repository.
      </p>
      <pre>
        <code>{`git clone https://github.com/somemorewater/wave-vm-website.git
cd wave-vm-website
pnpm install
pnpm dev`}</code>
      </pre>
      <p>
        The website is available at <code>http://localhost:3000</code> by default.
      </p>

      <h2>Keep the projects independent</h2>
      <p>
        Do not add symlinks, relative imports, or runtime paths from the website to the
        desktop repository. Do not import desktop source files at website build time. The
        website must continue to build when the desktop repository is absent.
      </p>
    </DocPage>
  );
}
