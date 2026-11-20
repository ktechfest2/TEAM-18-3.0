// PLACEHOLDER events — replace with events from the API.

export type TicketTier = {
  id: string;
  name: string;
  note: string;
  price: number; // in naira; 0 = free
  soldOut?: boolean;
};

export type EventItem = {
  id: string;
  title: string;
  category: string;
  month: string;
  day: string;
  dateLong: string;
  timeRange: string;
  venue: string;
  area: string;
  organiser: { name: string; initials: string; eventCount: string };
  about: string;
  going: string;
  interested: string;
  promoted?: boolean;
  tiers: TicketTier[];
};

// The ticket types the feature document lists: free, regular, VIP, premium, early-bird.
const SAMPLE_TIERS: TicketTier[] = [
  { id: "early", name: "Early bird", note: "Limited launch price", price: 0, soldOut: true },
  { id: "free", name: "Free", note: "[Who qualifies]", price: 0 },
  { id: "regular", name: "Regular", note: "[What's included]", price: 0 },
  { id: "vip", name: "VIP", note: "[What's included]", price: 0 },
  { id: "premium", name: "Premium", note: "[What's included]", price: 0 },
];

function sampleEvent(id: string, overrides: Partial<EventItem>): EventItem {
  return {
    id,
    title: "[Event name]",
    category: "[Category]",
    month: "[MON]",
    day: "[00]",
    dateLong: "[Day], [date]",
    timeRange: "[start] – [end] WAT",
    venue: "[Venue]",
    area: "[Area], [City]",
    organiser: { name: "[Organiser name]", initials: "OR", eventCount: "[0] events" },
    about: "[Event description.]",
    going: "[0] going",
    interested: "[0] interested",
    tiers: SAMPLE_TIERS,
    ...overrides,
  };
}

export const sampleEvents: EventItem[] = [
  sampleEvent("sample-1", { promoted: true, category: "Tech" }),
  sampleEvent("sample-2", { category: "Community" }),
  sampleEvent("sample-3", { category: "Business" }),
  sampleEvent("sample-4", { category: "Networking" }),
];

export const EVENT_FILTERS = ["For you", "Tech", "Workshops", "Business", "Community"];

export function findEvent(id: string): EventItem {
  return sampleEvents.find((event) => event.id === id) ?? sampleEvents[0];
}

export function formatNaira(amount: number): string {
  return amount === 0 ? "Free" : `₦${amount.toLocaleString("en-NG")}`;
}

/** Cheapest ticket that isn't sold out, e.g. "From ₦3,000". */
export function lowestPrice(event: EventItem): string {
  const prices = event.tiers.filter((t) => !t.soldOut).map((t) => t.price);
  return prices.length ? formatNaira(Math.min(...prices)) : "Sold out";
}
