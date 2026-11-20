"use client";

import { useRef, useState } from "react";

const CODE_LENGTH = 6;

// Six single-digit boxes. Typing moves to the next box, Backspace moves back,
// and pasting a full code fills every box.
export function CodeInput() {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function focusBox(index: number) {
    inputs.current[Math.max(0, Math.min(index, CODE_LENGTH - 1))]?.focus();
  }

  function handleChange(index: number, value: string) {
    const typed = value.replace(/\D/g, "");
    if (!typed) return;

    const next = [...digits];
    // Fill from this box onwards (handles paste of the whole code too).
    typed
      .slice(0, CODE_LENGTH - index)
      .split("")
      .forEach((digit, offset) => (next[index + offset] = digit));
    setDigits(next);
    focusBox(index + typed.length);
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Backspace") return;
    event.preventDefault();

    const next = [...digits];
    if (next[index]) {
      next[index] = "";
    } else if (index > 0) {
      next[index - 1] = "";
      focusBox(index - 1);
    }
    setDigits(next);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${CODE_LENGTH}, minmax(0, 1fr))`, gap: 8 }}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputs.current[index] = el;
          }}
          className="inp"
          aria-label={`Digit ${index + 1}`}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={(e) => e.target.select()}
          style={{
            height: 56,
            textAlign: "center",
            fontSize: 22,
            fontWeight: 700,
            padding: 0,
            borderColor: digit ? "var(--green)" : undefined,
          }}
        />
      ))}
    </div>
  );
}
