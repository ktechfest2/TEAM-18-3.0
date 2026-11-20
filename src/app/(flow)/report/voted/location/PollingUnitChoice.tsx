"use client";

import { useState } from "react";
import { RadioCards } from "@/components/ui/RadioCards";
import { useT } from "@/i18n";
import { useUserProfile } from "@/lib/user-profile";

type Choice = "registered" | "other";

// Registered polling unit, or pick a different one.
export function PollingUnitChoice() {
  const [choice, setChoice] = useState<Choice>("registered");
  const { pollingUnit } = useUserProfile();
  const t = useT();

  return (
    <RadioCards
      label={t("location.pollingUnit")}
      value={choice}
      onChange={setChoice}
      options={[
        { value: "registered", title: t("votedLocation.registered"), hint: pollingUnit.unitName || t("votedLocation.notSet") },
        { value: "other", title: t("votedLocation.other"), hint: t("votedLocation.otherHint") },
      ]}
    />
  );
}
