"use client";

import { Plus } from "lucide-react";
import type { PaymentMethod } from "../billing.types";
import PaymentMethodRow from "./PaymentMethodRow";

interface PaymentMethodsCardProps {
  methods: PaymentMethod[];
  previewLimit?: number;
  onSetPrimary?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAddMethod?: () => void;
  onViewAll?: () => void;
}

export default function PaymentMethodsCard({
  methods,
  previewLimit = 2,
  onSetPrimary,
  onEdit,
  onDelete,
  onAddMethod,
  onViewAll,
}: PaymentMethodsCardProps) {
  const previewMethods = methods.slice(0, previewLimit);
  const hasMore = methods.length > previewMethods.length;

  return (
    <section className="flex h-full w-full flex-col rounded-[12px] border border-[#E9E9E9] bg-white p-4 sm:p-5 lg:p-6">
      <div className="flex w-full items-center justify-between gap-3">
        <h2 className="body-l-medium primary-text">Payment Methods</h2>

        {hasMore && (
          <button
            type="button"
            onClick={onViewAll}
            className="body-sm-medium adsfixter-primary-text underline-offset-4 transition-opacity duration-150 hover:opacity-80 hover:underline"
          >
            View all
          </button>
        )}
      </div>

      <div className="mt-2 flex flex-col divide-y divide-[#F1F1F1]">
        {previewMethods.map((method) => (
          <PaymentMethodRow
            key={method.id}
            method={method}
            onSetPrimary={onSetPrimary}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={onAddMethod}
          className="inline-flex h-[40px] items-center justify-center gap-1.5 rounded-[8px] border border-dashed border-[#D9D9D9] bg-white px-4 body-sm-regular primary-text transition-all duration-150 hover:border-[#7F8482] hover:bg-[#FAFAFA] active:scale-[0.99]"
        >
          <Plus className="h-4 w-4 text-[#7F8482]" strokeWidth={2} />
          <span>Add Payment Method</span>
        </button>
      </div>
    </section>
  );
}
