import type { Metadata } from "next";
import Link from "next/link";

import PageHero from "@/components/PageHero";
import StatusBadge from "@/components/StatusBadge";
import { githubUrl, issuesUrl, websiteRepoUrl } from "@/config";
import ui from "@/components/ui.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Wave VM exists, the principles behind it, and the technology choices used to build a local-first virtual machine manager.",
};

const principles = [
  {
    title: "Local-first",
    text: "Virtual machines run on your hardware. There is no mandatory account, subscription, cloud service, or remote server.",
  },
  {
    title: "Honest status",
    text: "The interface and documentation separate implemented behavior from planned work. Missing capabilities are reported, not simulated.",
  },
  {
    title: "Safe by default",
    text: "Wave VM does not require root, does not silently elevate privileges, and keeps virtualization control interfaces local.",
  },
  {
    title: "Open development",
    text: "The source is public and development is documented. A license has not yet been selected, so open-source licensing terms are not yet in place.",
  },
];

const technology = [
  {
    title: "Tauri 2",
    description: "Desktop shell and native command boundary.",
    status: "available" as const,
  },
  {
    title: "Rust backend",
    description: "Host detection, configuration, and process-facing logic.",
    status: "available" as const,
  },
  {
    title: "Vanilla web frontend",
    description: "HTML, CSS, and JavaScript without a UI framework.",
    status: "available" as const,
  },
  {
    title: "QEMU integration",
    description: "Discovery and version probing exist; launch and lifecycle control do not.",
    status: "in-development" as const,
  },
  {
    title: "QMP control",
    description: "Planned runtime control for supported lifecycle operations.",
    status: "planned" as const,
  },
  {
    title: "VNC and noVNC console",
    description: "Planned genuine interactive graphical console.",
    status: "planned" as const,
  },
  {
    title: "Versioned JSON configuration",
    description: "Schema-v1 config.json with atomic writes and restrictive permissions.",
    status: "available" as const,
  },
];

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About"
        lede="Wave VM exists to make local virtual machines easier to understand and manage, without an account, a cloud dependency, or a hidden control plane."
        title={
          <>
            Local control,
            <br />
            <em>plainly stated.</em>
          </>
        }
      >
        {githubUrl ? (
          <a className={ui.buttonPrimary} href={githubUrl} rel="noreferrer" target="_blank">
            View the source <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        <Link className={ui.buttonSecondary} href="/roadmap">
          See the current state
        </Link>
      </PageHero>

      <section aria-labelledby="why-title" className={ui.section}>
        <div className={`${ui.wrap} ${ui.split}`}>
          <div>
            <p className={ui.kicker}>Why Wave VM</p>
            <h2 className={ui.sectionTitle} id="why-title">
              Virtual machines should be understandable.
            </h2>
          </div>
          <div className={ui.prose}>
            <p>
              Virtual machines are useful for testing software, isolating a development
              environment, or keeping an older system available. The setup around them is
              often harder to understand than it needs to be.
            </p>
            <p>
              Wave VM aims to be approachable for beginners while remaining useful to
              experienced developers. That means showing what the host can actually do,
              explaining what is missing, and avoiding controls that imply functionality
              that does not exist.
            </p>
            <p>
              The project is local-first by design. It does not require an account,
              subscription, cloud service, or remote server, and it will never bundle
              complete guest operating system images in the installer.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-title" className={ui.sectionTight}>
        <div className={ui.wrap}>
          <div className={ui.sectionHeader}>
            <div>
              <p className={ui.kicker}>Principles</p>
              <h2 className={ui.sectionTitle} id="principles-title">
                What guides the work
              </h2>
            </div>
            <p className={ui.sectionLede}>
              These principles are constraints on the product, not marketing claims. The
              current implementation is still small, and the documentation says so.
            </p>
          </div>

          <div className={ui.cardGrid}>
            {principles.map((principle) => (
              <article className={ui.card} key={principle.title}>
                <h3 className={ui.cardTitle}>{principle.title}</h3>
                <p className={ui.cardText}>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="technology-title" className={ui.sectionTight}>
        <div className={ui.wrap}>
          <div className={ui.sectionHeader}>
            <div>
              <p className={ui.kicker}>Technology</p>
              <h2 className={ui.sectionTitle} id="technology-title">
                Chosen for local control
              </h2>
            </div>
            <p className={ui.sectionLede}>
              The stack is deliberately small. The status on each item describes the
              inspected implementation, not an intention to use the technology. libvirt is
              not required; direct QEMU integration is the current direction.
            </p>
          </div>

          <div className={ui.cardGrid}>
            {technology.map((item) => (
              <article className={ui.card} key={item.title}>
                <div className={ui.cardTop}>
                  <h3 className={ui.cardTitle}>{item.title}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <p className={ui.cardText}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="open-status-title" className={ui.sectionTight}>
        <div className={`${ui.wrap} ${ui.split}`}>
          <div>
            <p className={ui.kicker}>Open development</p>
            <h2 className={ui.sectionTitle} id="open-status-title">
              Public source. No release yet.
            </h2>
          </div>
          <div className={ui.prose}>
            <p>
              The desktop repository is public and can be inspected. The website
              repository is public as well. There is no installer, no tagged release, and
              no published version that can be described as production-ready.
            </p>
            <p>
              A license has not yet been selected. Until one is added, do not assume that
              the source may be reused under open-source terms. The project is being
              developed in the open, but the legal licensing decision is still pending.
            </p>
            <p>
              Wave VM is not a cloud service, a libvirt wrapper, or a bundle of guest
              operating systems. It is a small desktop application being built one
              verified slice at a time.
            </p>
            <p>
              {githubUrl ? (
                <a href={githubUrl} rel="noreferrer" target="_blank">
                  Desktop repository
                </a>
              ) : null}
              {githubUrl && issuesUrl ? " · " : null}
              {issuesUrl ? (
                <a href={issuesUrl} rel="noreferrer" target="_blank">
                  Report an issue
                </a>
              ) : null}
              {" · "}
              <a href={websiteRepoUrl} rel="noreferrer" target="_blank">
                Website repository
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
