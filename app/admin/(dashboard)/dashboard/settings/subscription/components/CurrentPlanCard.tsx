"use client";

import { Check, Crown } from "lucide-react";
import type { CurrentPlan } from "../subscription.types";

interface CurrentPlanCardProps {
  plan: CurrentPlan;
  pageTitle?: string;
  pageDescription?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function CurrentPlanCard({
  plan,
  pageTitle = "Subscription",
  pageDescription = "Manage your current plan, renewal settings, and upgrade options to match your business needs.",
  actionLabel = "Manage billing",
  onAction,
}: CurrentPlanCardProps) {
  return (
    <section className="flex w-full max-w-[1128px] flex-col rounded-[12px] border border-[#E9E9E9] bg-white p-4 sm:p-5 lg:p-6 xl:max-w-none">
      <div className="min-w-0">
        <h2 className="body-l-medium primary-text">{pageTitle}</h2>
        <p className="body-sm-regular subtext mt-1">{pageDescription}</p>
      </div>

      <div className="mt-4 flex w-full flex-col gap-4 rounded-[12px] bg-[#FFEFE8] p-4 sm:mt-5 sm:p-5 md:flex-row md:items-start md:justify-between md:gap-6 lg:mt-6">
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white sm:h-11 sm:w-11">
            <Crown className="h-5 w-5 text-[#F74608]" strokeWidth={1.75} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="body-l-medium primary-text">{plan.name}</h3>
              {plan.isActive && (
                <span className="inline-flex items-center rounded-md bg-[#E8F8EF] px-2 py-0.5 text-[12px] font-medium text-[#22A06B]">
                  Active
                </span>
              )}
            </div>

            <p className="body-sm-regular subtext mt-1">
              <span>Next billing : {plan.nextBillingDate}</span>
              <span className="mx-1.5 text-[#D9D2CE]">|</span>
              <span className="primary-text body-sm-medium">
                {plan.priceLabel}
              </span>{" "}
              <span>{plan.cycleLabel}</span>
            </p>

            <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mt-4 sm:gap-x-6">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-1.5 body-sm-regular primary-text"
                >
                  <Check
                    className="h-4 w-4 text-[#7F8482]"
                    strokeWidth={2}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full shrink-0 md:w-auto">
          <button
            type="button"
            onClick={onAction}
            className="inline-flex h-[40px] w-full items-center justify-center rounded-[8px] bg-[#0E2038] px-5 body-sm-medium text-white transition-all duration-150 hover:bg-[#1a3055] active:scale-[0.98] md:w-auto"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
