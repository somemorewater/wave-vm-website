import { githubUrl } from "@/config";
import s from "./landing.module.css";

function ProductPreview() {
  return (
    <figure className={s.preview} aria-label="Concept illustration of a virtual machine management dashboard">
      <div className={s.previewWindow}>
        <div className={s.windowBar}><span className={s.windowLogo}>w</span><b>Wave VM</b><span className={s.windowWorkspace}>WORKSPACE</span><span className={s.windowAvatar}>A</span></div>
        <div className={s.appLayout}>
          <aside className={s.appSidebar}>
            <span className={s.sidebarLabel}>LIBRARY <b>＋</b></span>
            <div className={`${s.machineRow} ${s.machineSelected}`}><span className={s.stateOn} /><span><b>Ubuntu Dev</b><small>Ubuntu 24.04</small></span></div>
            <div className={s.machineRow}><span className={s.stateOff} /><span><b>Windows Lab</b><small>Windows 11</small></span></div>
            <div className={s.machineRow}><span className={s.stateOff} /><span><b>Alpine Test</b><small>Alpine Linux</small></span></div>
            <div className={s.sidebarFoot}><span className={s.localIcon}>⌂</span><span><b>On this device</b><small>Local workspace</small></span></div>
          </aside>
          <div className={s.appMain}>
            <div className={s.machineHeading}><div><span className={s.previewBreadcrumb}>MACHINES / UBUNTU DEV</span><h3>Ubuntu Dev</h3></div><span className={s.runningBadge}><i /> Running</span></div>
            <div className={s.console}>
              <div className={s.consoleBar}><span>CONSOLE PREVIEW</span><span>● ● ●</span></div>
              <div className={s.terminal}><span className={s.terminalMuted}>ubuntu@wave-dev:~</span><br /><span>$</span> <b>ready when you are</b><i className={s.cursor} /></div>
            </div>
            <div className={s.resourceHeading}><b>Resources</b><span>Assigned to this machine</span></div>
            <div className={s.resourceGrid}>
              <div className={s.resource}><span className={s.resourceGlyph}>⌘</span><span><small>PROCESSORS</small><b>4 <small>cores</small></b></span><div className={s.resourceTrack}><i style={{ width: "50%" }} /></div></div>
              <div className={s.resource}><span className={s.resourceGlyph}>▤</span><span><small>MEMORY</small><b>8 <small>GB</small></b></span><div className={s.resourceTrack}><i style={{ width: "64%" }} /></div></div>
              <div className={s.resource}><span className={s.resourceGlyph}>◫</span><span><small>STORAGE</small><b>64 <small>GB</small></b></span><div className={s.resourceTrack}><i style={{ width: "38%" }} /></div></div>
            </div>
            <div className={s.previewActions}><span className={s.pauseIcon}>Ⅱ</span><span>Pause machine</span><span className={s.moreIcon}>•••</span></div>
          </div>
        </div>
      </div>
      <figcaption><span className={s.captionDot} /> Interface concept · Planned product direction</figcaption>
    </figure>
  );
}

export default function Hero() {
  return (
    <section className={s.hero}>
      <div className={s.heroInner}>
        <div className={s.heroCopy}>
          <p className={s.eyebrow}><span className={s.eyebrowLine} /> An open-source project in development</p>
          <h1>Ride your<br /><em>own systems.</em></h1>
          <p className={s.lede}>A simpler way to create and manage virtual machines. Every system, one place.</p>
          <div className={s.heroActions}>
            {githubUrl ? <a className={s.primary} href={githubUrl}>Explore the project <span aria-hidden="true">↗</span></a> : <a className={s.primary} href="#about">Get to know Wave VM <span aria-hidden="true">↓</span></a>}
            <a className={s.secondary} href="#features">What we’re building</a>
          </div>
          <p className={s.availability}>Wave VM is in development. No public download is available yet.</p>
        </div>
        <ProductPreview />
      </div>
      <div className={s.heroFoot}><span>VIRTUAL MACHINES, WITHOUT THE FRICTION</span><span>01 — A CLEARER WAY TO WORK</span></div>
    </section>
  );
}
