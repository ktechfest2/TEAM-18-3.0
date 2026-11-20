import type { ReportStatus } from "@/lib/sample-data";

// One badge style per report status. Citizen reports are never shown as official.
const STATUS_STYLES: Record<ReportStatus, { className: string; label: string }> = {
  submitted: { className: "b-sub", label: "Submitted" },
  review: { className: "b-rev", label: "Under review" },
  verified: { className: "b-ver", label: "Verified" },
  disputed: { className: "b-dis", label: "Disputed" },
  official: { className: "b-off", label: "Official" },
};

type StatusBadgeProps = {
  status: ReportStatus;
  /** Override the text, keeping the colour (e.g. "Saved" in grey). */
  label?: string;
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];
  return <span className={`badge ${style.className}`}>{label ?? style.label}</span>;
}
