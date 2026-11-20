"use client";

import { useRef, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Switch } from "@/components/ui/Switch";

// Incident categories from the feature document, section 7.
const CATEGORIES = ["Malpractice", "Intimidation", "Violence", "Vote buying", "Disruption", "Other"];

const EVIDENCE_TYPES: { label: string; icon: IconName; accept: string }[] = [
  { label: "Photo", icon: "camera", accept: "image/*" },
  { label: "Video", icon: "video", accept: "video/*" },
  { label: "Audio", icon: "mic", accept: "audio/*" },
];

// Body of screen 18. `location` is the polling-unit card rendered by the page.
export function IncidentForm({ location }: { location: React.ReactNode }) {
  const [category, setCategory] = useState<string | null>(null);
  const [anonymous, setAnonymous] = useState(true);
  const [evidence, setEvidence] = useState<File[]>([]);

  return (
    <>
      <p className="flabel" id="category-label">What happened?</p>
      <div className="grid3" role="radiogroup" aria-labelledby="category-label" style={{ gap: 8, marginTop: -6 }}>
        {CATEGORIES.map((name) => {
          const isSelected = name === category;
          return (
            <button
              key={name}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setCategory(name)}
              style={{
                height: 44,
                borderRadius: 12,
                fontFamily: "inherit",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                background: isSelected ? "var(--red-t)" : "#fff",
                border: isSelected ? "1.5px solid var(--red)" : "1px solid var(--line)",
                color: isSelected ? "var(--red)" : "var(--ink)",
              }}
            >
              {name}
            </button>
          );
        })}
      </div>

      {location}

      <div className="grid2" style={{ gap: 10 }}>
        <div className="field">
          <label htmlFor="date">Date</label>
          <input className="inp" id="date" type="date" style={{ height: 44 }} />
        </div>
        <div className="field">
          <label htmlFor="time">Time</label>
          <input className="inp" id="time" type="time" style={{ height: 44 }} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="description">Describe what you saw</label>
        <textarea className="inp" id="description" style={{ height: 92 }} placeholder="What happened, who was involved, and what you saw." />
      </div>

      <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
        {EVIDENCE_TYPES.map((type) => (
          <EvidenceButton key={type.label} {...type} onAdd={(file) => setEvidence([...evidence, file])} />
        ))}
        <span className="hint">{evidence.length > 0 ? `${evidence.length} file(s) added` : "Optional"}</span>
      </div>

      <div className="card row" style={{ padding: "12px 14px" }}>
        <Icon name="shield" style={{ color: "var(--green)" }} />
        <span className="grow">
          <span className="h3" style={{ display: "block", fontSize: 14 }} id="anon-label">Report anonymously</span>
          <span className="sm">Your identity is hidden from public alerts</span>
        </span>
        <Switch checked={anonymous} onChange={setAnonymous} labelledBy="anon-label" />
      </div>
    </>
  );
}

type EvidenceButtonProps = { label: string; icon: IconName; accept: string; onAdd: (file: File) => void };

function EvidenceButton({ label, icon, accept, onAdd }: EvidenceButtonProps) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <>
      <button className="chip" type="button" style={{ height: 40, cursor: "pointer" }} onClick={() => input.current?.click()}>
        <Icon name={icon} size="s" style={{ width: 16, height: 16 }} />
        {label}
      </button>
      <input
        ref={input}
        type="file"
        accept={accept}
        capture="environment"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onAdd(file);
          e.target.value = "";
        }}
      />
    </>
  );
}
