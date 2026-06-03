"use client";

import { useEffect } from "react";
import { Trash2 } from "lucide-react";

interface RemovePaymentMethodModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
}

export default function RemovePaymentMethodModal({
  open,
  onClose,
  onConfirm,
  title = "Remove Payment Method?",
  description = "This payment method will no longer be available for future payments or renewals.",
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
}: RemovePaymentMethodModalProps) {
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
      aria-labelledby="remove-payment-method-title"
      aria-describedby="remove-payment-method-description"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-[#0E2038]/50"
      />

      <div className="relative z-10 w-full max-w-[520px] rounded-[20px] bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex justify-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#E9E9E9] bg-white">
            <Trash2 className="h-5 w-5 text-[#C53030]" strokeWidth={2} />
          </div>
        </div>

        <div className="mt-5 text-center sm:mt-6">
          <h2
            id="remove-payment-method-title"
            className="h6-semibold primary-text"
          >
            {title}
          </h2>
          <p
            id="remove-payment-method-description"
            className="body-regular subtext mx-auto mt-3 max-w-[420px]"
          >
            {description}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="inline-flex h-[48px] items-center justify-center rounded-[12px] border border-[#E9E9E9] bg-white px-5 body-medium primary-text transition-all duration-150 hover:bg-[#FAFAFA] active:scale-[0.99] sm:h-[52px]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-[48px] items-center justify-center rounded-[12px] bg-[#C53030] px-5 body-medium text-white transition-all duration-150 hover:bg-[#A82626] active:scale-[0.99] sm:h-[52px]"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
