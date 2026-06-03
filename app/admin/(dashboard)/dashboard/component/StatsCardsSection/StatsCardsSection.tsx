import type { ReactNode } from "react";
import {
  Wallet,
  ShoppingBag,
  Users,
  Package,
  CircleDollarSign,
  ExternalLink,
} from "lucide-react";
import type {
  DashboardStatCard,
  StatsCardsSectionProps,
} from "./StatsCardsSection.type";

// স্ট্যাট কার্ড আইকন — 24×24 (w-6 h-6)
const statIcons: Record<string, ReactNode> = {
  "today-sales": <Wallet className="w-6 h-6 primary-text" />,
  "total-orders": <ShoppingBag className="w-6 h-6 primary-text" />,
  customer: <Users className="w-6 h-6 primary-text" />,
  "total-product": <Package className="w-6 h-6 primary-text" />,
  "total-revenue": <CircleDollarSign className="w-6 h-6 primary-text" />,
};

/** ট্রেন্ড টেক্সট — হাইলাইট + ধূসর সUFFIX (today / from ...) */
function renderTrendLabel(label: string, variant: DashboardStatCard["trendVariant"]) {
  const suffixMatch = label.match(/^(.+?)(\s+(?:today|from\s+.+))$/i);

  if (suffixMatch && variant === "warning") {
    return (
      <p className="body-sm-regular leading-[18px]">
        <span className="text-[#F74608]">{suffixMatch[1]}</span>
        <span className="subtext">{suffixMatch[2]}</span>
      </p>
    );
  }

  if (suffixMatch && variant === "positive") {
    return (
      <p className="body-sm-regular leading-[18px]">
        <span className="text-[#22A06B]">{suffixMatch[1]}</span>
        <span className="subtext">{suffixMatch[2]}</span>
      </p>
    );
  }

  const trendClass =
    variant === "warning"
      ? "text-[#F74608]"
      : variant === "positive"
        ? "text-[#22A06B]"
        : "subtext";

  return <p className={`body-sm-regular leading-[18px] ${trendClass}`}>{label}</p>;
}

export default function StatsCardsSection({
  overviewTitle,
  overviewSubtitle,
  stats,
}: StatsCardsSectionProps) {
  return (
    <section className="mb-6 w-full">
      {/* মেইন কন্টেইনার — 1136×240, radius 12px, padding/gap 16px */}
      <div className="w-full min-h-[240px] rounded-xl border border-[#E9E9E9] p-4 flex flex-col gap-4 bg-white">
        {/* Overview title — h6-medium 24px / description — body-sm-regular 14px */}
        <div className="flex flex-col gap-1">
          <h3 className="h6-medium primary-text">{overviewTitle}</h3>
          <p className="body-sm-regular subtext tracking-[-0.01em]">
            {overviewSubtitle}
          </p>
        </div>

        {/* কার্ড রো — fixed gap 16px, কার্ডগুলো সমানভাবে space-between / flex-1 */}
        <div className="flex flex-wrap sm:flex-nowrap justify-between gap-4 w-full">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex-1 min-w-[140px] min-h-[134px] rounded-[10px] border border-[#E9E9E9] p-4 flex flex-col gap-4 bg-white"
            >
              {/* কার্ড টপ — space-between, body-regular 16px */}
              <div className="flex items-center justify-between h-6 w-full">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 flex items-center justify-center shrink-0">
                    {statIcons[stat.id]}
                  </span>
                  <p className="body-regular primary-text truncate">{stat.title}</p>
                </div>
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center text-[#7F8482] hover:text-[#0E2038] shrink-0"
                  aria-label={`View ${stat.title} details`}
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* মূল ভ্যালু — h6-bold 24px, line-height 34px */}
              <p className="h6-bold primary-text leading-[34px]">{stat.value}</p>

              {/* নিচের টেক্সট — empty first-time overview এ hide */}
              {stat.trendLabel.trim() ? (
                renderTrendLabel(stat.trendLabel, stat.trendVariant)
              ) : (
                <span className="block h-[18px]" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
