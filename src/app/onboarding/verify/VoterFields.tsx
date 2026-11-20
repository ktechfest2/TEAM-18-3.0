"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SelectField } from "@/components/ui/SelectField";
import { useT, type MessageKey } from "@/i18n";
import { checkVin, lgasFor, NIGERIAN_STATES } from "@/lib/nigeria-locations";

type LookupMethod = "vin" | "name";

// What to show under the VIN box for each check result.
const VIN_MESSAGES: Record<ReturnType<typeof checkVin>["status"], { text: MessageKey; color: string; border?: string }> = {
  empty: { text: "verify.vinHint", color: "var(--muted)" },
  invalidCharacters: { text: "verify.vinBadChars", color: "var(--red)", border: "var(--red)" },
  full: { text: "verify.vinFull", color: "var(--green)", border: "var(--green)" },
  lastTen: { text: "verify.vinLastTen", color: "var(--green)", border: "var(--green)" },
  wrongLength: { text: "verify.vinWrongLength", color: "#6E4700", border: "#C98A00" },
};

// Voter eligibility lookup (screen 04, updated design):
// either VIN + surname, or first name + surname + date of birth.
// TODO: send these to the approved INEC eligibility check on the backend.
export function VoterFields() {
  const t = useT();
  const [method, setMethod] = useState<LookupMethod>("vin");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [vinInput, setVinInput] = useState("");

  const lgas = lgasFor(state).map((place) => place.name);
  const vin = checkVin(vinInput);
  const vinMessage = VIN_MESSAGES[vin.status];

  return (
    <>
      {/* VIN / Name switch */}
      <div
        role="radiogroup"
        aria-label={t("verify.lookupBy")}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#E6EAE5", borderRadius: 12, padding: 4 }}
      >
        {(["vin", "name"] as const).map((option) => {
          const isOn = option === method;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isOn}
              onClick={() => setMethod(option)}
              style={{
                height: 38,
                borderRadius: 9,
                border: 0,
                fontFamily: "inherit",
                fontSize: 13,
                cursor: "pointer",
                background: isOn ? "#fff" : "transparent",
                color: isOn ? "#0E1B14" : "#56635B",
                fontWeight: isOn ? 700 : 600,
              }}
            >
              {t(option === "vin" ? "verify.withVin" : "verify.withName")}
            </button>
          );
        })}
      </div>

      <div className="grid2" style={{ gap: 10 }}>
        <SelectField
          id="regState"
          label={t("verify.stateOfRegistration")}
          options={NIGERIAN_STATES}
          placeholder={t("location.select")}
          value={state}
          onChange={(value) => {
            setState(value);
            setLga("");
          }}
        />
        <SelectField
          id="regLga"
          label={t("verify.lgaOfRegistration")}
          options={lgas}
          placeholder={state ? t("location.select") : t("verify.pickStateFirst")}
          value={lga}
          onChange={setLga}
        />
      </div>

      {method === "vin" ? (
        <>
          <div className="field">
            <div className="between">
              <label htmlFor="vin">{t("verify.vin")}</label>
              <span className="hint" style={{ fontWeight: 700 }}>{vin.vin.length} / 19</span>
            </div>
            <input
              className="inp"
              id="vin"
              name="vin"
              value={vin.vin}
              onChange={(e) => setVinInput(e.target.value)}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={23}
              placeholder={t("verify.vinPlaceholder")}
              aria-describedby="vin-message"
              style={{
                height: 44,
                fontFamily: "ui-monospace, Menlo, monospace",
                letterSpacing: "0.06em",
                borderColor: vinMessage.border,
              }}
            />
            <span id="vin-message" className="hint" style={{ color: vinMessage.color, fontWeight: vin.status === "empty" ? 400 : 600 }}>
              {t(vinMessage.text)}
            </span>
          </div>
          <div className="field">
            <label htmlFor="lastName">{t("verify.lastName")}</label>
            <input className="inp" id="lastName" name="lastName" autoComplete="family-name" placeholder={t("verify.lastNamePlaceholder")} style={{ height: 44 }} />
          </div>
        </>
      ) : (
        <>
          <div className="grid2" style={{ gap: 10 }}>
            <div className="field">
              <label htmlFor="firstName">{t("verify.firstName")}</label>
              <input className="inp" id="firstName" autoComplete="given-name" placeholder={t("verify.firstNamePlaceholder")} style={{ height: 44 }} />
            </div>
            <div className="field">
              <label htmlFor="lastName2">{t("verify.lastName")}</label>
              <input className="inp" id="lastName2" autoComplete="family-name" placeholder={t("verify.lastNamePlaceholder")} style={{ height: 44 }} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="dob">{t("register.dateOfBirth")}</label>
            <input className="inp" id="dob" type="date" autoComplete="bday" style={{ height: 44 }} />
            <span className="hint">{t("verify.dobHint")}</span>
          </div>
        </>
      )}

      <p className="sm" style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Icon name="lock" size="s" style={{ width: 15, height: 15, color: "var(--green)" }} />
        {t("verify.vinPrivacy")}
      </p>
    </>
  );
}
