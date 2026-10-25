import { sourceUrl } from "@/config";
import type { Status } from "./status";

export interface EvidenceLink {
  label: string;
  href?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  status: Status;
  evidence: EvidenceLink[];
  limitation?: string;
}

export interface FeatureGroup {
  status: Status;
  title: string;
  description: string;
  items: FeatureItem[];
}

const readme = sourceUrl("README.md");

export const featureGroups: FeatureGroup[] = [
  {
    status: "available",
    title: "Available now",
    description:
      "These capabilities exist in the current desktop build and are exercised by the Rust backend, the frontend, or both.",
    items: [
      {
        id: "desktop-shell",
        title: "Desktop application shell",
        description:
          "A Tauri 2 window with a static vanilla HTML, CSS, and JavaScript interface. The Rust backend owns host detection and local persistence.",
        status: "available",
        evidence: [
          { label: "Desktop README", href: readme },
          { label: "src-tauri/src/lib.rs", href: sourceUrl("src-tauri/src/lib.rs") },
          { label: "src/index.html", href: sourceUrl("src/index.html") },
        ],
      },
      {
        id: "host-diagnostics",
        title: "Host capability diagnostics",
        description:
          "Reports the host operating system, architecture, logical CPU count, memory, and free space on the application data filesystem.",
        status: "available",
        evidence: [
          { label: "host/mod.rs", href: sourceUrl("src-tauri/src/host/mod.rs") },
          {
            label: "host/diagnostics.rs",
            href: sourceUrl("src-tauri/src/host/diagnostics.rs"),
          },
        ],
      },
      {
        id: "qemu-discovery",
        title: "QEMU and qemu-img discovery",
        description:
          "Searches bundled resources, PATH, and standard platform locations, then probes the executable version with a five-second timeout.",
        status: "available",
        evidence: [
          {
            label: "qemu/discovery.rs",
            href: sourceUrl("src-tauri/src/qemu/discovery.rs"),
          },
          { label: "qemu/probe.rs", href: sourceUrl("src-tauri/src/qemu/probe.rs") },
        ],
      },
      {
        id: "kvm-probe",
        title: "Linux KVM verification",
        description:
          "Opens /dev/kvm and issues KVM_GET_API_VERSION. The presence of the device alone is not treated as proof that acceleration is usable.",
        status: "available",
        evidence: [{ label: "host/kvm.rs", href: sourceUrl("src-tauri/src/host/kvm.rs") }],
        limitation:
          "Linux only. Windows and macOS acceleration detection is not implemented or verified.",
      },
      {
        id: "config-store",
        title: "Versioned local configuration",
        description:
          "Writes a schema-v1 config.json atomically in the platform application data directory. On Unix, directories are created with 0700 permissions and the config file with 0600.",
        status: "available",
        evidence: [
          { label: "config/store.rs", href: sourceUrl("src-tauri/src/config/store.rs") },
        ],
      },
      {
        id: "local-only",
        title: "Local-only foundation",
        description:
          "No account, cloud service, or network control service is part of the current build. The Tauri capability set is minimal and the Content Security Policy is restrictive.",
        status: "available",
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
    ],
  },
  {
    status: "in-development",
    title: "In development",
    description:
      "Partially implemented work. Each card states what exists and what is still missing; none of these are complete VM workflows.",
    items: [
      {
        id: "engine-integration",
        title: "Virtualization engine integration",
        description:
          "QEMU and qemu-img discovery and version probing exist. Argument construction, process launch, QMP, and lifecycle control do not.",
        status: "in-development",
        evidence: [
          {
            label: "qemu/discovery.rs",
            href: sourceUrl("src-tauri/src/qemu/discovery.rs"),
          },
          { label: "qemu/probe.rs", href: sourceUrl("src-tauri/src/qemu/probe.rs") },
        ],
        limitation:
          "Discovery is not a working VM lifecycle. No VM can be started from this build.",
      },
      {
        id: "failure-reporting",
        title: "Diagnostics and failure reporting",
        description:
          "Host warnings, typed application errors, atomic configuration writes, and probe timeouts exist. Lifecycle recovery and process supervision remain unimplemented.",
        status: "in-development",
        evidence: [
          { label: "host/mod.rs", href: sourceUrl("src-tauri/src/host/mod.rs") },
          { label: "error.rs", href: sourceUrl("src-tauri/src/error.rs") },
          { label: "qemu/probe.rs", href: sourceUrl("src-tauri/src/qemu/probe.rs") },
        ],
        limitation:
          "This is foundation-level error handling, not a reliability layer for running virtual machines.",
      },
    ],
  },
  {
    status: "planned",
    title: "Planned",
    description:
      "These are development targets. They are not present in the current desktop build and no dates or completion estimates are implied.",
    items: [
      {
        id: "vm-definitions",
        title: "VM definitions and editing",
        description:
          "A persisted VM schema, input validation, and an interface for creating and editing machine definitions.",
        status: "planned",
        evidence: [{ label: "Desktop README limitations", href: readme }],
        limitation:
          "No VM definition model, VM command handlers, or creation interface exists. The vms/ directory is only reserved.",
      },
      {
        id: "virtual-disks",
        title: "Virtual disk management",
        description:
          "Create and manage explicit virtual disks through qemu-img, with format validation and protection against overwriting existing images.",
        status: "planned",
        evidence: [{ label: "Desktop README limitations", href: readme }],
        limitation: "Only qemu-img discovery exists. No disk is created by the current build.",
      },
      {
        id: "installation-media",
        title: "Installation media",
        description:
          "Select local ISO images and verify them when reliable checksum or signature data is available.",
        status: "planned",
        evidence: [{ label: "Desktop README limitations", href: readme }],
        limitation:
          "No ISO selection or verification implementation exists. Managed image downloads are under consideration, not part of this milestone.",
      },
      {
        id: "machine-lifecycle",
        title: "Machine lifecycle",
        description:
          "Start, stop, reset, and inspect QEMU processes through QMP, with explicit timeouts and cleanup of stale runtime resources.",
        status: "planned",
        evidence: [{ label: "Desktop README limitations", href: readme }],
        limitation:
          "No QEMU argument construction, process supervision, QMP client, or lifecycle command exists.",
      },
      {
        id: "graphical-console",
        title: "Graphical console",
        description:
          "A genuine interactive QEMU VNC console through noVNC, bound to a local interface and protected with session authentication.",
        status: "planned",
        evidence: [{ label: "Desktop README limitations", href: readme }],
        limitation:
          "No VNC or noVNC integration and no console interface exist. Static screenshots and simulated terminals are not substitutes.",
      },
      {
        id: "networking",
        title: "Networking",
        description:
          "Network capability detection and local VM network configuration without exposing unauthenticated control interfaces.",
        status: "planned",
        evidence: [{ label: "Desktop README limitations", href: readme }],
        limitation: "No networking implementation exists.",
      },
      {
        id: "cross-platform",
        title: "Cross-platform validation and packaging",
        description:
          "Verify host behavior on macOS and Windows and produce installable platform packages.",
        status: "planned",
        evidence: [{ label: "Desktop README limitations", href: readme }],
        limitation:
          "Linux is the only environment exercised here. macOS and Windows behavior is unverified, and no installer or packaged release exists.",
      },
    ],
  },
  {
    status: "consideration",
    title: "Under consideration",
    description:
      "Ideas that may be investigated later. They are not approved features, scheduled milestones, or support commitments.",
    items: [
      {
        id: "bundled-qemu",
        title: "Bundled QEMU distribution",
        description:
          "Would remove the external QEMU prerequisite, but adds application size, licensing, update, and platform-packaging responsibilities.",
        status: "consideration",
        evidence: [],
      },
      {
        id: "managed-image-catalogue",
        title: "Managed image catalogue and downloads",
        description:
          "Would require trusted sources, verification data, download management, and ongoing maintenance. No catalogue or download service exists today.",
        status: "consideration",
        evidence: [],
      },
      {
        id: "android-host",
        title: "Android host support",
        description:
          "Mentioned as a possible long-term direction in the project guidance. No implementation, approval, or schedule exists.",
        status: "consideration",
        evidence: [],
      },
      {
        id: "additional-accelerators",
        title: "Additional accelerator backends",
        description:
          "Investigate Windows WHPX and macOS HVF detection. Neither is implemented or verified, and no support is claimed.",
        status: "consideration",
        evidence: [{ label: "Desktop README limitations", href: readme }],
      },
    ],
  },
];

export const featureItems = featureGroups.flatMap((group) => group.items);
