"use client";

import { useState } from "react";
import { FilterChips } from "@/components/ui/FilterChips";
import { Switch } from "@/components/ui/Switch";

const LANGUAGES = ["English", "Pidgin", "Yorùbá", "Hausa", "Igbo"];

// Notification preferences (feature document, section 10).
const NOTIFICATION_TYPES = [
  { id: "alerts", label: "Election & safety alerts", detail: "Your polling unit and ward", defaultOn: true },
  { id: "reports", label: "My report status", detail: "Reviews and verification", defaultOn: true },
  { id: "news", label: "News & official updates", detail: "Up to 3 a day", defaultOn: true },
  { id: "events", label: "Events & tickets", detail: "Reminders and confirmations", defaultOn: false },
  { id: "account", label: "Subscription & account", detail: "Billing and security", defaultOn: true },
];

// TODO: save these to the user's account, and ask for browser notification
// permission (and subscribe to push) when the first type is switched on.
export function SettingsForm() {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATION_TYPES.map((t) => [t.id, t.defaultOn]))
  );
  const [appLock, setAppLock] = useState(true);

  return (
    <>
      <p className="lbl">Language</p>
      <div style={{ display: "flex" }}>
        <FilterChips label="Language" options={LANGUAGES} value={language} onChange={setLanguage} />
      </div>

      <p className="lbl" style={{ marginTop: 6 }}>Notifications</p>
      <div className="card" style={{ padding: "2px 14px" }}>
        {NOTIFICATION_TYPES.map((type) => (
          <div key={type.id} className="li" style={{ padding: "11px 0" }}>
            <span className="grow">
              <span className="h3" style={{ display: "block", fontSize: 14 }} id={`notif-${type.id}`}>{type.label}</span>
              <span className="sm">{type.detail}</span>
            </span>
            <Switch
              checked={enabled[type.id]}
              onChange={(on) => setEnabled({ ...enabled, [type.id]: on })}
              labelledBy={`notif-${type.id}`}
            />
          </div>
        ))}
      </div>

      <p className="lbl" style={{ marginTop: 6 }}>App lock</p>
      <div className="card" style={{ padding: "2px 14px" }}>
        <div className="li" style={{ padding: "11px 0" }}>
          <span className="grow">
            <span className="h3" style={{ display: "block", fontSize: 14 }} id="app-lock">App lock</span>
            <span className="sm">Fingerprint or PIN to open</span>
          </span>
          {/* TODO: implement with WebAuthn (passkeys) */}
          <Switch checked={appLock} onChange={setAppLock} labelledBy="app-lock" />
        </div>
      </div>
    </>
  );
}
