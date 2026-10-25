import { sourceUrl, websiteRepoUrl } from "@/config";
import type { Status } from "./status";

export interface EvidenceLink {
  label: string;
  href?: string;
}

export interface RoadmapPhase {
  id: string;
  number: string;
  title: string;
  area: string;
  purpose: string;
  status: Status;
  summary: string;
  details: string[];
  dependencies: string[];
  evidence: EvidenceLink[];
  next?: boolean;
}

export interface CrossCuttingItem {
  id: string;
  title: string;
  status: Status;
  description: string;
  evidence: EvidenceLink[];
}

export interface ConsiderationItem {
  id: string;
  title: string;
  description: string;
}

const readme = sourceUrl("README.md");

export const currentStage = {
  kicker: "Current position",
  title: "Milestone 2 is implemented.",
  status: "complete" as Status,
  summary:
    "The first real VM lifecycle is implemented: persisted definitions, QCOW2 disks, QEMU start and stop, QMP control, and a loopback noVNC console. Guest installation, networking, and machine management remain ahead.",
  nextTitle: "Next: guest installation media and networking",
  nextStatus: "planned" as Status,
  note:
    "The console displays the actual guest framebuffer, but this build cannot install a guest operating system. No dates or completion estimates are implied.",
};

export const roadmapLegend: { status: Status; description: string }[] = [
  { status: "complete", description: "Implemented in the inspected repository." },
  {
    status: "in-progress",
    description: "Partially implemented; the missing work is stated explicitly.",
  },
  { status: "planned", description: "Not implemented. A development target." },
  {
    status: "consideration",
    description: "An idea under discussion, not an approved commitment.",
  },
];

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: "desktop-foundation",
    number: "01",
    title: "Desktop foundation",
    area: "Application shell and persistence",
    purpose:
      "Establish a real desktop application with a trustworthy shell, local configuration, and a clear frontend boundary.",
    status: "complete",
    summary:
      "The foundation milestone provides a Tauri 2 window, a persistent vanilla frontend, versioned local configuration, atomic writes, and restrictive Unix permissions. The configuration schema is now version 2.",
    details: [
      "Tauri 2 application shell and Rust command boundary.",
      "Vanilla HTML, CSS, and JavaScript frontend served by Tauri.",
      "Persistent multi-page workspace with hash-based navigation.",
      "Versioned config.json in the platform application data directory.",
      "Atomic configuration writes with 0700 directories and 0600 files on Unix.",
    ],
    dependencies: ["Rust stable", "Node.js and npm for the Tauri CLI", "Tauri 2 host prerequisites"],
    evidence: [
      { label: "Desktop README", href: readme },
      { label: "src-tauri/src/lib.rs", href: sourceUrl("src-tauri/src/lib.rs") },
      {
        label: "src-tauri/src/config/store.rs",
        href: sourceUrl("src-tauri/src/config/store.rs"),
      },
      {
        label: "src-tauri/tauri.conf.json",
        href: sourceUrl("src-tauri/tauri.conf.json"),
      },
    ],
  },
  {
    id: "host-readiness",
    number: "02",
    title: "Host readiness and engine discovery",
    area: "Capability detection",
    purpose:
      "Detect what the host can actually do before attempting any virtual machine operation.",
    status: "complete",
    summary:
      "Host diagnostics, QEMU and qemu-img discovery, version probing, and Linux KVM verification are implemented. Windows and macOS host behavior has not been verified.",
    details: [
      "Operating system, architecture, logical CPU count, memory, and application-data free space.",
      "QEMU and qemu-img discovery through bundled resources, PATH, and standard platform locations.",
      "Version probing with a five-second timeout and explicit failure reporting.",
      "Linux KVM verification by opening /dev/kvm and issuing KVM_GET_API_VERSION.",
      "Readiness warnings when QEMU, qemu-img, or KVM is unavailable.",
    ],
    dependencies: ["Desktop foundation", "QEMU installation for VM operations", "Optional usable /dev/kvm"],
    evidence: [
      { label: "host/mod.rs", href: sourceUrl("src-tauri/src/host/mod.rs") },
      {
        label: "host/diagnostics.rs",
        href: sourceUrl("src-tauri/src/host/diagnostics.rs"),
      },
      { label: "host/kvm.rs", href: sourceUrl("src-tauri/src/host/kvm.rs") },
      {
        label: "qemu/discovery.rs",
        href: sourceUrl("src-tauri/src/qemu/discovery.rs"),
      },
      { label: "qemu/probe.rs", href: sourceUrl("src-tauri/src/qemu/probe.rs") },
    ],
  },
  {
    id: "vm-definitions",
    number: "03",
    title: "VM definitions and disk lifecycle",
    area: "Machine configuration and storage",
    purpose:
      "Turn a virtual machine into a validated local definition with explicit, protected storage.",
    status: "complete",
    summary:
      "Machine definitions are created with validated names, resources, and an x86_64 guest architecture. Each machine receives a thin-provisioned QCOW2 disk that is never overwritten.",
    details: [
      "Schema-v2 configuration stores VM definitions with lifecycle state.",
      "Validation covers name, guest architecture, memory, virtual CPUs, disk size, host memory, host CPUs, and free space.",
      "The lifecycle currently requires a Linux x86_64 host and supports x86_64 guests only.",
      "qemu-img creates a QCOW2 disk in vms/<machine-id>/disk.qcow2.",
      "Existing disk files are never overwritten; Unix disks are restricted to 0600.",
    ],
    dependencies: [
      "Versioned configuration store",
      "qemu-img discovery and probing",
      "Clear storage layout under the application data directory",
    ],
    evidence: [
      { label: "commands/vm.rs", href: sourceUrl("src-tauri/src/commands/vm.rs") },
      { label: "vm/mod.rs", href: sourceUrl("src-tauri/src/vm/mod.rs") },
      { label: "vm/validate.rs", href: sourceUrl("src-tauri/src/vm/validate.rs") },
      { label: "vm/disk.rs", href: sourceUrl("src-tauri/src/vm/disk.rs") },
      {
        label: "config/store.rs",
        href: sourceUrl("src-tauri/src/config/store.rs"),
      },
    ],
  },
  {
    id: "qemu-lifecycle",
    number: "04",
    title: "QEMU launch and QMP lifecycle",
    area: "Process control",
    purpose:
      "Start and supervise QEMU safely, then control supported lifecycle operations through QMP.",
    status: "complete",
    summary:
      "QEMU is launched with the configured resources. KVM is used when verified usable, with a TCG fallback. Start and stop use a private QMP Unix socket and bounded process-termination fallbacks.",
    details: [
      "QEMU arguments are constructed through typed vectors, never shell command strings.",
      "The QEMU process is tracked, duplicate launches are blocked, and unexpected exits are detected through polling.",
      "QMP performs the handshake, queries runtime status, requests system_powerdown, and falls back to quit.",
      "Stop falls back to SIGTERM and then a forced kill if QEMU does not exit within bounded timeouts.",
      "Persisted states left in starting, running, or stopping are reconciled when the application starts.",
    ],
    dependencies: ["VM definitions and disks", "QEMU system emulator discovery", "A private local QMP transport"],
    evidence: [
      {
        label: "vm/runtime.rs",
        href: sourceUrl("src-tauri/src/vm/runtime.rs"),
      },
      { label: "qmp.rs", href: sourceUrl("src-tauri/src/qmp.rs") },
      { label: "commands/vm.rs", href: sourceUrl("src-tauri/src/commands/vm.rs") },
      { label: "state.rs", href: sourceUrl("src-tauri/src/state.rs") },
    ],
  },
  {
    id: "graphical-console",
    number: "05",
    title: "Graphical console",
    area: "Interactive guest display",
    purpose:
      "Provide a genuine interactive graphical console for the running guest.",
    status: "complete",
    summary:
      "A running machine can be opened in an interactive console backed by QEMU WebSocket VNC and bundled noVNC 1.7.0. The listener is loopback-only and protected by a per-run password.",
    details: [
      "QEMU VNC is bound to 127.0.0.1 and the WebSocket port is discovered through QMP.",
      "The console password is generated for each run and kept in memory only.",
      "Keyboard and mouse input are sent to the guest; the viewport scales to the console surface.",
      "The console is available only while the machine is running and requires QEMU WebSocket VNC support.",
      "The current build cannot install a guest operating system, so the display may show only firmware or a no-bootable-device message.",
    ],
    dependencies: ["Working QEMU lifecycle", "QEMU WebSocket VNC support", "Bundled noVNC client"],
    evidence: [
      {
        label: "vm/runtime.rs",
        href: sourceUrl("src-tauri/src/vm/runtime.rs"),
      },
      {
        label: "vm-console-page.js",
        href: sourceUrl("src/pages/virtual-machines/vm-console-page.js"),
      },
      {
        label: "bundled noVNC",
        href: sourceUrl("src/vendor/novnc/README.md"),
      },
      {
        label: "tauri.conf.json",
        href: sourceUrl("src-tauri/tauri.conf.json"),
      },
    ],
  },
  {
    id: "media-networking",
    number: "06",
    title: "Guest installation media and networking",
    area: "Installation and connectivity",
    purpose:
      "Make operating system installation and guest connectivity practical without weakening local control.",
    status: "planned",
    next: true,
    summary:
      "This is the next planned milestone. No ISO selection, media attachment, guest OS installation, image download, or network configuration exists. QEMU currently starts with no guest network device.",
    details: [
      "Select local ISO images and validate paths.",
      "Verify selected images when reliable checksum or signature data is available.",
      "Attach installation media to a machine and support a guest OS installation workflow.",
      "Detect networking capabilities and configure local VM networking.",
      "Avoid arbitrary QEMU arguments and unauthenticated network control interfaces.",
    ],
    dependencies: ["Working VM lifecycle", "QCOW2 disk creation", "Documented host network capabilities"],
    evidence: [
      { label: "Desktop README limitations", href: readme },
      {
        label: "vm/runtime.rs (no guest NIC)",
        href: sourceUrl("src-tauri/src/vm/runtime.rs"),
      },
      {
        label: "Installation media page",
        href: sourceUrl("src/pages/installation-media/media-page.js"),
      },
    ],
  },
  {
    id: "cross-platform",
    number: "07",
    title: "Cross-platform validation and packaging",
    area: "Platform support",
    purpose:
      "Verify supported host platforms and produce installable builds without overstating support.",
    status: "planned",
    summary:
      "Linux x86_64 is the only environment exercised here. macOS and Windows behavior is unverified, and no installer or packaged release exists.",
    details: [
      "Compile and verify host behavior on macOS and Windows.",
      "Verify acceleration detection separately from device presence.",
      "Produce platform-appropriate packages and application icons.",
      "Document supported and unsupported environments explicitly.",
      "Keep platform-specific implementations behind clear interfaces.",
    ],
    dependencies: ["Verified lifecycle and console", "Access to each target host for verification"],
    evidence: [
      { label: "Desktop README limitations", href: readme },
      {
        label: "Tauri bundle configuration",
        href: sourceUrl("src-tauri/tauri.conf.json"),
      },
    ],
  },
  {
    id: "release-readiness",
    number: "08",
    title: "Release preparation",
    area: "Trust, documentation, and distribution",
    purpose:
      "Make a release trustworthy, understandable, and maintainable for users and contributors.",
    status: "planned",
    summary:
      "No release artifacts or checksums exist. The project must not be described as production-ready.",
    details: [
      "Keep the MIT License and third-party notices accurate as dependencies and assets change.",
      "Complete user and contributor documentation for implemented workflows.",
      "Review accessibility, security, and failure handling.",
      "Prepare release notes, checksums, and support boundaries.",
      "Publish only artifacts that have actually been built and verified.",
    ],
    dependencies: ["Verified cross-platform packages", "Completed guest installation and management workflows", "Documentation and security review"],
    evidence: [
      { label: "Desktop LICENSE", href: sourceUrl("LICENSE") },
      { label: "Website LICENSE", href: `${websiteRepoUrl}/blob/main/LICENSE` },
    ],
  },
];

