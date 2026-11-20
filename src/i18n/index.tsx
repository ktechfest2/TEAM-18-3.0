"use client";

// Translation helpers.
//   In client components:  const t = useT();  t("home.hi")
//   In server pages:       <T k="home.hi" />
// The language comes from the user's saved profile, so changing it in
// Settings (or onboarding) switches every translated screen at once.

import { useEffect } from "react";
import { useUserProfile } from "@/lib/user-profile";
import type { LanguageId } from "@/lib/languages";
import { en, type MessageKey, type Messages } from "./messages/en";
import { ha } from "./messages/ha";
import { ig } from "./messages/ig";
import { pcm } from "./messages/pcm";
import { yo } from "./messages/yo";

const MESSAGES: Record<LanguageId, Messages> = { en, pcm, yo, ha, ig };

type Values = Record<string, string | number>;

function translate(language: LanguageId, key: MessageKey, values?: Values): string {
  // Fall back to English when a translation is missing.
  let text = MESSAGES[language][key] ?? en[key];
  if (values) {
    for (const [name, value] of Object.entries(values)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
}

/** Returns t(key, values?) for the user's chosen language. */
export function useT() {
  const { language } = useUserProfile();
  return (key: MessageKey, values?: Values) => translate(language, key, values);
}

/** Translated text for use inside server components. */
export function T({ k, values }: { k: MessageKey; values?: Values }) {
  const t = useT();
  return <>{t(k, values)}</>;
}

/** Keeps <html lang="…"> in step with the chosen language (screen readers use it). */
export function LanguageSync() {
  const { language } = useUserProfile();
  useEffect(() => {
    document.documentElement.lang = language === "pcm" ? "pcm" : language;
  }, [language]);
  return null;
}

export type { MessageKey };
