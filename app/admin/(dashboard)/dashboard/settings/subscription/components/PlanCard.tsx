"use client";

import { Check } from "lucide-react";
import type {
  BillingCycle,
  PlanAction,
  PricingPlan,
} from "../subscription.types";

interface PlanCardProps {
  plan: PricingPlan;
  cycle: BillingCycle;
  onSelect?: (planId: PricingPlan["id"], action: PlanAction) => void;
}

function formatPrice(value: number) {
  return value.toLocaleString("en-US");
}

function PlanActionButton({
  action,
  popular,
  onClick,
}: {
  action: PlanAction;
  popular: boolean;
  onClick?: () => void;
}) {
  if (action === "current") {
    return (
      <button
        type="button"
        disabled
        aria-disabled
        className="inline-flex h-[44px] w-full items-center justify-center rounded-[8px] bg-[#F9C8B4] px-5 body-sm-medium text-white"
      >
        Current Plan
      </button>
    );
  }

  const label = action === "upgrade" ? "Upgrade" : "Downgrade";

  if (popular) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex h-[44px] w-full items-center justify-center rounded-[8px] bg-[#F74608] px-5 body-sm-medium text-white transition-all duration-150 hover:bg-[#d93d07] active:scale-[0.99]"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-[44px] w-full items-center justify-center rounded-[8px] border border-[#E9E9E9] bg-white px-5 body-sm-medium primary-text transition-all duration-150 hover:bg-[#FAFAFA] active:scale-[0.99]"
    >
      {label}
    </button>
  );
}

export default function PlanCard({ plan, cycle, onSelect }: PlanCardProps) {
  const price = cycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  const cycleLabel = cycle === "monthly" ? "/ month" : "/ year";

  const isPopular = !!plan.isPopular;

  const cardContainerClass = isPopular
    ? "relative flex flex-col rounded-[16px] border-2 border-[#F74608] bg-gradient-to-br from-[#FFEFE8] via-white to-white p-5 sm:p-6 shadow-[0_10px_30px_-12px_rgba(247,70,8,0.35)]"
    : "relative flex flex-col rounded-[16px] border border-[#E9E9E9] bg-white p-5 sm:p-6";

  return (
    <div className={cardContainerClass}>
      {isPopular && (
        <span className="absolute right-5 top-5 inline-flex items-center rounded-full bg-white px-3 py-1 text-[12px] font-medium primary-text shadow-sm sm:right-6 sm:top-6">
          Popular
        </span>
      )}

      <h3 className="title-medium primary-text">{plan.name}</h3>
      <p className="body-sm-regular subtext mt-2">{plan.description}</p>

      <div className="mt-5 flex items-baseline gap-1.5 sm:mt-6">
        <span className="text-[44px] font-medium leading-none primary-text tracking-[-0.02em] sm:text-[48px]">
          ৳{formatPrice(price)}
        </span>
        <span className="body-sm-regular subtext">{cycleLabel}</span>
      </div>

      <ul className="mt-5 flex flex-col gap-3 sm:mt-6">
        {plan.features.map((feature) => (
          <li
            key={feature.text}
            className="flex items-center gap-2.5 body-sm-regular primary-text"
          >
            <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#0E2038]">
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            </span>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 sm:mt-8">
        <PlanActionButton
          action={plan.action}
          popular={isPopular}
          onClick={() => onSelect?.(plan.id, plan.action)}
        />
      </div>
    </div>
  );
}
