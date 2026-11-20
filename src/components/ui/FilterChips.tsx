"use client";

type FilterChipsProps = {
  label: string; // read out by screen readers, e.g. "Filter news"
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

// A row of chips where one is selected at a time.
export function FilterChips({ label, options, value, onChange }: FilterChipsProps) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={option === value ? "chip on" : "chip"}
          aria-pressed={option === value}
          onClick={() => onChange(option)}
          style={{ cursor: "pointer" }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
