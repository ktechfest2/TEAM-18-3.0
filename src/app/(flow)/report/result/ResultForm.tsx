"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SelectField } from "@/components/ui/SelectField";

// PLACEHOLDER party names — replace with the official list for the election.
const PARTIES = ["Party A", "Party B", "Party C", "Party D"];

const toNumber = (value: string) => Number(value) || 0;

// Result figures as written on the polling unit result sheet.
// Checks that the party votes add up to the valid votes.
export function ResultForm() {
  const [partyVotes, setPartyVotes] = useState<Record<string, string>>({});
  const [validVotes, setValidVotes] = useState("");
  const [rejected, setRejected] = useState("");
  const [accredited, setAccredited] = useState("");

  const partyTotal = PARTIES.reduce((sum, party) => sum + toNumber(partyVotes[party] ?? ""), 0);
  const hasFigures = partyTotal > 0 && validVotes !== "";
  const totalsMatch = partyTotal === toNumber(validVotes);

  return (
    <>
      <SelectField id="winner" label="Party announced as winner" options={PARTIES} placeholder="Select party" />

      <div className="between" style={{ marginTop: 2 }}>
        <p className="flabel">Votes per party</p>
        <span className="hint">As shown on the result sheet</span>
      </div>
      <div className="card" style={{ padding: "4px 14px" }}>
        {PARTIES.map((party) => {
          const id = `votes-${party}`;
          return (
            <div key={party} className="li" style={{ padding: "8px 0" }}>
              <label htmlFor={id} className="grow" style={{ fontSize: 14, fontWeight: 600 }}>
                {party}
              </label>
              <NumberInput
                id={id}
                value={partyVotes[party] ?? ""}
                onChange={(value) => setPartyVotes({ ...partyVotes, [party]: value })}
                style={{ width: 96, height: 40, textAlign: "right" }}
              />
            </div>
          );
        })}
        {/* TODO: allow adding parties not in the list */}
        <button type="button" className="link" style={{ display: "block", padding: "10px 0", fontSize: 13, background: "none", border: 0, cursor: "pointer" }}>
          + Add party
        </button>
      </div>

      <div className="grid3" style={{ gap: 8 }}>
        <SmallNumberField id="validVotes" label="Valid votes" value={validVotes} onChange={setValidVotes} />
        <SmallNumberField id="rejected" label="Rejected" value={rejected} onChange={setRejected} />
        <SmallNumberField id="accredited" label="Accredited" value={accredited} onChange={setAccredited} />
      </div>

      {hasFigures &&
        (totalsMatch ? (
          <div className="priv" style={{ padding: "10px 12px" }} role="status">
            <Icon name="check" size="s" />
            <span>Party votes add up to valid votes ({partyTotal}).</span>
          </div>
        ) : (
          <div className="warn" style={{ padding: "10px 12px" }} role="status">
            <Icon name="alert" size="s" />
            <span>
              Party votes add up to {partyTotal}, but valid votes is {toNumber(validVotes)}. Check the figures on the
              result sheet.
            </span>
          </div>
        ))}
    </>
  );
}

type NumberInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
};

function NumberInput({ id, value, onChange, style }: NumberInputProps) {
  return (
    <input
      className="inp"
      id={id}
      inputMode="numeric"
      placeholder="0"
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
      style={{ fontWeight: 700, ...style }}
    />
  );
}

function SmallNumberField({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="field">
      <label htmlFor={id} style={{ fontSize: 12 }}>
        {label}
      </label>
      <NumberInput id={id} value={value} onChange={onChange} style={{ height: 44 }} />
    </div>
  );
}
