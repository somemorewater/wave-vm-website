import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Build and checks",
  description:
    "Verified Wave VM desktop and website formatting, compilation, type-check, and production-build commands.",
};

export default function ChecksPage() {
  return (
    <DocPage href="/docs/development/checks">
      <p>
        These commands come from the repository documentation and the configured package
        scripts. Run them from the repository root unless noted otherwise.
      </p>

      <h2>Desktop application</h2>
      <pre>
        <code>{`npm run check:frontend
cargo fmt --check --manifest-path src-tauri/Cargo.toml
cargo check --manifest-path src-tauri/Cargo.toml
npx tauri build --no-bundle`}</code>
      </pre>
      <p>
        The Rust checks require the Tauri system libraries. QEMU is not required to
        compile or launch the current shell, but it is required for machine creation and
        lifecycle operations. The final command builds a release binary without producing
        an installer bundle.
      </p>

      <h2>Website</h2>
      <pre>
        <code>{`pnpm typecheck
pnpm build`}</code>
      </pre>
      <p>
        <code>pnpm typecheck</code> runs TypeScript without emitting files.{" "}
        <code>pnpm build</code> creates a production Next.js build. The website has no
        configured lint script.
      </p>

      <DocNote title="No automated test suite is configured" tone="info">
        The repositories do not include automated tests in the inspected state. Do not
        claim a scenario or VM lifecycle was verified by a test command. Application and
        virtualization behavior is tested by the maintainer.
      </DocNote>

      <h2>Formatting</h2>
      <p>
        Rust formatting is checked with <code>cargo fmt --check</code>. The website has no
        configured formatter script; TypeScript and CSS are maintained manually.
      </p>

      <h2>What a passing check means</h2>
      <p>
        A passing build means the code compiles and the static checks succeed. It does not
        prove that a guest operating system boots, that a local ISO installer is detected,
        that a particular QEMU build exposes the required console transport, or that every
        guest input and reconnect path works. Those behaviors require the maintainer&apos;s
        scenario testing.
      </p>

      <p>
        See <Link href="/docs/development/contributing">Contributing</Link> for the
        engineering expectations around these checks.
      </p>
    </DocPage>
  );
}
