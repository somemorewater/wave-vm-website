import Image from "next/image";
import Link from "next/link";

import symbol from "@/assets/wave-vm-symbol.svg";
import { githubUrl } from "@/config";
import s from "./landing.module.css";

export function OpenSource() {
  return (
    <section className={s.about} id="about">
      <div className={`${s.wrap} ${s.aboutGrid}`}>
        <div>
          <p className={s.kicker}>Built in the open</p>
          <h2>
            Trust starts with
            <br />
            <span>transparency.</span>
          </h2>
          <div className={s.openVisual}>
            <div className={s.openVisualTop}>
              <span>WAVE VM</span>
              <span>PUBLIC SOURCE</span>
            </div>
            <div className={s.codeLine}>
              <i>01</i>
              <span>
                <b>source</b> available to inspect
              </span>
              <em>✓</em>
            </div>
            <div className={s.codeLine}>
              <i>02</i>
              <span>
                <b>decisions</b> documented with the code
              </span>
              <em>✓</em>
            </div>
            <div className={s.codeLine}>
              <i>03</i>
              <span>
                <b>local control</b> by design
              </span>
              <em>↗</em>
            </div>
          </div>
        </div>

        <div className={s.aboutCopy}>
          <p>
            Virtual machines can hold your work, tools, and important environments. You
            should be able to understand the software that manages them.
          </p>
          <p>
            Wave VM is being developed in the open as a local-first project. The source
            is public and can be inspected, but a license has not yet been selected.
            Until one is added, do not assume open-source licensing terms.
          </p>
          {githubUrl ? (
            <a className={s.textLink} href={githubUrl} rel="noreferrer" target="_blank">
              See the project on GitHub <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className={s.closing}>
      <div className={s.wrap}>
        <p className={s.kicker}>Every system, one place</p>
        <h2>
          Make room for
          <br />
          <em>what’s next.</em>
        </h2>
        <p>
          Wave VM is still taking shape. Follow the public work or read exactly what the
          current build can do.
        </p>
        <div className={s.heroActions}>
          {githubUrl ? (
            <a className={s.primary} href={githubUrl} rel="noreferrer" target="_blank">
              Follow development <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          <Link className={s.secondary} href="/docs">
            Read the documentation <span aria-hidden="true">→</span>
          </Link>
        </div>
        <Image alt="" aria-hidden="true" className={s.closingMark} src={symbol} />
      </div>
    </section>
  );
}
