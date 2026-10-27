import type { Status } from "./status";

export interface DocPageEntry {
  title: string;
  href: string;
  description: string;
  status?: Status;
}

export interface DocSection {
  title: string;
  href: string;
  description: string;
  pages: DocPageEntry[];
}

export const docSections: DocSection[] = [
  {
    title: "Getting Started",
    href: "/docs/getting-started",
    description: "What Wave VM is, what the current build can do, and how to run it.",
    pages: [
      {
        title: "Getting Started",
        href: "/docs/getting-started",
        description: "Project status, expectations, and the shortest path into the codebase.",
      },
      {
        title: "Prerequisites",
        href: "/docs/getting-started/prerequisites",
        description: "Required tools, host libraries, and optional QEMU and KVM dependencies.",
      },
      {
        title: "Building from source",
        href: "/docs/getting-started/building",
        description: "Clone, install, run, and build the desktop application.",
      },
      {
        title: "Troubleshooting",
        href: "/docs/getting-started/troubleshooting",
        description: "Common setup failures and what the current diagnostics mean.",
      },
    ],
  },
  {
    title: "User Guide",
    href: "/docs/user-guide",
    description: "The current machine workflow, installation media, lifecycle controls, console, and networking limits.",
    pages: [
      {
        title: "User Guide",
        href: "/docs/user-guide",
        description: "What is usable today and what is not implemented yet.",
      },
      {
        title: "Host capabilities",
        href: "/docs/user-guide/host-capabilities",
        description: "Understand host diagnostics, QEMU discovery, and KVM verification.",
      },
      {
        title: "Virtual machines",
        href: "/docs/user-guide/virtual-machines",
        description: "Create a local machine definition and inspect its configuration.",
        status: "available",
      },
      {
        title: "Disks and installation media",
        href: "/docs/user-guide/disks-and-media",
        description: "QCOW2 disk creation, local ISO attachment, and installer or disk boot.",
        status: "available",
      },
      {
        title: "Machine lifecycle",
        href: "/docs/user-guide/lifecycle",
        description: "Start and stop a real QEMU process through QMP.",
        status: "available",
      },
      {
        title: "Graphical console",
        href: "/docs/user-guide/console",
        description: "Use the loopback noVNC console, fullscreen, and pointer capture.",
        status: "available",
      },
      {
        title: "Networking",
        href: "/docs/user-guide/networking",
        description: "Why the current guest has no network interface and what virtual Ethernet would require.",
        status: "planned",
      },
    ],
  },
  {
    title: "Architecture",
    href: "/docs/architecture",
    description: "How the Tauri shell, Rust backend, QEMU lifecycle, QMP, installation media, and storage layers fit together.",
    pages: [
      {
        title: "Architecture",
        href: "/docs/architecture",
        description: "Component responsibilities and the current system boundary.",
      },
      {
        title: "Application boundaries",
        href: "/docs/architecture/application",
        description: "The Tauri shell, Rust backend, static frontend, and command surface.",
      },
      {
        title: "Virtualization integration",
        href: "/docs/architecture/virtualization",
        description: "QEMU discovery, launch, QMP lifecycle, Linux KVM, and the console transport.",
      },
      {
        title: "Storage and configuration",
        href: "/docs/architecture/storage",
        description: "Application data, schema-v3 config.json, VM disks, installation media paths, atomic writes, and permissions.",
      },
      {
        title: "Security model",
        href: "/docs/architecture/security",
        description: "Current protections, local-only control boundaries, and console authentication.",
      },
    ],
  },
  {
    title: "Development",
    href: "/docs/development",
    description: "Set up the repositories, run checks, contribute, and report problems.",
    pages: [
      {
        title: "Development",
        href: "/docs/development",
        description: "Development expectations and the two independent repositories.",
      },
      {
        title: "Environment",
        href: "/docs/development/environment",
        description: "Desktop and website prerequisites and local setup.",
      },
      {
        title: "Repository structure",
        href: "/docs/development/repository",
        description: "Where the frontend, Rust backend, data files, and documentation live.",
      },
      {
        title: "Build and checks",
        href: "/docs/development/checks",
        description: "Verified formatting, compilation, type-check, and production-build commands.",
      },
      {
        title: "Contributing",
        href: "/docs/development/contributing",
        description: "Scope, engineering rules, licensing, and how to discuss changes.",
      },
      {
        title: "Reporting issues",
        href: "/docs/development/reporting",
        description: "Where to report bugs and what diagnostic information to include.",
      },
    ],
  },
];

export const docPages = docSections.flatMap((section) =>
  section.pages.map((page) => ({
    ...page,
    section: section.title,
    sectionHref: section.href,
  })),
);

export type FlatDocPage = (typeof docPages)[number];

export function getDocEntry(href: string): FlatDocPage | undefined {
  return docPages.find((page) => page.href === href);
}

export function getDocNeighbors(href: string): {
  previous?: FlatDocPage;
  next?: FlatDocPage;
} {
  const index = docPages.findIndex((page) => page.href === href);

  if (index === -1) {
    return {};
  }

  return {
    previous: index > 0 ? docPages[index - 1] : undefined,
    next: index < docPages.length - 1 ? docPages[index + 1] : undefined,
  };
}
