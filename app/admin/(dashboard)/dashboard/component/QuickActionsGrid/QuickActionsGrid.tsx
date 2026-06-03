import type { ReactNode } from "react";
import Link from "next/link";
import {
  ChevronRight,
  PackageCheck,
  BadgePercent,
  Truck,
  Flame,
  ClipboardList,
} from "lucide-react";
import type { QuickActionsGridProps } from "./QuickActionsGrid.type";

const actionIcons: Record<string, ReactNode> = {
  "add-product": <PackageCheck className="w-4 h-4 text-[#F74608]" />,
  "create-offers": <BadgePercent className="w-4 h-4 text-[#F74608]" />,
  "track-delivery": <Truck className="w-4 h-4 text-[#F74608]" />,
  "manage-offers": <Flame className="w-4 h-4 text-[#F74608]" />,
  reports: <ClipboardList className="w-4 h-4 text-[#F74608]" />,
};

export default function QuickActionsGrid({ actions }: QuickActionsGridProps) {
  return (
    <section className="w-full mt-6 min-h-[153px]">
      <div className="flex flex-wrap justify-between gap-4 w-full">
        {actions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className="flex flex-1 min-w-[160px] max-w-full min-h-[153px] rounded-[10px] border border-[#E9E9E9] bg-white pt-5 pr-5 pb-4 pl-5 items-center justify-between gap-3 hover:border-[#F74608]/40 hover:shadow-sm transition-all group"
          >
            <div className="flex flex-col gap-3 min-w-0 flex-1">
              <span
                className="w-8 h-8 flex items-center justify-center rounded-md shrink-0"
                style={{ background: "rgba(247, 70, 8, 0.06)" }}
              >
                {actionIcons[action.id]}
              </span>
              <div className="flex flex-col gap-1 min-w-0">
                <p className="body-l-medium primary-text leading-[140%]">
                  {action.title}
                </p>
                <p className="body-sm-regular subtext leading-[150%] tracking-[-0.01em] line-clamp-2">
                  {action.description}
                </p>
              </div>
            </div>

            <span className="w-[26px] h-[26px] rounded-full border border-[#E9E9E9] flex items-center justify-center shrink-0 group-hover:border-[#F74608]/30 transition-colors">
              <ChevronRight className="w-4 h-4 primary-text" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
