import { Check, SquareArrowOutUpRight, Truck, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { StatCard, StatCardIcon } from "./types";
import SegmentedProgress from "./SegmentedProgress";

const iconMap: Record<StatCardIcon, LucideIcon> = {
  check: Check,
  truck: Truck,
  x: X,
};

interface OrderStatCardProps {
  card: StatCard;
}

export default function OrderStatCard({ card }: OrderStatCardProps) {
  const Icon = iconMap[card.icon];

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[8px] border border-[#E9E9E9] bg-secondary">
      <div className="flex flex-col items-start gap-[10px] self-stretch border-b border-[#E9E9E9] p-3 sm:p-4">
        <div className="flex w-full min-w-0 items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#E9E9E9] bg-white">
              <Icon className="h-4 w-4 text-[#F74608]" strokeWidth={2.5} />
            </div>
            <span className="body-medium secondary truncate">{card.label}</span>
          </div>
          <button
            type="button"
            className="shrink-0 text-[#7F8482] transition-colors hover:text-[#0E2038]"
          >
            <SquareArrowOutUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-3 px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex w-full min-w-0 flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-2">
          <p className="h6-bold primary-text shrink-0 max-sm:text-[20px]">
            {card.count.toLocaleString()}
          </p>
          <p className="body-sm-regular subtext sm:text-right sm:whitespace-nowrap">
            {card.changeLabel}
          </p>
        </div>

        <SegmentedProgress
          percent={card.progressPercent}
          color={card.progressColor}
          segments={25}
        />
      </div>
    </div>
  );
}
