"use client";

import type { InputHTMLAttributes } from "react";

type MoneyInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange" | "inputMode"
> & {
  value: string;
  onValueChange: (value: string) => void;
};

function displayAmount(value: string) {
  const [integer, fraction] = value.split(".");
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return grouped + (fraction === undefined ? "" : `,${fraction}`);
}

export default function MoneyInput({
  value,
  onValueChange,
  ...props
}: MoneyInputProps) {
  return (
    <input
      {...props}
      type="text"
      inputMode="decimal"
      autoComplete="off"
      spellCheck={false}
      value={displayAmount(value)}
      onChange={(event) => {
        const input = event.currentTarget;
        const text = input.value;
        const normalized = text.replace(/[.\s$]/g, "");
        if (!/^-?\d*(,\d{0,2})?$/.test(normalized)) return;
        const beforeCaret = text
          .slice(0, input.selectionStart ?? text.length)
          .replace(/[.\s$]/g, "").length;
        onValueChange(normalized.replace(",", "."));
        // Keep the cursor beside the edited digit when grouping inserts a dot.
        requestAnimationFrame(() => {
          if (document.activeElement !== input) return;
          let position = 0;
          let significant = 0;
          while (position < input.value.length && significant < beforeCaret) {
            if (input.value[position] !== ".") significant++;
            position++;
          }
          input.setSelectionRange(position, position);
        });
      }}
    />
  );
}
