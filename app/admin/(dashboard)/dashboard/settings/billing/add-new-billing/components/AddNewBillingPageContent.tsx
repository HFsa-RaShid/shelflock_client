"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PaymentProvider } from "../../billing.types";
import { PAYMENT_METHOD_OPTIONS } from "../addNewBillingStaticData";
import BackToBillingLink from "./BackToBillingLink";
import PaymentMethodSelector from "./PaymentMethodSelector";
import PaymentSecurityNote from "./PaymentSecurityNote";
import BankDetailsForm from "./BankDetailsForm";

const layoutClass =
  "flex w-full flex-col items-stretch gap-4 min-w-0 sm:gap-5 lg:gap-6";

export default function AddNewBillingPageContent() {
  const router = useRouter();
  const [selectedProvider, setSelectedProvider] =
    useState<PaymentProvider>("bkash");

  const handleVerify = () => {
    router.push("/dashboard/settings/billing");
  };

  return (
    <div className={layoutClass}>
      <BackToBillingLink />

      <section className="flex w-full max-w-[1128px] flex-col rounded-[12px] border border-[#E9E9E9] bg-white p-4 sm:p-5 lg:p-6 xl:max-w-none">
        <div className="min-w-0">
          <h2 className="body-l-medium primary-text">Add Payment Method</h2>
          <p className="body-sm-regular subtext mt-1">
            Choose a payment method and add your details securely.
          </p>
        </div>

        <div className="mt-5 grid w-full grid-cols-1 gap-5 lg:mt-6 lg:grid-cols-[1fr_1.4fr] lg:gap-6">
          <div className="flex flex-col gap-5">
            <PaymentMethodSelector
              options={PAYMENT_METHOD_OPTIONS}
              selectedId={selectedProvider}
              onSelect={(id) => setSelectedProvider(id)}
            />

            <div className="hidden lg:block lg:flex-1" />

            <PaymentSecurityNote />
          </div>

          <BankDetailsForm
            provider={selectedProvider}
            onVerify={handleVerify}
          />
        </div>
      </section>
    </div>
  );
}
