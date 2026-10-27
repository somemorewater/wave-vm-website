import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Networking",
  description:
    "Guest networking is not implemented in Wave VM. Learn why the current guest has no network interface and how virtual Ethernet differs from passing through a host Wi-Fi adapter.",
};

export default function NetworkingPage() {
  return (
    <DocPage href="/docs/user-guide/networking">
      <DocNote title="Guest networking is not implemented" tone="planned">
        QEMU is currently launched with <code>-nic none</code>. The guest has no network
        adapter, and Wave VM has no networking configuration or capability detection. This
        page documents the current boundary and the long-term direction, not a working
        feature.
      </DocNote>

      <p>
        Networking is the next identified gap after the implemented VM lifecycle and local
        installation media. A machine can be created, booted from a local ISO, used through
        the console, stopped, and booted from its disk, but it cannot reach a network.
      </p>

      <h2>What is missing today</h2>
      <ul>
        <li>No virtual network adapter is attached to the guest.</li>
        <li>No virtual Ethernet switch, NAT, bridge, or host-only network exists.</li>
        <li>No port forwarding or inbound connection support exists.</li>
        <li>No host Wi-Fi or Ethernet adapter is passed through to the guest.</li>
        <li>No networking view, address configuration, capability detection, or connectivity test exists in the desktop application.</li>
      </ul>

      <h2>Virtual Ethernet is not Wi-Fi passthrough</h2>
      <p>
        A normal virtual machine does not need to take control of the host&apos;s physical
        Wi-Fi adapter. Instead, the virtual machine receives a virtual network adapter, and
        QEMU connects that adapter to a virtual network. The host&apos;s existing network
        stack carries traffic outward, using Wi-Fi or Ethernet as appropriate.
      </p>
      <p>
        This distinction matters because passing a physical Wi-Fi adapter into a guest is
        unusual and disruptive: the host can lose the adapter, drivers must cooperate, and
        the result is hardware-dependent. A virtual Ethernet adapter plus a host-provided
        network path is the more practical model. It is also not implemented yet.
      </p>

      <h2>Why the guest has no network interface</h2>
      <p>
        This is expected behavior, not a missing guest driver. QEMU is started with no
        network device, so the guest firmware and operating system have nothing to detect.
        Installing a network driver inside the guest, changing host firewall rules, or
        editing the VM configuration will not add an interface while the application does
        not create one.
      </p>
      <p>
        Some installers may warn about missing connectivity or skip online setup steps.
        The installer still runs from the local ISO. Wave VM does not currently provide
        guest networking to complete those steps.
      </p>

      <h2>What future networking must address</h2>
      <ul>
        <li>Choose and document a safe default network model rather than exposing arbitrary QEMU arguments.</li>
        <li>Detect host networking capabilities instead of assuming a particular interface or backend.</li>
        <li>Keep QMP and console control interfaces local and authenticated.</li>
        <li>Decide how guests reach the internet, how inbound connections are handled, and how machines are isolated from each other.</li>
        <li>Explain the model in beginner-friendly terms and verify it on a real host before claiming support.</li>
      </ul>

      <DocNote title="No network is not a troubleshooting step" tone="warning">
        Do not run Wave VM as root or modify host networking to work around the missing
        guest adapter. The current build does not expose arbitrary QEMU arguments or a
        passthrough control. See{" "}
        <Link href="/docs/getting-started/troubleshooting">Troubleshooting</Link> for the
        supported boundaries.
      </DocNote>

      <p>
        Follow <Link href="/roadmap#guest-networking">the roadmap</Link> for the status of
        guest networking. It is planned work with no date or completion estimate. See{" "}
        <Link href="/docs/user-guide/lifecycle">Machine lifecycle</Link> for the QEMU launch
        behavior that currently omits a network device.
      </p>
    </DocPage>
  );
}
