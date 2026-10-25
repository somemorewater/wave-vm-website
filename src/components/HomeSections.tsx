import Link from "next/link";

import { featureGroups } from "@/data/features";
import { currentStage, roadmapPhases } from "@/data/roadmap";
import StatusBadge from "./StatusBadge";
import s from "./landing.module.css";

const availableFeatures = featureGroups.find((group) => group.status === "available")?.items ?? [];
const previewPhases = roadmapPhases.slice(0, 4);

const docCards = [
  {
    number: "01",
    title: "Getting Started",
    description: "What the current build does, what it needs, and how to run it from source.",
    href: "/docs/getting-started",
  },
  {
    number: "02",
    title: "Architecture",
    description: "How the Tauri shell, Rust backend, QEMU discovery, and local storage fit together.",
    href: "/docs/architecture",
  },
  {
    number: "03",
    title: "Development",
    description: "Set up the repository, run the checks, contribute, and report problems.",
    href: "/docs/development",
  },
];

export function StatusSnapshot() {
  return (
    <section aria-labelledby="current-status-title" className={s.statusSection}>
      <div className={`${s.wrap} ${s.statusLayout}`}>
        <div className={s.statusIntro}>
          <p className={s.kicker}>Current status</p>
          <h2 id="current-status-title">A real foundation. Not a finished VM manager.</h2>
          <p>
            The desktop shell, host diagnostics, QEMU discovery, Linux KVM check, and
            local configuration are implemented. VM creation and runtime control are
            still ahead.
          </p>
        </div>

        <div className={s.statusCards}>
          <div className={s.statusCard}>
            <span className={s.statusCardLabel}>Foundation</span>
            <strong className={s.statusCardValue}>{currentStage.title}</strong>
            <p className={s.statusCardText}>
              Host readiness and persistence are working. The code is public and
              inspectable.
            </p>
            <Link className={s.statusCardLink} href="/roadmap">
              See what is complete <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={s.statusCard}>
            <span className={s.statusCardLabel}>Next milestone</span>
            <strong className={s.statusCardValue}>VM definitions and disks</strong>
            <p className={s.statusCardText}>
              Planned, not started. No VM definition model or disk creation code exists
              yet.
            </p>
            <Link className={s.statusCardLink} href="/roadmap#vm-definitions">
              Inspect the next phase <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={s.statusCard}>
            <span className={s.statusCardLabel}>Availability</span>
            <strong className={s.statusCardValue}>No public download</strong>
            <p className={s.statusCardText}>
              There are no release artifacts or installers. Build from source to inspect
              the current foundation.
            </p>
            <Link className={s.statusCardLink} href="/install">
              Build from source <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturePreview() {
  return (
    <section aria-labelledby="available-features-title" className={s.section}>
      <div className={s.wrap}>
        <div className={s.sectionHeader}>
          <p className={s.kicker}>Available now</p>
          <h2 id="available-features-title">
            Real foundations. <span>No mock controls.</span>
          </h2>
        </div>

        <div className={s.featureIntro}>
          <p>
            The current build detects host capabilities and local tools. It does not
            pretend to create or run virtual machines.
          </p>
          <Link className={s.textLink} href="/features">
            See all features <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className={s.featureList}>
          {availableFeatures.slice(0, 3).map((feature, index) => (
            <li key={feature.id}>
              <span aria-hidden="true" className={s.featureGlyph}>
                {["▣", "⌁", "◇"][index]}
              </span>
              <div>
                <span className={s.featureNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <StatusBadge className={s.featureStatus} status={feature.status} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RoadmapPreview() {
  return (
    <section aria-labelledby="roadmap-preview-title" className={s.roadmapPreview}>
      <div className={`${s.wrap} ${s.roadmapPreviewGrid}`}>
        <div className={s.roadmapPreviewCopy}>
          <p className={s.kicker}>Roadmap</p>
          <h2 id="roadmap-preview-title">
            The path to a <span>working machine.</span>
          </h2>
          <p>
            The foundation and host checks are complete. VM definitions, QEMU lifecycle,
            installation media, and the graphical console are still ahead.
          </p>
          <Link className={s.textLink} href="/roadmap">
            See the full roadmap <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ol className={s.roadmapPreviewList}>
          {previewPhases.map((phase) => (
            <li className={s.roadmapPreviewItem} key={phase.id}>
              <span className={s.roadmapPreviewNumber}>{phase.number}</span>
              <div className={s.roadmapPreviewBody}>
                <h3>{phase.title}</h3>
                {phase.next ? (
                  <span className={s.roadmapPreviewNext}>Next milestone</span>
                ) : null}
                <p>{phase.purpose}</p>
                <StatusBadge className={s.roadmapPreviewStatus} status={phase.status} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function DocsPreview() {
  return (
    <section aria-labelledby="docs-preview-title" className={s.docsPreview}>
      <div className={s.wrap}>
        <div className={s.sectionHeader}>
          <p className={s.kicker}>Documentation</p>
          <h2 id="docs-preview-title">Understand what exists.</h2>
        </div>
        <p className={s.docsLede}>
          The documentation separates implemented behavior from planned work, with source
          evidence where it matters.
        </p>

        <div className={s.docsPreviewGrid}>
          {docCards.map((card) => (
            <Link className={s.docPreviewCard} href={card.href} key={card.href}>
              <span className={s.docPreviewNumber}>{card.number}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className={s.docPreviewLink}>
                Read the section <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
