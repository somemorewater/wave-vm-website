import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Building from source",
  description:
    "Clone, install, run, check, and build the current Wave VM desktop foundation from source.",
};

export default function BuildingPage() {
  return (
    <DocPage href="/docs/getting-started/building">
      <p>
        The desktop application is a Tauri 2 project. The frontend is static and has no
        bundler; Tauri serves the files in <code>src/</code>. The Rust backend owns host
        detection and persistence.
      </p>

      <h2>Clone and install</h2>
      <pre>
        <code>{`git clone https://github.com/somemorewater/waveVM.git
cd waveVM
npm install`}</code>
      </pre>
      <p>
        The repository contains both npm and pnpm lockfiles. The documented workflow uses
        npm. Do not mix package managers in a way that produces an unrecorded dependency
        tree.
      </p>

      <h2>Run the desktop application</h2>
      <pre>
        <code>{`npm run dev`}</code>
      </pre>
      <p>
        This launches the Tauri window. Do not open <code>src/index.html</code> directly
        in a browser; the frontend requires the Tauri desktop shell and its command
        bridge.
      </p>

      <DocNote title="QEMU is optional for the shell" tone="info">
        The current build compiles and launches without QEMU. Host readiness will report
        QEMU and qemu-img as missing, and KVM as unavailable if <code>/dev/kvm</code> is
        not accessible. Those are expected diagnostics, not build failures.
      </DocNote>

      <h2>Checks</h2>
      <p>These are the commands documented by the desktop repository:</p>
      <pre>
        <code>{`npm run check:frontend
cargo fmt --check --manifest-path src-tauri/Cargo.toml
cargo check --manifest-path src-tauri/Cargo.toml
npx tauri build --no-bundle`}</code>
      </pre>
      <p>
        The Rust checks require the Tauri system libraries. The final command builds a
        release binary without producing an installer bundle.
      </p>

      <h2>Build output</h2>
      <p>
        The release binary is written under <code>src-tauri/target/release/</code>. It is
        a local build artifact, not a public release. There is no supported installer,
        versioned release, or checksum.
      </p>

      <h2>Local data</h2>
      <p>
        On first launch, the application resolves the platform application data
        directory from the bundle identifier <code>com.wavevm.desktop</code> and creates{" "}
        <code>config.json</code> and a reserved <code>vms/</code> directory. The
        configuration is schema-v1 and is written atomically. See{" "}
        <Link href="/docs/architecture/storage">Storage and configuration</Link> for the
        details and platform paths.
      </p>

      <h2>Next</h2>
      <p>
        If the build fails, see{" "}
        <Link href="/docs/getting-started/troubleshooting">Troubleshooting</Link>. To
        understand the current interface, read{" "}
        <Link href="/docs/user-guide/host-capabilities">Host capabilities</Link>.
      </p>
    </DocPage>
  );
}
