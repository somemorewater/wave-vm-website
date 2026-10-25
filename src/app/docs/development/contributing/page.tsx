import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";
import { githubUrl, sourceUrl } from "@/config";

export const metadata: Metadata = {
  title: "Contributing",
  description:
    "Wave VM contribution expectations, current licensing gap, and how to discuss changes before implementation.",
};

export default function ContributingPage() {
  return (
    <DocPage href="/docs/development/contributing">
      <DocNote title="No CONTRIBUTING.md or license yet" tone="warning">
        The inspected repositories do not contain a CONTRIBUTING.md or a selected license.
        Use the issue tracker to discuss substantial changes before starting. Until a
        license is added, do not assume that contributions or source reuse are governed by
        open-source terms.
      </DocNote>

      <p>
        Wave VM is a small project with a deliberately narrow scope. Changes should make
        the current milestone more reliable or more honest, not expand the product surface
        without a working implementation.
      </p>

      <h2>Engineering expectations</h2>
      <ul>
        <li>Inspect the relevant existing code before changing it.</li>
        <li>Keep the Rust backend authoritative for host, configuration, filesystem, and virtualization state.</li>
        <li>Use narrowly scoped Tauri commands and typed Rust structures.</li>
        <li>Construct process arguments as vectors, never shell command strings.</li>
        <li>Do not add Electron, React, Next.js, or Tailwind to the desktop application.</li>
        <li>Do not make libvirt a mandatory dependency.</li>
        <li>Do not add automated tests or scenario harnesses unless the maintainer asks.</li>
        <li>Do not commit generated build artifacts, local credentials, or secrets.</li>
        <li>Do not perform destructive Git operations or overwrite user data.</li>
      </ul>

      <h2>Before a change</h2>
      <ul>
        <li>Check the current repository status and preserve unrelated work.</li>
        <li>Explain significant architectural decisions and trade-offs.</li>
        <li>Keep the change scoped to the requested milestone.</li>
        <li>Run the relevant formatting, compilation, type-check, or build commands.</li>
      </ul>

      <h2>After a change</h2>
      <ul>
        <li>Report which checks actually ran and their results.</li>
        <li>Distinguish implementation failures from missing host dependencies.</li>
        <li>Document limitations and anything the user still needs to test or configure.</li>
        <li>Do not claim a VM lifecycle or console works without verified evidence.</li>
      </ul>

      <h2>Discuss first</h2>
      <p>
        There is no contribution license agreement and no formal review process. Open an
        issue in the relevant repository to discuss a bug or proposal before investing in a
        large change.
      </p>
      <p>
        {githubUrl ? (
          <a href={`${githubUrl}/issues`} rel="noreferrer" target="_blank">
            Desktop issues
          </a>
        ) : null}
        {" · "}
        <a
          href="https://github.com/somemorewater/wave-vm-website/issues"
          rel="noreferrer"
          target="_blank"
        >
          Website issues
        </a>
        {" · "}
        <a href={sourceUrl("AGENTS.md")} rel="noreferrer" target="_blank">
          Desktop engineering rules
        </a>
      </p>

      <p>
        See <Link href="/docs/development/checks">Build and checks</Link> for the command
        sequence.
      </p>
    </DocPage>
  );
}
