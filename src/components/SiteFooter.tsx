import Image from "next/image";
import Link from "next/link";

import wordmark from "@/assets/wave-vm-wordmark-white.svg";
import { githubUrl, issuesUrl, websiteRepoUrl } from "@/config";
import styles from "./site.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link href="/" aria-label="Wave VM home">
              <Image
                alt=""
                className={styles.footerWordmark}
                height={84}
                src={wordmark}
                width={344}
              />
            </Link>
            <p className={styles.footerTagline}>
              A local-first desktop virtual machine manager in development. The source
              is public; a license has not yet been selected.
            </p>
            <p className={styles.footerStatus}>In development · No public download</p>
          </div>

          <div className={styles.footerCol}>
            <h2>Product</h2>
            <Link href="/features">Features</Link>
            <Link href="/roadmap">Roadmap</Link>
            <Link href="/docs">Documentation</Link>
            <Link href="/about">About</Link>
          </div>

          <div className={styles.footerCol}>
            <h2>Development</h2>
            <Link href="/install">Build from source</Link>
            {githubUrl ? (
              <a href={githubUrl} rel="noreferrer" target="_blank">
                Desktop repository
              </a>
            ) : null}
            {issuesUrl ? (
              <a href={issuesUrl} rel="noreferrer" target="_blank">
                Report an issue
              </a>
            ) : null}
            <Link href="/docs/development/checks">Build checks</Link>
          </div>

          <div className={styles.footerCol}>
            <h2>Project</h2>
            <Link href="/docs/getting-started">Getting started</Link>
            <Link href="/docs/architecture">Architecture</Link>
            <a href={websiteRepoUrl} rel="noreferrer" target="_blank">
              Website source
            </a>
            <a href={`${websiteRepoUrl}/issues`} rel="noreferrer" target="_blank">
              Website issues
            </a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>Wave VM · Ride your own systems.</span>
          <span>
            Built with Tauri 2, Rust, and a vanilla web frontend.{" "}
            {githubUrl ? (
              <a href={githubUrl} rel="noreferrer" target="_blank">
                Follow development
              </a>
            ) : null}
          </span>
        </div>
      </div>
    </footer>
  );
}
