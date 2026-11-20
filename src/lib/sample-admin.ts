// PLACEHOLDER admin data — replace with live moderation data from the API.
import type { IconName } from "@/components/ui/Icon";

export type QueueKind = "results" | "incidents" | "conflicts";

export type QueueItem = {
  id: string;
  kind: QueueKind;
  meta: string; // e.g. "Result · 3:18 PM"
  puCode: string;
  puArea: string;
  similar: number;
  flag: { label: string; badge: string };
  status: { label: string; badge: string };
  needsAction: boolean; // "Review" (primary) vs "Open" (secondary)
};

export const ADMIN_NAV: { label: string; icon: IconName; count?: string }[] = [
  { label: "Overview", icon: "home" },
  { label: "Report review", icon: "document", count: "[0]" },
  { label: "Duplicates & conflicts", icon: "copy" },
  { label: "Incidents", icon: "alert" },
  { label: "News & alerts", icon: "news" },
  { label: "Events", icon: "calendar" },
  { label: "Users & subscriptions", icon: "users" },
  { label: "Payments & tickets", icon: "card" },
  { label: "Analytics", icon: "stats" },
  { label: "Audit log", icon: "clock" },
];

export const sampleAdminStats = [
  { label: "Reports awaiting review", shortLabel: "Awaiting review", value: "[0]", note: "[0] high-impact", tone: "var(--red)" },
  { label: "Possible duplicates", shortLabel: "Possible duplicates", value: "[0]", note: "AI-grouped by PU" },
  { label: "Conflicting PU reports", shortLabel: "Conflicting PUs", value: "[0]", note: "Needs human review", tone: "#6E4700" },
  { label: "Open incidents", shortLabel: "Open incidents", value: "[0]", note: "[0] escalated" },
];

export const sampleQueue: QueueItem[] = [
  { id: "RES-[00001]", kind: "results", meta: "Result · [time]", puCode: "[PU code]", puArea: "[Ward], [LGA]", similar: 23, flag: { label: "Consistent", badge: "b-ver" }, status: { label: "Under review", badge: "b-rev" }, needsAction: true },
  { id: "RES-[00002]", kind: "conflicts", meta: "Result · [time]", puCode: "[PU code]", puArea: "[Ward], [LGA]", similar: 9, flag: { label: "Conflicting figures", badge: "b-dis" }, status: { label: "Disputed", badge: "b-dis" }, needsAction: true },
  { id: "INC-[0001]", kind: "incidents", meta: "[Incident type] · [time]", puCode: "[PU code]", puArea: "[Ward], [LGA]", similar: 4, flag: { label: "Photo attached", badge: "b-rev" }, status: { label: "Under review", badge: "b-rev" }, needsAction: true },
  { id: "RES-[00003]", kind: "results", meta: "Result · [time]", puCode: "[PU code]", puArea: "[Ward], [LGA]", similar: 1, flag: { label: "Incomplete", badge: "b-sub" }, status: { label: "Received", badge: "b-sub" }, needsAction: false },
  { id: "RES-[00004]", kind: "results", meta: "Result · [time]", puCode: "[PU code]", puArea: "[Ward], [LGA]", similar: 31, flag: { label: "Consistent", badge: "b-ver" }, status: { label: "Matched official", badge: "b-off" }, needsAction: false },
];

export const sampleAiSummary = {
  title: "AI summary · PU [000]",
  text: "[0] matching submissions report [Party] as winner with [0] valid votes. [0] photos show the same sheet. The 20-report threshold is reached, so this is flagged for human verification.",
};

export const samplePendingEvents = {
  count: "[0]",
  items: [
    { title: "[Event name]", meta: "Premium organiser · [date]" },
    { title: "[Event name]", meta: "Premium organiser · [date]" },
  ],
};

export const sampleAuditLog = [
  { who: "[moderator]", what: "verified RES-[00000]", when: "[time]" },
  { who: "[moderator]", what: "published alert ALT-[000]", when: "[time]" },
  { who: "[admin]", what: "changed role for [moderator]", when: "[time]" },
];
