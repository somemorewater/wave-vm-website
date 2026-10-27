import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";
import { sourceUrl } from "@/config";

export const metadata: Metadata = {
  title: "Storage and configuration",
  description:
    "Wave VM's application data directory, schema-v3 config.json, VM disks, installation media paths, atomic writes, and Unix permissions.",
};

export default function StoragePage() {
  return (
    <DocPage href="/docs/architecture/storage">
      <p>
        Wave VM stores local application state in the platform application data directory
        resolved by Tauri from the bundle identifier <code>com.wavevm.desktop</code>.
      </p>

      <h2>Typical locations</h2>
      <ul>
        <li>
          Linux: <code>$XDG_DATA_HOME/com.wavevm.desktop</code> or{" "}
          <code>~/.local/share/com.wavevm.desktop</code>
        </li>
        <li>
          macOS: <code>~/Library/Application Support/com.wavevm.desktop</code>
        </li>
        <li>
          Windows: <code>%APPDATA%\com.wavevm.desktop</code>
        </li>
      </ul>
      <p>
        The macOS and Windows paths are documented by the project but their host behavior
        has not been verified in this environment.
      </p>

      <h2>Created files</h2>
      <pre>
        <code>{`config.json             # versioned application configuration (schema v3)
vms/<machine-id>/       # one directory per machine
  disk.qcow2            # QCOW2 virtual disk
  qemu.log              # latest QEMU run log
  qmp.sock              # private QMP socket while running`}</code>
      </pre>
      <p>
        The <code>vms/</code> directory is created at startup. A machine directory and
        its disk are created when a machine is created. Wave VM does not automatically
        remove VM directories or disks.
      </p>

      <h2>Configuration schema</h2>
      <p>
        The current schema is version 3. <code>config.json</code> contains{" "}
        <code>schemaVersion</code>, <code>createdAtUnix</code>,{" "}
        <code>lastOpenedUnix</code>, and a <code>vms</code> array. Each VM record stores
        its identifier, name, guest architecture, memory, virtual CPUs, disk path, disk
        size, lifecycle state, optional installation ISO path, boot mode, optional last
        error, and timestamps.
      </p>
      <p>
        Schema versions 0, 1, and 2 are migrated to version 3. A version newer than the
        supported schema is rejected with <code>config_version_unsupported</code> rather
        than being silently rewritten. Persisted starting, running, or stopping states are
        reconciled when the application starts.
      </p>

      <h2>Installation media paths</h2>
      <p>
        The selected ISO is not copied into the application data directory. The
        configuration stores its canonical absolute path and boot mode, and QEMU reads the
        file from its original location when installer boot is selected. If the file is
        moved or deleted, the machine reports the media as unavailable and installer boot
        will not start. The disk boot path does not require the ISO to be present.
      </p>
      <p>
        The ISO path is local application data and can reveal a directory name. It is not
        sent over a network by Wave VM. The console password is not written to this file.
      </p>

      <h2>Atomic writes and permissions</h2>
      <p>
        Configuration writes use a temporary file in the same directory, followed by an
        atomic rename. On Unix, the temporary file and final configuration are written with
        0600 permissions. Application directories and machine directories are set to
        0700. VM disks are set to 0600. The parent directory is synced after a successful
        rename.
      </p>

      <DocNote title="Storage management is read-only" tone="info">
        Disk creation and local ISO attachment are implemented, but resizing, deleting,
        compacting, attaching existing disks, and automatic media cleanup are not. The
        Storage page is an inventory. Wave VM preserves existing disks and machine
        directories rather than removing them automatically.
      </DocNote>

      <h2>Source references</h2>
      <ul>
        <li>
          <a
            href={sourceUrl("src-tauri/src/config/store.rs")}
            rel="noreferrer"
            target="_blank"
          >
            config/store.rs
          </a>{" "}
          — schema, migration, atomic writes, and permissions.
        </li>
        <li>
          <a
            href={sourceUrl("src-tauri/src/vm/disk.rs")}
            rel="noreferrer"
            target="_blank"
          >
            vm/disk.rs
          </a>{" "}
          — QCOW2 creation and overwrite protection.
        </li>
        <li>
          <a
            href={sourceUrl("src-tauri/src/vm/media.rs")}
            rel="noreferrer"
            target="_blank"
          >
            vm/media.rs
          </a>{" "}
          — installation ISO validation and availability checks.
        </li>
        <li>
          <a
            href={sourceUrl("src-tauri/src/state.rs")}
            rel="noreferrer"
            target="_blank"
          >
            state.rs
          </a>{" "}
          — application data initialization and shutdown.
        </li>
      </ul>

      <p>
        Continue with <Link href="/docs/architecture/security">Security model</Link>.
      </p>
    </DocPage>
  );
}
