// PLACEHOLDER reports — replace with the signed-in user's reports from the API.
import type { TimelineStep } from "@/components/ui/StatusTimeline";
import type { ReportStatus } from "@/lib/sample-data";

export type ReportKind = "result" | "incident" | "participation";

export const sampleLatestReport = {
  kind: "Result report",
  title: "PU [000] · [Polling unit name]",
  status: "verified" as ReportStatus,
  timeline: [
    { title: "Received", detail: "Today, [time]", state: "done" },
    { title: "Under review", detail: "Grouped with [0] similar reports from this PU. Sent to a human moderator.", state: "done" },
    { title: "Verified", detail: "Photo and figures checked · [time]", state: "current" },
    { title: "Matched to official result", detail: "Waiting for official dataset", state: "pending" },
  ] satisfies TimelineStep[],
};

export const sampleIncident = {
  id: "INC-[0000]",
  category: "[Category]",
  title: "[Short incident title]",
  meta: "PU [000] · [Polling unit name] · Today [time] · [0] photo",
  timeline: [
    { title: "Submitted anonymously", detail: "[time]", state: "done" },
    { title: "Moderator review", detail: "[0] other reports at this PU describe the same incident.", state: "current" },
    { title: "Evidence check", detail: "", state: "pending" },
    { title: "Public alert, if confirmed", detail: "Labelled so readers know it's citizen-reported", state: "pending" },
  ] satisfies TimelineStep[],
};

export const sampleNearbyAlert = {
  id: "alert-1",
  title: "[Verified incident headline]",
  meta: "[Source] · [time ago]",
};

export const sampleEarlierReports: {
  id: string;
  kind: ReportKind;
  title: string;
  date: string;
  status: ReportStatus;
  statusLabel?: string;
}[] = [
  { id: "r1", kind: "incident", title: "[Incident type] · PU [000]", date: "Today, [time]", status: "review" },
  { id: "r2", kind: "participation", title: "I voted · PU [000]", date: "Today, [time]", status: "submitted", statusLabel: "Received" },
  { id: "r3", kind: "result", title: "Result · PU [000]", date: "[date]", status: "disputed" },
];
