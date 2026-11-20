"use client";

import { LANGUAGES } from "@/lib/languages";
import { saveUserProfile, useUserProfile } from "@/lib/user-profile";

// Language choice, saved straight away so the whole app switches language.
export function LanguagePicker() {
  const { language: selected } = useUserProfile();

  return (
    <div role="radiogroup" aria-label="Language" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {LANGUAGES.map((language) => {
        const isSelected = language.id === selected;
        return (
          <button
            key={language.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={isSelected ? "opt on" : "opt"}
            onClick={() => saveUserProfile({ language: language.id })}
          >
            <span className="tile t-n" style={{ fontWeight: 800, fontSize: 14 }}>
              {language.code}
            </span>
            <span className="grow" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>{language.name}</span>
              <span className="sm" lang={language.id}>
                {language.greeting}
              </span>
            </span>
            <span className="radio" />
          </button>
        );
      })}
    </div>
  );
}
