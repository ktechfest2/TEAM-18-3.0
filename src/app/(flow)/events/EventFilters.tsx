"use client";

import { useState } from "react";
import { FilterChips } from "@/components/ui/FilterChips";
import { EVENT_FILTERS } from "@/lib/sample-events";

// TODO: filter the list (and let users follow categories, feature doc 9.1).
export function EventFilters() {
  const [filter, setFilter] = useState(EVENT_FILTERS[0]);
  return <FilterChips label="Filter events" options={EVENT_FILTERS} value={filter} onChange={setFilter} />;
}
