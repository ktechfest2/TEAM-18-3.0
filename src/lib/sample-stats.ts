// PLACEHOLDER statistics — for layout only. Replace with live data from the API.
// Party figures must come from a separate, properly sourced official results dataset.

export const sampleNational = {
  updated: "Updated [x] min ago",
  reports: "[0]",
  unitsRepresented: "[0]",
  statesReporting: "[0]/37",
  totalUnits: "[total] PUs",
  // Polling unit result status, as % of all units (for the stacked bar)
  resultStatus: [
    { label: "Submitted", count: "[0]", percent: 20, color: "#8E9A92" },
    { label: "Verified", count: "[0]", percent: 7, color: "var(--green)" },
    { label: "Official", count: "[0]", percent: 2, color: "var(--blue)" },
  ],
  topStates: [
    { name: "[State]", percent: 0 },
    { name: "[State]", percent: 0 },
    { name: "[State]", percent: 0 },
    { name: "[State]", percent: 0 },
    { name: "[State]", percent: 0 },
  ],
};

export const sampleWardStats = {
  path: ["[State]", "[LGA]", "[Ward]", "All PUs"],
  wardName: "[Ward], [LGA] LGA",
  reports: "[0]",
  unitsReporting: "[0]/[0]",
  verifiedUnits: "[0]",
  officialResults: {
    coverage: "Official · [0] of [0] PUs",
    source: "Source: official result dataset, published [time].",
    parties: [
      { name: "Party A", votes: "[0]", percent: 46 },
      { name: "Party B", votes: "[0]", percent: 33 },
      { name: "Party C", votes: "[0]", percent: 15 },
    ],
  },
  units: [
    { name: "PU [001] · [Name]", reports: "[0] reports", status: "official" as const },
    { name: "PU [002] · [Name]", reports: "[0] reports", status: "verified" as const },
    { name: "PU [003] · [Name]", reports: "[0] reports", status: "disputed" as const },
  ],
};
