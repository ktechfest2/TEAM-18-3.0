"use client";

import { useT } from "@/i18n";

// VIN + last name inputs (client component so the placeholders can be translated).
export function VoterFields() {
  const t = useT();
  return (
    <>
      <div className="field">
        <label htmlFor="vin">{t("verify.vin")}</label>
        <input
          className="inp"
          id="vin"
          name="vin"
          autoCapitalize="characters"
          maxLength={19}
          placeholder={t("verify.vinPlaceholder")}
          style={{ letterSpacing: "0.04em" }}
        />
      </div>
      <div className="field">
        <label htmlFor="lastName">{t("verify.lastName")}</label>
        <input className="inp" id="lastName" name="lastName" autoComplete="family-name" placeholder="e.g. Okafor" />
      </div>
    </>
  );
}
