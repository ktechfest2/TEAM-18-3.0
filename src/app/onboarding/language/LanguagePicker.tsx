"use client";

import { useState } from "react";
import { LANGUAGES, type LanguageId } from "@/lib/languages";

// TODO: when translations are added, save the choice where the i18n setup reads it
// (e.g. a cookie) instead of only keeping it in component state.
export function LanguagePicker() {
  const [selected, setSelected] = useState<LanguageId>("en");

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
            onClick={() => setSelected(language.id)}
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
