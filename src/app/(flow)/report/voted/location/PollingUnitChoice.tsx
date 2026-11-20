"use client";

import { useState } from "react";
import { RadioCards } from "@/components/ui/RadioCards";
import { useUserProfile } from "@/lib/user-profile";

type Choice = "registered" | "other";

// Registered polling unit, or pick a different one.
export function PollingUnitChoice() {
  const [choice, setChoice] = useState<Choice>("registered");
  const { pollingUnit } = useUserProfile();

  return (
    <RadioCards
      label="Polling unit"
      value={choice}
      onChange={setChoice}
      options={[
        { value: "registered", title: "My registered polling unit", hint: pollingUnit.unitName || "Not set yet — add it in Profile" },
        { value: "other", title: "A different polling unit", hint: "Choose state, LGA, ward and unit" },
      ]}
    />
  );
}
