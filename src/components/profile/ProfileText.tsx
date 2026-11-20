"use client";

// Small pieces of the user's saved details, for use inside any page.
// Each shows a placeholder (e.g. "[First name]") until details are saved.

import { LANGUAGES } from "@/lib/languages";
import { firstName, initials, maskedPhone, useUserProfile, type UserProfile } from "@/lib/user-profile";

function ProfileValue({ pick, fallback }: { pick: (p: UserProfile) => string; fallback: string }) {
  const profile = useUserProfile();
  return <>{pick(profile) || fallback}</>;
}

export const FullName = () => <ProfileValue pick={(p) => p.fullName} fallback="[Full name]" />;
export const FirstName = () => <ProfileValue pick={firstName} fallback="there" />;
export const Initials = () => <ProfileValue pick={initials} fallback="?" />;
export const MaskedPhone = () => <ProfileValue pick={maskedPhone} fallback="[your phone number]" />;

export const LanguageName = () => (
  <ProfileValue pick={(p) => LANGUAGES.find((l) => l.id === p.language)?.name ?? ""} fallback="English" />
);

/** e.g. "PU 004 · Kubwa Model Primary School I" */
export const PollingUnitName = () => (
  <ProfileValue pick={(p) => p.pollingUnit.unitName} fallback="[Polling unit not set]" />
);

/** e.g. "Kubwa, FCT" */
export const ShortArea = () => (
  <ProfileValue
    pick={(p) => [p.pollingUnit.ward, p.pollingUnit.state].filter(Boolean).join(", ")}
    fallback="Set your polling unit"
  />
);

/** e.g. "Kubwa · Bwari · FCT" */
export const FullArea = () => (
  <ProfileValue
    pick={(p) => [p.pollingUnit.ward, p.pollingUnit.lga, p.pollingUnit.state].filter(Boolean).join(" · ")}
    fallback="[Ward] · [LGA] · [State]"
  />
);

/** One field of the polling unit: state, lga, ward, unitName or unitCode. */
export function PollingUnitField({ field, fallback }: { field: keyof UserProfile["pollingUnit"]; fallback: string }) {
  return <ProfileValue pick={(p) => p.pollingUnit[field]} fallback={fallback} />;
}
