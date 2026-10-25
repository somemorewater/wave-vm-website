import type { Metadata } from "next";
import Link from "next/link";

import ui from "@/components/ui.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested Wave VM page could not be found.",
};

export default function NotFound() {
  return (
    <main className={ui.simplePage} id="main">
      <div className={ui.wrap}>
        <p className={ui.kicker}>404</p>
        <h1 className={ui.sectionTitle}>This page drifted away.</h1>
        <p className={ui.sectionLede} style={{ marginTop: "1rem" }}>
          The page may have moved, or the link may be incorrect. Start from the homepage,
          inspect the roadmap, or open the documentation.
        </p>
        <div className={ui.pageActions} style={{ marginTop: "1.75rem" }}>
          <Link className={ui.buttonPrimary} href="/">
            Back to home
          </Link>
          <Link className={ui.buttonGhost} href="/roadmap">
            View the roadmap
          </Link>
          <Link className={ui.buttonGhost} href="/docs">
            Read the documentation
          </Link>
        </div>
      </div>
    </main>
  );
}
