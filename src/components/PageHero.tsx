import type { ReactNode } from "react";

import styles from "./ui.module.css";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lede: string;
  children?: ReactNode;
}

export default function PageHero({ eyebrow, title, lede, children }: PageHeroProps) {
  return (
    <section className={styles.pageHero}>
      <div className={styles.pageHeroInner}>
        <p className={styles.pageEyebrow}>{eyebrow}</p>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.pageLede}>{lede}</p>
        {children ? <div className={styles.pageActions}>{children}</div> : null}
      </div>
    </section>
  );
}
