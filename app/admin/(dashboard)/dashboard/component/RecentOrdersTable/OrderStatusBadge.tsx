import { Check, Loader2, X } from "lucide-react";
import type { RecentOrderStatus } from "./RecentOrdersTable.type";

const statusConfig: Record<
  RecentOrderStatus,
  { bg: string; text: string; icon: React.ReactNode }
> = {
  Pending: {
    bg: "bg-[#FEEFE4]",
    text: "text-[#FA7319]",
    icon: <Loader2 className="w-3 h-3 shrink-0" />,
  },
  Done: {
    bg: "bg-[#E4FFED]",
    text: "text-[#46D877]",
    icon: <Check className="w-3 h-3 shrink-0" />,
  },
  Rejected: {
    bg: "bg-[#FEEFF2]",
    text: "text-[#DF1C41]",
    icon: <X className="w-3 h-3 shrink-0" />,
  },
};

export default function OrderStatusBadge({ status }: { status: RecentOrderStatus }) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center justify-center gap-1 min-w-[68px] h-6 rounded-md py-0.5 pl-1 pr-2 font-medium leading-[150%] text-[10px] ${config.bg} ${config.text}`}
    >
      {config.icon}
      {status}
    </span>
  );
}
