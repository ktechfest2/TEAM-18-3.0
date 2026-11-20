"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SelectField } from "@/components/ui/SelectField";
import { useT } from "@/i18n";
import { checkPollingUnitCode, lgasFor, NIGERIAN_STATES, unitsFor, wardsFor } from "@/lib/nigeria-locations";
import { routes } from "@/lib/routes";
import { saveUserProfile, useUserProfile } from "@/lib/user-profile";

// Screen 05 (updated design): type the polling unit code from the PVC,
// or choose State → LGA → Ward → Polling unit. Saved on this phone.
// TODO: look the code up in INEC's polling-unit directory on the backend
// so the unit's name and place are filled in automatically.
export function LocationForm() {
  const router = useRouter();
  const t = useT();
  const saved = useUserProfile().pollingUnit;

  const [codeInput, setCodeInput] = useState("");
  const [state, setState] = useState(saved.state);
  const [lga, setLga] = useState(saved.lga);
  const [ward, setWard] = useState(saved.ward);
  const [unitCode, setUnitCode] = useState("");
  const [error, setError] = useState("");

  const code = checkPollingUnitCode(codeInput);
  const lgas = lgasFor(state);
  const wards = wardsFor(state, lga);
  const units = unitsFor(state, lga, ward);
  const choseFromLists = Boolean(state && lga && ward && unitCode);

  function save() {
    if (code.status === "ok") {
      saveUserProfile({
        pollingUnit: {
          state: state || `State ${code.parts.state}`,
          lga: lga || `LGA ${code.parts.lga}`,
          ward: ward || `Ward ${code.parts.ward}`,
          unitName: `PU ${code.parts.unit}`,
          unitCode: code.code,
        },
      });
    } else if (choseFromLists) {
      const unit = units.find((u) => u.code === unitCode)!;
      const lgaCode = lgas.find((l) => l.name === lga)?.code ?? "00";
      const wardCode = wards.find((w) => w.name === ward)?.code ?? "00";
      saveUserProfile({
        pollingUnit: {
          state,
          lga,
          ward,
          unitName: `PU ${unit.code} · ${unit.name}`,
          // TODO: the state's 2-digit INEC code is not in our data yet
          unitCode: `??/${lgaCode}/${wardCode}/${unit.code}`,
        },
      });
    } else {
      setError(t("location.error"));
      return;
    }
    router.push(routes.onboarding.ready);
  }

  // Colour of the code box + message underneath it
  const codeTone = {
    empty: { color: "var(--muted)", border: undefined, text: t("location.codeHint") },
    ok: {
      color: "var(--green)",
      border: "var(--green)",
      text: code.status === "ok" ? t("location.codeOk", code.parts) : "",
    },
    incomplete: { color: "#6E4700", border: "#C98A00", text: t("location.codeFormat") },
    error: { color: "var(--red)", border: "var(--red)", text: t("location.codeFormat") },
  }[code.status];

  const noDataHint = (list: unknown[], parent: string) =>
    parent && list.length === 0 ? <span className="hint">{t("location.noData")}</span> : null;

  return (
    <>
      <main className="content" style={{ gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <h1 className="h1" style={{ fontSize: 24 }}>{t("location.title")}</h1>
          <p className="sm">{t("location.body")}</p>
        </div>

        <div className="field">
          <label htmlFor="puCode">{t("location.codeLabel")}</label>
          <input
            className="inp"
            id="puCode"
            value={code.code}
            onChange={(e) => setCodeInput(e.target.value)}
            inputMode="numeric"
            autoComplete="off"
            maxLength={12}
            placeholder={t("location.codePlaceholder")}
            aria-describedby="pu-code-message"
            style={{ height: 44, fontFamily: "ui-monospace, Menlo, monospace", letterSpacing: "0.05em", borderColor: codeTone.border }}
          />
          <span id="pu-code-message" className="hint" style={{ color: codeTone.color, fontWeight: code.status === "empty" ? 400 : 600 }}>
            {codeTone.text}
          </span>
        </div>

        <div className="row" style={{ gap: 10 }}>
          <div className="div" style={{ flex: 1 }} />
          <span className="sm" style={{ fontWeight: 600 }}>{t("location.orChoose")}</span>
          <div className="div" style={{ flex: 1 }} />
        </div>

        <div className="grid2" style={{ gap: 10 }}>
          <SelectField
            id="state"
            label={t("location.state")}
            options={NIGERIAN_STATES}
            placeholder={t("location.select")}
            value={state}
            onChange={(value) => {
              setState(value);
              setLga("");
              setWard("");
              setUnitCode("");
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <SelectField
              id="lga"
              label={t("location.lga")}
              options={lgas.map((l) => l.name)}
              placeholder={state ? t("location.select") : t("verify.pickStateFirst")}
              value={lga}
              onChange={(value) => {
                setLga(value);
                setWard("");
                setUnitCode("");
              }}
            />
          </div>
        </div>
        {noDataHint(lgas, state)}

        <SelectField
          id="ward"
          label={t("location.ward")}
          options={wards.map((w) => w.name)}
          placeholder={t("location.select")}
          value={ward}
          onChange={(value) => {
            setWard(value);
            setUnitCode("");
          }}
        />
        {noDataHint(wards, lga)}

        {units.length > 0 && (
          <>
            <div className="between">
              <p className="flabel">{t("location.pollingUnit")}</p>
              <span className="hint">{ward}</span>
            </div>
            <div className="card" role="radiogroup" aria-label={t("location.pollingUnit")} style={{ padding: "2px 14px" }}>
              {units.map((unit) => {
                const isSelected = unit.code === unitCode;
                return (
                  <button
                    key={unit.code}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className="li"
                    onClick={() => setUnitCode(unit.code)}
                    style={{ padding: "10px 0" }}
                  >
                    <span className="tile t-n" style={{ width: 40, height: 34, borderRadius: 9, fontSize: 12, fontWeight: 800 }}>
                      {unit.code}
                    </span>
                    <span className="grow" style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35 }}>{unit.name}</span>
                    <span className="radio" style={isSelected ? { border: "7px solid var(--green)", background: "#fff" } : undefined} />
                  </button>
                );
              })}
            </div>
          </>
        )}
        {noDataHint(units, ward)}

        {error && (
          <p role="alert" className="sm" style={{ color: "var(--red)", fontWeight: 600 }}>
            {error}
          </p>
        )}
      </main>

      <div className="foot" style={{ paddingTop: 8 }}>
        <button className="btn" type="button" onClick={save}>
          {t("location.save")}
        </button>
      </div>
    </>
  );
}
