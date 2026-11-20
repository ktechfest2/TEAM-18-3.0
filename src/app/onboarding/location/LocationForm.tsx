"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SelectField } from "@/components/ui/SelectField";
import { useT } from "@/i18n";
import { routes } from "@/lib/routes";
import { sampleLgas, samplePollingUnits, sampleStates, sampleWards } from "@/lib/sample-locations";
import { saveUserProfile, useUserProfile } from "@/lib/user-profile";

// State → LGA → Ward → Polling unit. Saved on this phone when you tap "Finish setup".
// TODO: load each list from the backend based on the level above it,
// and wire "Use my current location" to the Geolocation API.
export function LocationForm() {
  const router = useRouter();
  const saved = useUserProfile().pollingUnit;
  const t = useT();

  // Start from what was saved before (if anything).
  const [state, setState] = useState(saved.state);
  const [lga, setLga] = useState(saved.lga);
  const [ward, setWard] = useState(saved.ward);
  const [unitCode, setUnitCode] = useState(saved.unitCode || samplePollingUnits[0].code);
  const [error, setError] = useState("");

  function finish() {
    if (!state || !lga || !ward) {
      setError(t("location.error"));
      return;
    }
    const unit = samplePollingUnits.find((u) => u.code === unitCode) ?? samplePollingUnits[0];
    saveUserProfile({ pollingUnit: { state, lga, ward, unitName: unit.name, unitCode: unit.code } });
    router.push(routes.onboarding.ready);
  }

  return (
    <>
      <main className="content" style={{ gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
          <h1 className="h1">{t("location.title")}</h1>
          <p className="body">{t("location.body")}</p>
        </div>

        <button className="btn ghost" type="button" style={{ height: 48, fontSize: 15 }}>
          <Icon name="pin" size="s" style={{ color: "var(--green)" }} />
          {t("location.useCurrent")}
        </button>

        <SelectField id="state" label={t("location.state")} options={sampleStates} placeholder={t("location.select")} value={state} onChange={setState} />
        <SelectField id="lga" label={t("location.lga")} options={sampleLgas} placeholder={t("location.select")} value={lga} onChange={setLga} />
        <SelectField id="ward" label={t("location.ward")} options={sampleWards} placeholder={t("location.select")} value={ward} onChange={setWard} />

        <div className="field">
          <label htmlFor="pollingUnitSearch">{t("location.pollingUnit")}</label>
          <input className="inp" id="pollingUnitSearch" type="search" placeholder={t("location.searchPlaceholder")} />
        </div>

        <div className="card" role="radiogroup" aria-label={t("location.pollingUnit")} style={{ padding: "6px 14px" }}>
          {samplePollingUnits.map((unit) => {
            const isSelected = unit.code === unitCode;
            return (
              <button key={unit.code} type="button" role="radio" aria-checked={isSelected} className="li" onClick={() => setUnitCode(unit.code)}>
                <span className="grow">
                  <span className="h3" style={{ display: "block" }}>{unit.name}</span>
                  <span className="sm">{unit.code}</span>
                </span>
                <span className="radio" style={isSelected ? { border: "7px solid var(--green)" } : undefined} />
              </button>
            );
          })}
        </div>

        {error && (
          <p role="alert" className="sm" style={{ color: "var(--red)", fontWeight: 600 }}>
            {error}
          </p>
        )}
      </main>

      <div className="foot">
        <button className="btn" type="button" onClick={finish}>
          {t("location.finish")}
        </button>
      </div>
    </>
  );
}
