import type { Metadata } from "next";
import type { ReactNode } from "react";

import DocsSidebar from "@/components/DocsSidebar";
import docs from "@/components/docs.module.css";

export const metadata: Metadata = {
  title: {
    default: "Documentation",
    template: "%s — Wave VM Docs",
  },
  description:
    "Wave VM documentation: current project status, machine creation, installation media, networking limits, architecture, storage, security, and development setup.",
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className={docs.shell}>
      <div className={docs.shellInner}>
        <DocsSidebar />
        <main className={docs.content} id="main">
          {children}
        </main>
      </div>
    </div>
  );
}
