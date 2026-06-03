"use client";

import { useState } from "react";
import { SUBSCRIPTION_STATIC_DATA } from "../subscriptionStaticData";
import CurrentPlanCard from "./CurrentPlanCard";
import PlanOverviewCard from "./PlanOverviewCard";
import RenewalSettingsCard from "./RenewalSettingsCard";
import ChangePlanSection from "./ChangePlanSection";
import CancelSubscriptionModal from "./CancelSubscriptionModal";

const layoutClass =
  "flex w-full flex-col items-stretch gap-4 min-w-0 sm:gap-5 lg:gap-6";

export default function SubscriptionPageContent() {
  const data = SUBSCRIPTION_STATIC_DATA;
  const [autoRenewEnabled, setAutoRenewEnabled] = useState(
    data.renewal.autoRenewEnabled
  );
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const handleConfirmCancel = () => {
    setAutoRenewEnabled(false);
    setIsCancelOpen(false);
  };

  return (
    <div className={layoutClass}>
      <CurrentPlanCard plan={data.currentPlan} />

      <div className="grid w-full max-w-[1128px] grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[1.4fr_1fr] lg:gap-6 xl:max-w-none">
        <PlanOverviewCard usage={data.usage} />
        <RenewalSettingsCard
          renewal={{ ...data.renewal, autoRenewEnabled }}
          onToggleAutoRenew={setAutoRenewEnabled}
          onCancelSubscription={() => setIsCancelOpen(true)}
        />
      </div>

      <ChangePlanSection plans={data.plans} />

      <CancelSubscriptionModal
        open={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        onConfirmCancel={handleConfirmCancel}
      />
    </div>
  );
}
