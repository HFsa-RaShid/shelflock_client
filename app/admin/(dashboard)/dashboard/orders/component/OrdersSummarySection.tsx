import { Calendar, Download } from "lucide-react";
import Primarybtn from "@/components/button/PrimaryBtn";
import SecondaryBtn from "@/components/button/SecondaryBtn";
import type { OrdersSummary } from "./types";
import OrderStatCard from "./OrderStatCard";
import OrdersFilterDropdown from "./OrdersFilterDropdown";

interface OrdersSummarySectionProps {
  summary: OrdersSummary;
}

const actionBtnClass = "w-full md:w-auto md:min-w-[118px]";

export default function OrdersSummarySection({
  summary,
}: OrdersSummarySectionProps) {
  return (
    <section className="flex w-full max-w-[1128px] flex-col items-start gap-4 self-stretch rounded-[12px] border border-[#E9E9E9] bg-white p-4 sm:gap-5 sm:p-5 lg:p-6 xl:max-w-none">
      <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-col items-start gap-1">
          <p className="body-medium subtext">Total Orders</p>
          <p className="h32 primary-text break-words max-sm:text-[28px] max-sm:leading-[120%]">
            {summary.totalOrders.toLocaleString()}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:flex md:w-auto md:flex-wrap md:justify-end lg:gap-3">
          <OrdersFilterDropdown className={actionBtnClass} />
          <SecondaryBtn
            icon={<Calendar className="h-5 w-5 shrink-0" />}
            className={`${actionBtnClass} sm:col-span-2 md:col-span-1`}
          >
            <span className="truncate">Jan 2025 - Jun 2025</span>
          </SecondaryBtn>
          <Primarybtn
            icon={<Download className="h-5 w-5 shrink-0" />}
            className={`${actionBtnClass} sm:col-span-2 md:col-span-1`}
          >
            Export
          </Primarybtn>
        </div>
      </div>

      <div className="h-px w-full shrink-0 bg-[#EEEFF2]" aria-hidden />

      <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {summary.statCards.map((card) => (
          <OrderStatCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
