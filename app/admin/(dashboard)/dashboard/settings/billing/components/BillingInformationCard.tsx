"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import type {
  BillingCyclePreference,
  BillingInformation,
} from "../billing.types";
import BillingCycleDropdown from "./BillingCycleDropdown";

interface BillingInformationCardProps {
  info: BillingInformation;
  onSave?: (info: BillingInformation) => void;
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label className="body-sm-regular subtext">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "h-[40px] w-full rounded-[8px] border border-transparent bg-transparent px-0 body-sm-regular primary-text outline-none focus:border-[#E9E9E9] focus:bg-white focus:px-3 disabled:cursor-default";

const editingInputClass =
  "h-[40px] w-full rounded-[8px] border border-[#E9E9E9] bg-white px-3 body-sm-regular primary-text outline-none transition-colors duration-150 focus:border-[#F74608]";

const CYCLE_OPTIONS: { value: BillingCyclePreference; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export default function BillingInformationCard({
  info,
  onSave,
}: BillingInformationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<BillingInformation>(info);

  useEffect(() => {
    if (!isEditing) setDraft(info);
  }, [info, isEditing]);

  const baseInputClass = isEditing ? editingInputClass : inputClass;

  const handleChange = <K extends keyof BillingInformation>(
    key: K,
    value: BillingInformation[K]
  ) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      onSave?.(draft);
    }
    setIsEditing((prev) => !prev);
  };

  const handleCycleDropdownOpenChange = (open: boolean) => {
    if (open && !isEditing) {
      setIsEditing(true);
    }
  };

  return (
    <section className="flex h-full w-full flex-col rounded-[12px] border border-[#E9E9E9] bg-white p-4 sm:p-5 lg:p-6">
      <div className="flex w-full items-center justify-between gap-3">
        <h2 className="body-l-medium primary-text">Billing Information</h2>

        <button
          type="button"
          onClick={handleToggleEdit}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[8px] border border-[#E9E9E9] bg-white px-3 body-sm-regular primary-text transition-all duration-150 hover:bg-[#FAFAFA] active:scale-[0.98]"
        >
          <Pencil className="h-3.5 w-3.5 text-[#7F8482]" strokeWidth={1.75} />
          <span>{isEditing ? "Save" : "Edit"}</span>
        </button>
      </div>

      <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5">
        <Field label="Full Name">
          <input
            type="text"
            value={draft.fullName}
            onChange={(event) => handleChange("fullName", event.target.value)}
            disabled={!isEditing}
            className={baseInputClass}
          />
        </Field>

        <Field label="Phone">
          <input
            type="tel"
            value={draft.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
            disabled={!isEditing}
            className={baseInputClass}
          />
        </Field>

        <Field label="Email">
          <input
            type="email"
            value={draft.email}
            onChange={(event) => handleChange("email", event.target.value)}
            disabled={!isEditing}
            className={baseInputClass}
          />
        </Field>

        <Field label="Billing Cycle">
          <BillingCycleDropdown
            value={draft.billingCycle}
            options={CYCLE_OPTIONS}
            onChange={(value) => handleChange("billingCycle", value)}
            onOpenChange={handleCycleDropdownOpenChange}
            variant={isEditing ? "edit" : "view"}
          />
        </Field>
      </div>
    </section>
  );
}
