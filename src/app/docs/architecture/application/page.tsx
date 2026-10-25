import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";
import { sourceUrl } from "@/config";

export const metadata: Metadata = {
  title: "Application boundaries",
  description:
    "How Wave VM's Tauri shell, static frontend, Rust commands, capabilities, and Content Security Policy are separated.",
};

export default function ApplicationBoundariesPage() {
  return (
    <DocPage href="/docs/architecture/application">
      <p>
        The application has two explicit sides: a static frontend served by Tauri and a
        Rust backend exposed through narrowly scoped commands. The backend is
        authoritative for host detection and persistence.
      </p>

      <h2>Tauri shell</h2>
      <p>
        The main window is defined in <code>src-tauri/tauri.conf.json</code>. Tauri serves
        the static files in <code>src/</code> as the frontend distribution and enables the
        global Tauri bridge. The window has a minimum size and is resizable.
      </p>

      <h2>Command surface</h2>
      <p>The current invoke handler registers exactly two commands:</p>
      <ul>
        <li>
          <code>get_app_info</code> — returns the application name, version, data
          directory, configuration path, vms directory, schema version, and timestamps.
        </li>
        <li>
          <code>detect_host</code> — runs host diagnostics on a blocking worker thread and
          returns the structured host result.
        </li>
      </ul>
      <p>
        The frontend calls these through <code>window.__TAURI__.core.invoke</code> from{" "}
        <code>src/js/api.js</code>. There is no VM command, process command, filesystem
        command, or arbitrary QEMU argument command.
      </p>

      <h2>Frontend boundary</h2>
      <p>
        The frontend is static and has no bundler. It renders loading, error, and
        host-readiness states and refreshes the diagnostics. It does not read files or
        start processes directly. Host data is rendered as structured values rather than
        trusted HTML.
      </p>

      <h2>Capabilities and CSP</h2>
      <p>
        The capability set is minimal and scoped to the main window. The Content Security
        Policy restricts scripts, styles, images, fonts, and connections to local
        application resources and the Tauri IPC endpoint. Remote web content is not loaded
        into a privileged window.
      </p>

      <DocNote title="Future commands are not present" tone="planned">
        VM creation, disk creation, QEMU launch, QMP control, and console commands do not
        exist. The command surface will need to grow carefully as those features are
        implemented.
      </DocNote>

      <h2>Source references</h2>
      <ul>
        <li>
          <a href={sourceUrl("src-tauri/src/lib.rs")} rel="noreferrer" target="_blank">
            src-tauri/src/lib.rs
          </a>{" "}
          — invoke handler.
        </li>
        <li>
          <a
            href={sourceUrl("src-tauri/src/commands/app.rs")}
            rel="noreferrer"
            target="_blank"
          >
            commands/app.rs
          </a>{" "}
          — application information.
        </li>
        <li>
          <a
            href={sourceUrl("src-tauri/src/commands/host.rs")}
            rel="noreferrer"
            target="_blank"
          >
            commands/host.rs
          </a>{" "}
          — host diagnostics command.
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
            href={sourceUrl("src-tauri/tauri.conf.json")}
            rel="noreferrer"
            target="_blank"
          >
            tauri.conf.json
          </a>{" "}
          — window, CSP, and frontend distribution.
        </li>
      </ul>

      <p>
        Continue with <Link href="/docs/architecture/virtualization">Virtualization integration</Link>.
      </p>
    </DocPage>
  );
}
