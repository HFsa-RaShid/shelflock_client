"use client";

import type { ReactNode } from "react";
import {
  Check,
  ImageIcon,
  Package,
  Palette,
  Store,
  Truck,
  Wallet,
  Wrench,
} from "lucide-react";
import BlackBtn from "@/components/button/BlackBtn";
import type { StoreSetupStep } from "./StoreSetup.type";

const stepIcons: Record<string, ReactNode> = {
  store: <Store className="w-5 h-5 text-[#F74608]" />,
  image: <ImageIcon className="w-5 h-5 text-[#F74608]" />,
  package: <Package className="w-5 h-5 text-[#F74608]" />,
  wallet: <Wallet className="w-5 h-5 text-[#F74608]" />,
  truck: <Truck className="w-5 h-5 text-[#F74608]" />,
  palette: <Palette className="w-5 h-5 text-[#F74608]" />,
  wrench: <Wrench className="w-5 h-5 text-[#F74608]" />,
};

interface StoreSetupStepsListProps {
  steps: StoreSetupStep[];
}

/** 7-step checklist — Figma left column */
export default function StoreSetupStepsList({ steps }: StoreSetupStepsListProps) {
  return (
    <div className="w-full rounded-xl border border-[#E9E9E9] bg-white overflow-hidden">
      <ul className="divide-y divide-[#E9E9E9]">
        {steps.map((step) => (
          <li
            key={step.id}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 sm:px-5 sm:py-4"
          >
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 body-sm-medium ${
                  step.status === "completed"
                    ? "bg-[#34C759] text-white"
                    : "bg-[#F3F4F6] text-[#666D80] border border-[#E9E9E9]"
                }`}
              >
                {step.status === "completed" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.stepNumber
                )}
              </span>

              <span className="w-10 h-10 rounded-lg bg-[#FFF3E8] flex items-center justify-center shrink-0">
                {stepIcons[step.iconKey] ?? stepIcons.store}
              </span>

              <div className="min-w-0">
                <p className="body-l-medium primary-text leading-[140%]">
                  {step.title}
                </p>
                <p className="body-sm-regular subtext leading-[150%] mt-0.5">
                  {step.description}
                </p>
              </div>
            </div>

            <div className="shrink-0 sm:ml-auto pl-11 sm:pl-0">
              {step.status === "completed" ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#E8F8EF] text-[#22A06B] body-sm-medium">
                  <Check className="w-3.5 h-3.5" />
                  Completed
                </span>
              ) : (
                step.actionLabel &&
                (step.actionHref ? (
                  <BlackBtn href={step.actionHref} className="min-w-[120px]">
                    {step.actionLabel}
                  </BlackBtn>
                ) : (
                  <BlackBtn className="min-w-[120px]">{step.actionLabel}</BlackBtn>
                ))
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
