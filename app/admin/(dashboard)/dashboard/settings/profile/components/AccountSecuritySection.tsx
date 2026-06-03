import { ChevronRight, Lock, ShieldCheck } from "lucide-react";
import OutlineOrangeButton from "./OutlineOrangeButton";
import SettingsSectionCard from "./SettingsSectionCard";
import ProfileSettingRow from "./ProfileSettingRow";

interface AccountSecuritySectionProps {
  twoFactorEnabled: boolean;
}

export default function AccountSecuritySection({
  twoFactorEnabled,
}: AccountSecuritySectionProps) {
  return (
    <SettingsSectionCard
      title="Account Security"
      description="Manage your account security settings."
    >
      <div className="flex flex-col">
        <ProfileSettingRow
          icon={<Lock className="h-5 w-5" />}
          title="Change Password"
          description="Update your account password"
          action={
            <OutlineOrangeButton className="w-full min-w-0 md:w-auto">
              Change Password
            </OutlineOrangeButton>
          }
        />

        <button
          type="button"
          className="flex w-full flex-col gap-4 py-3 text-left md:flex-row md:items-center md:justify-between md:py-1"
        >
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F8FA] text-[#0E2038]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="body-sm-medium primary-text">
                Two-Factor Authentication
              </p>
              <p className="body-sm-regular subtext mt-0.5 break-words">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>

          <div className="flex w-full items-center justify-end gap-2 md:w-auto">
            {twoFactorEnabled ? (
              <span className="inline-flex items-center rounded-md bg-[#E8F8EF] px-2.5 py-1 body-sm-medium text-[#22A06B] sm:px-3 sm:py-1.5">
                Enabled
              </span>
            ) : (
              <span className="inline-flex items-center rounded-md bg-[#F7F8FA] px-2.5 py-1 body-sm-medium subtext sm:px-3 sm:py-1.5">
                Disabled
              </span>
            )}
            <ChevronRight className="h-4 w-4 shrink-0 text-[#7F8482]" />
          </div>
        </button>
      </div>
    </SettingsSectionCard>
  );
}
