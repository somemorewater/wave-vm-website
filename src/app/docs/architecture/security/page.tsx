import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";
import { sourceUrl } from "@/config";

export const metadata: Metadata = {
  title: "Security model",
  description:
    "Wave VM's current local-only security boundaries, QMP and console protections, restrictive permissions, and known limitations.",
};

export default function SecurityPage() {
  return (
    <DocPage href="/docs/architecture/security">
      <p>
        Wave VM runs as the current user, does not require root, and keeps virtualization
        control interfaces local. The current build starts real QEMU processes, so the
        security model now includes process control and a guest display transport.
      </p>

      <h2>Current protections</h2>
      <ul>
        <li>No privileged helper and no request to run as root.</li>
        <li>No installation of drivers, changes to group membership, or host configuration changes.</li>
        <li>A restrictive Content Security Policy in the Tauri configuration.</li>
        <li>A minimal capability set scoped to the main window.</li>
        <li>No remote web content loaded into the privileged application window.</li>
        <li>Application and machine directories use 0700 permissions; configuration and disks use 0600 on Unix.</li>
        <li>QMP uses a private Unix domain socket in the machine directory.</li>
        <li>QEMU VNC is bound to 127.0.0.1 and exposed over WebSocket only on loopback.</li>
        <li>The console password is generated per run and kept in memory, not in VM configuration.</li>
        <li>QEMU is launched with no guest network device.</li>
      </ul>

      <h2>Local control boundary</h2>
      <p>
        The Content Security Policy permits WebSocket connections only to{" "}
        <code>127.0.0.1</code>. QMP is not a public endpoint, and the VNC listener is not
        reachable from another host through Wave VM&apos;s configuration. The console is a
        local display feature, not a remote access service.
      </p>

      <DocNote title="This is not a security audit" tone="warning">
        The protections above are implementation choices, not proof that the application
        is free of vulnerabilities. No independent security audit has been completed.
      </DocNote>

      <h2>Input and data handling</h2>
      <p>
        Machine names, resources, and disk sizes are validated in Rust. Disk paths are
        checked to remain inside the Wave VM data directory before launch. QEMU arguments
        are constructed as vectors, not shell strings. Existing disks are never
        overwritten.
      </p>
      <p>
        Imported disk images and ISO files are not supported yet. When media support is
        added, imported files must be treated as untrusted inputs and verified where
        reliable data exists.
      </p>

      <h2>Known limitations</h2>
      <ul>
        <li>No security audit has been performed.</li>
        <li>No release artifacts or update mechanism exist.</li>
        <li>Guest installation media, networking, USB passthrough, snapshots, and machine editing are not implemented.</li>
        <li>Cleanup after a force-killed desktop process is not guaranteed for an already running QEMU child.</li>
        <li>Linux x86_64 is the only exercised host; Windows and macOS security behavior has not been verified.</li>
      </ul>

      <h2>Source references</h2>
      <ul>
        <li>
          <a
            href={sourceUrl("src-tauri/tauri.conf.json")}
            rel="noreferrer"
            target="_blank"
          >
            tauri.conf.json
          </a>{" "}
          — CSP and window configuration.
        </li>
        <li>
          <a
            href={sourceUrl("src-tauri/capabilities/default.json")}
            rel="noreferrer"
            target="_blank"
          >
            capabilities/default.json
          </a>{" "}
          — capability scope.
        </li>
        <li>
          <a
            href={sourceUrl("src-tauri/src/vm/runtime.rs")}
            rel="noreferrer"
            target="_blank"
          >
            vm/runtime.rs
          </a>{" "}
          — QMP, console binding, password generation, and process termination.
        </li>
        <li>
          <a
            href={sourceUrl("src-tauri/src/config/store.rs")}
            rel="noreferrer"
            target="_blank"
          >
            config/store.rs
          </a>{" "}
          — file permissions and atomic writes.
        </li>
      </ul>

      <p>
        See <Link href="/docs/architecture/storage">Storage and configuration</Link> for
        the file layout and{" "}
        <Link href="/docs/development/reporting">Reporting issues</Link> for how to report
        a security-relevant problem without exposing secrets.
      </p>
    </DocPage>
  );
}
