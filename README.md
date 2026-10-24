# Wave VM website

The official website for Wave VM, a free and open-source virtual machine manager.
It is a single-page Next.js landing site introducing the project, its goals, and
the intended workflow.

Wave VM is still in development, and no public download is available yet.

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- CSS Modules

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

## Production build

```bash
pnpm build
pnpm start
```

## Type checking

```bash
pnpm typecheck
```

## Optional GitHub link

GitHub links are hidden unless a repository URL is provided. To enable them,
create a local `.env.local` file:

```bash
NEXT_PUBLIC_GITHUB_URL=https://github.com/your-org/wave-vm
```

The navigation, hero, closing call to action, and footer read this value
automatically. Local environment files are excluded from version control.
