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
          "A Tauri 2 window with a persistent vanilla HTML, CSS, and JavaScript workspace. Dashboard, virtual machines, storage, installation media, and settings pages share host and machine state.",
        status: "available",
        evidence: [
          { label: "Desktop README", href: readme },
          { label: "src-tauri/src/lib.rs", href: sourceUrl("src-tauri/src/lib.rs") },
          { label: "src/app.js", href: sourceUrl("src/app.js") },
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
          "Searches bundled resources, PATH, and standard platform locations, then probes each executable's version with a five-second timeout.",
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
        id: "vm-definitions",
        title: "Virtual machine definitions",
        description:
          "Creates and persists local machine definitions with a validated name, x86_64 guest architecture, memory, virtual CPU count, and disk size. Definitions are stored in the schema-v2 configuration.",
        status: "available",
        evidence: [
          { label: "commands/vm.rs", href: sourceUrl("src-tauri/src/commands/vm.rs") },
          { label: "vm/mod.rs", href: sourceUrl("src-tauri/src/vm/mod.rs") },
          { label: "vm/validate.rs", href: sourceUrl("src-tauri/src/vm/validate.rs") },
        ],
        limitation:
          "Only x86_64 guests on Linux x86_64 hosts are accepted. Editing and deleting machine definitions are not implemented.",
      },
      {
        id: "disk-creation",
        title: "QCOW2 virtual disks",
        description:
          "Creates a thin-provisioned QCOW2 disk with qemu-img under the machine's application data directory. An existing disk is never overwritten.",
        status: "available",
        evidence: [
          { label: "vm/disk.rs", href: sourceUrl("src-tauri/src/vm/disk.rs") },
          { label: "commands/vm.rs", href: sourceUrl("src-tauri/src/commands/vm.rs") },
        ],
        limitation:
          "Disks are blank. Resizing, deleting, attaching existing disks, and inspecting disk usage are not available.",
      },
      {
        id: "qemu-lifecycle",
        title: "Real QEMU process lifecycle",
        description:
          "Starts QEMU with the configured memory, virtual CPUs, and disk. KVM is used only when its probe succeeds; otherwise QEMU uses software emulation (TCG). Stop uses QMP with bounded process-termination fallbacks.",
        status: "available",
        evidence: [
          {
            label: "vm/runtime.rs",
            href: sourceUrl("src-tauri/src/vm/runtime.rs"),
          },
          { label: "commands/vm.rs", href: sourceUrl("src-tauri/src/commands/vm.rs") },
          { label: "state.rs", href: sourceUrl("src-tauri/src/state.rs") },
        ],
        limitation:
          "Start and stop are the only lifecycle controls. Pause, reset, snapshots, and networking are not implemented.",
      },
      {
        id: "qmp-control",
        title: "QMP runtime control",
        description:
          "Connects to a private QEMU Machine Protocol socket over a Unix domain socket. The client performs the QMP handshake, queries runtime status, requests system powerdown, and falls back to quit.",
        status: "available",
        evidence: [
          { label: "qmp.rs", href: sourceUrl("src-tauri/src/qmp.rs") },
          {
            label: "vm/runtime.rs",
            href: sourceUrl("src-tauri/src/vm/runtime.rs"),
          },
        ],
        limitation:
          "QMP is used only for the implemented start and stop path. It is not a general-purpose runtime control API for users.",
      },
      {
        id: "graphical-console",
        title: "Interactive guest console",
        description:
          "Displays the actual guest framebuffer through QEMU WebSocket VNC and the bundled noVNC 1.7.0 client. The listener is bound to 127.0.0.1, the WebSocket port is discovered through QMP, and a password is generated per run and kept in memory only.",
        status: "available",
        evidence: [
          {
            label: "vm-console-page.js",
            href: sourceUrl("src/pages/virtual-machines/vm-console-page.js"),
          },
          {
            label: "vm/runtime.rs",
            href: sourceUrl("src-tauri/src/vm/runtime.rs"),
          },
          {
            label: "bundled noVNC",
            href: sourceUrl("src/vendor/novnc/README.md"),
          },
        ],
        limitation:
          "The console is available only while the machine is running and requires QEMU WebSocket VNC support. No guest operating system is installed by this build, so the display may show only firmware or a no-bootable-device message.",
      },
      {
        id: "config-store",
        title: "Versioned local configuration",
        description:
          "Writes schema-v2 config.json atomically in the platform application data directory. Schema versions 0 and 1 are migrated to version 2, which stores VM definitions. On Unix, directories use 0700 permissions and the configuration file uses 0600.",
        status: "available",
        evidence: [
          { label: "config/store.rs", href: sourceUrl("src-tauri/src/config/store.rs") },
        ],
      },
      {
        id: "local-only",
        title: "Local-only control boundary",
        description:
          "No account, cloud service, or guest network device is part of the current build. QMP uses a private Unix socket, the console binds to loopback, and the Content Security Policy permits WebSocket connections only to 127.0.0.1.",
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
          {
            label: "vm/runtime.rs",
            href: sourceUrl("src-tauri/src/vm/runtime.rs"),
          },
        ],
        limitation:
          "Linux x86_64 is the only exercised host. Windows and macOS behavior is unverified.",
      },
    ],
  },
  {
    status: "in-development",
    title: "In development",
    description:
      "Partially implemented work. Each card states what exists and what is still missing.",
    items: [
      {
        id: "machine-management",
        title: "Machine management",
        description:
          "Creating a machine and starting or stopping it are implemented. The interface shows saved definitions, disk presence, acceleration, lifecycle state, and backend errors.",
        status: "in-development",
        evidence: [
          {
            label: "virtual-machines-page.js",
            href: sourceUrl("src/pages/virtual-machines/virtual-machines-page.js"),
          },
          {
            label: "vm-details-page.js",
            href: sourceUrl("src/pages/virtual-machines/vm-details-page.js"),
          },
        ],
        limitation:
          "There is no interface for editing configuration, deleting a machine, resetting it, or taking snapshots. Existing disks and machine directories are preserved.",
      },
      {
        id: "failure-reporting",
        title: "Diagnostics and failure reporting",
        description:
          "Host warnings, typed application errors, QEMU log capture, probe timeouts, duplicate-launch prevention, and stale persisted state reconciliation exist.",
        status: "in-development",
        evidence: [
          { label: "host/mod.rs", href: sourceUrl("src-tauri/src/host/mod.rs") },
          { label: "error.rs", href: sourceUrl("src-tauri/src/error.rs") },
          {
            label: "vm/runtime.rs",
            href: sourceUrl("src-tauri/src/vm/runtime.rs"),
          },
          { label: "state.rs", href: sourceUrl("src-tauri/src/state.rs") },
        ],
        limitation:
          "If the desktop process is force-killed, cleanup guarantees do not apply to an already running QEMU child process. Lifecycle recovery remains incomplete.",
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
        id: "installation-media",
        title: "Installation media and guest installation",
        description:
          "Select local ISO images, verify them when reliable checksum or signature data is available, attach them to a machine, and support a guest operating system installation workflow.",
        status: "planned",
        evidence: [{ label: "Desktop README limitations", href: readme }],
        limitation:
          "No ISO selection, media catalogue, attachment, download, or guest OS installation exists. The current disk is blank.",
      },
      {
        id: "networking",
        title: "Networking",
        description:
          "Network capability detection and local VM network configuration without exposing unauthenticated control interfaces.",
        status: "planned",
        evidence: [{ label: "Desktop README limitations", href: readme }],
        limitation:
          "QEMU is currently launched with no guest network device. No networking configuration exists.",
      },
      {
        id: "reset-snapshots",
        title: "Reset, pause, and snapshots",
        description:
          "Additional lifecycle operations through QMP, including reset, pause or resume, and snapshot management where the QEMU configuration supports them.",
        status: "planned",
        evidence: [{ label: "Desktop README limitations", href: readme }],
        limitation: "Only start and stop are implemented.",
      },
      {
        id: "machine-editing",
        title: "Editing and deleting machines",
        description:
          "Change machine configuration and remove a machine definition, with a clear distinction between deleting the definition and deleting its disk files.",
        status: "planned",
        evidence: [{ label: "Desktop README limitations", href: readme }],
        limitation:
          "No edit or delete workflow exists. Wave VM never removes VM disks automatically.",
      },
      {
        id: "cross-platform",
        title: "Cross-platform validation and packaging",
        description:
          "Verify host behavior on macOS and Windows and produce installable platform packages.",
        status: "planned",
        evidence: [{ label: "Desktop README limitations", href: readme }],
        limitation:
          "Linux x86_64 is the only exercised environment. macOS and Windows behavior is unverified, and no installer or packaged release exists.",
      },
      {
        id: "release-artifacts",
        title: "Release preparation",
        description:
          "Produce verified release artifacts, checksums, release notes, and support boundaries for an installable build.",
        status: "planned",
        evidence: [{ label: "Desktop README limitations", href: readme }],
        limitation:
          "There is no installer, tagged release, checksum, or public download.",
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
      {
        id: "usb-passthrough",
        title: "USB passthrough",
        description:
          "Passing host USB devices into a guest is not implemented. It would need explicit device selection, permission handling, and security review.",
        status: "consideration",
        evidence: [{ label: "Desktop README limitations", href: readme }],
      },
    ],
  },
];

export const featureItems = featureGroups.flatMap((group) => group.items);
