import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Host capabilities",
  description:
    "Understand Wave VM's host diagnostics, QEMU discovery, Linux KVM verification, storage checks, and readiness warnings.",
};

export default function HostCapabilitiesPage() {
  return (
    <DocPage href="/docs/user-guide/host-capabilities">
      <p>
        The current interface is a host-readiness dashboard. It reports what the
        application could observe about the host. It does not prove that a virtual machine
        can run, because VM creation and QEMU lifecycle control are not implemented.
      </p>

      <h2>Readiness summary</h2>
      <p>The host panel summarizes its findings in three states:</p>
      <ul>
        <li>
          <strong>Diagnostics complete</strong> — no warning or error was reported.
        </li>
        <li>
          <strong>Setup incomplete</strong> — at least one warning was reported, such as
          missing QEMU or inaccessible KVM.
        </li>
        <li>
          <strong>Attention needed</strong> — at least one error was reported, or the
          application information could not be loaded.
        </li>
      </ul>
      <p>
        These labels describe the diagnostics only. A complete diagnostic does not mean
        that VM lifecycle support exists.
      </p>

      <h2>System</h2>
      <p>
        The System card reports the operating system, architecture, logical CPU count,
        total or available memory, and when the check ran. Memory status uses{" "}
        <strong>Available</strong>, <strong>Unavailable</strong>, or{" "}
        <strong>Error</strong>. A host that does not report usable memory produces an
        informational warning.
      </p>

      <h2>QEMU system emulator and qemu-img</h2>
      <p>
        Each tool card can show <strong>Available</strong>, <strong>Not found</strong>,{" "}
        <strong>Probe failed</strong>, or <strong>Unsupported</strong>. When a tool is
        found, the card shows the executable, version if it could be parsed, source, and
        path.
      </p>
      <p>Discovery checks these locations in order:</p>
      <ol>
        <li>Bundled resources under <code>qemu/bin</code> and <code>qemu</code>.</li>
        <li>Directories on PATH.</li>
        <li>Standard platform directories.</li>
      </ol>
      <p>
        The version probe runs the executable directly with a version flag and a
        five-second timeout. It does not use a shell command string. A file that exists
        but cannot execute is reported as a probe failure, not as available.
      </p>

      <h2>KVM acceleration</h2>
      <p>
        On Linux, the KVM card reports the device path, whether the device is present,
        whether the kernel accepted the probe, and the reported API version. Its statuses
        are:
      </p>
      <ul>
        <li>
          <strong>Usable</strong> — <code>/dev/kvm</code> opened and{" "}
          <code>KVM_GET_API_VERSION</code> returned the expected API version (12).
        </li>
        <li>
          <strong>Not found</strong> — the device does not exist.
        </li>
        <li>
          <strong>No access</strong> — the device exists but opening it was denied.
        </li>
        <li>
          <strong>Probe failed</strong> — the device is not a character device, the ioctl
          failed, or the API version did not match.
        </li>
        <li>
          <strong>Not applicable</strong> — the platform is not Linux.
        </li>
      </ul>

      <DocNote title="Presence is not proof" tone="info">
        The application deliberately does not treat the existence of{" "}
        <code>/dev/kvm</code> as proof of usable acceleration. The device must be opened
        and the kernel probe must succeed.
      </DocNote>

      <h2>Application storage</h2>
      <p>
        The storage card reports the application data directory, mount point, free space,
        and total space. Statuses are <strong>Available</strong>,{" "}
        <strong>Unavailable</strong>, or <strong>Error</strong>. The application creates
        the data directory if needed. On Unix, directories are created with 0700
        permissions and the configuration file with 0600.
      </p>
      <p>
        Free space below 10 GiB produces a warning. That threshold is a diagnostic
        warning, not a guarantee that any particular VM will fit.
      </p>

      <h2>Common warnings</h2>
      <ul>
        <li>
          <code>qemu_missing</code>, <code>qemu_img_missing</code>,{" "}
          <code>kvm_missing</code> — an optional component was not found.
        </li>
        <li>
          <code>qemu_probe_failed</code>, <code>qemu_img_probe_failed</code>,{" "}
          <code>kvm_probe_failed</code> — a component was found but could not be verified.
        </li>
        <li>
          <code>kvm_inaccessible</code> — the KVM device exists but the current user cannot
          open it.
        </li>
        <li>
          <code>disk_space_low</code> — less than 10 GiB is free on the application data
          filesystem.
        </li>
        <li>
          <code>memory_unavailable</code>, <code>cpu_count_unavailable</code> — the host
          did not report usable information.
        </li>
      </ul>

      <h2>What the diagnostics do not mean</h2>
      <p>
        The panel does not prove that QEMU is compatible with a future Wave VM lifecycle,
        that a VM will start, or that KVM can be used by a particular configuration. Those
        checks require the process, QMP, and lifecycle implementation that is still{" "}
        <Link href="/docs/user-guide/lifecycle">planned</Link>.
      </p>
    </DocPage>
  );
}
