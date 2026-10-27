import type { Metadata } from "next";
import Link from "next/link";

import PageHero from "@/components/PageHero";
import StatusBadge from "@/components/StatusBadge";
import { featureGroups, type FeatureGroup } from "@/data/features";
import ui from "@/components/ui.module.css";

export const metadata: Metadata = {
  title: "Features",
  description:
    "What Wave VM implements today, what is partially implemented, and which virtual machine features are still planned.",
};

function FeatureGroupSection({ group }: { group: FeatureGroup }) {
  const headingId = `features-${group.status}`;

  return (
    <section aria-labelledby={headingId} className={ui.sectionTight}>
      <div className={ui.sectionHeader}>
        <div>
          <p className={ui.kicker}>Feature status</p>
          <h2 className={ui.sectionTitle} id={headingId}>
            {group.title}
          </h2>
        </div>
        <p className={ui.sectionLede}>{group.description}</p>
      </div>

      <div className={ui.cardGrid}>
        {group.items.map((item) => (
          <article className={ui.card} key={item.id}>
            <div className={ui.cardTop}>
              <h3 className={ui.cardTitle}>{item.title}</h3>
              <StatusBadge status={item.status} />
            </div>
            <p className={ui.cardText}>{item.description}</p>
            {item.limitation ? (
              <p className={ui.cardMeta}>
                <strong>Current limit:</strong> {item.limitation}
              </p>
            ) : null}
            {item.evidence.length ? (
              <p className={ui.cardMeta}>
                <strong>Evidence:</strong>{" "}
                <span className={ui.evidenceList}>
                  {item.evidence.map((evidence) =>
                    evidence.href ? (
                      <a
                        className={ui.evidenceLink}
                        href={evidence.href}
                        key={`${item.id}-${evidence.label}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {evidence.label}
                      </a>
                    ) : (
                      <span key={`${item.id}-${evidence.label}`}>{evidence.label}</span>
                    ),
                  )}
                </span>
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export default function FeaturesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Features"
        lede="What works in the current build, what is partially implemented, and what remains a development target. Nothing is described as available unless the desktop implementation supports it."
        title={
          <>
            What works now.
            <br />
            <em>What comes next.</em>
          </>
        }
      >
        <Link className={ui.buttonPrimary} href="/roadmap">
          View the roadmap <span aria-hidden="true">→</span>
        </Link>
        <Link className={ui.buttonSecondary} href="/docs">
          Read the documentation
        </Link>
      </PageHero>

      <div className={ui.wrap}>
        <div className={`${ui.notice} ${ui.noticeInfo}`} style={{ marginTop: "2rem" }}>
          <strong>Current build:</strong> Milestone 4. Machine definitions, QCOW2 disks,
          local ISO attachment, installer and disk boot modes, QEMU start and stop, QMP
          lifecycle control, and a loopback noVNC console with fullscreen and mouse
          capture are implemented. Guest networking, machine editing, snapshots, and
          release packaging are not.
        </div>
      </div>

      <div className={ui.wrap}>
        {featureGroups.map((group) => (
          <FeatureGroupSection group={group} key={group.status} />
        ))}
      </div>
    </main>
  );
}
