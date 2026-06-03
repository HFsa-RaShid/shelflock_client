"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { PaymentMethod } from "../billing.types";
import PaymentProviderMark from "./PaymentProviderMark";

interface PaymentMethodRowProps {
  method: PaymentMethod;
  onSetPrimary?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#E9E9E9] bg-white text-[#7F8482] transition-all duration-150 hover:bg-[#FAFAFA] hover:text-[#0E2038] active:scale-[0.98]"
    >
      {children}
    </button>
  );
}

export default function PaymentMethodRow({
  method,
  onSetPrimary,
  onEdit,
  onDelete,
}: PaymentMethodRowProps) {
  return (
    <div className="flex w-full items-center justify-between gap-3 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <PaymentProviderMark provider={method.provider} />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="body-sm-medium primary-text">{method.label}</span>
            {method.isPrimary && (
              <span className="inline-flex items-center rounded-md bg-[#E8F8EF] px-2 py-0.5 text-[12px] font-medium text-[#22A06B]">
                Primary
              </span>
            )}
          </div>
          <p className="body-sm-regular subtext mt-0.5">
            {method.accountNumber}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {!method.isPrimary && (
          <button
            type="button"
            onClick={() => onSetPrimary?.(method.id)}
            className="hidden h-9 items-center justify-center rounded-[8px] border border-[#E9E9E9] bg-white px-3 body-sm-regular primary-text transition-all duration-150 hover:bg-[#FAFAFA] active:scale-[0.98] sm:inline-flex"
          >
            Set as Primary
          </button>
        )}

        <IconButton label="Edit payment method" onClick={() => onEdit?.(method.id)}>
          <Pencil className="h-4 w-4" strokeWidth={1.75} />
        </IconButton>

        <IconButton label="Delete payment method" onClick={() => onDelete?.(method.id)}>
          <Trash2 className="h-4 w-4" strokeWidth={1.75} />
        </IconButton>
      </div>
    </div>
  );
}
