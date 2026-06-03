"use client";

import { useEffect, useState } from "react";
import { Clock, Laptop, Lock, ShieldCheck } from "lucide-react";
import OutlineOrangeButton from "@/app/(dashboard)/dashboard/settings/profile/components/OutlineOrangeButton";
import type { SecuritySettings } from "../security.types";
import SecuritySettingRow from "./SecuritySettingRow";
import SecurityToggle from "./SecurityToggle";

interface AccountSecuritySettingsSectionProps {
  settings: SecuritySettings;
  onChange: (settings: SecuritySettings) => void;
}

function StatusBadge({ enabled }: { enabled: boolean }) {
  if (enabled) {
    return (
      <span className="inline-flex items-center rounded-md bg-[#E8F8EF] px-2.5 py-1 body-sm-medium text-[#22A06B] sm:px-3 sm:py-1.5">
        Enabled
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-md bg-[#FEECEC] px-2.5 py-1 body-sm-medium text-[#E53E3E] sm:px-3 sm:py-1.5">
      Disabled
    </span>
  );
}

export default function AccountSecuritySettingsSection({
  settings,
  onChange,
}: AccountSecuritySettingsSectionProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const updateSetting = (key: keyof SecuritySettings, value: boolean) => {
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    onChange(updated);
  };

  const toggleAction = (
    key: keyof SecuritySettings,
    enabled: boolean,
    label: string
  ) => (
    <div className="flex w-full items-center justify-end gap-2 sm:gap-3 md:w-auto">
      <StatusBadge enabled={enabled} />
      <SecurityToggle
        enabled={enabled}
        label={label}
        onChange={(value) => updateSetting(key, value)}
      />
    </div>
  );

  return (
    <section className="flex w-full max-w-[1128px] flex-col items-start gap-4 rounded-[12px] border border-[#E9E9E9] bg-white p-4 sm:gap-5 sm:p-5 lg:gap-6 lg:p-6 xl:max-w-none">
      <div className="w-full min-w-0">
        <h2 className="body-l-medium primary-text">Account Security</h2>
        <p className="body-sm-regular subtext mt-1">
          Manage your account security settings.
        </p>
      </div>

      <div className="w-full min-w-0">
        <SecuritySettingRow
          icon={<Lock className="h-5 w-5" />}
          title="Change Password"
          description="Update your account password"
          action={
            <OutlineOrangeButton className="w-full min-w-0 sm:w-auto">
              Change Password
            </OutlineOrangeButton>
          }
        />

        <SecuritySettingRow
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
          action={toggleAction(
            "twoFactorEnabled",
            localSettings.twoFactorEnabled,
            "Two-Factor Authentication"
          )}
        />

        <SecuritySettingRow
          icon={<Laptop className="h-5 w-5" />}
          title="New Device Login Alert"
          description="Get alerted when a new device signs in to your account."
          action={toggleAction(
            "newDeviceLoginAlert",
            localSettings.newDeviceLoginAlert,
            "New Device Login Alert"
          )}
        />

        <SecuritySettingRow
          icon={<Clock className="h-5 w-5" />}
          title="Session Timeout"
          description="Enable automatic logout after 30 minutes of inactivity to keep your account and data secure."
          action={toggleAction(
            "sessionTimeout",
            localSettings.sessionTimeout,
            "Session Timeout"
          )}
          showDivider={false}
        />
      </div>
    </section>
  );
}
