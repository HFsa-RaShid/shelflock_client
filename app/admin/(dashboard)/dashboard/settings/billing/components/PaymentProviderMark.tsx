import type { PaymentProvider } from "../billing.types";

interface PaymentProviderMarkProps {
  provider: PaymentProvider;
  size?: "sm" | "md";
  className?: string;
}

interface ProviderStyle {
  bg: string;
  fg: string;
  letter: string;
}

const PROVIDER_STYLES: Record<PaymentProvider, ProviderStyle> = {
  bkash: { bg: "#FCE4EE", fg: "#E2136E", letter: "b" },
  nagad: { bg: "#FFE7E2", fg: "#EE3A24", letter: "ন" },
  card: { bg: "#E7F1FF", fg: "#1E63D9", letter: "C" },
  bank: { bg: "#EAF7EE", fg: "#22A06B", letter: "B" },
};

export default function PaymentProviderMark({
  provider,
  size = "md",
  className = "",
}: PaymentProviderMarkProps) {
  const style = PROVIDER_STYLES[provider];
  const boxClass = size === "sm" ? "h-8 w-8 text-[14px]" : "h-10 w-10 text-[18px]";

  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${boxClass} ${className}`}
      style={{ backgroundColor: style.bg, color: style.fg }}
    >
      {style.letter}
    </div>
  );
}
