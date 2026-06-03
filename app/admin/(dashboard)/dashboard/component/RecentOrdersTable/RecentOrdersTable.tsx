import Link from "next/link";
import { ChevronsUpDown } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import type { RecentOrdersTableProps } from "./RecentOrdersTable.type";

const TABLE_GRID =
  "grid grid-cols-[minmax(0,1fr)_110px_88px] items-center gap-3";

function formatPrice(amount: number) {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E9E9E9] p-3 h-full flex flex-col gap-3 min-h-[476px] w-full">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E9E9]">
        <h3 className="body-l-medium primary-text leading-[135%]">Recent Order</h3>
        <Link
          href="/dashboard/orders"
          className="body-sm-medium adsfixter-primary-text underline leading-[135%] align-middle"
        >
          View All
        </Link>
      </div>

      <div
        className={`hidden sm:grid sm:grid-cols-[minmax(0,1fr)_110px_88px] sm:items-center sm:gap-3 w-full pb-3 border-b border-[#E9E9E9]`}
      >
        <span className="body-sm-medium text-[#666D80] leading-[150%] text-left">
          Product Name
        </span>
        <span className="body-sm-medium text-[#666D80] leading-[150%] text-center">
          Price
        </span>
        <span className="body-sm-medium text-[#666D80] leading-[150%] text-right inline-flex items-center justify-end gap-0.5">
          Status
          <ChevronsUpDown className="w-3.5 h-3.5 shrink-0" aria-hidden />
        </span>
      </div>

      <ul className="flex-1 overflow-y-auto flex flex-col w-full">
        {orders.map((order) => (
          <li
            key={order.id}
            className={`${TABLE_GRID} w-full h-16 border-b border-[#E9E9E9]`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={order.productImage}
                alt={order.productName}
                className="w-10 h-10 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="body-sm-medium primary-text leading-[145%] truncate">
                  {order.productName}
                </p>
                <p className="body-sm-regular subtext truncate">{order.id}</p>
              </div>
            </div>

            <p className="body-sm-medium primary-text font-bold leading-[150%] text-center">
              {formatPrice(order.price)}
            </p>

            <div className="flex justify-end">
              <OrderStatusBadge status={order.status} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
