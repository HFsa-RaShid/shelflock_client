"use client";

import { NOTIFICATIONS_STATIC_DATA } from "../notificationsStaticData";
import NotificationPreferencesSection from "./NotificationPreferencesSection";

const layoutClass =
  "flex w-full flex-col items-stretch gap-4 min-w-0 sm:gap-5 lg:gap-6";

export default function NotificationsPageContent() {
  return (
    <div className={layoutClass}>
      <NotificationPreferencesSection
        items={NOTIFICATIONS_STATIC_DATA.items}
        onChange={() => {}}
      />
    </div>
  );
}
