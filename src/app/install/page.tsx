import type { Metadata } from "next";
import Link from "next/link";

import PageHero from "@/components/PageHero";
import { githubUrl } from "@/config";
import ui from "@/components/ui.module.css";

export const metadata: Metadata = {
  title: "Install & build",
  description:
    "Wave VM has no public download yet. Build the current desktop lifecycle from source to create machines, QCOW2 disks, boot local ISO installers, run QEMU, and open the loopback console.",
};

export default function InstallPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Install & build"
        lede="Wave VM has no public release artifacts yet. You can build the current desktop lifecycle from source to create machine definitions, QCOW2 disks, boot a local ISO installer through QEMU, and open a loopback noVNC console."
        title={
          <>
            No download.
            <br />
            <em>Build the lifecycle.</em>
          </>
        }
      >
        <Link className={ui.buttonPrimary} href="/docs/getting-started/building">
          Build from source <span aria-hidden="true">→</span>
        </Link>
        {githubUrl ? (
          <a className={ui.buttonSecondary} href={githubUrl} rel="noreferrer" target="_blank">
            Open the repository <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </PageHero>

      <section aria-labelledby="availability-title" className={ui.sectionTight}>
        <div className={ui.wrap}>
          <div className={`${ui.notice} ${ui.noticeWarning}`}>
            <strong id="availability-title">No release artifacts exist.</strong> There is
            no installer, tagged release, published version, or checksum to download. Do
            not use an unofficial build that claims to be an official Wave VM release.
          </div>
        </div>
      </section>

      <section aria-labelledby="build-title" className={ui.sectionTight}>
        <div className={`${ui.wrap} ${ui.split}`}>
          <div>
            <p className={ui.kicker}>From source</p>
            <h2 className={ui.sectionTitle} id="build-title">
              Run the current build
            </h2>
            <p className={ui.sectionLede} style={{ marginTop: "1rem" }}>
              The desktop application is a Tauri 2 project. The frontend is static; the
              Rust backend owns host detection, VM persistence, disk creation,
              installation-media validation, and the QEMU process lifecycle.
            </p>
          </div>

          <div className={ui.prose}>
            <p>
              Install the prerequisites first. Rust, Node.js, npm, and the Tauri 2 Linux
              system libraries are required. QEMU and qemu-img are required for VM
              operations; a usable KVM device is optional and enables hardware
              acceleration.
            </p>

            <pre>
              <code>{`git clone https://github.com/somemorewater/waveVM.git
cd waveVM
npm install
npm run dev`}</code>
            </pre>

            <p>
              <code>npm run dev</code> launches the Tauri application. Do not open
              <code>src/index.html</code> directly in a browser; the frontend requires the
              Tauri desktop shell.
            </p>

            <h2>Build a binary</h2>
            <p>
              To compile a release binary without producing an installer bundle, run:
            </p>
            <pre>
              <code>{`npx tauri build --no-bundle`}</code>
            </pre>
            <p>
              The release binary is written under <code>src-tauri/target/release/</code>.
              This is not a public release or a supported installer.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="expect-title" className={ui.sectionTight}>
        <div className={ui.wrap}>
          <div className={ui.sectionHeader}>
            <div>
              <p className={ui.kicker}>Expectations</p>
              <h2 className={ui.sectionTitle} id="expect-title">
                What the build does today
              </h2>
            </div>
            <p className={ui.sectionLede}>
              The current milestone implements a real VM lifecycle, but not a complete
              virtual machine manager. These lists describe the inspected build.
            </p>
          </div>

          <div className={ui.cardGrid}>
            <article className={ui.card}>
              <h3 className={ui.cardTitle}>Implemented</h3>
              <ul className={ui.cardList}>
                <li>Desktop window and persistent multi-page frontend.</li>
                <li>Host diagnostics and local data paths.</li>
                <li>QEMU and qemu-img discovery with version probing.</li>
                <li>Linux KVM verification through /dev/kvm.</li>
                <li>VM definitions with validated resources.</li>
                <li>Thin-provisioned QCOW2 disk creation.</li>
                <li>Local ISO selection and installer or disk boot modes.</li>
                <li>QEMU start and stop with QMP control.</li>
                <li>Loopback noVNC guest console with fullscreen and pointer capture.</li>
                <li>Schema-v3 local configuration with atomic writes.</li>
              </ul>
            </article>
            <article className={ui.card}>
              <h3 className={ui.cardTitle}>Not implemented</h3>
              <ul className={ui.cardList}>
                <li>Image downloads, checksum or signature verification, or automatic installation detection.</li>
                <li>Guest networking.</li>
                <li>Editing or deleting machine definitions.</li>
                <li>Reset, pause, or snapshot controls.</li>
                <li>Windows and macOS host support.</li>
                <li>Public releases, installers, or checksums.</li>
              </ul>
            </article>
          </div>

          <p className={ui.sectionLede} style={{ marginTop: "1.5rem" }}>
            The lifecycle currently requires a Linux x86_64 host and supports x86_64
            guests only. A new disk is blank until you install an operating system from a
            local ISO that you provide. No guest images are bundled.
          </p>
          <p className={ui.sectionLede} style={{ marginTop: "1rem" }}>
            If setup fails, see <Link href="/docs/getting-started/troubleshooting">Troubleshooting</Link>{" "}
            or the <Link href="/docs/getting-started/prerequisites">prerequisites</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
