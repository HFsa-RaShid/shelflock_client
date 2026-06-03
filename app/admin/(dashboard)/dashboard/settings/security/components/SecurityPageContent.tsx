"use client";

import { SECURITY_STATIC_DATA } from "../securityStaticData";
import AccountSecuritySettingsSection from "./AccountSecuritySettingsSection";
import RecentActivitiesSection from "./RecentActivitiesSection";

const layoutClass =
  "flex w-full flex-col items-stretch gap-4 min-w-0 sm:gap-5 lg:gap-6 xl:max-w-none";

export default function SecurityPageContent() {
  return (
    <div className={layoutClass}>
      <AccountSecuritySettingsSection
        settings={SECURITY_STATIC_DATA.settings}
        onChange={() => {}}
      />
      <RecentActivitiesSection activities={SECURITY_STATIC_DATA.activities} />
    </div>
  );
}
