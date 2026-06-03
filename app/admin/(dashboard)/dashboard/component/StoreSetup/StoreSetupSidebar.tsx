"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  Cpu,
  Gift,
  Headphones,
  HelpCircle,
  ImageIcon,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import type {
  StoreSetupBenefit,
  StoreSetupRecommendedStep,
  StoreSetupReward,
} from "./StoreSetup.type";

const rewardIcons: Record<string, ReactNode> = {
  chart: <BarChart3 className="w-4 h-4 text-[#666D80]" />,
  workflow: <Cpu className="w-4 h-4 text-[#666D80]" />,
  template: <Sparkles className="w-4 h-4 text-[#666D80]" />,
  support: <Headphones className="w-4 h-4 text-[#666D80]" />,
};

interface StoreSetupSidebarProps {
  recommendedStep: StoreSetupRecommendedStep;
  benefits: StoreSetupBenefit[];
  rewards: StoreSetupReward[];
  encouragementText: string;
  completionPercentage: number;
}

/** Right sidebar — recommended, benefits, rewards */
export default function StoreSetupSidebar({
  recommendedStep,
  benefits,
  rewards,
  encouragementText,
  completionPercentage,
}: StoreSetupSidebarProps) {
  return (
    <aside className="w-full flex flex-col gap-4">
      {/* Recommended next step */}
      <div className="rounded-xl border border-[#E9E9E9] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[#F74608]" />
          <h4 className="body-sm-medium primary-text">Recommended Next Step</h4>
        </div>
        <div className="flex items-start gap-3">
          <span className="w-10 h-10 rounded-lg bg-[#FFF3E8] flex items-center justify-center shrink-0">
            <ImageIcon className="w-5 h-5 text-[#F74608]" />
          </span>
          <div className="min-w-0">
            <p className="body-sm-medium primary-text">{recommendedStep.title}</p>
            <p className="body-sm-regular subtext mt-0.5">
              {recommendedStep.description}
            </p>
          </div>
        </div>
        {recommendedStep.actionHref ? (
          <Link
            href={recommendedStep.actionHref}
            className="inline-flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-[#F74608] text-white body-sm-medium hover:opacity-90 transition-opacity"
          >
            {recommendedStep.actionLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-[#F74608] text-white body-sm-medium hover:opacity-90 transition-opacity"
          >
            {recommendedStep.actionLabel}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Why complete setup */}
      <div className="rounded-xl border border-[#E9E9E9] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#666D80]" />
          <h4 className="body-sm-medium primary-text">Why Complete Setup?</h4>
        </div>
        <ul className="space-y-2">
          {benefits.map((item) => (
            <li key={item.id} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#34C759] shrink-0 mt-0.5" />
              <span className="body-sm-regular subtext">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Setup rewards */}
      <div className="rounded-xl border border-[#E9E9E9] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Gift className="w-4 h-4 text-[#666D80]" />
          <h4 className="body-sm-medium primary-text">Setup Rewards</h4>
        </div>
        <p className="body-sm-regular subtext">Complete all the steps to unlock:</p>
        <ul className="space-y-2">
          {rewards.map((item) => (
            <li key={item.id} className="flex items-center gap-2">
              {rewardIcons[item.iconKey]}
              <span className="body-sm-regular subtext">{item.label}</span>
            </li>
          ))}
        </ul>
        <div className="pt-2 border-t border-[#E9E9E9] flex flex-col gap-2">
          <p className="body-sm-regular primary-text">
            {encouragementText} 🎉
          </p>
          <div className="h-1.5 w-full rounded-full bg-[#E9E9E9] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#F74608]"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
