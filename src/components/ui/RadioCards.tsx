"use client";

import { Icon, type IconName } from "@/components/ui/Icon";

export type RadioCardOption<T extends string> = {
  value: T;
  title: string;
  hint?: string;
  icon?: IconName;
  tone?: string; // tile colour class, e.g. "t-g"
};

type RadioCardsProps<T extends string> = {
  label: string; // read out by screen readers
  options: RadioCardOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

// A vertical list of large selectable cards (one can be chosen).
export function RadioCards<T extends string>({ label, options, value, onChange }: RadioCardsProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={isSelected ? "opt on" : "opt"}
            onClick={() => onChange(option.value)}
          >
            {option.icon ? (
              <span className={`tile ${option.tone ?? "t-n"}`}>
                <Icon name={option.icon} />
              </span>
            ) : (
              <span className="radio" />
            )}
            <span className="grow" style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>{option.title}</span>
              {option.hint && <span className="sm">{option.hint}</span>}
            </span>
            {option.icon && <span className="radio" />}
          </button>
        );
      })}
    </div>
  );
}
