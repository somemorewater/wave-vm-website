import Image from "next/image";
import wordmark from "@/assets/wave-vm-wordmark-white.svg";
import { githubUrl } from "@/config";
import s from "./landing.module.css";

export default function Nav() {
  return (
    <header className={s.navWrap}>
      <nav className={s.nav} aria-label="Primary">
        <a href="#main" className={s.wordmark} aria-label="Wave VM home">
          <Image src={wordmark} alt="Wave VM" priority className={s.navLogo} />
        </a>
        <div className={s.menu}>
          <a href="#features">What it does</a>
          <a href="#how">How it works</a>
          <a href="#about">About</a>
          {githubUrl && <a className={s.navCta} href={githubUrl}>View on GitHub <span aria-hidden="true">↗</span></a>}
        </div>
      </nav>
    </header>
  );
}
