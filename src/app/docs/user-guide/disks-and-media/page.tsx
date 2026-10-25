import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Disks and installation media",
  description:
    "Wave VM virtual disk creation and local ISO selection are planned. Managed image downloads are under consideration. Only qemu-img discovery exists.",
};

export default function DisksAndMediaPage() {
  return (
    <DocPage href="/docs/user-guide/disks-and-media">
      <DocNote title="Planned — not implemented" tone="planned">
        The current build does not create virtual disks, select ISO images, download
        images, or verify checksums or signatures. The only related implementation is
        discovery and version probing of the <code>qemu-img</code> executable.
      </DocNote>

      <p>
        A VM lifecycle needs explicit storage and installation media. Both are planned.
        There is no workflow to document yet.
      </p>

      <h2>What exists today</h2>
      <ul>
        <li>QEMU and qemu-img discovery through bundled resources, PATH, and standard locations.</li>
        <li>Version probing with a five-second timeout.</li>
        <li>Host storage diagnostics for the application data filesystem.</li>
        <li>No disk creation, ISO selection, media catalogue, download, or verification code.</li>
      </ul>

      <h2>What the milestone must cover</h2>
      <ul>
        <li>Use qemu-img through safely constructed arguments, never shell strings.</li>
        <li>Choose explicit disk formats and validate configuration.</li>
        <li>Refuse to overwrite existing disk images or user data.</li>
        <li>Canonicalize and validate user-selected paths.</li>
        <li>Verify selected media when reliable checksum or signature data exists.</li>
        <li>Keep guest operating system images out of the application installer.</li>
      </ul>

      <p>
        See <Link href="/roadmap#media-networking">local installation media and networking</Link>{" "}
        in the roadmap. Managed image downloads and a catalogue are under consideration,
        not scheduled. No download source or checksum is published by this website.
      </p>
    </DocPage>
  );
}
