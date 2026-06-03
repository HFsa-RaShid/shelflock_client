"use client";

import StoreSetupProgressCard from "./StoreSetupProgressCard";
import StoreSetupStepsList from "./StoreSetupStepsList";
import StoreSetupSidebar from "./StoreSetupSidebar";
import type { StoreSetupStatus } from "./StoreSetup.type";

interface StoreSetupFullProps {
  data: StoreSetupStatus;
  onSkip: () => void | Promise<void>;
}

/**
 * Full setup view — first login
 * Checklist + sidebar + Skip Now (Figma full page)
 */
export default function StoreSetupFull({ data, onSkip }: StoreSetupFullProps) {
  return (
    <section className="w-full mb-6 flex flex-col gap-5">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="min-w-0">
          <h2 className="h6-medium primary-text">{data.title}</h2>
          <p className="body-sm-regular subtext mt-1 max-w-2xl">{data.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={() => onSkip()}
          className="shrink-0 h-10 px-5 rounded-lg bg-[#F74608] text-white body-sm-medium hover:opacity-90 transition-opacity cursor-pointer"
        >
          Skip Now
        </button>
      </div>

      {/* Progress summary */}
      <StoreSetupProgressCard
        completedSteps={data.completedSteps}
        totalSteps={data.totalSteps}
        completionPercentage={data.completionPercentage}
        estimatedMinutesLeft={data.estimatedMinutesLeft}
      />

      {/* Checklist + sidebar */}
      <div className="flex flex-col xl:flex-row gap-4 w-full">
        <div className="flex-[2] min-w-0">
          <StoreSetupStepsList steps={data.steps} />
        </div>
        <div className="xl:w-[300px] shrink-0">
          <StoreSetupSidebar
            recommendedStep={data.recommendedStep}
            benefits={data.benefits}
            rewards={data.rewards}
            encouragementText={data.encouragementText}
            completionPercentage={data.completionPercentage}
          />
        </div>
      </div>
    </section>
  );
}
