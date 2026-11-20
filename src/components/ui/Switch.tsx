"use client";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** id of the element that names this switch (for screen readers). */
  labelledBy?: string;
  label?: string;
};

// On/off toggle styled like the designs (.sw).
export function Switch({ checked, onChange, labelledBy, label }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={checked ? "sw on" : "sw"}
      onClick={() => onChange(!checked)}
      style={{ border: 0, padding: 0, cursor: "pointer" }}
    />
  );
}
