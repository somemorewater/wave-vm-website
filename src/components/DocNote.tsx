import type { ReactNode } from "react";

import docs from "./docs.module.css";

interface DocNoteProps {
  tone?: "info" | "warning" | "planned";
  title?: string;
  children: ReactNode;
}

export default function DocNote({ tone = "info", title, children }: DocNoteProps) {
  const toneClass =
    tone === "warning"
      ? docs.noteWarning
      : tone === "planned"
        ? docs.notePlanned
        : docs.noteInfo;

  return (
    <div className={`${docs.note} ${toneClass}`}>
      {title ? <p className={docs.noteTitle}>{title}</p> : null}
      <div>{children}</div>
    </div>
  );
}
