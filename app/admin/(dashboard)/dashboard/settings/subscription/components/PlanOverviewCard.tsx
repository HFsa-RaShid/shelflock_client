import type { UsageMetric } from "../subscription.types";
import UsageProgressBar from "./UsageProgressBar";

interface PlanOverviewCardProps {
  usage: UsageMetric[];
}

export default function PlanOverviewCard({ usage }: PlanOverviewCardProps) {
  return (
    <section className="flex h-full w-full flex-col rounded-[12px] border border-[#E9E9E9] bg-white p-4 sm:p-5 lg:p-6">
      <h2 className="body-l-medium primary-text">Plan Overview</h2>

      <div className="mt-4 grid w-full grid-cols-1 gap-5 sm:mt-5 sm:grid-cols-3 sm:gap-6 lg:mt-6">
        {usage.map((item) => (
          <div key={item.label} className="flex min-w-0 flex-col gap-2">
            <p className="body-sm-regular subtext">{item.label}</p>
            <p className="body-l-medium primary-text">{item.displayValue}</p>

            <UsageProgressBar
              used={item.used}
              limit={item.limit}
              color={item.barColor}
            />

            <p className="body-sm-regular subtext">{item.helperText}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
