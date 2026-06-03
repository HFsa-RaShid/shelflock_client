"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type {
  BillingCycle,
  PlanAction,
  PricingPlan,
} from "../subscription.types";
import BillingCycleToggle from "./BillingCycleToggle";
import PlanCard from "./PlanCard";

interface ChangePlanSectionProps {
  plans: PricingPlan[];
  onSelectPlan?: (planId: PricingPlan["id"], action: PlanAction) => void;
  onContactSales?: () => void;
}

export default function ChangePlanSection({
  plans,
  onSelectPlan,
  onContactSales,
}: ChangePlanSectionProps) {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <section className="flex w-full max-w-[1128px] flex-col rounded-[12px] border border-[#E9E9E9] bg-white p-4 sm:p-5 lg:p-6 xl:max-w-none">
      <div className="min-w-0">
        <h2 className="body-l-medium primary-text">Change Plan</h2>
        <p className="body-sm-regular subtext mt-1">
          Manage your plan, stores, billing and renewal settings
        </p>
      </div>

      <div className="mt-4 flex w-full justify-center sm:mt-6 lg:mt-8">
        <BillingCycleToggle value={cycle} onChange={setCycle} />
      </div>

      <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:gap-5 lg:mt-8 lg:grid-cols-3 lg:gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            cycle={cycle}
            onSelect={onSelectPlan}
          />
        ))}
      </div>

      <div className="mt-6 flex w-full flex-col items-center gap-3 sm:mt-8">
        <p className="body-sm-regular subtext text-center">
          Need a custom plan? We&apos;ve got you covered.
        </p>
        <button
          type="button"
          onClick={onContactSales}
          className="inline-flex items-center gap-2 body-sm-medium adsfixter-primary-text transition-opacity duration-150 hover:opacity-80"
        >
          <span>Contact Sales</span>
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
