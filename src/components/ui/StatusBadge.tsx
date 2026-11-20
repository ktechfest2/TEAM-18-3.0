import { T, type MessageKey } from "@/i18n";
import type { ReportStatus } from "@/lib/sample-data";

// One badge style per report status. Citizen reports are never shown as official.
const STATUS_STYLES: Record<ReportStatus, { className: string; label: MessageKey }> = {
  submitted: { className: "b-sub", label: "status.submitted" },
  review: { className: "b-rev", label: "status.review" },
  verified: { className: "b-ver", label: "status.verified" },
  disputed: { className: "b-dis", label: "status.disputed" },
  official: { className: "b-off", label: "status.official" },
};

type StatusBadgeProps = {
  status: ReportStatus;
  /** Override the text, keeping the colour (e.g. "Saved" in grey). */
  label?: React.ReactNode;
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];
  return <span className={`badge ${style.className}`}>{label ?? <T k={style.label} />}</span>;
}
