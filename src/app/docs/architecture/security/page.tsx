import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";
import { sourceUrl } from "@/config";

export const metadata: Metadata = {
  title: "Security model",
  description:
    "Wave VM's current local-only security boundaries, restrictive permissions, Content Security Policy, and future QMP and console requirements.",
};

export default function SecurityPage() {
  return (
    <DocPage href="/docs/architecture/security">
      <p>
        The current security model is small because the current feature surface is small.
        Wave VM runs as the current user, does not require root, and does not expose a
        virtualization control service.
      </p>

      <h2>Current protections</h2>
      <ul>
        <li>No privileged helper and no request to run as root.</li>
        <li>No installation of drivers, changes to group membership, or host configuration changes.</li>
        <li>A restrictive Content Security Policy in the Tauri configuration.</li>
        <li>A minimal capability set scoped to the main window.</li>
        <li>No remote web content loaded into the privileged application window.</li>
        <li>Application directories created with 0700 permissions and configuration written with 0600 on Unix.</li>
        <li>No account credentials or console passwords stored by the current build.</li>
      </ul>

      <h2>What is not exposed yet</h2>
      <p>
        There is no QMP listener, VNC server, noVNC client, VM network, or process control
        command. That means there is no virtualization control interface to expose. It also
        means the security requirements for those interfaces have not been implemented or
        tested.
      </p>

      <DocNote title="Future control interfaces must be local and authenticated" tone="planned">
        QMP and VNC must bind to appropriate local interfaces only. Console access must use
        session authentication, and console passwords must not be stored as persistent VM
        configuration. These are requirements for future work, not claims about the
        current build.
      </DocNote>

      <h2>Input and data handling</h2>
      <p>
        Imported disk images and ISO files must be treated as untrusted inputs. Future
        code must validate user-controlled paths, avoid shell invocation, construct QEMU
        arguments as vectors, and refuse to overwrite existing disk images or user data.
      </p>
      <p>
        The current configuration loader validates the schema version and parses typed
        values. It does not yet validate VM definitions because they do not exist.
      </p>

      <h2>Known limitations</h2>
      <ul>
        <li>No security audit has been performed.</li>
        <li>No license has been selected, which is a separate legal and distribution gap.</li>
        <li>No release artifacts or update mechanism exist.</li>
        <li>QMP, VNC, networking, and process supervision are not implemented.</li>
        <li>Windows and macOS security behavior has not been verified.</li>
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
