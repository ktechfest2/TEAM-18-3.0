"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/Switch";
import { useT, type MessageKey } from "@/i18n";
import { LANGUAGES } from "@/lib/languages";
import { saveUserProfile, useUserProfile } from "@/lib/user-profile";

// Notification preferences (feature document, section 10).
const NOTIFICATION_TYPES: { id: string; label: MessageKey; detail: MessageKey; defaultOn: boolean }[] = [
  { id: "alerts", label: "settings.notifAlerts", detail: "settings.notifAlertsHint", defaultOn: true },
  { id: "reports", label: "settings.notifReports", detail: "settings.notifReportsHint", defaultOn: true },
  { id: "news", label: "settings.notifNews", detail: "settings.notifNewsHint", defaultOn: true },
  { id: "events", label: "settings.notifEvents", detail: "settings.notifEventsHint", defaultOn: false },
  { id: "account", label: "settings.notifAccount", detail: "settings.notifAccountHint", defaultOn: true },
];

// Language is saved to the profile straight away (the whole app switches).
// TODO: save notification choices to the user's account, and ask for browser
// notification permission (and subscribe to push) when the first type is switched on.
export function SettingsForm() {
  const t = useT();
  const profile = useUserProfile();
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATION_TYPES.map((n) => [n.id, n.defaultOn]))
  );
  const [appLock, setAppLock] = useState(true);

  return (
    <>
      <p className="lbl">{t("settings.language")}</p>
      <div className="chips" role="radiogroup" aria-label={t("settings.language")} style={{ flexWrap: "wrap" }}>
        {LANGUAGES.map((language) => {
          const isSelected = language.id === profile.language;
          return (
            <button
              key={language.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={isSelected ? "chip on" : "chip"}
              onClick={() => saveUserProfile({ language: language.id })}
              style={{ cursor: "pointer" }}
            >
              {language.name}
            </button>
          );
        })}
      </div>

      <p className="lbl" style={{ marginTop: 6 }}>{t("settings.notifications")}</p>
      <div className="card" style={{ padding: "2px 14px" }}>
        {NOTIFICATION_TYPES.map((type) => (
          <div key={type.id} className="li" style={{ padding: "11px 0" }}>
            <span className="grow">
              <span className="h3" style={{ display: "block", fontSize: 14 }} id={`notif-${type.id}`}>{t(type.label)}</span>
              <span className="sm">{t(type.detail)}</span>
            </span>
            <Switch
              checked={enabled[type.id]}
              onChange={(on) => setEnabled({ ...enabled, [type.id]: on })}
              labelledBy={`notif-${type.id}`}
            />
          </div>
        ))}
      </div>

      <p className="lbl" style={{ marginTop: 6 }}>{t("settings.privacy")}</p>
      <div className="card" style={{ padding: "2px 14px" }}>
        <div className="li" style={{ padding: "11px 0" }}>
          <span className="grow">
            <span className="h3" style={{ display: "block", fontSize: 14 }} id="app-lock">{t("settings.appLock")}</span>
            <span className="sm">{t("settings.appLockHint")}</span>
          </span>
          {/* TODO: implement with WebAuthn (passkeys) */}
          <Switch checked={appLock} onChange={setAppLock} labelledBy="app-lock" />
        </div>
        {/* TODO: change-password screen and data export / account deletion */}
        <a className="li" href="#" style={{ padding: "11px 0" }}>
          <span className="grow h3" style={{ fontSize: 14 }}>{t("settings.changePassword")}</span>
        </a>
        <a className="li" href="#" style={{ padding: "11px 0" }}>
          <span className="grow h3" style={{ fontSize: 14 }}>{t("settings.myData")}</span>
        </a>
      </div>
    </>
  );
}
