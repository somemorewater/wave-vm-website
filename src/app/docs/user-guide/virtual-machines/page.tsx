import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Virtual machines",
  description:
    "Wave VM VM definitions and creation are planned. The current build has no VM model, creation interface, or VM persistence.",
};

export default function VirtualMachinesPage() {
  return (
    <DocPage href="/docs/user-guide/virtual-machines">
      <DocNote title="Planned — not implemented" tone="planned">
        The current build cannot create, edit, list, or persist a virtual machine
        definition. There is no New Machine control to document. The reserved{" "}
        <code>vms/</code> directory is not a VM store yet.
      </DocNote>

      <p>
        A VM definition will be the local record that ties a name and configuration to
        storage, installation media, and runtime behavior. That record does not exist in
        the inspected repository.
      </p>

      <h2>What exists today</h2>
      <ul>
        <li>A schema-v1 application configuration store.</li>
        <li>A reserved <code>vms/</code> directory under the application data directory.</li>
        <li>Host diagnostics and QEMU discovery.</li>
        <li>No VM command handlers and no VM-related frontend controls.</li>
      </ul>

      <h2>What the milestone must cover</h2>
      <ul>
        <li>Define a versioned VM schema with explicit validation.</li>
        <li>Persist definitions without overwriting existing user data.</li>
        <li>Connect definitions to disk and installation-media records.</li>
        <li>Add creation and editing controls only after the backend supports them.</li>
        <li>Report validation failures clearly instead of silently correcting input.</li>
      </ul>

      <p>
        This is the next planned milestone. It is not in progress in the inspected code.
        See <Link href="/roadmap#vm-definitions">the roadmap</Link> for its dependencies
        and evidence.
      </p>
    </DocPage>
  );
}
