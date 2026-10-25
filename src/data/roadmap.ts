import { sourceUrl } from "@/config";
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
  title: "Milestone 1A is complete.",
  status: "complete" as Status,
  summary:
    "The desktop foundation and host-readiness checks are implemented. The next milestone is VM definitions and disk lifecycle.",
  nextTitle: "Next: VM definitions and disk lifecycle",
  nextStatus: "planned" as Status,
  note:
    "No VM creation, disk management, QMP lifecycle, networking, or graphical console code is present in the inspected repository. This page does not estimate dates or completion.",
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
      "Milestone 1A provides a Tauri 2 window, a static vanilla frontend, schema-v1 local configuration, atomic writes, and restrictive Unix permissions.",
    details: [
      "Tauri 2 application shell and Rust command boundary.",
      "Vanilla HTML, CSS, and JavaScript frontend served by Tauri.",
      "Versioned config.json in the platform application data directory.",
      "Atomic configuration writes with 0700 directories and 0600 files on Unix.",
      "A reserved vms/ directory for future VM definitions.",
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
    dependencies: ["Desktop foundation", "Optional QEMU installation", "Optional usable /dev/kvm"],
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
    status: "planned",
    next: true,
    summary:
      "This is the next milestone. No VM definition model, creation interface, disk creation code, or VM persistence exists today.",
    details: [
      "Define a versioned VM schema with validation and migration support.",
      "Persist VM definitions without overwriting existing user data.",
      "Create virtual disks through qemu-img with explicit formats.",
      "Validate paths and refuse to overwrite existing disk images.",
      "Add a machine creation and editing interface only when the backend supports it.",
    ],
    dependencies: [
      "Schema-v1 configuration store",
      "qemu-img discovery and probing",
      "Clear storage layout under the application data directory",
    ],
    evidence: [
      { label: "Desktop README limitations", href: readme },
      {
        label: "config/store.rs reserved vms/ directory",
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
    status: "planned",
    summary:
      "No QEMU argument construction, process supervision, QMP client, or lifecycle command exists in the current build.",
    details: [
      "Construct QEMU arguments through typed vectors, never shell command strings.",
      "Supervise the QEMU process and verify runtime state instead of assuming success.",
      "Connect to QMP for start, stop, reset, and status operations.",
      "Handle timeouts, failed launches, stale runtime resources, and unexpected exits.",
      "Bind QMP to a local interface and avoid exposing unauthenticated control.",
    ],
    dependencies: ["VM definitions and disks", "QEMU system emulator discovery", "A safe local QMP transport"],
    evidence: [{ label: "Desktop README limitations", href: readme }],
  },
  {
    id: "graphical-console",
    number: "05",
    title: "Graphical console",
    area: "Interactive guest display",
    purpose:
      "Provide a genuine interactive graphical console for the running guest.",
    status: "planned",
    summary:
      "No VNC or noVNC integration and no console interface exist. Static screenshots and simulated terminals are explicitly not acceptable substitutes.",
    details: [
      "Complete a QEMU VNC and noVNC integration spike before building the console interface.",
      "Bind the console service to a local interface only.",
      "Use session authentication and never store console passwords as persistent VM configuration.",
      "Verify keyboard, pointer, focus, and reconnect behavior in the actual application.",
    ],
    dependencies: ["Working QEMU lifecycle", "Local VNC transport", "noVNC integration"],
    evidence: [
      { label: "Desktop README limitations", href: readme },
      { label: "Desktop AGENTS.md requirements", href: sourceUrl("AGENTS.md") },
    ],
  },
  {
    id: "media-networking",
    number: "06",
    title: "Local installation media and networking",
    area: "Installation and connectivity",
    purpose:
      "Make operating system installation and guest connectivity practical without weakening local control.",
    status: "planned",
    summary:
      "No local ISO selection, checksum verification, or network configuration exists today.",
    details: [
      "Select local ISO images and validate paths.",
      "Verify selected images when reliable checksum or signature data is available.",
      "Detect networking capabilities and configure local VM networking.",
      "Avoid arbitrary QEMU arguments and unauthenticated network control interfaces.",
    ],
    dependencies: ["VM definitions and disks", "QEMU lifecycle", "Documented host network capabilities"],
    evidence: [{ label: "Desktop README limitations", href: readme }],
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
      "Linux is the only environment exercised here. macOS and Windows behavior is unverified, and no installer or packaged release exists.",
    details: [
      "Compile and verify host behavior on macOS and Windows.",
      "Verify acceleration detection separately from device presence.",
      "Produce platform-appropriate packages and application icons.",
      "Document supported and unsupported environments explicitly.",
      "Keep platform-specific implementations behind clear interfaces.",
    ],
    dependencies: ["Working lifecycle and console", "Access to each target host for verification"],
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
      "No release artifacts, checksums, or selected license exist. The project must not be described as production-ready.",
    details: [
      "Select and add a license before claiming an open-source release.",
      "Complete user and contributor documentation for implemented workflows.",
      "Review accessibility, security, and failure handling.",
      "Prepare release notes, checksums, and support boundaries.",
      "Publish only artifacts that have actually been built and verified.",
    ],
    dependencies: ["Verified cross-platform packages", "Completed core VM lifecycle", "Documentation and security review"],
    evidence: [{ label: "Desktop README license note", href: readme }],
  },
];

export const crossCuttingItems: CrossCuttingItem[] = [
  {
    id: "security-foundations",
    title: "Security foundations",
    status: "complete",
    description:
      "The current build uses a restrictive Content Security Policy, minimal Tauri capabilities, no privileged helper, and restrictive local configuration permissions.",
    evidence: [
      {
        label: "capabilities/default.json",
        href: sourceUrl("src-tauri/capabilities/default.json"),
      },
      {
        label: "tauri.conf.json",
        href: sourceUrl("src-tauri/tauri.conf.json"),
      },
    ],
  },
  {
    id: "documentation",
    title: "Documentation and contributor onboarding",
    status: "in-progress",
    description:
      "The desktop README and this documentation site now describe the implemented foundation and its limits. A CONTRIBUTING.md and a selected license do not exist yet.",
    evidence: [
      { label: "Desktop README", href: readme },
      { label: "Website repository", href: "https://github.com/somemorewater/wave-vm-website" },
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility review",
    status: "planned",
    description:
      "Visible focus states, keyboard-accessible controls, and reduced-motion handling exist, but no formal accessibility audit has been completed.",
    evidence: [{ label: "Desktop styles", href: sourceUrl("src/styles.css") }],
  },
  {
    id: "lifecycle-reliability",
    title: "Lifecycle reliability and recovery",
    status: "planned",
    description:
      "Atomic configuration writes and probe timeouts exist. Process supervision, runtime recovery, and cleanup of stale VM resources remain unimplemented.",
    evidence: [
      { label: "Desktop README limitations", href: readme },
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
];