export const crossCuttingItems: CrossCuttingItem[] = [
  {
    id: "security-foundations",
    title: "Security foundations",
    status: "complete",
    description:
      "The current build uses a restrictive Content Security Policy, minimal Tauri capabilities, a private QMP Unix socket, a loopback-only console listener with a per-run password, no guest network device, and restrictive local file permissions.",
    evidence: [
      {
        label: "capabilities/default.json",
        href: sourceUrl("src-tauri/capabilities/default.json"),
      },
      {
        label: "tauri.conf.json",
        href: sourceUrl("src-tauri/tauri.conf.json"),
      },
      {
        label: "vm/runtime.rs",
        href: sourceUrl("src-tauri/src/vm/runtime.rs"),
      },
      {
        label: "config/store.rs",
        href: sourceUrl("src-tauri/src/config/store.rs"),
      },
    ],
  },
  {
    id: "documentation",
    title: "Documentation and contributor onboarding",
    status: "in-progress",
    description:
      "The desktop README and this documentation site describe the implemented lifecycle and its limits. The MIT License is included; a CONTRIBUTING.md does not exist yet.",
    evidence: [
      { label: "Desktop README", href: readme },
      { label: "Website repository", href: websiteRepoUrl },
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility review",
    status: "planned",
    description:
      "Visible focus states, keyboard-accessible controls, and reduced-motion handling exist, but no formal accessibility audit has been completed.",
    evidence: [
      {
        label: "Desktop global styles",
        href: sourceUrl("src/styles/global.css"),
      },
    ],
  },
  {
    id: "lifecycle-reliability",
    title: "Lifecycle reliability and recovery",
    status: "in-progress",
    description:
      "Process tracking, bounded stop fallbacks, stale-state reconciliation, and QEMU log capture exist. Cleanup after a force-killed desktop process and recovery of orphaned QEMU processes are not guaranteed.",
    evidence: [
      {
        label: "vm/runtime.rs",
        href: sourceUrl("src-tauri/src/vm/runtime.rs"),
      },
      { label: "state.rs", href: sourceUrl("src-tauri/src/state.rs") },
      { label: "error.rs", href: sourceUrl("src-tauri/src/error.rs") },
    ],
  },
];

export const considerationItems: ConsiderationItem[] = [
  {
    id: "bundled-qemu",
    title: "Bundled QEMU distribution",
    description:
      "Could remove the external QEMU prerequisite, but adds size, licensing, update, and platform-packaging responsibilities.",
  },
  {
    id: "managed-image-catalogue",
    title: "Managed image catalogue and downloads",
    description:
      "Would require trusted sources, verification data, download management, and ongoing maintenance. No catalogue or download service exists today.",
  },
  {
    id: "android-host",
    title: "Android host support",
    description:
      "Mentioned as a possible long-term direction in project guidance. No implementation, approval, or schedule exists.",
  },
  {
    id: "additional-accelerators",
    title: "Additional accelerator backends",
    description:
      "Investigate Windows WHPX and macOS HVF detection. Neither is implemented or verified, and no support is claimed.",
  },
  {
    id: "usb-passthrough",
    title: "USB passthrough",
    description:
      "Passing host USB devices into a guest is not implemented. It would need explicit device selection, permission handling, and security review.",
  },
];
