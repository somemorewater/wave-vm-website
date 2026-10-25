import { roadmapPhases, type RoadmapPhase } from "@/data/roadmap";
import StatusBadge from "./StatusBadge";
import styles from "./roadmap.module.css";

interface RoadmapTimelineProps {
  phases?: RoadmapPhase[];
}

export default function RoadmapTimeline({ phases = roadmapPhases }: RoadmapTimelineProps) {
  return (
    <div className={styles.timeline}>
      {phases.map((phase) => {
        const titleId = `${phase.id}-title`;

        return (
          <article
            aria-labelledby={titleId}
            className={styles.phase}
            data-next={phase.next ? "true" : "false"}
            data-status={phase.status}
            id={phase.id}
            key={phase.id}
          >
            <div aria-hidden="true" className={styles.marker}>
              {phase.number}
            </div>

            <div className={styles.phaseBody}>
              <div className={styles.phaseHeader}>
                <div>
                  <p className={styles.phaseKicker}>{phase.area}</p>
                  <h2 className={styles.phaseTitle} id={titleId}>
                    {phase.title}
                  </h2>
                  {phase.next ? <span className={styles.nextLabel}>Next milestone</span> : null}
                </div>
                <StatusBadge status={phase.status} />
              </div>

              <p className={styles.purpose}>{phase.purpose}</p>
              <p className={styles.summary}>{phase.summary}</p>

              <ul className={styles.detailList}>
                {phase.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>

              <div className={styles.metaGrid}>
                <div>
                  <h3>Dependencies</h3>
                  <ul>
                    {phase.dependencies.map((dependency) => (
                      <li key={dependency}>{dependency}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Evidence</h3>
                  <ul>
                    {phase.evidence.map((evidence) => (
                      <li key={`${phase.id}-${evidence.label}`}>
                        {evidence.href ? (
                          <a
                            className={styles.evidenceLink}
                            href={evidence.href}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {evidence.label}
                          </a>
                        ) : (
                          evidence.label
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
