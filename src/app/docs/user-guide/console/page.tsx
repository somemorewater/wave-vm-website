import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Graphical console",
  description:
    "Wave VM's running guest display uses QEMU WebSocket VNC and bundled noVNC over a loopback-only, password-protected connection, with fullscreen and pointer capture.",
};

export default function ConsolePage() {
  return (
    <DocPage href="/docs/user-guide/console">
      <p>
        The current build includes a genuine interactive guest console. It connects to
        the running QEMU process through QEMU&apos;s WebSocket VNC transport and renders the
        guest framebuffer with the bundled noVNC 1.7.0 client. With an installer ISO
        attached, the console displays the actual guest installer.
      </p>

      <h2>How it works</h2>
      <ul>
        <li>QEMU VNC is bound to <code>127.0.0.1</code>; no public VNC listener is created.</li>
        <li>QEMU is configured with WebSocket VNC enabled and a per-run password.</li>
        <li>The WebSocket port is discovered through QMP after QEMU starts.</li>
        <li>Wave VM generates the console password for each run and keeps it in memory only.</li>
        <li>noVNC connects with that password and enables keyboard and mouse input.</li>
        <li>The console is available only while the machine is running and tracked by the current desktop process.</li>
      </ul>

      <h2>Using the console</h2>
      <p>
        Open a running machine and choose <strong>Open console</strong>. The console view
        reports connection progress, a security or connection failure, a disconnected
        session, and a stopped machine. Reconnect is available after a clean or unexpected
        disconnect. The viewport scales to the console surface.
      </p>
      <p>
        The console sends input to the guest. Guest keyboard shortcuts and pointer behavior
        depend on the guest operating system and its input drivers. Reconnect and input
        behavior have not been verified across every guest OS.
      </p>

      <h2>Fullscreen</h2>
      <p>
        Press <strong>F11</strong> or use the console&apos;s fullscreen control to toggle
        native window fullscreen. The immersive console view provides on-screen controls
        for fullscreen, mouse capture, and returning to the normal application layout.
        Fullscreen behavior depends on the desktop webview and window manager.
      </p>

      <h2>Mouse capture and pointer lock</h2>
      <p>
        After the guest display connects, start mouse capture from the console controls.
        Wave VM requests Pointer Lock from the webview so pointer movement goes to the
        guest instead of the host cursor. Press <strong>Esc</strong> to release capture and
        return focus to the host.
      </p>
      <ul>
        <li>While capture is active, pointer clicks are routed to the guest, so the on-screen release control may not be clickable. Esc is the reliable release path.</li>
        <li>After release, click the guest display to resume input. With capture released, Esc will reach the guest again.</li>
        <li>If the webview does not offer pointer lock, the control changes to <strong>Focus guest</strong>. Click the display to focus input and use F11 to leave fullscreen.</li>
        <li>Pointer accuracy depends on the guest&apos;s configured pointing device.</li>
      </ul>

      <DocNote title="A new machine may show firmware, not a desktop" tone="info">
        The console shows the actual guest framebuffer, but Wave VM does not bundle an
        operating system or detect installation progress. A new machine without an
        attached ISO or an installed guest may show firmware output or a
        no-bootable-device message. Attach a local ISO and boot the installer, or start a
        machine whose disk already contains an installed guest.
      </DocNote>

      <h2>Requirements and limits</h2>
      <ul>
        <li>The machine must be running and tracked by the current desktop process.</li>
        <li>The installed QEMU must support WebSocket VNC.</li>
        <li>The console is local-only; it is not a remote access feature.</li>
        <li>The password is generated per run and is not stored in the VM configuration.</li>
        <li>Audio, USB redirection, multi-monitor controls, and clipboard integration are not implemented.</li>
        <li>A running QEMU process is not adopted after the desktop application restarts, so its console is not available until the machine is started again.</li>
      </ul>

      <h2>Not implemented</h2>
      <ul>
        <li>Remote console access over a network.</li>
        <li>Persistent console credentials or user-managed console passwords.</li>
        <li>Clipboard, audio, USB redirection, or multi-monitor support.</li>
        <li>Verified keyboard, pointer, and reconnect behavior across every guest OS.</li>
      </ul>

      <p>
        The console depends on the implemented QEMU lifecycle. See{" "}
        <Link href="/docs/user-guide/lifecycle">Machine lifecycle</Link>,{" "}
        <Link href="/docs/user-guide/disks-and-media">Disks and installation media</Link>,
        and <Link href="/roadmap#graphical-console">the roadmap</Link>.
      </p>
    </DocPage>
  );
}
