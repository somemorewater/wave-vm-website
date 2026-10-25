import type { Metadata } from "next";
import Link from "next/link";

import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Repository structure",
  description:
    "The current Wave VM desktop and website repository layouts, including the structured roadmap, feature, and documentation data.",
};

export default function RepositoryPage() {
  return (
    <DocPage href="/docs/development/repository">
      <p>
        The repositories are separate and have different stacks. The desktop repository
        contains the application; the website repository contains this site and its
        structured project data.
      </p>

      <h2>Desktop application</h2>
      <pre>
        <code>{`src/                     Vanilla HTML, CSS, and ES modules
src/assets/brand/        Local Wave VM brand SVGs
src-tauri/src/
  commands/              Narrow Tauri command handlers
  config/                Versioned configuration and atomic persistence
  host/                  Host diagnostics, memory/storage, KVM probe
  qemu/                  Executable discovery, safe version probing
  error.rs               Shared serialized application errors
  state.rs               Application state initialization
src-tauri/capabilities/  Tauri capability scope
src-tauri/tauri.conf.json Window, CSP, bundle, and icon configuration`}</code>
      </pre>

      <h2>Website</h2>
      <pre>
        <code>{`src/app/                 Next.js App Router pages and layouts
src/components/          Shared header, footer, page, docs, and roadmap UI
src/data/                Roadmap, feature, documentation, and status data
src/assets/              Local Wave VM brand SVGs
src/app/globals.css      Global tokens and reset
next.config.mjs          Next.js configuration
package.json             Scripts and dependencies`}</code>
      </pre>
      <p>
        The website&apos;s roadmap, feature, and documentation navigation are driven by
        structured data files. Status text should be updated at the source rather than
        copied into multiple pages.
      </p>

      <h2>Build output</h2>
      <p>
        The desktop release binary is written under <code>src-tauri/target/release/</code>.
        The website production build is written under <code>.next/</code>. Both are
        generated artifacts and are ignored by version control.
      </p>

      <h2>Independence</h2>
      <p>
        The website does not import desktop source files or read the desktop repository at
        build time. The desktop application does not read the website repository. Brand
        assets are copied into each project rather than linked across repositories.
      </p>

      <p>
        Continue with <Link href="/docs/development/checks">Build and checks</Link>.
      </p>
    </DocPage>
  );
}
