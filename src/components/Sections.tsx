import Image from "next/image";
import symbol from "@/assets/wave-vm-symbol.svg";
import symbolNavy from "@/assets/wave-vm-symbol-navy.svg";
import { githubUrl } from "@/config";
import s from "./landing.module.css";

const features = [
  ["A clear view", "Keep your virtual machines together and see what you have at a glance."],
  ["Your machine, your rules", "Run virtual machines locally and choose how their resources are used."],
  ["A simpler workflow", "Create a machine, choose its system and resources, then get to work."],
];

const steps = [
  ["Create", "Give a new virtual machine a name."],
  ["Configure", "Choose an operating system image and resources."],
  ["Run", "Start the machine and manage it from one place."],
];

export function Features() {
  return (
    <section id="features" className={s.section}>
      <div className={s.wrap}>
        <div className={s.sectionHeader}><p className={s.kicker}>THE IDEA</p><h2>Less time managing.<br /><span>More time doing.</span></h2></div>
        <div className={s.featureIntro}><p>Wave VM aims to make virtual machines easier to live with, whether you’re testing software, building in a separate environment, or keeping an older system around.</p><span className={s.planned}>Project goals · In development</span></div>
        <ul className={s.featureList}>
          {features.map(([t, d], i) => (
            <li key={t}><span className={`${s.featureGlyph} ${s[`featureGlyph${i + 1}`]}`} aria-hidden="true">{["▦", "⌂", "↗"][i]}</span><div><span className={s.featureNumber}>0{i + 1} / BENEFIT</span><h3>{t}</h3><p>{d}</p></div><span className={s.featureArrow} aria-hidden="true">↗</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className={s.workflow}>
      <div className={s.wrap}>
        <div className={s.workflowHeading}><p className={s.kicker}>A STRAIGHTFORWARD FLOW</p><h2>From a fresh start<br />to <span>ready to work.</span></h2><p>This is the intended workflow as the project takes shape.</p></div>
        <ol className={s.steps}>
          {steps.map(([t, d], i) => (
            <li key={t}><span className={s.stepNum}>0{i + 1}</span><span className={`${s.stepVisual} ${s[`stepVisual${i + 1}`]}`} aria-hidden="true">{i === 0 ? <><i /><i /><i /></> : i === 1 ? <><i /><i /><i /></> : <><i /><i /><i /></>}</span><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function OpenSource() {
  return (
    <section id="about" className={s.about}>
      <div className={`${s.wrap} ${s.aboutGrid}`}>
        <div><p className={s.kicker}>BUILT IN THE OPEN</p><h2>Trust starts with<br /><span>transparency.</span></h2><div className={s.openVisual}><div className={s.openVisualTop}><span>WAVE VM</span><span>OPEN SOURCE</span></div><div className={s.codeLine}><i>01</i><span><b>source</b> available to inspect</span><em>✓</em></div><div className={s.codeLine}><i>02</i><span><b>decisions</b> made in the open</span><em>✓</em></div><div className={s.codeLine}><i>03</i><span><b>local control</b> by design</span><em>↗</em></div></div></div>
        <div className={s.aboutCopy}><p>Virtual machines can hold your work, tools and important environments. You should be able to understand the software that manages them.</p><p>Wave VM is intended to be free and open source. Its code and progress can be inspected, and anyone can follow along as the project develops.</p>{githubUrl && <a className={s.textLink} href={githubUrl}>See the project on GitHub <span aria-hidden="true">↗</span></a>}</div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className={s.closing}>
      <div className={s.wrap}>
        <p className={s.kicker}>EVERY SYSTEM, ONE PLACE</p><h2>Make room for<br /><em>what’s next.</em></h2>
        <p>Wave VM is still taking shape. Follow the project as it grows.</p>
        {githubUrl ? <a className={s.primary} href={githubUrl}>Follow development <span aria-hidden="true">↗</span></a> : <a className={s.secondary} href="#main">Back to the beginning <span aria-hidden="true">↑</span></a>}
        <Image src={symbol} alt="" aria-hidden="true" className={s.closingMark} />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`${s.wrap} ${s.footRow}`}>
        <a href="#main" className={s.footerBrand}><Image src={symbolNavy} alt="" aria-hidden="true" className={s.footerLogo} /> Wave VM</a>
        <nav aria-label="Footer"><a href="#features">The idea</a><a href="#how">How it works</a><a href="#about">Open source</a>{githubUrl && <a href={githubUrl}>GitHub ↗</a>}</nav>
        <small>Ride your own systems.</small>
      </div>
    </footer>
  );
}
