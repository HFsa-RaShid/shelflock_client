"use client";

import StoreSetupProgressCard from "./StoreSetupProgressCard";
import type { StoreSetupStatus } from "./StoreSetup.type";

interface StoreSetupSkippedBannerProps {
  data: StoreSetupStatus;
  onCompleteSetup: () => void;
}

/**
 * Skip করার পর — checklist hide, শুধু progress + Complete setup btn
 * Figma: collapsed banner above empty overview
 */
export default function StoreSetupSkippedBanner({
  data,
  onCompleteSetup,
}: StoreSetupSkippedBannerProps) {
  return (
    <section className="w-full mb-6 rounded-xl border border-[#E9E9E9] bg-white p-5 sm:p-6 flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="h6-medium primary-text">{data.title}</h2>
          <p className="body-sm-regular subtext mt-1 max-w-xl">{data.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onCompleteSetup}
          className="shrink-0 h-10 px-5 rounded-lg bg-[#0E2038] text-white body-sm-medium hover:opacity-90 transition-opacity"
        >
          Complete setup
        </button>
      </div>

      <StoreSetupProgressCard
        completedSteps={data.completedSteps}
        totalSteps={data.totalSteps}
        completionPercentage={data.completionPercentage}
        estimatedMinutesLeft={data.estimatedMinutesLeft}
        compact
      />
    </section>
  );
}
