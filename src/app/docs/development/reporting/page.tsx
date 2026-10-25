import type { Metadata } from "next";
import Link from "next/link";

import DocNote from "@/components/DocNote";
import DocPage from "@/components/DocPage";
import { githubUrl, issuesUrl, websiteIssuesUrl } from "@/config";

export const metadata: Metadata = {
  title: "Reporting issues",
  description:
    "Where to report Wave VM desktop and website bugs, and which diagnostic details make a report useful.",
};

export default function ReportingPage() {
  return (
    <DocPage href="/docs/development/reporting">
      <p>
        Report desktop application problems in the desktop repository and website problems
        in the website repository. There is no separate support portal.
      </p>

      <h2>Where to report</h2>
      <ul>
        <li>
          {issuesUrl ? (
            <a href={issuesUrl} rel="noreferrer" target="_blank">
              Desktop application issues
            </a>
          ) : (
            "Desktop application issue tracker"
          )}{" "}
          — host diagnostics, configuration, builds, and future VM lifecycle problems.
        </li>
        <li>
          <a href={websiteIssuesUrl} rel="noreferrer" target="_blank">
            Website issues
          </a>{" "}
          — broken links, incorrect status claims, layout, and documentation problems.
        </li>
      </ul>

      <h2>Useful desktop information</h2>
      <ul>
        <li>Operating system, distribution, kernel version, and architecture.</li>
        <li>Wave VM version and whether it was built from source.</li>
        <li>The exact command or action that failed.</li>
        <li>QEMU and qemu-img versions, if available.</li>
        <li>Whether /dev/kvm exists and whether the current user can access it.</li>
        <li>The application error code, if the interface shows one.</li>
        <li>Relevant log output with personal paths and secrets removed.</li>
      </ul>

      <h2>Useful website information</h2>
      <ul>
        <li>The page URL and the link or section that is wrong.</li>
        <li>Browser and viewport size for layout problems.</li>
        <li>The expected behavior and what actually happened.</li>
        <li>A screenshot if it does not expose private information.</li>
      </ul>

      <DocNote title="Do not include secrets" tone="warning">
        Remove credentials, tokens, private keys, personal paths, and console passwords
        from logs and screenshots. No private security reporting process is documented; do
        not publish exploit details or sensitive data in a public issue.
      </DocNote>

      <h2>Feature proposals</h2>
      <p>
        Use the issue tracker to propose a feature or discuss a roadmap change. Do not
        assume that an idea is approved, scheduled, or supported until it appears in the
        roadmap with an explicit status. The roadmap has no delivery dates or completion
        estimates.
      </p>

      <p>
        {githubUrl ? (
          <a href={githubUrl} rel="noreferrer" target="_blank">
            Desktop repository
          </a>
        ) : null}
        {" · "}
        <a
          href="https://github.com/somemorewater/wave-vm-website"
          rel="noreferrer"
          target="_blank"
        >
          Website repository
        </a>
        {" · "}
        <Link href="/docs/development/contributing">Contributing</Link>
      </p>
    </DocPage>
  );
}
