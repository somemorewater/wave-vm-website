# Wave VM website

The official website for Wave VM, a local-first desktop virtual machine manager in
development.

The site is a multi-page Next.js App Router project. It describes the project,
separates implemented capabilities from planned work, and documents the current
desktop VM lifecycle, local installation media, console controls, and limits. It is
not a download site: no public release artifacts exist yet.

## Pages

- `/` — project introduction and current status
- `/features` — available, in-development, planned, and under-consideration work
- `/roadmap` — milestone timeline with source evidence and explicit statuses
- `/docs` — documentation with sidebar navigation, breadcrumbs, and previous/next links
- `/about` — project principles, technology choices, and licensing status
- `/install` — build the current VM lifecycle from source
- `/docs/getting-started` — status, prerequisites, build, and troubleshooting
- `/docs/user-guide` — host capabilities, machines, installation media, lifecycle, console, and networking
- `/docs/architecture` — application, virtualization, storage, and security boundaries
- `/docs/development` — environment, repository layout, checks, contributing, and reporting

The landing hero uses a labeled implementation map, not a fabricated product
screenshot. No genuine application screenshots are currently published.

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- CSS Modules

No additional UI, styling, or data-fetching dependencies are required.

## Prerequisites

- Node.js 18.18 or newer
- pnpm

## Getting started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

The site is available at [http://localhost:3000](http://localhost:3000).

## Checks and production build

```bash
pnpm typecheck
pnpm build
pnpm start
```

The project has no configured lint script.

## Content sources

Status and documentation claims are based on the inspected desktop repository,
not on intended features. Keep these data files authoritative:

- `src/data/status.ts` — status labels and descriptions
- `src/data/features.ts` — feature groups and evidence
- `src/data/roadmap.ts` — milestones, current stage, cross-cutting work, and considerations
- `src/data/docs.ts` — documentation navigation and page metadata

Roadmap and feature statuses should be updated at the data source rather than
duplicated in page text. Do not add dates, percentages, release estimates,
checksums, or download links unless the corresponding artifact actually exists.
Do not present the implementation map as a screenshot or claim capabilities that
are absent from the desktop repository.

## GitHub links

Desktop links default to `https://github.com/somemorewater/waveVM`. The website
repository is `https://github.com/somemorewater/wave-vm-website`.

To override the desktop repository URL locally, create `.env.local`:

```bash
NEXT_PUBLIC_GITHUB_URL=https://github.com/your-org/wave-vm
```

If the value is empty, desktop GitHub links are hidden. Local environment files
are excluded from version control.

## Repository independence

The website must build without the desktop repository being present. Do not
import desktop source files at build time, create symlinks across repositories,
or add runtime dependencies on the desktop working tree. Brand assets are copied
into each repository.

## License

Wave VM is released under the MIT License. See [`LICENSE`](LICENSE) for the full
text.

Copyright (c) 2026 Water.

Third-party dependencies and any separately licensed assets retain their original
licenses. The MIT License does not override those terms.
