"use client";

import { useState } from "react";
import { RadioCards } from "@/components/ui/RadioCards";
import { sampleMyPollingUnit } from "@/lib/sample-data";

type Choice = "registered" | "other";

// Registered polling unit, or pick a different one.
export function PollingUnitChoice() {
  const [choice, setChoice] = useState<Choice>("registered");

  return (
    <RadioCards
      label="Polling unit"
      value={choice}
      onChange={setChoice}
      options={[
        { value: "registered", title: "My registered polling unit", hint: sampleMyPollingUnit.name },
        { value: "other", title: "A different polling unit", hint: "Choose state, LGA, ward and unit" },
      ]}
    />
  );
}
