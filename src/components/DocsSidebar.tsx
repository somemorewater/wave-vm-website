"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { docSections } from "@/data/docs";
import styles from "./docs.module.css";

export default function DocsSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <aside aria-label="Documentation navigation" className={styles.sidebar}>
      <button
        aria-controls="docs-navigation"
        aria-expanded={open}
        className={styles.menuButton}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span>Documentation menu</span>
        <span aria-hidden="true" className={styles.menuIcon}>
          {open ? "Close" : "Browse"}
        </span>
      </button>

      <div className={styles.sidebarPanel} data-open={open} id="docs-navigation">
        <Link
          aria-current={pathname === "/docs" ? "page" : undefined}
          className={styles.sidebarHome}
          href="/docs"
          onClick={() => setOpen(false)}
        >
          Documentation
        </Link>

        {docSections.map((section) => (
          <div className={styles.sidebarSection} key={section.href}>
            <p className={styles.sidebarSectionTitle}>{section.title}</p>
            <ul className={styles.sidebarList}>
              {section.pages.map((page) => (
                <li key={page.href}>
                  <Link
                    aria-current={pathname === page.href ? "page" : undefined}
                    className={styles.sidebarLink}
                    href={page.href}
                    onClick={() => setOpen(false)}
                  >
                    <span>{page.title}</span>
                    {page.status === "planned" ? (
                      <span className={styles.sidebarStatus}>Planned</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
