// Subscription plans and what each includes — from the feature document, section 14.
// Prices are the proposed prices in that document.

export type PlanId = "free" | "standard" | "premium";
export type Access = "Yes" | "Limited" | "No";

export const PLANS: { id: PlanId; name: string; price: string; per: string }[] = [
  { id: "free", name: "Free", price: "₦0", per: "forever" },
  { id: "standard", name: "Standard", price: "₦5,000", per: "per month" },
  { id: "premium", name: "Premium", price: "₦10,000", per: "per month" },
];

export const PLAN_FEATURES: { label: string; access: Record<PlanId, Access> }[] = [
  { label: "Registration & language", access: { free: "Yes", standard: "Yes", premium: "Yes" } },
  { label: "Submit participation & reports", access: { free: "Yes", standard: "Yes", premium: "Yes" } },
  { label: "Basic news & essential alerts", access: { free: "Yes", standard: "Yes", premium: "Yes" } },
  { label: "General leaderboard", access: { free: "Limited", standard: "Yes", premium: "Yes" } },
  { label: "Detailed location leaderboards", access: { free: "No", standard: "Yes", premium: "Yes" } },
  { label: "Advanced analytics", access: { free: "No", standard: "Limited", premium: "Yes" } },
  { label: "Create & publish events", access: { free: "No", standard: "No", premium: "Yes" } },
  { label: "Event promotion & ticketing", access: { free: "No", standard: "No", premium: "Yes" } },
];
