import { Check, Clock, Loader, X } from "lucide-react";
import type { ReactNode } from "react";
import type { OrderStatus } from "./types";

const statusConfig: Record<
  OrderStatus,
  { bg: string; text: string; icon: ReactNode }
> = {
  Pending: {
    bg: "bg-[#FFF3E8]",
    text: "text-[#F74608]",
    icon: <Loader className="w-3.5 h-3.5" />,
  },
  Done: {
    bg: "bg-[#E8F8EF]",
    text: "text-[#22A06B]",
    icon: <Check className="w-3.5 h-3.5" />,
  },
  Processing: {
    bg: "bg-[#E8F0FF]",
    text: "text-[#2B6CB0]",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  Rejected: {
    bg: "bg-[#FEE8E8]",
    text: "text-[#E53E3E]",
    icon: <X className="w-3.5 h-3.5" />,
  },
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full body-sm-medium ${config.bg} ${config.text}`}
    >
      {config.icon}
      {status}
    </span>
  );
}
