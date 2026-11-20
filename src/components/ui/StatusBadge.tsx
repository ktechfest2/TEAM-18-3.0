import type { ReportStatus } from "@/lib/sample-data";

// One badge style per report status. Citizen reports are never shown as official.
const STATUS_STYLES: Record<ReportStatus, { className: string; label: string }> = {
  submitted: { className: "b-sub", label: "Submitted" },
  review: { className: "b-rev", label: "Under review" },
  verified: { className: "b-ver", label: "Verified" },
  disputed: { className: "b-dis", label: "Disputed" },
  official: { className: "b-off", label: "Official" },
};

export function StatusBadge({ status }: { status: ReportStatus }) {
  const { className, label } = STATUS_STYLES[status];
  return <span className={`badge ${className}`}>{label}</span>;
}
