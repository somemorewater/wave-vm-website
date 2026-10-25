import Link from "next/link";
import type { ReactNode } from "react";

import { getDocEntry, getDocNeighbors } from "@/data/docs";
import StatusBadge from "./StatusBadge";
import docs from "./docs.module.css";
import ui from "./ui.module.css";

interface DocPageProps {
  href: string;
  children: ReactNode;
}

export default function DocPage({ href, children }: DocPageProps) {
  const entry = getDocEntry(href);

  if (!entry) {
    return null;
  }

  const { previous, next } = getDocNeighbors(href);
  const isSectionIndex = entry.href === entry.sectionHref;

  return (
    <article>
      <header className={docs.docHeader}>
        <nav aria-label="Breadcrumb" className={docs.breadcrumbs}>
          <Link className={docs.breadcrumbLink} href="/docs">
            Documentation
          </Link>
          <span aria-hidden="true">/</span>
          {isSectionIndex ? (
            <span aria-current="page">{entry.section}</span>
          ) : (
            <>
              <Link className={docs.breadcrumbLink} href={entry.sectionHref}>
                {entry.section}
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{entry.title}</span>
            </>
          )}
        </nav>

        <p className={docs.docKicker}>{entry.section}</p>
        <h1 className={docs.docTitle}>{entry.title}</h1>
        <p className={docs.docDescription}>{entry.description}</p>
        {entry.status ? (
          <div className={docs.docStatus}>
            <StatusBadge status={entry.status} />
          </div>
        ) : null}
      </header>

      <div className={`${docs.docBody} ${ui.prose}`}>{children}</div>

      {previous || next ? (
        <nav aria-label="Documentation pagination" className={docs.prevNext}>
          {previous ? (
            <Link className={docs.prevNextLink} href={previous.href}>
              <span className={docs.prevNextDirection}>Previous</span>
              <span className={docs.prevNextTitle}>{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              className={`${docs.prevNextLink} ${docs.prevNextNext}`}
              href={next.href}
            >
              <span className={docs.prevNextDirection}>Next</span>
              <span className={docs.prevNextTitle}>{next.title}</span>
            </Link>
          ) : null}
        </nav>
      ) : null}
    </article>
  );
}
