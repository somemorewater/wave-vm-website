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
        authoritative for host detection, VM validation, persistence, disk creation, and
        process lifecycle.
      </p>

      <h2>Tauri shell</h2>
      <p>
        The main window is defined in <code>src-tauri/tauri.conf.json</code>. Tauri serves
        the static files in <code>src/</code> as the frontend distribution and enables the
        global Tauri bridge. The window has a minimum size and is resizable.
      </p>

      <h2>Command surface</h2>
      <p>The current invoke handler registers seven commands:</p>
      <ul>
        <li>
          <code>get_app_info</code> — returns the application name, version, data
          directory, configuration path, vms directory, schema version, and timestamps.
        </li>
        <li>
          <code>detect_host</code> — runs host diagnostics on a blocking worker thread and
          returns the structured host result.
        </li>
        <li>
          <code>list_vms</code> — returns saved machine summaries and reconciles runtime
          state.
        </li>
        <li>
          <code>create_vm</code> — validates input, creates a QCOW2 disk, and persists a
          machine definition.
        </li>
        <li>
          <code>start_vm</code> — launches QEMU and records the running state after QMP
          confirms it.
        </li>
        <li>
          <code>stop_vm</code> — stops QEMU through QMP with termination fallbacks.
        </li>
        <li>
          <code>get_vm_console</code> — returns the loopback WebSocket URL and per-run
          password for a running machine.
        </li>
      </ul>
      <p>
        The frontend calls these through <code>window.__TAURI__.core.invoke</code> from{" "}
        <code>src/services/tauri.js</code> and the service wrappers. There is no
        arbitrary filesystem command, arbitrary QEMU argument command, media command, or
        networking command.
      </p>

      <h2>Frontend boundary</h2>
      <p>
        The frontend is static and has no bundler. It renders loading, error, machine, and
        console states and calls the backend through the registered commands. It does not
        read files or start processes directly. Host and machine data are rendered as
        structured values rather than trusted HTML.
      </p>

      <h2>Capabilities and CSP</h2>
      <p>
        The capability set is minimal and scoped to the main window. The Content Security
        Policy restricts scripts, styles, images, fonts, and connections to local
        application resources, the Tauri IPC endpoint, and loopback WebSocket connections
        for the console. Remote web content is not loaded into a privileged window.
      </p>

      <DocNote title="The command surface is still narrow" tone="info">
        The current commands cover the implemented lifecycle. Media, networking, machine
        editing, reset, and snapshot operations do not have commands. The surface will
        need to grow carefully as those features are implemented.
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
            href={sourceUrl("src-tauri/src/commands/vm.rs")}
            rel="noreferrer"
            target="_blank"
          >
            commands/vm.rs
          </a>{" "}
          — VM creation, lifecycle, and console commands.
        </li>
        <li>
          <a href={sourceUrl("src/app.js")} rel="noreferrer" target="_blank">
            src/app.js
          </a>{" "}
          — frontend bootstrap and routing.
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
