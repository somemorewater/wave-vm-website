import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description:
    "Common Wave VM setup failures, QEMU, ISO, console, fullscreen, and guest networking problems supported by the current build.",
};

export default function TroubleshootingPage() {
  return (
    <DocPage href="/docs/getting-started/troubleshooting">
      <p>
        These are setup and lifecycle problems supported by the current repository. The
        application cannot download or verify images, configure guest networking, edit or
        delete machines, or take snapshots yet, so those missing features are not
        troubleshooting issues.
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

      <h2>An ISO cannot be attached</h2>
      <p>
        Installation media must be an absolute path to an existing, readable, regular{" "}
        <code>.iso</code> file. Symlinks are resolved, and the file must still have an{" "}
        <code>.iso</code> extension. Paths containing commas, newlines, or carriage
        returns are rejected because they cannot be passed safely through QEMU&apos;s
        option parser. Check that the file has not been moved or made unreadable.
      </p>
      <p>
        Media can be attached, replaced, or detached only while the machine is stopped. A
        running machine keeps the QEMU arguments it started with. Stop it before changing
        installation media or boot mode.
      </p>

      <h2>The installer does not see the virtual disk</h2>
      <p>
        Wave VM attaches the disk with virtio-blk. An installer without a virtio storage
        driver may not see the disk. This includes some Windows installers. Wave VM does
        not currently provide an additional driver medium or an IDE/SATA disk option.
        Continue only if your guest image includes a suitable driver.
      </p>

      <h2>The installer restarts or the machine boots back into the installer</h2>
      <p>
        Wave VM does not detect when installation completes. After the guest installer has
        finished, stop the machine, open <strong>Installation media</strong>, and choose{" "}
        <strong>Boot from disk</strong> (or detach the ISO). Installer boot attaches the
        ISO as a read-only CD/DVD and sets the boot order to the CD/DVD; disk boot starts
        from the QCOW2 disk.
      </p>

      <h2>A machine will not start</h2>
      <p>
        Check the error shown by the application and the QEMU log for that machine. The
        log is stored at <code>vms/&lt;machine-id&gt;/qemu.log</code> under the application
        data directory. Common causes include a missing disk file, a missing installer ISO
        while installer boot is selected, a QEMU launch failure, a stale QMP socket that
        another process is still using, or a QEMU build without the required features.
      </p>
      <p>
        Wave VM blocks a duplicate launch when it detects a live QMP endpoint for the
        machine. If a QEMU process was left behind by a force-killed desktop process,
        close that process before trying again. Do not delete a VM directory or disk to
        work around a lifecycle error.
      </p>

      <h2>The console will not connect</h2>
      <p>
        The console is available only while the machine is running and tracked by the
        current desktop process. It requires a QEMU build with WebSocket VNC support. If
        QEMU starts but the console reports that no WebSocket listener was found, check
        the installed QEMU version and its VNC support. The console is bound to{" "}
        <code>127.0.0.1</code> and uses a password generated for the current run.
      </p>
      <p>
        A new machine without installation media or an installed guest may show firmware
        output or a no-bootable-device message. That is expected until you attach an ISO
        and install a guest, or start a machine whose disk already contains one.
      </p>

      <h2>Fullscreen or mouse capture does not work</h2>
      <p>
        F11 and the console controls request native fullscreen through the Tauri window.
        Mouse capture uses the webview Pointer Lock API and must be started from the
        console&apos;s mouse control after the guest display is connected. Press{" "}
        <strong>Esc</strong> to release capture. While capture is active, pointer clicks
        are routed to the guest, so the on-screen release control may not be clickable;
        Esc is the reliable path. After release, click the guest to resume input, and Esc
        will reach the guest again.
      </p>
      <p>
        If the webview does not support pointer lock, the control changes to{" "}
        <strong>Focus guest</strong>. Click the display to focus input and use F11 or the
        console controls to leave fullscreen. Pointer accuracy depends on the guest&apos;s
        configured pointing device, and noVNC input behavior has not been verified across
        every guest OS.
      </p>

      <h2>The guest has no network interface</h2>
      <p>
        This is expected. QEMU is launched with no guest network device, and Wave VM has no
        networking configuration. There is no virtual Ethernet adapter, bridge, NAT, port
        forwarding, or host Wi-Fi passthrough in this build. Do not attach a host Wi-Fi
        adapter to the guest manually; Wave VM does not expose arbitrary QEMU arguments.
        See <Link href="/docs/user-guide/networking">Networking</Link> for the current
        boundary and the long-term virtual Ethernet direction.
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
