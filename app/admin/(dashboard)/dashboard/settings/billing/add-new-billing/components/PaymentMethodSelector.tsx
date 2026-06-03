"use client";

import type { PaymentMethodOption } from "../addNewBilling.types";
import PaymentMethodRadioOption from "./PaymentMethodRadioOption";

interface PaymentMethodSelectorProps {
  options: PaymentMethodOption[];
  selectedId: PaymentMethodOption["id"];
  onSelect: (id: PaymentMethodOption["id"]) => void;
}

export default function PaymentMethodSelector({
  options,
  selectedId,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <h3 className="body-l-medium primary-text">Select Method</h3>

      <div role="radiogroup" aria-label="Select payment method" className="flex flex-col gap-3">
        {options.map((option) => (
          <PaymentMethodRadioOption
            key={option.id}
            option={option}
            selected={option.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
