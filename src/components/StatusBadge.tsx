import { statusLabels, type Status } from "@/data/status";
import styles from "./ui.module.css";

interface StatusBadgeProps {
  status: Status;
  label?: string;
  className?: string;
}

export default function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <span
      className={`${styles.badge} ${className ?? ""}`.trim()}
      data-tone={status}
      title={label ?? statusLabels[status]}
    >
      {label ?? statusLabels[status]}
    </span>
  );
}
