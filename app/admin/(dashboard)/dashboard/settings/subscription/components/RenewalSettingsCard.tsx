"use client";

import { RefreshCw, X } from "lucide-react";
import SecurityToggle from "../../security/components/SecurityToggle";
import type { RenewalSettings } from "../subscription.types";

interface RenewalSettingsCardProps {
  renewal: RenewalSettings;
  onToggleAutoRenew: (enabled: boolean) => void;
  onCancelSubscription?: () => void;
}

export default function RenewalSettingsCard({
  renewal,
  onToggleAutoRenew,
  onCancelSubscription,
}: RenewalSettingsCardProps) {
  return (
    <section className="flex h-full w-full flex-col rounded-[12px] border border-[#E9E9E9] bg-white p-4 sm:p-5 lg:p-6">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h2 className="body-l-medium primary-text">Renewal Settings</h2>

        <button
          type="button"
          onClick={onCancelSubscription}
          className="inline-flex h-[36px] items-center justify-center gap-1.5 self-start rounded-[8px] border border-[#E9E9E9] bg-white px-3 body-sm-regular primary-text transition-all duration-150 hover:bg-[#FAFAFA] active:scale-[0.98] sm:self-auto"
        >
          <X className="h-3.5 w-3.5 text-[#7F8482]" strokeWidth={2} />
          <span>Cancel Subscription</span>
        </button>
      </div>

      <div className="mt-4 flex w-full items-start justify-between gap-4 sm:mt-5">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#FFEFE8]">
            <RefreshCw
              className="h-4 w-4 text-[#F74608]"
              strokeWidth={1.75}
            />
          </div>

          <div className="min-w-0">
            <h3 className="body-sm-medium primary-text">Auto - renewal</h3>
            <p className="body-sm-regular subtext mt-0.5">
              Renew your plan automatically without interruption.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {renewal.autoRenewEnabled && (
            <span className="inline-flex items-center rounded-md bg-[#E8F8EF] px-2 py-0.5 text-[12px] font-medium text-[#22A06B]">
              Enabled
            </span>
          )}
          <SecurityToggle
            enabled={renewal.autoRenewEnabled}
            onChange={onToggleAutoRenew}
            label="Auto renewal"
          />
        </div>
      </div>

      <p className="mt-4 body-sm-regular text-[#E53E3E] sm:mt-5">
        If cancelled, the user will have access until {renewal.accessUntilDate}.
      </p>
    </section>
  );
}
