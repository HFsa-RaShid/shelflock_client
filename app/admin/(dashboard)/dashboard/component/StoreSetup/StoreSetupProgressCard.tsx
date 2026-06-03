"use client";

import { Clock } from "lucide-react";
import StoreSetupProgressRing from "./StoreSetupProgressRing";

interface StoreSetupProgressCardProps {
  completedSteps: number;
  totalSteps: number;
  completionPercentage: number;
  estimatedMinutesLeft: number;
  /** skipped banner এ illustration hide */
  compact?: boolean;
}

/** Progress summary card — ring + linear bar + store illustration */
export default function StoreSetupProgressCard({
  completedSteps,
  totalSteps,
  completionPercentage,
  estimatedMinutesLeft,
  compact = false,
}: StoreSetupProgressCardProps) {
  return (
    <div
      className={`w-full rounded-xl border border-[#E9E9E9] bg-white flex flex-col sm:flex-row items-center gap-4 sm:gap-6 ${
        compact ? "p-4 sm:p-5" : "p-5 sm:p-6"
      }`}
    >
      <StoreSetupProgressRing
        percentage={completionPercentage}
        size={compact ? 96 : 112}
      />

      <div className="flex-1 w-full min-w-0 flex flex-col gap-3">
        <p className="body-l-medium primary-text leading-[140%]">
          {completedSteps} of {totalSteps} steps completed
        </p>
        <div className="h-2 w-full rounded-full bg-[#E9E9E9] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#34C759] transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className="flex items-center gap-1.5 body-sm-regular subtext">
          <Clock className="w-4 h-4 shrink-0" aria-hidden />
          <span>Est. time left: {estimatedMinutesLeft} min</span>
        </div>
      </div>

      {!compact && (
        <div
          className="hidden lg:flex items-center justify-center w-[120px] h-[100px] shrink-0"
          aria-hidden
        >
          <div className="relative">
            <div className="w-[88px] h-[72px] rounded-lg bg-[#F3F4F6] border border-[#E9E9E9] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-5 bg-[#6366F1]/80 rounded-t-lg" />
              <div className="absolute top-7 left-3 w-6 h-5 rounded-sm bg-white/90 border border-[#E9E9E9]" />
              <div className="absolute top-7 right-3 w-6 h-8 rounded-sm bg-white/90 border border-[#E9E9E9]" />
            </div>
            <div className="absolute -bottom-1 -right-2 w-8 h-8 rounded-full bg-[#34C759] border-2 border-white flex items-center justify-center text-white text-sm font-bold">
              ✓
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
