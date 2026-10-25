import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "The current Wave VM architecture: Tauri shell, Rust backend modules, static frontend, QEMU lifecycle, QMP, and local persistence.",
};

export default function ArchitecturePage() {
  return (
    <DocPage href="/docs/architecture">
      <p>
        Wave VM is a Tauri 2 desktop application. The Rust backend is authoritative for
        host detection, VM validation, persistence, disk creation, and process lifecycle.
        The frontend is static HTML, CSS, and JavaScript served by Tauri; it renders
        structured results and invokes a small set of commands.
      </p>

      <h2>Current components</h2>
      <pre>
        <code>{`src/                     Vanilla HTML, CSS, and ES modules
  app.js                 Bootstrap, router wiring, page lifecycle
  components/            Persistent shell and reusable UI
  pages/                 Dashboard, machines, storage, media, settings
  services/              Tauri command wrappers and preferences
  state/                 Shared host and machine state
  vendor/novnc/          Bundled noVNC client and licenses
src-tauri/src/
  commands/              Narrow Tauri command handlers
  config/                Versioned configuration, migration, atomic persistence
  host/                  Host diagnostics, memory/storage, KVM probe
  qemu/                  Executable discovery, safe version probing
  qmp/                   Minimal QMP client over a local Unix socket
  vm/                    VM models, validation, disk creation, process lifecycle
  error.rs               Shared serialized application errors
  state.rs               Application state and tracked QEMU processes`}</code>
      </pre>

      <h3>Backend responsibilities</h3>
      <ul>
        <li>Resolve the application data directory and initialize configuration.</li>
        <li>Collect host diagnostics and report warnings.</li>
        <li>Discover QEMU and qemu-img executables and probe their versions.</li>
        <li>Verify Linux KVM by opening the device and issuing an ioctl.</li>
        <li>Validate and persist machine definitions.</li>
        <li>Create QCOW2 disks without overwriting existing files.</li>
        <li>Launch, track, and stop QEMU processes, with QMP control and bounded termination fallbacks.</li>
        <li>Configure a loopback VNC WebSocket listener and expose a per-run console session.</li>
        <li>Serialize errors into a stable shape for the frontend.</li>
      </ul>

      <h3>Frontend responsibilities</h3>
      <ul>
        <li>Render loading, error, empty, host-readiness, machine, storage, and console states.</li>
        <li>Invoke the registered commands through Tauri&apos;s command bridge.</li>
        <li>Present lifecycle state and backend errors without inventing state.</li>
        <li>Connect the bundled noVNC client to the loopback console session.</li>
      </ul>

      <DocNote title="This is the current architecture" tone="info">
        There is no media manager, networking module, snapshot layer, or machine editing
        workflow yet. The architecture documentation describes what exists, not a
        completed target design.
      </DocNote>

      <h2>Explore the details</h2>
      <ul>
        <li>
          <Link href="/docs/architecture/application">Application boundaries</Link> — the
          Tauri shell, frontend bridge, commands, and capabilities.
        </li>
        <li>
          <Link href="/docs/architecture/virtualization">Virtualization integration</Link>{" "}
          — QEMU discovery, launch, QMP lifecycle, KVM, and the console transport.
        </li>
        <li>
          <Link href="/docs/architecture/storage">Storage and configuration</Link> —
          schema-v2 config, VM disks, atomic writes, and permissions.
        </li>
        <li>
          <Link href="/docs/architecture/security">Security model</Link> — current
          protections and local-only control boundaries.
        </li>
      </ul>
    </DocPage>
  );
}
