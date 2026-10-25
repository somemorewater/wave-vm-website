export type Status =
  | "complete"
  | "in-progress"
  | "planned"
  | "consideration"
  | "available"
  | "in-development";

export const statusLabels: Record<Status, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  planned: "Planned",
  consideration: "Under consideration",
  available: "Available now",
  "in-development": "In development",
};

export const statusDescriptions: Record<Status, string> = {
  complete: "Implemented in the inspected repository.",
  "in-progress": "Partially implemented, with the remaining work described below.",
  planned: "Not implemented. The description is a development target, not a current capability.",
  consideration: "An idea under discussion, not an approved or scheduled commitment.",
  available: "Implemented and usable in the current build.",
  "in-development": "Partially implemented. The current limits are stated explicitly.",
};
