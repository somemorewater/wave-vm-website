import type { Metadata } from "next";
import Link from "next/link";

import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Development",
  description:
    "Wave VM development overview: two independent repositories, current milestone, and where to find setup and contribution guidance.",
};

export default function DevelopmentPage() {
  return (
    <DocPage href="/docs/development">
      <p>
        Wave VM is split into two independent repositories: the desktop application and
        this website. They share branding and product information, but neither project
        imports the other at build time or runtime.
      </p>

      <h2>Repositories</h2>
      <ul>
        <li>
          <strong>Desktop application</strong> — Tauri 2, Rust, and a static vanilla
          HTML/CSS/JavaScript frontend. The current milestone is Milestone 1A.
        </li>
        <li>
          <strong>Website</strong> — Next.js App Router, React, TypeScript, and CSS Modules.
          It builds independently when the desktop repository is unavailable.
        </li>
      </ul>

      <h2>Current development state</h2>
      <p>
        The desktop foundation and host-readiness checks are implemented. VM definitions,
        disks, media, QMP lifecycle, networking, and the graphical console are not. The
        roadmap records the evidence for each status.
      </p>

      <h2>Where to start</h2>
      <ul>
        <li>
          <Link href="/docs/development/environment">Environment</Link> — required tools
          for both repositories.
        </li>
        <li>
          <Link href="/docs/development/repository">Repository structure</Link> — where
          the frontend, backend, data, and documentation live.
        </li>
        <li>
          <Link href="/docs/development/checks">Build and checks</Link> — commands verified
          against the repositories.
        </li>
        <li>
          <Link href="/docs/development/contributing">Contributing</Link> — engineering
          expectations, licensing, and how to discuss changes.
        </li>
        <li>
          <Link href="/docs/development/reporting">Reporting issues</Link> — where to
          report bugs and what information to include.
        </li>
      </ul>
    </DocPage>
  );
}
