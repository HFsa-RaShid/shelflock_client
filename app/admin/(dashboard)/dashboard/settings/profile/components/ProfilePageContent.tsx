"use client";

import { useState } from "react";
import type { ProfileFormValues } from "../profile.types";
import { PROFILE_STATIC_DATA } from "../profileStaticData";
import ProfileInformationSection from "./ProfileInformationSection";
import EmailAddressSection from "./EmailAddressSection";
import PhoneNumberSection from "./PhoneNumberSection";
import AccountSecuritySection from "./AccountSecuritySection";

const layoutClass =
  "flex w-full flex-col items-stretch gap-4 min-w-0 sm:gap-5 lg:gap-6";

export default function ProfilePageContent() {
  const data = PROFILE_STATIC_DATA;
  const [formValues, setFormValues] = useState<ProfileFormValues>({
    fullName: data.fullName,
    username: data.username,
    address: data.address,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    country: data.country,
  });

  const handleFieldChange = (
    field: keyof ProfileFormValues,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={layoutClass}>
      <ProfileInformationSection
        avatarUrl={data.avatarUrl}
        values={formValues}
        onChange={handleFieldChange}
      />
      <EmailAddressSection email={data.email} />
      <PhoneNumberSection phone={data.phone} />
      <AccountSecuritySection twoFactorEnabled={data.twoFactorEnabled} />
    </div>
  );
}
