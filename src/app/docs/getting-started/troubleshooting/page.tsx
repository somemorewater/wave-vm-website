import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description:
    "Common Wave VM setup failures, QEMU and console problems, and what the current diagnostics mean.",
};

export default function TroubleshootingPage() {
  return (
    <DocPage href="/docs/getting-started/troubleshooting">
      <p>
        These are setup and lifecycle problems supported by the current repository. The
        application cannot install a guest operating system, manage installation media,
        or configure networking yet, so those missing features are not troubleshooting
        issues.
      </p>

      <h2>Missing Tauri system libraries</h2>
      <p>
        If <code>cargo check</code> or <code>npx tauri build</code> fails while looking for
        WebKitGTK, GTK, or libsoup, install the Tauri 2 Linux prerequisites. On Arch
        Linux the relevant packages are <code>webkit2gtk-4.1</code>, <code>gtk3</code>,
        and <code>libsoup3</code>. Package names differ by distribution.
      </p>
      <pre>
        <code>{`cargo check --manifest-path src-tauri/Cargo.toml`}</code>
      </pre>
      <p>
        Run the failing command again after installing the libraries. The Rust check
        requires them even if you only want to inspect the frontend.
      </p>

      <h2>The frontend opens in a browser but commands fail</h2>
      <p>
        The frontend is static and expects the Tauri desktop shell. Opening{" "}
        <code>src/index.html</code> directly, or serving it with a generic static server,
        does not provide the Tauri command bridge. Use <code>npm run dev</code> from the
        desktop repository.
      </p>

      <h2>Machine creation is rejected</h2>
      <p>
        The backend requires a Linux x86_64 host and an x86_64 guest. It also validates
        the machine name, memory, virtual CPU count, and disk size against fixed limits
        and the host&apos;s reported memory, CPU count, and free space. Read the error
        returned in the dialog; the backend does not silently correct invalid input.
      </p>
      <ul>
        <li>Name: up to 64 characters; no control characters or <code>/</code>, <code>\</code>, comma, or equals characters.</li>
        <li>Memory: 256 to 65,536 MiB, and no more than host memory.</li>
        <li>Virtual CPUs: 1 to 64, and no more than the host&apos;s logical CPU count.</li>
        <li>Disk size: 1 to 1,024 GiB, and no more than free application-data space.</li>
      </ul>

      <h2>QEMU or qemu-img is reported as missing</h2>
      <p>
        QEMU and qemu-img are required for VM operations. Install a QEMU package that
        provides the system emulator for your host architecture and <code>qemu-img</code>,
        then make sure the executables are on PATH or in a location the discovery code
        checks. Re-run host diagnostics after installation.
      </p>
      <pre>
        <code>{`qemu-system-x86_64 --version
qemu-img --version`}</code>
      </pre>
      <p>
        Use the emulator name that matches your architecture if it is not{" "}
        <code>qemu-system-x86_64</code>. The shell can still start without QEMU, but a
        machine cannot be created or started.
      </p>

      <h2>QEMU is found but the probe fails</h2>
      <p>
        The discovery code runs the executable with a version flag and applies a
        five-second timeout. A file that exists but cannot execute, a broken installation,
        or an executable that hangs will produce a probe failure. Run the version command
        above in a terminal to see the underlying error.
      </p>

      <h2>KVM is missing or inaccessible</h2>
      <p>
        On Linux, check whether the device exists and whether your user can access it:
      </p>
      <pre>
        <code>{`ls -l /dev/kvm`}</code>
      </pre>
      <p>
        A missing device usually means the host kernel or virtualization support is not
        configured. A permission error means the current user cannot open it. Follow your
        distribution&apos;s documented KVM setup; do not run Wave VM as root, and do not
        expect Wave VM to change device permissions or group membership.
      </p>
      <p>
        KVM is optional. If it is unavailable, QEMU falls back to software emulation
        (TCG). The machine can still run, but it may be slow.
      </p>

      <DocNote title="Device presence is not usability" tone="info">
        The Linux probe opens <code>/dev/kvm</code> and issues{" "}
        <code>KVM_GET_API_VERSION</code>. A device node that exists but cannot be opened
        is reported as inaccessible, not as usable acceleration.
      </DocNote>

      <h2>A machine will not start</h2>
      <p>
        Check the error shown by the application and the QEMU log for that machine. The
        log is stored at <code>vms/&lt;machine-id&gt;/qemu.log</code> under the application
        data directory. Common causes include a missing disk file, a QEMU launch failure,
        a stale QMP socket that another process is still using, or a QEMU build without
        the required features.
      </p>
      <p>
        Wave VM blocks a duplicate launch when it detects a live QMP endpoint for the
        machine. If a QEMU process was left behind by a force-killed desktop process,
        close that process before trying again. Do not delete a VM directory or disk to
        work around a lifecycle error.
      </p>

      <h2>The console will not connect</h2>
      <p>
        The console is available only while the machine is running. It requires a QEMU
        build with WebSocket VNC support. If QEMU starts but the console reports that no
        WebSocket listener was found, check the installed QEMU version and its VNC
        support. The console is bound to <code>127.0.0.1</code> and uses a password
        generated for the current run.
      </p>
      <p>
        A new machine has a blank disk. If no guest operating system is installed, the
        console may show firmware output or a no-bootable-device message rather than an
        operating system. That is expected in the current milestone.
      </p>

      <h2>Configuration errors</h2>
      <p>
        Configuration failures are reported with explicit error codes, including{" "}
        <code>config_path_unavailable</code>, <code>config_directory_failed</code>,{" "}
        <code>config_read_failed</code>, <code>config_parse_failed</code>,{" "}
        <code>config_invalid</code>, <code>config_version_unsupported</code>, and{" "}
        <code>config_write_failed</code>.
      </p>
      <p>
        Check that the application data directory is writable by your user. Do not delete
        or overwrite existing user data to work around a permission problem. See{" "}
        <Link href="/docs/architecture/storage">Storage and configuration</Link> for the
        expected files and permissions.
      </p>

      <h2>No download or installer</h2>
      <p>
        There is no public release artifact. If you found an installer that claims to be
        an official Wave VM release, treat it as unverified. The only supported way to
        inspect the current build is to{" "}
        <Link href="/docs/getting-started/building">build from source</Link>.
      </p>

      <h2>Windows and macOS</h2>
      <p>
        The current environment has only exercised Linux x86_64 host behavior. macOS and
        Windows behavior is unverified. Do not assume that a successful compile on another
        platform means host diagnostics, KVM/WHPX/HVF detection, VM creation, or VM
        execution are supported.
      </p>
    </DocPage>
  );
}
