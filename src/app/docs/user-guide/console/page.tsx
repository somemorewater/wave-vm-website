import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Graphical console",
  description:
    "Wave VM's running guest display uses QEMU WebSocket VNC and bundled noVNC over a loopback-only, password-protected connection.",
};

export default function ConsolePage() {
  return (
    <DocPage href="/docs/user-guide/console">
      <p>
        The current build includes a genuine interactive guest console. It connects to
        the running QEMU process through QEMU&apos;s WebSocket VNC transport and renders the
        guest framebuffer with the bundled noVNC 1.7.0 client.
      </p>

      <h2>How it works</h2>
      <ul>
        <li>QEMU VNC is bound to <code>127.0.0.1</code>; no public VNC listener is created.</li>
        <li>QEMU is configured with WebSocket VNC enabled and a per-run password.</li>
        <li>The WebSocket port is discovered through QMP after QEMU starts.</li>
        <li>Wave VM generates the console password for each run and keeps it in memory only.</li>
        <li>noVNC connects with that password and enables keyboard and mouse input.</li>
        <li>The console is available only while the machine is running.</li>
      </ul>

      <h2>Using the console</h2>
      <p>
        Open a running machine and choose <strong>Open console</strong>. The console view
        reports connection progress, a security or connection failure, a disconnected
        session, and a stopped machine. Reconnect is available after a clean or unexpected
        disconnect. The viewport scales to the console surface.
      </p>

      <DocNote title="No guest OS is installed by this build" tone="planned">
        The console shows the actual guest framebuffer, but the current build cannot
        install an operating system. A newly created machine may show firmware output or
        a no-bootable-device message. That is not a simulated console failure; there is no
        installed guest to boot yet.
      </DocNote>

      <h2>Requirements and limits</h2>
      <ul>
        <li>The machine must be running and tracked by the current desktop process.</li>
        <li>The installed QEMU must support WebSocket VNC.</li>
        <li>The console is local-only; it is not a remote access feature.</li>
        <li>The password is not stored in the VM configuration.</li>
        <li>Audio, USB redirection, and multi-monitor controls are not implemented.</li>
      </ul>

      <h2>Not implemented</h2>
      <ul>
        <li>Remote console access over a network.</li>
        <li>Persistent console credentials or user-managed console passwords.</li>
        <li>Guest OS installation or installation-media attachment.</li>
        <li>Verified keyboard, pointer, and reconnect behavior across every guest OS.</li>
      </ul>

      <p>
        The console depends on the implemented QEMU lifecycle. See{" "}
        <Link href="/docs/user-guide/lifecycle">Machine lifecycle</Link> and{" "}
        <Link href="/roadmap#graphical-console">the roadmap</Link>.
      </p>
    </DocPage>
  );
}
