import Link from "next/link";

import s from "./landing.module.css";

function ProductPreview() {
  return (
    <figure
      aria-label="Diagram of the implemented Wave VM workflow"
      className={s.preview}
    >
      <div className={s.previewWindow}>
        <div className={s.windowBar}>
          <span className={s.windowLogo}>w</span>
          <b>Wave VM</b>
          <span className={s.windowWorkspace}>CURRENT BUILD</span>
          <span className={s.windowAvatar}>4</span>
        </div>
        <div className={s.appLayout}>
          <aside className={s.appSidebar}>
            <span className={s.sidebarLabel}>
              IMPLEMENTED <b>✓</b>
            </span>
            <div className={`${s.machineRow} ${s.machineSelected}`}>
              <span className={s.stateOn} />
              <span>
                <b>Create machine</b>
                <small>Validated resources</small>
              </span>
            </div>
            <div className={s.machineRow}>
              <span className={s.stateOn} />
              <span>
                <b>Boot installer</b>
                <small>Local ISO, read-only</small>
              </span>
            </div>
            <div className={s.machineRow}>
              <span className={s.stateOn} />
              <span>
                <b>Open console</b>
                <small>Loopback VNC</small>
              </span>
            </div>
            <div className={s.sidebarFoot}>
              <span className={s.localIcon}>⌂</span>
              <span>
                <b>On this device</b>
                <small>No account or cloud</small>
              </span>
            </div>
          </aside>
          <div className={s.appMain}>
            <div className={s.machineHeading}>
              <div>
                <span className={s.previewBreadcrumb}>CURRENT BUILD / LOCAL WORKFLOW</span>
                <h3>Create, install, run.</h3>
              </div>
              <span className={s.runningBadge}>
                <i /> Local only
              </span>
            </div>
            <div className={s.console}>
              <div className={s.consoleBar}>
                <span>IMPLEMENTED PATH</span>
                <span>IMPLEMENTATION MAP</span>
              </div>
              <div className={s.terminal}>
                <span className={s.terminalMuted}>qemu-img</span>{" "}
                <b>→ QCOW2 disk</b>
                <br />
                <span className={s.terminalMuted}>qemu-system-x86_64</span>{" "}
                <b>→ KVM or TCG</b>
                <br />
                <span className={s.terminalMuted}>noVNC</span>{" "}
                <b>→ interactive console</b>
              </div>
            </div>
            <div className={s.resourceHeading}>
              <b>Available now</b>
              <span>Milestone 4 · local ISO support</span>
            </div>
            <div className={s.resourceGrid}>
              <div className={s.resource}>
                <span className={s.resourceGlyph}>▣</span>
                <span>
                  <small>MACHINES</small>
                  <b>QEMU</b>
                </span>
              </div>
              <div className={s.resource}>
                <span className={s.resourceGlyph}>◈</span>
                <span>
                  <small>MEDIA</small>
                  <b>ISO</b>
                </span>
              </div>
              <div className={s.resource}>
                <span className={s.resourceGlyph}>◇</span>
                <span>
                  <small>CONSOLE</small>
                  <b>noVNC</b>
                </span>
              </div>
            </div>
            <div className={s.previewActions}>
              <span className={s.pauseIcon}>⛶</span>
              <span>F11 fullscreen</span>
              <span className={s.moreIcon}>Esc releases mouse</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption>
        <span className={s.captionDot} /> Implemented workflow · Not a product screenshot
      </figcaption>
    </figure>
  );
}

export default function Hero() {
  return (
    <section className={s.hero}>
      <div className={s.heroInner}>
        <div className={s.heroCopy}>
          <p className={s.eyebrow}>
            <span className={s.eyebrowLine} /> A local-first project in development
          </p>
          <h1>
            Ride your
            <br />
            <em>own systems.</em>
          </h1>
          <p className={s.lede}>
            A free, open-source desktop virtual machine manager. Every system, one place,
            without an account or a cloud dependency.
          </p>
          <div className={s.heroActions}>
            <Link className={s.primary} href="/roadmap">
              See the roadmap <span aria-hidden="true">→</span>
            </Link>
            <Link className={s.secondary} href="/docs">
              Read the documentation
            </Link>
          </div>
          <p className={s.availability}>
            Wave VM is in development. No public download is available yet.
          </p>
        </div>
        <ProductPreview />
      </div>
      <div className={s.heroFoot}>
        <span>VIRTUAL MACHINES, WITHOUT THE FRICTION</span>
        <span>01 — A CLEARER WAY TO WORK</span>
      </div>
    </section>
  );
}
