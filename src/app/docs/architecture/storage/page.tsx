import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";
import { sourceUrl } from "@/config";

export const metadata: Metadata = {
  title: "Storage and configuration",
  description:
    "Wave VM's application data directory, schema-v1 config.json, atomic writes, Unix permissions, and reserved vms directory.",
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
        <code>{`config.json   # versioned application configuration
vms/          # reserved for future VM definitions and disks`}</code>
      </pre>
      <p>
        The <code>vms/</code> directory is created but is not yet a VM store. No VM
        definitions, disk images, or installation media are written by the current build.
      </p>

      <h2>Configuration schema</h2>
      <p>
        The current schema is version 1. <code>config.json</code> contains{" "}
        <code>schemaVersion</code>, <code>createdAtUnix</code>, and{" "}
        <code>lastOpenedUnix</code>. The file is rewritten when the application opens so
        that <code>lastOpenedUnix</code> stays current.
      </p>
      <p>
        A schema version of 0 is migrated to version 1. A version newer than the supported
        schema is rejected with <code>config_version_unsupported</code> rather than being
        silently rewritten.
      </p>

      <h2>Atomic writes and permissions</h2>
      <p>
        Configuration writes use a temporary file in the same directory, followed by an
        atomic rename. On Unix, the temporary file and final configuration are written with
        0600 permissions. Application directories are set to 0700. The parent directory is
        synced after a successful rename.
      </p>

      <DocNote title="This is not a VM storage layer yet" tone="planned">
        Disk creation, VM definition persistence, media files, and deletion workflows do
        not exist. The current storage code protects the application configuration; it
        does not manage virtual machine data.
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
            href={sourceUrl("src-tauri/src/state.rs")}
            rel="noreferrer"
            target="_blank"
          >
            state.rs
          </a>{" "}
          — application data initialization.
        </li>
      </ul>

      <p>
        Continue with <Link href="/docs/architecture/security">Security model</Link>.
      </p>
    </DocPage>
  );
}
