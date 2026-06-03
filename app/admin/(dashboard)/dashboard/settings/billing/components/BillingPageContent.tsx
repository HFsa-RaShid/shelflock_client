"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CurrentPlanCard from "../../subscription/components/CurrentPlanCard";
import { SUBSCRIPTION_STATIC_DATA } from "../../subscription/subscriptionStaticData";
import { BILLING_STATIC_DATA } from "../billingStaticData";
import type { BillingInformation, PaymentMethod } from "../billing.types";
import PaymentMethodsCard from "./PaymentMethodsCard";
import BillingInformationCard from "./BillingInformationCard";
import PaymentHistoryCard from "./PaymentHistoryCard";
import ViewAllPaymentMethodsModal from "./ViewAllPaymentMethodsModal";
import RemovePaymentMethodModal from "./RemovePaymentMethodModal";

const layoutClass =
  "flex w-full flex-col items-stretch gap-4 min-w-0 sm:gap-5 lg:gap-6";

export default function BillingPageContent() {
  const router = useRouter();
  const billingData = BILLING_STATIC_DATA;

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(
    billingData.paymentMethods
  );
  const [billingInfo, setBillingInfo] = useState<BillingInformation>(
    billingData.billingInformation
  );
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleSetPrimary = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({ ...method, isPrimary: method.id === id }))
    );
  };

  const handleRequestDelete = (id: string) => {
    setPendingDeleteId(id);
  };

  const handleCancelDelete = () => {
    setPendingDeleteId(null);
  };

  const handleConfirmDelete = () => {
    if (!pendingDeleteId) return;
    setPaymentMethods((prev) =>
      prev.filter((method) => method.id !== pendingDeleteId)
    );
    setPendingDeleteId(null);
  };

  return (
    <div className={layoutClass}>
      <CurrentPlanCard
        plan={SUBSCRIPTION_STATIC_DATA.currentPlan}
        pageTitle="Billing"
        pageDescription="Manage payment methods, billing details, invoices, and transaction history from one place."
        actionLabel="Manage Plan"
      />

      <div className="grid w-full max-w-[1128px] grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[1fr_1.2fr] lg:gap-6 xl:max-w-none">
        <PaymentMethodsCard
          methods={paymentMethods}
          onSetPrimary={handleSetPrimary}
          onDelete={handleRequestDelete}
          onViewAll={() => setIsViewAllOpen(true)}
          onAddMethod={() =>
            router.push("/dashboard/settings/billing/add-new-billing")
          }
        />
        <BillingInformationCard
          info={billingInfo}
          onSave={setBillingInfo}
        />
      </div>

      <PaymentHistoryCard entries={billingData.paymentHistory} />

      <ViewAllPaymentMethodsModal
        open={isViewAllOpen}
        methods={paymentMethods}
        onClose={() => setIsViewAllOpen(false)}
        onSetPrimary={handleSetPrimary}
        onDelete={handleRequestDelete}
      />

      <RemovePaymentMethodModal
        open={pendingDeleteId !== null}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
