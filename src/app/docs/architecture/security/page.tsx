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
        control interfaces local. The current build starts real QEMU processes and opens
        local installation media, so the security model includes process control, guest
        display transport, ISO path validation, and fullscreen/pointer-lock handling.
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
        <li>Installation ISO paths are selected through the native dialog and validated in Rust; the media is attached read-only.</li>
        <li>QEMU is launched with no guest network device.</li>
        <li>Pointer Lock requests are explicitly allowed for console mouse capture; other webview permission kinds use the default response.</li>
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
        Machine names, resources, disk sizes, and installation ISO paths are validated in
        Rust. Disk paths are checked to remain inside the Wave VM data directory before
        launch. QEMU arguments are constructed as vectors, not shell strings. Existing
        disks are never overwritten.
      </p>
      <p>
        A local ISO is treated as untrusted input. The file is opened to check
        readability and passed read-only to QEMU; its contents are not executed by Wave VM.
        There is no checksum or signature verification, no media catalogue, and no
        download path. Importing an existing virtual disk is not supported.
      </p>

      <h2>Known limitations</h2>
      <ul>
        <li>No security audit has been performed.</li>
        <li>No release artifacts or update mechanism exist.</li>
        <li>No checksum or signature verification of installation media exists.</li>
        <li>Guest networking, USB passthrough, snapshots, and machine editing are not implemented.</li>
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
        <li>
          <a
            href={sourceUrl("src-tauri/src/vm/media.rs")}
            rel="noreferrer"
            target="_blank"
          >
            vm/media.rs
          </a>{" "}
          — installation ISO validation.
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
