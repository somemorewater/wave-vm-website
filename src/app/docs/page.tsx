import Link from "next/link";

import DocNote from "@/components/DocNote";
import { docSections } from "@/data/docs";
import docs from "@/components/docs.module.css";

export default function DocsHomePage() {
  return (
    <article>
      <header className={docs.docsHomeHeader}>
        <p className={docs.docsHomeKicker}>Wave VM documentation</p>
        <h1 className={docs.docsHomeTitle}>Documentation</h1>
        <p className={docs.docsHomeLede}>
          The current build, its limits, and the architecture behind it. The
          documentation separates implemented behavior from planned work and cites the
          inspected source where useful.
        </p>
      </header>

      <DocNote title="Current build: Milestone 1A" tone="info">
        Host diagnostics, QEMU discovery, Linux KVM verification, and local configuration
        are implemented. VM creation, disks, QMP lifecycle, networking, and the graphical
        console are not. See <Link href="/roadmap">the roadmap</Link> for the full status.
      </DocNote>

      <div className={docs.docsSectionGrid}>
        {docSections.map((section, index) => (
          <Link className={docs.docsSectionCard} href={section.href} key={section.href}>
            <span className={docs.docsSectionNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <span className={docs.docsSectionLink}>
              Open section <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>

      <section aria-labelledby="start-here-title" className={docs.docsStart}>
        <h2 id="start-here-title">Start here</h2>
        <ul>
          <li>
            <Link href="/docs/getting-started">Getting Started</Link> — project status,
            expectations, prerequisites, and a source build.
          </li>
          <li>
            <Link href="/docs/user-guide/host-capabilities">Host capabilities</Link> —
            understand the diagnostics the current build actually shows.
          </li>
          <li>
            <Link href="/docs/architecture">Architecture</Link> — the Tauri shell, Rust
            backend, QEMU discovery, storage, and security boundaries.
          </li>
          <li>
            <Link href="/docs/development/checks">Build and checks</Link> — verified
            commands for the desktop and website repositories.
          </li>
        </ul>
      </section>
    </article>
  );
}
