"use client";

import { useState } from "react";
import { samplePollingUnits } from "@/lib/sample-locations";

// List of polling units in the chosen ward; the user picks one.
export function PollingUnitPicker() {
  const [selectedCode, setSelectedCode] = useState(samplePollingUnits[0]?.code);

  return (
    <div className="card" role="radiogroup" aria-label="Polling unit" style={{ padding: "6px 14px" }}>
      {samplePollingUnits.map((unit) => {
        const isSelected = unit.code === selectedCode;
        return (
          <button
            key={unit.code}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className="li"
            onClick={() => setSelectedCode(unit.code)}
          >
            <span className="grow">
              <span className="h3" style={{ display: "block" }}>{unit.name}</span>
              <span className="sm">{unit.code}</span>
            </span>
            <span className="radio" style={isSelected ? { border: "7px solid var(--green)" } : undefined} />
          </button>
        );
      })}
    </div>
  );
}
