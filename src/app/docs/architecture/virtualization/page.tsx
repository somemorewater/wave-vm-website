import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";
import { sourceUrl } from "@/config";

export const metadata: Metadata = {
  title: "Virtualization integration",
  description:
    "Wave VM currently discovers QEMU and verifies Linux KVM. QEMU argument construction, process supervision, and QMP control are not implemented.",
};

export default function VirtualizationPage() {
  return (
    <DocPage href="/docs/architecture/virtualization">
      <p>
        Wave VM uses direct QEMU integration rather than making libvirt a mandatory
        dependency. The current virtualization layer is limited to discovery and host
        verification.
      </p>

      <h2>What is implemented</h2>
      <ul>
        <li>
          A QEMU system emulator name is selected from the host architecture. Unknown
          architectures produce an unsupported result.
        </li>
        <li>
          QEMU and qemu-img are discovered through bundled resources, PATH, and standard
          platform locations.
        </li>
        <li>
          Each executable is probed directly with a version flag and a five-second
          timeout. The probe does not use a shell command string.
        </li>
        <li>
          On Linux, KVM is verified by opening <code>/dev/kvm</code> and issuing{" "}
          <code>KVM_GET_API_VERSION</code>.
        </li>
        <li>
          Host warnings report missing tools, probe failures, inaccessible KVM, and low
          application-data disk space.
        </li>
      </ul>

      <h2>What is not implemented</h2>
      <ul>
        <li>QEMU argument construction for a VM.</li>
        <li>Process launch and supervision.</li>
        <li>QMP connection, commands, events, or runtime status.</li>
        <li>Start, stop, reset, or forced termination.</li>
        <li>VNC or noVNC console integration.</li>
        <li>Networking configuration.</li>
      </ul>

      <DocNote title="Discovery is not a lifecycle" tone="planned">
        Finding a QEMU executable and parsing its version does not mean a virtual machine
        can run. The application has no code to build arguments, start a process, or
        verify runtime state.
      </DocNote>

      <h2>Required direction</h2>
      <p>
        A future lifecycle must construct arguments through typed vectors, never shell
        command strings. It must supervise the QEMU process, verify state instead of
        assuming success, handle timeouts and stale resources, and use QMP for supported
        lifecycle operations. QMP and console services must bind to local interfaces and
        must not expose unauthenticated control.
      </p>

      <h2>Source references</h2>
      <ul>
        <li>
          <a
            href={sourceUrl("src-tauri/src/qemu/discovery.rs")}
            rel="noreferrer"
            target="_blank"
          >
            qemu/discovery.rs
          </a>{" "}
          — executable discovery.
        </li>
        <li>
          <a
            href={sourceUrl("src-tauri/src/qemu/probe.rs")}
            rel="noreferrer"
            target="_blank"
          >
            qemu/probe.rs
          </a>{" "}
          — version probing.
        </li>
        <li>
          <a href={sourceUrl("src-tauri/src/host/kvm.rs")} rel="noreferrer" target="_blank">
            host/kvm.rs
          </a>{" "}
          — Linux KVM verification.
        </li>
      </ul>

      <p>
        Read <Link href="/docs/user-guide/lifecycle">Machine lifecycle</Link> for the
        planned user-facing behavior, or{" "}
        <Link href="/docs/architecture/security">Security model</Link> for the control
        boundary.
      </p>
    </DocPage>
  );
}
