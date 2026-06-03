"use client";

import { ChevronRight, Download } from "lucide-react";
import type {
  PaymentHistoryEntry,
  PaymentProvider,
  PaymentStatus,
} from "../billing.types";

interface PaymentHistoryCardProps {
  entries: PaymentHistoryEntry[];
  onDownloadAll?: () => void;
  onDownloadOne?: (id: string) => void;
}

const METHOD_PILL_STYLE: Record<
  PaymentProvider,
  { bg: string; fg: string }
> = {
  bkash: { bg: "#FCE4EE", fg: "#E2136E" },
  nagad: { bg: "#FFE2DC", fg: "#EE3A24" },
  card: { bg: "#E7F1FF", fg: "#1E63D9" },
  bank: { bg: "#EAF7EE", fg: "#22A06B" },
};

const STATUS_PILL_STYLE: Record<PaymentStatus, { bg: string; fg: string; label: string }> = {
  paid: { bg: "#E8F8EF", fg: "#22A06B", label: "Paid" },
  failed: { bg: "#FEECEC", fg: "#E53E3E", label: "Failed" },
  pending: { bg: "#FFF4DB", fg: "#B47B00", label: "Pending" },
  refunded: { bg: "#F1F1F1", fg: "#7F8482", label: "Refunded" },
};

function MethodPill({ provider, label }: { provider: PaymentProvider; label: string }) {
  const style = METHOD_PILL_STYLE[provider];
  return (
    <span
      className="inline-flex items-center rounded-md px-2.5 py-1 text-[12px] font-medium"
      style={{ backgroundColor: style.bg, color: style.fg }}
    >
      {label}
    </span>
  );
}

function StatusPill({ status }: { status: PaymentStatus }) {
  const style = STATUS_PILL_STYLE[status];
  return (
    <span
      className="inline-flex items-center rounded-md px-2.5 py-1 text-[12px] font-medium"
      style={{ backgroundColor: style.bg, color: style.fg }}
    >
      {style.label}
    </span>
  );
}

function DownloadButton({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#E9E9E9] bg-white text-[#7F8482] transition-all duration-150 hover:bg-[#FAFAFA] hover:text-[#0E2038] active:scale-[0.98]"
    >
      <Download className="h-4 w-4" strokeWidth={1.75} />
    </button>
  );
}

export default function PaymentHistoryCard({
  entries,
  onDownloadAll,
  onDownloadOne,
}: PaymentHistoryCardProps) {
  return (
    <section className="flex w-full max-w-[1128px] flex-col rounded-[12px] border border-[#E9E9E9] bg-white p-4 sm:p-5 lg:p-6 xl:max-w-none">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h2 className="body-l-medium primary-text">Payment History</h2>
          <p className="body-sm-regular subtext mt-1">
            Track all completed transactions, invoices, renewals, and payment
            activities in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={onDownloadAll}
          className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 self-start rounded-[8px] border border-[#E9E9E9] bg-white px-3 body-sm-regular primary-text transition-all duration-150 hover:bg-[#FAFAFA] active:scale-[0.98] sm:self-auto"
        >
          <span>Download All</span>
          <ChevronRight className="h-3.5 w-3.5 text-[#7F8482]" strokeWidth={2} />
        </button>
      </div>

      <div className="mt-4 hidden w-full overflow-x-auto lg:block">
        <table className="w-full min-w-[840px] border-collapse">
          <thead>
            <tr className="border-b border-[#F1F1F1]">
              <th className="py-3 pr-4 text-left body-sm-regular subtext font-normal">
                Date
              </th>
              <th className="py-3 pr-4 text-left body-sm-regular subtext font-normal">
                Description
              </th>
              <th className="py-3 pr-4 text-left body-sm-regular subtext font-normal">
                Amount
              </th>
              <th className="py-3 pr-4 text-left body-sm-regular subtext font-normal">
                Method
              </th>
              <th className="py-3 pr-4 text-left body-sm-regular subtext font-normal">
                Transaction ID
              </th>
              <th className="py-3 pr-4 text-left body-sm-regular subtext font-normal">
                Status
              </th>
              <th className="py-3 text-right body-sm-regular subtext font-normal">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr
                key={entry.id}
                className="border-b border-[#F1F1F1] last:border-b-0"
              >
                <td className="py-4 pr-4 body-sm-regular primary-text">
                  {entry.date}
                </td>
                <td className="py-4 pr-4 body-sm-regular primary-text">
                  {entry.description}
                </td>
                <td className="py-4 pr-4 body-sm-medium primary-text">
                  {entry.amount}
                </td>
                <td className="py-4 pr-4">
                  <MethodPill provider={entry.method} label={entry.methodLabel} />
                </td>
                <td className="py-4 pr-4 body-sm-regular primary-text">
                  {entry.transactionId}
                </td>
                <td className="py-4 pr-4">
                  <StatusPill status={entry.status} />
                </td>
                <td className="py-4 text-right">
                  <div className="flex justify-end">
                    <DownloadButton
                      label={`Download invoice for ${entry.date}`}
                      onClick={() => onDownloadOne?.(entry.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex w-full flex-col gap-3 lg:hidden">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex w-full flex-col gap-3 rounded-[12px] border border-[#F1F1F1] p-4"
          >
            <div className="flex w-full items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="body-sm-medium primary-text">
                  {entry.description}
                </p>
                <p className="body-sm-regular subtext mt-0.5">{entry.date}</p>
              </div>
              <span className="body-sm-medium primary-text shrink-0">
                {entry.amount}
              </span>
            </div>

            <div className="flex w-full flex-wrap items-center gap-2">
              <MethodPill provider={entry.method} label={entry.methodLabel} />
              <StatusPill status={entry.status} />
              <span className="body-sm-regular subtext">
                {entry.transactionId}
              </span>
            </div>

            <div className="flex w-full justify-end">
              <DownloadButton
                label={`Download invoice for ${entry.date}`}
                onClick={() => onDownloadOne?.(entry.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
