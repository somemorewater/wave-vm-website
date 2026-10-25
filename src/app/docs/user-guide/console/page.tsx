import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Graphical console",
  description:
    "Wave VM's interactive graphical console is planned. No VNC or noVNC integration exists in the current build.",
};

export default function ConsolePage() {
  return (
    <DocPage href="/docs/user-guide/console">
      <DocNote title="Planned — not implemented" tone="planned">
        The current build has no VNC or noVNC integration and no console interface. It
        cannot display a running guest. Static screenshots, simulated terminals, and fake
        console interfaces are not acceptable substitutes.
      </DocNote>

      <p>
        A genuine interactive graphical console is a product requirement, not a decorative
        preview. The interface concept on the home page is labeled as a concept and is not
        a working console.
      </p>

      <h2>What exists today</h2>
      <ul>
        <li>No QEMU process lifecycle to attach a console to.</li>
        <li>No VNC service configuration.</li>
        <li>No noVNC client integration.</li>
        <li>No console authentication or session handling.</li>
      </ul>

      <h2>What the milestone must cover</h2>
      <ul>
        <li>Complete a QEMU VNC and noVNC integration spike before building the console UI.</li>
        <li>Bind the console service to a local interface only.</li>
        <li>Use session authentication and never store console passwords as persistent VM configuration.</li>
        <li>Verify keyboard, pointer, focus, and reconnect behavior in the actual application.</li>
        <li>Test against a running guest, not a screenshot or a simulated terminal.</li>
      </ul>

      <p>
        The console depends on a working QEMU lifecycle. See{" "}
        <Link href="/roadmap#graphical-console">the graphical console milestone</Link> in
        the roadmap.
      </p>
    </DocPage>
  );
}
