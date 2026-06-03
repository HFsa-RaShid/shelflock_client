"use client";

import type { PaymentMethodOption } from "../addNewBilling.types";
import MethodIconTile from "./MethodIconTile";

interface PaymentMethodRadioOptionProps {
  option: PaymentMethodOption;
  selected: boolean;
  onSelect: (id: PaymentMethodOption["id"]) => void;
}

export default function PaymentMethodRadioOption({
  option,
  selected,
  onSelect,
}: PaymentMethodRadioOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(option.id)}
      className={`flex w-full items-center justify-between gap-3 rounded-[12px] border bg-white px-4 py-3 text-left transition-all duration-150 hover:bg-[#FAFAFA] active:scale-[0.995] ${
        selected
          ? "border-[#F74608] bg-[#FFFBF9] shadow-[0_0_0_3px_rgba(247,70,8,0.08)]"
          : "border-[#E9E9E9]"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <MethodIconTile provider={option.id} />

        <div className="min-w-0">
          <p className="body-sm-medium primary-text">{option.name}</p>
          <p className="body-sm-regular subtext mt-0.5">{option.description}</p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-150 ${
          selected ? "border-[#F74608]" : "border-[#D9D9D9]"
        }`}
      >
        {selected && (
          <span className="h-2.5 w-2.5 rounded-full bg-[#F74608]" />
        )}
      </span>
    </button>
  );
}
