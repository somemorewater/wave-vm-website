import type { Metadata } from "next";
import Link from "next/link";

import PageHero from "@/components/PageHero";
import RoadmapTimeline from "@/components/RoadmapTimeline";
import StatusBadge from "@/components/StatusBadge";
import {
  considerationItems,
  crossCuttingItems,
  currentStage,
  roadmapLegend,
} from "@/data/roadmap";
import roadmap from "@/components/roadmap.module.css";
import ui from "@/components/ui.module.css";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Wave VM's development roadmap: the implemented VM lifecycle, local ISO installation media, and console, plus planned guest networking and packaging work.",
};

export default function RoadmapPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Roadmap"
        lede="The development path from a working desktop foundation to a complete virtual machine manager. Statuses reflect the inspected repository, not a schedule."
        title={
          <>
            The path to a
            <br />
            <em>complete machine.</em>
          </>
        }
      >
        <Link className={ui.buttonPrimary} href="/features">
          See current features <span aria-hidden="true">→</span>
        </Link>
        <Link className={ui.buttonSecondary} href="/docs/architecture">
          Read the architecture
        </Link>
      </PageHero>

      <section aria-labelledby="current-position-title" className={ui.sectionTight}>
        <div className={ui.wrap}>
          <div className={roadmap.currentStage}>
            <div>
              <p className={roadmap.currentKicker}>{currentStage.kicker}</p>
              <h2 className={roadmap.currentTitle} id="current-position-title">
                {currentStage.title}
              </h2>
              <div className={roadmap.currentBadge}>
                <StatusBadge status={currentStage.status} />
              </div>
              <p className={roadmap.currentSummary}>{currentStage.summary}</p>
              <p className={roadmap.currentNote}>{currentStage.note}</p>
            </div>
            <div className={roadmap.currentNext}>
              <p className={roadmap.currentNextLabel}>Next identified phase</p>
              <p className={roadmap.currentNextTitle}>{currentStage.nextTitle}</p>
              <StatusBadge status={currentStage.nextStatus} />
            </div>
          </div>

          <div className={roadmap.legend}>
            {roadmapLegend.map((item) => (
              <div className={roadmap.legendItem} key={item.status}>
                <StatusBadge status={item.status} />
                <span>{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="milestones-title" className={ui.sectionTight}>
        <div className={ui.wrap}>
          <div className={ui.sectionHeader}>
            <div>
              <p className={ui.kicker}>Development phases</p>
              <h2 className={ui.sectionTitle} id="milestones-title">
                Milestones and evidence
              </h2>
            </div>
            <p className={ui.sectionLede}>
              Each phase lists its purpose, dependencies, and the source evidence used to
              determine its status. Dates and completion percentages are intentionally
              omitted.
            </p>
          </div>
          <RoadmapTimeline />
        </div>
      </section>

      <section aria-labelledby="cross-cutting-title" className={ui.sectionTight}>
        <div className={ui.wrap}>
          <div className={ui.sectionHeader}>
            <div>
              <p className={ui.kicker}>Across the roadmap</p>
              <h2 className={ui.sectionTitle} id="cross-cutting-title">
                Cross-cutting work
              </h2>
            </div>
            <p className={ui.sectionLede}>
              Security, documentation, accessibility, and reliability are not separate
              product features. They apply across the lifecycle and are tracked here.
            </p>
          </div>

          <div className={roadmap.crossGrid}>
            {crossCuttingItems.map((item) => (
              <article className={roadmap.crossItem} key={item.id}>
                <div className={roadmap.crossTop}>
                  <h3 className={roadmap.crossTitle}>{item.title}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <p className={roadmap.crossText}>{item.description}</p>
                {item.evidence.length ? (
                  <p className={ui.cardMeta}>
                    <strong>Evidence:</strong>{" "}
                    {item.evidence.map((evidence, index) => (
                      <span key={`${item.id}-${evidence.label}`}>
                        {index > 0 ? " · " : null}
                        {evidence.href ? (
                          <a
                            className={roadmap.evidenceLink}
                            href={evidence.href}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {evidence.label}
                          </a>
                        ) : (
                          evidence.label
                        )}
                      </span>
                    ))}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="consideration-title" className={ui.sectionTight}>
        <div className={ui.wrap}>
          <div className={ui.sectionHeader}>
            <div>
              <p className={ui.kicker}>Not committed</p>
              <h2 className={ui.sectionTitle} id="consideration-title">
                Under consideration
              </h2>
            </div>
            <p className={ui.sectionLede}>
              These ideas may be investigated later. They are not approved features,
              scheduled milestones, or support commitments.
            </p>
          </div>

          <div className={roadmap.considerationGrid}>
            {considerationItems.map((item) => (
              <article className={roadmap.considerationItem} key={item.id}>
                <StatusBadge status="consideration" />
                <h3 style={{ marginTop: "0.65rem" }}>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
