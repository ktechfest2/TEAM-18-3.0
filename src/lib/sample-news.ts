// PLACEHOLDER news — replace with articles from the news API / CMS.
// Every item must carry its source, time and a verification label (feature doc, section 8).
import type { ReportStatus } from "@/lib/sample-data";

export type NewsItem = {
  id: string;
  label: { status: ReportStatus; text?: string };
  source: string;
  time: string;
  title: string;
  tags: string[];
  body: string[];
};

export const sampleNews: NewsItem[] = [
  {
    id: "sample-1",
    label: { status: "official" },
    source: "INEC",
    time: "[time ago]",
    title: "[Official announcement headline]",
    tags: ["National", "[Topic]"],
    body: ["[First paragraph of the article.]", "[Second paragraph of the article.]"],
  },
  {
    id: "sample-2",
    label: { status: "verified" },
    source: "[News outlet]",
    time: "[time ago]",
    title: "[Verified news headline]",
    tags: ["National"],
    body: ["[Article text.]"],
  },
  {
    id: "sample-3",
    label: { status: "submitted", text: "Civic education" },
    source: "EYENEC",
    time: "[time ago]",
    title: "[Civic education guide title]",
    tags: ["Guide"],
    body: ["[Article text.]"],
  },
  {
    id: "sample-4",
    label: { status: "review", text: "Unconfirmed" },
    source: "Citizen reports",
    time: "[time ago]",
    title: "[Unconfirmed citizen report headline]",
    tags: ["[LGA]"],
    body: ["[Article text.]"],
  },
];

export const NEWS_FILTERS = ["National", "[State]", "[LGA]", "Results", "Security"];

export function findNews(id: string): NewsItem {
  return sampleNews.find((item) => item.id === id) ?? sampleNews[0];
}
