import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";
import { sourceUrl } from "@/config";

export const metadata: Metadata = {
  title: "Virtualization integration",
  description:
    "Wave VM discovers QEMU, verifies Linux KVM, attaches local ISO installation media, launches real QEMU processes, controls them through QMP, and exposes a loopback VNC console.",
};

export default function VirtualizationPage() {
  return (
    <DocPage href="/docs/architecture/virtualization">
      <p>
        Wave VM uses direct QEMU integration rather than making libvirt a mandatory
        dependency. The current virtualization layer covers discovery, disk creation,
        local installation media, process launch, QMP lifecycle control, and the guest
        console.
      </p>

      <h2>What is implemented</h2>
      <ul>
        <li>
          A QEMU system emulator name is selected from the host architecture. Unknown
          architectures produce an unsupported result.
        </li>
        <li>
          QEMU and qemu-img are discovered through bundled resources, PATH, and standard
          platform locations.
        </li>
        <li>
          Each executable is probed directly with a version flag and a five-second
          timeout. The probe does not use a shell command string.
        </li>
        <li>
          On Linux, KVM is verified by opening <code>/dev/kvm</code> and issuing{" "}
          <code>KVM_GET_API_VERSION</code>.
        </li>
        <li>
          QCOW2 disks are created with qemu-img and are never overwritten.
        </li>
        <li>
          A selected local ISO is validated in Rust before storage and is never copied,
          modified, or deleted.
        </li>
        <li>
          Installer boot attaches the ISO as a read-only CD/DVD and boots with order{" "}
          <code>d</code>; disk boot starts the QCOW2 disk with order <code>c</code>.
        </li>
        <li>
          QEMU is launched with typed argument vectors, a q35 machine, a virtio-blk disk,
          a private QMP Unix socket, and no guest network device.
        </li>
        <li>
          KVM is used when verified; otherwise QEMU uses TCG software emulation.
        </li>
        <li>
          Start and stop use QMP with bounded process-termination fallbacks. QEMU runs with{" "}
          <code>-no-reboot</code>, so a guest-requested restart may exit the process.
        </li>
        <li>
          A running machine exposes a loopback-only WebSocket VNC listener for the bundled
          noVNC console.
        </li>
      </ul>

      <h2>What is not implemented</h2>
      <ul>
        <li>Image downloads, a media catalogue, checksum or signature verification, and automatic installation detection.</li>
        <li>Multiple CD/DVD drives or additional driver media.</li>
        <li>Guest networking or USB passthrough.</li>
        <li>Reset, pause, resume, or snapshot operations.</li>
        <li>Machine editing or deletion.</li>
        <li>Windows and macOS host verification.</li>
        <li>Bundled QEMU distribution or release packaging.</li>
      </ul>

      <DocNote title="The lifecycle is real; installation is user-driven" tone="info">
        Wave VM starts a real QEMU process and shows its actual framebuffer. It can boot a
        local ISO installer, but it does not provide a guest operating system or detect
        installation completion. A machine without installation media and without an
        installed guest may boot to firmware output or a no-bootable-device message until
        you attach an ISO and install one.
      </DocNote>

      <h2>Lifecycle boundary</h2>
      <p>
        QEMU arguments are constructed through typed vectors, never shell command strings.
        The process is tracked, duplicate launches are blocked, and persisted runtime
        state is reconciled when the application starts. Installation-media changes are
        rejected while a machine is running. QMP and the console listener are local-only.
        A force-killed desktop process can still leave an orphaned QEMU child; automatic
        recovery from that case is not guaranteed.
      </p>

      <h2>Source references</h2>
      <ul>
        <li>
          <a
            href={sourceUrl("src-tauri/src/qemu/discovery.rs")}
            rel="noreferrer"
            target="_blank"
          >
            qemu/discovery.rs
          </a>{" "}
          — executable discovery.
        </li>
        <li>
          <a
            href={sourceUrl("src-tauri/src/qemu/probe.rs")}
            rel="noreferrer"
            target="_blank"
          >
            qemu/probe.rs
          </a>{" "}
          — version probing.
        </li>
        <li>
          <a href={sourceUrl("src-tauri/src/host/kvm.rs")} rel="noreferrer" target="_blank">
            host/kvm.rs
          </a>{" "}
          — Linux KVM verification.
        </li>
        <li>
          <a
            href={sourceUrl("src-tauri/src/vm/runtime.rs")}
            rel="noreferrer"
            target="_blank"
          >
            vm/runtime.rs
          </a>{" "}
          — QEMU launch, installer attachment, QMP lifecycle, console session, and
          termination.
        </li>
        <li>
          <a href={sourceUrl("src-tauri/src/vm/media.rs")} rel="noreferrer" target="_blank">
            vm/media.rs
          </a>{" "}
          — ISO path validation and availability checks.
        </li>
        <li>
          <a
            href={sourceUrl("src-tauri/src/commands/media.rs")}
            rel="noreferrer"
            target="_blank"
          >
            commands/media.rs
          </a>{" "}
          — media attachment and boot-mode commands.
        </li>
        <li>
          <a href={sourceUrl("src-tauri/src/qmp.rs")} rel="noreferrer" target="_blank">
            qmp.rs
          </a>{" "}
          — QMP client.
        </li>
      </ul>

      <p>
        Read <Link href="/docs/user-guide/lifecycle">Machine lifecycle</Link> for the
        user-facing behavior, or{" "}
        <Link href="/docs/architecture/security">Security model</Link> for the control
        boundary.
      </p>
    </DocPage>
  );
}
