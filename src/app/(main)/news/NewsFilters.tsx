"use client";

import { useState } from "react";
import { FilterChips } from "@/components/ui/FilterChips";
import { NEWS_FILTERS } from "@/lib/sample-news";

// National / state / local / topic filter for the news list.
export function NewsFilters() {
  const [filter, setFilter] = useState(NEWS_FILTERS[0]);
  return <FilterChips label="Filter news" options={NEWS_FILTERS} value={filter} onChange={setFilter} />;
}
