"use client";

import Image from "next/image";
import { Pencil, Plus, Search } from "lucide-react";
import type { Order } from "./types";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentBadge from "./PaymentBadge";

interface OrdersTableSectionProps {
  orders: Order[];
}

function formatOrderDate(dateStr: string) {
  const date = new Date(dateStr);
  const datePart = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return { datePart, timePart };
}

function OrderMobileCard({ order }: { order: Order }) {
  const { datePart, timePart } = formatOrderDate(order.date);

  return (
    <article className="border-b border-[#E9E9E9] p-4 last:border-b-0 sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="body-sm-medium primary-text">#{order.id}</p>
          <p className="body-sm-regular subtext break-all">
            Ref: {order.referenceId}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mb-4 flex items-center gap-3">
        <Image
          src={order.customer.avatarUrl}
          alt={order.customer.name}
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="body-sm-medium primary-text truncate">
            {order.customer.name}
          </p>
          <p className="body-sm-regular subtext truncate">
            {order.customer.email}
          </p>
          <p className="body-sm-regular subtext break-all">
            {order.customer.phone}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <div>
          <p className="body-xsm-regular subtext mb-1">Date</p>
          <p className="body-sm-medium primary-text">{datePart}</p>
          <p className="body-sm-regular subtext">{timePart}</p>
        </div>
        <div>
          <p className="body-xsm-regular subtext mb-1">Items</p>
          <p className="body-sm-medium primary-text">{order.itemCount} Items</p>
        </div>
        <div>
          <p className="body-xsm-regular subtext mb-1">Payment</p>
          <PaymentBadge method={order.paymentMethod} />
        </div>
        <div>
          <p className="body-xsm-regular subtext mb-1">Amount</p>
          <p className="body-sm-medium primary-text">
            ${order.amount.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end border-t border-[#E9E9E9] pt-4">
        <button
          type="button"
          className="flex min-h-[44px] items-center gap-2 rounded-lg px-2 text-[#7F8482] transition-colors hover:bg-[#F0F1F3] hover:text-[#0E2038] md:min-h-0"
          aria-label="Edit order"
        >
          <Pencil className="h-4 w-4" />
          <span className="body-sm-medium">Edit</span>
        </button>
      </div>
    </article>
  );
}

export default function OrdersTableSection({
  orders,
}: OrdersTableSectionProps) {
  return (
    <section className="w-full max-w-[1128px] min-w-0 overflow-hidden rounded-[12px] border border-[#E9E9E9] bg-white xl:max-w-none">
      <div className="flex flex-col gap-3 border-b border-[#E9E9E9] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5 lg:p-6">
        <h2 className="title-medium primary-text">Orders List</h2>
        <div className="flex w-full min-w-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-[220px] lg:w-[260px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7F8482]" />
            <input
              type="search"
              placeholder="Search"
              className="body-sm-regular primary-text w-full rounded-lg border border-[#E9E9E9] py-2.5 pl-10 pr-4 outline-none transition-colors focus:border-[#F74608]"
            />
          </div>
          <button
            type="button"
            className="body-sm-medium flex w-full min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#F74608] px-5 py-2.5 text-white transition-colors hover:bg-[#e03f06] sm:w-auto sm:min-h-0"
            style={{
              boxShadow:
                "inset 0px 3px 3px 0px rgba(255, 255, 255, 0.5), inset 0px -3px 4px 0px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Plus className="h-4 w-4 shrink-0" />
            Create Order
          </button>
        </div>
      </div>

      <div className="lg:hidden">
        {orders.map((order) => (
          <OrderMobileCard key={order.id} order={order} />
        ))}
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[960px] xl:min-w-0">
          <thead>
            <tr className="border-b border-[#E9E9E9] bg-[#FAFBFC]">
              <th className="w-10 px-4 py-3 xl:w-12 xl:px-5 xl:py-4">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded accent-[#F74608]"
                />
              </th>
              <th className="body-sm-medium subtext px-4 py-3 text-left xl:px-5 xl:py-4">
                Order ID
              </th>
              <th className="body-sm-medium subtext px-4 py-3 text-left xl:px-5 xl:py-4">
                Customer
              </th>
              <th className="body-sm-medium subtext px-4 py-3 text-left xl:px-5 xl:py-4">
                Date
              </th>
              <th className="body-sm-medium subtext px-4 py-3 text-left xl:px-5 xl:py-4">
                Items
              </th>
              <th className="body-sm-medium subtext px-4 py-3 text-left xl:px-5 xl:py-4">
                Payment
              </th>
              <th className="body-sm-medium subtext px-4 py-3 text-left xl:px-5 xl:py-4">
                Amount
              </th>
              <th className="body-sm-medium subtext px-4 py-3 text-left xl:px-5 xl:py-4">
                Status
              </th>
              <th className="body-sm-medium subtext px-4 py-3 text-left xl:px-5 xl:py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const { datePart, timePart } = formatOrderDate(order.date);
              return (
                <tr
                  key={order.id}
                  className="border-b border-[#E9E9E9] transition-colors last:border-b-0 hover:bg-[#FAFBFC]"
                >
                  <td className="px-4 py-3 xl:px-5 xl:py-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded accent-[#F74608]"
                    />
                  </td>
                  <td className="px-4 py-3 xl:px-5 xl:py-4">
                    <p className="body-sm-medium primary-text">#{order.id}</p>
                    <p className="body-sm-regular subtext break-all">
                      Ref: {order.referenceId}
                    </p>
                  </td>
                  <td className="px-4 py-3 xl:px-5 xl:py-4">
                    <div className="flex min-w-[180px] items-center gap-3">
                      <Image
                        src={order.customer.avatarUrl}
                        alt={order.customer.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="body-sm-medium primary-text truncate">
                          {order.customer.name}
                        </p>
                        <p className="body-sm-regular subtext truncate">
                          {order.customer.email}
                        </p>
                        <p className="body-sm-regular subtext truncate">
                          {order.customer.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 xl:px-5 xl:py-4">
                    <p className="body-sm-medium primary-text whitespace-nowrap">
                      {datePart}
                    </p>
                    <p className="body-sm-regular subtext whitespace-nowrap">
                      {timePart}
                    </p>
                  </td>
                  <td className="body-sm-medium primary-text whitespace-nowrap px-4 py-3 xl:px-5 xl:py-4">
                    {order.itemCount} Items
                  </td>
                  <td className="px-4 py-3 xl:px-5 xl:py-4">
                    <PaymentBadge method={order.paymentMethod} />
                  </td>
                  <td className="body-sm-medium primary-text whitespace-nowrap px-4 py-3 xl:px-5 xl:py-4">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 xl:px-5 xl:py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 xl:px-5 xl:py-4">
                    <button
                      type="button"
                      className="rounded-lg p-2 text-[#7F8482] transition-colors hover:bg-[#F0F1F3] hover:text-[#0E2038]"
                      aria-label="Edit order"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
