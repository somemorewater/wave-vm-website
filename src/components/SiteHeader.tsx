"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import wordmark from "@/assets/wave-vm-wordmark-white.svg";
import { githubUrl } from "@/config";
import styles from "./site.module.css";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Documentation", href: "/docs" },
  { label: "About", href: "/about" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function GitHubMark() {
  return (
    <svg
      aria-hidden="true"
      className={styles.githubIcon}
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.brand} href="/" aria-label="Wave VM home">
          <Image
            alt=""
            className={styles.wordmark}
            height={84}
            priority
            src={wordmark}
            width={344}
          />
        </Link>

        <nav aria-label="Primary" className={styles.desktopNav}>
          {navigation.map((item) => (
            <Link
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={styles.navLink}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {githubUrl ? (
          <div className={styles.headerActions}>
            <a
              className={styles.githubLink}
              href={githubUrl}
              rel="noreferrer"
              target="_blank"
            >
              <GitHubMark />
              GitHub
            </a>
          </div>
        ) : null}

        <button
          aria-controls="site-mobile-navigation"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={styles.menuButton}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span aria-hidden="true" className={styles.menuIcon}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div className={styles.mobileMenu} data-open={open}>
        <nav
          aria-label="Mobile primary"
          className={styles.mobileMenuInner}
          id="site-mobile-navigation"
        >
          {navigation.map((item) => (
            <Link
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={styles.mobileNavLink}
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {githubUrl ? (
            <a
              className={styles.mobileGithub}
              href={githubUrl}
              onClick={() => setOpen(false)}
              rel="noreferrer"
              target="_blank"
            >
              <GitHubMark />
              View Wave VM on GitHub
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
