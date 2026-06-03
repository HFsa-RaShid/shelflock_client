import type { PaymentMethod } from "./types";

const paymentConfig: Record<PaymentMethod, { bg: string; text: string }> = {
  COD: { bg: "bg-[#FFF3E8]", text: "text-[#F74608]" },
  Nagad: { bg: "bg-[#FFF9E6]", text: "text-[#D69E2E]" },
  Bkash: { bg: "bg-[#FFE8F0]", text: "text-[#E91E8C]" },
  SSLCommerz: { bg: "bg-[#E8F0FF]", text: "text-[#2B6CB0]" },
};

export default function PaymentBadge({
  method,
}: {
  method: PaymentMethod;
}) {
  const config = paymentConfig[method];

  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full body-sm-medium ${config.bg} ${config.text}`}
    >
      {method}
    </span>
  );
}
