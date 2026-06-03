"use client";

import type { BillingCycle } from "../subscription.types";

interface BillingCycleToggleProps {
  value: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
  yearlySavingsLabel?: string;
}

export default function BillingCycleToggle({
  value,
  onChange,
  yearlySavingsLabel = "15% Save",
}: BillingCycleToggleProps) {
  const isMonthly = value === "monthly";

  return (
    <div
      role="tablist"
      aria-label="Billing cycle"
      className="inline-flex h-[44px] items-center rounded-full bg-[#F4F4F4] p-1"
    >
      <button
        type="button"
        role="tab"
        aria-selected={isMonthly}
        onClick={() => onChange("monthly")}
        className={`flex h-9 items-center justify-center rounded-full px-5 body-sm-medium transition-all duration-200 ${
          isMonthly
            ? "bg-white primary-text shadow-sm"
            : "text-[#7F8482] hover:text-[#0E2038]"
        }`}
      >
        Monthly
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={!isMonthly}
        onClick={() => onChange("yearly")}
        className={`flex h-9 items-center justify-center gap-2 rounded-full px-5 body-sm-medium transition-all duration-200 ${
          !isMonthly
            ? "bg-white primary-text shadow-sm"
            : "text-[#7F8482] hover:text-[#0E2038]"
        }`}
      >
        <span>Yearly</span>
        <span className="inline-flex items-center rounded-md bg-[#FFEFE8] px-1.5 py-0.5 text-[11px] font-medium text-[#F74608]">
          {yearlySavingsLabel}
        </span>
      </button>
    </div>
  );
}
