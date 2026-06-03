"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { PaymentMethod } from "../billing.types";
import PaymentMethodRow from "./PaymentMethodRow";

interface ViewAllPaymentMethodsModalProps {
  open: boolean;
  methods: PaymentMethod[];
  onClose: () => void;
  onSetPrimary?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ViewAllPaymentMethodsModal({
  open,
  methods,
  onClose,
  onSetPrimary,
  onEdit,
  onDelete,
}: ViewAllPaymentMethodsModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-methods-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-[#0E2038]/50"
      />

      <div className="relative z-10 flex max-h-[85vh] w-full max-w-[860px] flex-col overflow-hidden rounded-[16px] bg-white shadow-2xl">
        <div className="flex w-full items-center justify-between gap-3 border-b border-[#F1F1F1] px-5 py-4 sm:px-6 sm:py-5">
          <h2
            id="payment-methods-modal-title"
            className="h6-semibold primary-text"
          >
            Payment Methods
          </h2>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-[8px] text-[#7F8482] transition-colors duration-150 hover:bg-[#FAFAFA] hover:text-[#0E2038]"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-2 sm:px-6">
          {methods.length === 0 ? (
            <div className="py-10 text-center body-sm-regular subtext">
              No payment methods yet.
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[#F1F1F1]">
              {methods.map((method) => (
                <PaymentMethodRow
                  key={method.id}
                  method={method}
                  onSetPrimary={onSetPrimary}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
