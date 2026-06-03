import { CreditCard } from "lucide-react";
import type { PaymentProvider } from "../../billing.types";

interface MethodIconTileProps {
  provider: PaymentProvider;
}

interface TileStyle {
  bg: string;
  fg: string;
}

const TILE_STYLES: Record<PaymentProvider, TileStyle> = {
  bkash: { bg: "#FCE4EE", fg: "#E2136E" },
  nagad: { bg: "#FFE7E2", fg: "#EE3A24" },
  card: { bg: "#E7F1FF", fg: "#1E63D9" },
  bank: { bg: "#EAF7EE", fg: "#22A06B" },
};

function ProviderGlyph({ provider }: { provider: PaymentProvider }) {
  const style = TILE_STYLES[provider];

  if (provider === "card") {
    return (
      <CreditCard
        className="h-6 w-6"
        style={{ color: style.fg }}
        strokeWidth={1.75}
      />
    );
  }

  if (provider === "nagad") {
    return (
      <span
        className="text-[14px] font-bold leading-none"
        style={{ color: style.fg }}
      >
        নগদ
      </span>
    );
  }

  if (provider === "bank") {
    return (
      <span
        className="text-[18px] font-bold leading-none"
        style={{ color: style.fg }}
      >
        B
      </span>
    );
  }

  return (
    <span
      className="text-[20px] font-bold leading-none"
      style={{ color: style.fg }}
    >
      b
    </span>
  );
}

export default function MethodIconTile({ provider }: MethodIconTileProps) {
  const style = TILE_STYLES[provider];

  return (
    <div
      aria-hidden="true"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px]"
      style={{ backgroundColor: style.bg }}
    >
      <ProviderGlyph provider={provider} />
    </div>
  );
}
