// PLACEHOLDER DATA — for layout only, copied from the design canvas.
// Replace with live, properly sourced data from the backend.

export const sampleElection = {
  name: "[Election name]",
  pollsClose: "[closing time]",
};

export const sampleDashboard = {
  electionBadge: "LIVE · Election day",
  pollsClose: "Polls close [time]",
  participationReports: "[0]",
  participationChange: "+[0] last hour",
  pollingUnitsReporting: "[0]",
  pollingUnitsTotal: "of [total]",
  verifiedUnits: "[0]",
  verifiedPercent: 0,
  officialUnits: "[0]",
  officialPercent: 0,
};

export type ReportStatus = "submitted" | "review" | "verified" | "disputed" | "official";

export const sampleUpdates: {
  id: string;
  status: ReportStatus;
  source: string;
  title: string;
}[] = [
  { id: "sample-1", status: "official", source: "INEC · [time ago]", title: "[Official announcement headline]" },
  { id: "sample-2", status: "review", source: "[LGA] · [time ago]", title: "[Citizen report headline]" },
];
