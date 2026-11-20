// PLACEHOLDER notifications — replace with the user's notifications from the API.
import type { IconName } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";

export type NotificationType = "alert" | "report" | "event";

export type AppNotification = {
  id: string;
  type: NotificationType;
  icon: IconName;
  tone: string;
  title: string;
  detail: string;
  time: string;
  href: string;
  unread: boolean;
  group: "Today" | "Earlier";
};

export const sampleNotifications: AppNotification[] = [
  { id: "n1", type: "alert", icon: "alert", tone: "t-r", title: "Alert near your polling unit", detail: "Verified: [incident summary].", time: "[time ago]", href: routes.report.incidentDone, unread: true, group: "Today" },
  { id: "n2", type: "report", icon: "check", tone: "t-g", title: "Your result report was verified", detail: "PU [000] · [Polling unit name]", time: "[time ago]", href: routes.myReports, unread: true, group: "Today" },
  { id: "n3", type: "alert", icon: "news", tone: "t-b", title: "Official update", detail: "[Official update summary].", time: "[time ago]", href: routes.news.article("sample-1"), unread: true, group: "Today" },
  { id: "n4", type: "report", icon: "ballot", tone: "t-n", title: "Participation report received", detail: "Receipt [Receipt ID]", time: "[time]", href: routes.report.votedDone, unread: false, group: "Today" },
  { id: "n5", type: "event", icon: "ticket", tone: "t-a", title: "Ticket confirmed", detail: "[Event name] · [0] × [Ticket type]", time: "Yesterday", href: routes.events.ticket("sample-ticket"), unread: false, group: "Earlier" },
  { id: "n6", type: "event", icon: "card", tone: "t-n", title: "[Plan] plan renews in [x] days", detail: "₦[amount] on [date]", time: "[x] days ago", href: routes.plans, unread: false, group: "Earlier" },
];
