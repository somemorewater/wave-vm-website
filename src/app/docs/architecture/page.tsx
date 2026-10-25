import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "The current Wave VM architecture: Tauri shell, Rust backend modules, static frontend, QEMU discovery, and local persistence.",
};

export default function ArchitecturePage() {
  return (
    <DocPage href="/docs/architecture">
      <p>
        Wave VM is a Tauri 2 desktop application. The Rust backend is authoritative for
        host detection and local persistence. The frontend is static HTML, CSS, and
        JavaScript served by Tauri; it renders structured results and invokes a small set
        of commands.
      </p>

      <h2>Current components</h2>
      <pre>
        <code>{`src/                     Vanilla HTML, CSS, and ES modules
src-tauri/src/
  commands/              Narrow Tauri command handlers
  config/                Versioned configuration and atomic persistence
  host/                  Host diagnostics, memory/storage, KVM probe
  qemu/                  Executable discovery, safe version probing
  error.rs               Shared serialized application errors
  state.rs               Application state initialization`}</code>
      </pre>

      <h3>Backend responsibilities</h3>
      <ul>
        <li>Resolve the application data directory and initialize configuration.</li>
        <li>Collect host diagnostics and report warnings.</li>
        <li>Discover QEMU and qemu-img executables and probe their versions.</li>
        <li>Verify Linux KVM by opening the device and issuing an ioctl.</li>
        <li>Serialize errors into a stable shape for the frontend.</li>
      </ul>

      <h3>Frontend responsibilities</h3>
      <ul>
        <li>Render loading, error, empty, and host-readiness states.</li>
        <li>Invoke the registered commands through Tauri&apos;s command bridge.</li>
        <li>Present warnings and diagnostics without inventing state.</li>
      </ul>

      <DocNote title="This is the current architecture" tone="info">
        There is no VM module, QMP client, disk manager, media manager, networking module,
        or console module yet. The architecture documentation describes what exists, not a
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
          — QEMU discovery, probing, KVM, and the missing lifecycle layer.
        </li>
        <li>
          <Link href="/docs/architecture/storage">Storage and configuration</Link> —
          schema-v1 config, atomic writes, permissions, and the reserved vms/ directory.
        </li>
        <li>
          <Link href="/docs/architecture/security">Security model</Link> — current
          protections and future QMP/VNC requirements.
        </li>
      </ul>
    </DocPage>
  );
}
