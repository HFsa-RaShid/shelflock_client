"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

interface DropdownOption<T extends string> {
  value: T;
  label: string;
}

interface BillingCycleDropdownProps<T extends string> {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  onOpenChange?: (open: boolean) => void;
  variant?: "view" | "edit";
  ariaLabel?: string;
}

export default function BillingCycleDropdown<T extends string>({
  value,
  options,
  onChange,
  onOpenChange,
  variant = "view",
  ariaLabel = "Billing cycle",
}: BillingCycleDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label ?? "";

  const updateOpen = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        updateOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") updateOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const triggerBaseClass =
    "flex h-[40px] w-full items-center justify-between body-sm-regular primary-text outline-none transition-colors duration-150";

  const triggerVariantClass =
    variant === "edit"
      ? "rounded-[8px] border border-[#E9E9E9] bg-white px-3 focus-visible:border-[#F74608]"
      : "rounded-[8px] border border-transparent bg-transparent px-0 hover:border-[#E9E9E9] hover:bg-white hover:px-3";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => updateOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className={`${triggerBaseClass} ${triggerVariantClass}`}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={`h-4 w-4 text-[#7F8482] transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={2}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 rounded-[12px] border border-[#E9E9E9] bg-white p-2 shadow-[0_12px_32px_-12px_rgba(14,32,56,0.18)]"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  updateOpen(false);
                }}
                className={`flex h-12 w-full items-center justify-between rounded-[10px] px-4 body-sm-medium transition-colors duration-150 ${
                  isSelected
                    ? "bg-[#FFEFE8] primary-text"
                    : "primary-text hover:bg-[#FAFAFA]"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <Check
                    className="h-4 w-4 text-[#F74608]"
                    strokeWidth={2.5}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
