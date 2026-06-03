"use client";

import Image from "next/image";
import { Calendar, Camera, Upload } from "lucide-react";
import SecondaryBtn from "@/components/button/SecondaryBtn";
import type { ProfileFormValues } from "../profile.types";
import ProfileFormField from "./ProfileFormField";

const genderOptions = ["Male", "Female", "Other"];
const countryOptions = ["Bangladesh", "India", "Pakistan", "United States"];

interface ProfileInformationSectionProps {
  avatarUrl: string;
  values: ProfileFormValues;
  onChange: (field: keyof ProfileFormValues, value: string) => void;
}

export default function ProfileInformationSection({
  avatarUrl,
  values,
  onChange,
}: ProfileInformationSectionProps) {
  return (
    <section className="flex w-full max-w-[1128px] flex-col rounded-[12px] border border-[#E9E9E9] bg-white p-4 sm:p-5 lg:p-6 xl:max-w-none">
      <div className="flex w-full min-w-0 flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="min-w-0 flex-1">
          <h2 className="body-l-medium primary-text">Profile Information</h2>
          <p className="body-sm-regular subtext mt-1">
            Update your personal information and account details.
          </p>
        </div>

        <SecondaryBtn
          icon={<Upload className="h-4 w-4" />}
          className="!h-[38px] !w-full !min-w-0 shrink-0 !px-4 !text-[14px] md:!w-auto"
        >
          Upload Photo
        </SecondaryBtn>
      </div>

      <div className="mt-5 flex w-full min-w-0 flex-col gap-6 sm:mt-6 lg:flex-row lg:items-center lg:gap-8">
        <div className="relative mx-auto shrink-0 lg:mx-0">
          <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full border border-[#E9E9E9] sm:h-[132px] sm:w-[132px] lg:h-[140px] lg:w-[140px]">
            <Image
              src={avatarUrl}
              alt={values.fullName}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 120px, (max-width: 1024px) 132px, 140px"
            />
          </div>
          <button
            type="button"
            aria-label="Change profile photo"
            className="absolute bottom-0.5 right-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-[#E9E9E9] bg-white text-[#0E2038] shadow-sm transition hover:bg-[#F7F8FA] sm:bottom-1 sm:right-1"
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <div className="grid w-full min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProfileFormField
            label="Full Name"
            value={values.fullName}
            onChange={(value) => onChange("fullName", value)}
          />
          <ProfileFormField
            label="Username"
            value={values.username}
            onChange={(value) => onChange("username", value)}
          />
          <ProfileFormField
            label="Adress"
            value={values.address}
            onChange={(value) => onChange("address", value)}
          />
          <ProfileFormField
            label="Date of Birth"
            value={values.dateOfBirth}
            onChange={(value) => onChange("dateOfBirth", value)}
            trailingIcon={<Calendar className="h-4 w-4" />}
          />
          <ProfileFormField
            label="Gender"
            type="select"
            value={values.gender}
            options={genderOptions}
            onChange={(value) => onChange("gender", value)}
          />
          <ProfileFormField
            label="Country"
            type="select"
            value={values.country}
            options={countryOptions}
            onChange={(value) => onChange("country", value)}
          />
        </div>
      </div>
    </section>
  );
}
