"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  NotificationChannel,
  NotificationPreferenceItem,
} from "../notifications.types";
import NotificationCheckbox from "./NotificationCheckbox";
import NotificationPreferenceItemRow from "./NotificationPreferenceItemRow";
import AutoSaveNotice from "./AutoSaveNotice";

const channelLabels: { key: NotificationChannel; label: string }[] = [
  { key: "sms", label: "SMS" },
  { key: "email", label: "Email" },
  { key: "push", label: "Push" },
];

interface NotificationPreferencesSectionProps {
  items: NotificationPreferenceItem[];
  onChange: (items: NotificationPreferenceItem[]) => void;
}

export default function NotificationPreferencesSection({
  items,
  onChange,
}: NotificationPreferencesSectionProps) {
  const [preferences, setPreferences] = useState(items);

  useEffect(() => {
    setPreferences(items);
  }, [items]);

  const channelSelectAll = useMemo(() => {
    return channelLabels.reduce(
      (acc, { key }) => {
        acc[key] = preferences.every((item) => item.channels[key]);
        return acc;
      },
      { sms: false, email: false, push: false } as Record<
        NotificationChannel,
        boolean
      >
    );
  }, [preferences]);

  const handleToggle = (
    id: string,
    channel: NotificationChannel,
    enabled: boolean
  ) => {
    const updated = preferences.map((item) =>
      item.id === id
        ? { ...item, channels: { ...item.channels, [channel]: enabled } }
        : item
    );
    setPreferences(updated);
    onChange(updated);
  };

  const handleToggleAll = (channel: NotificationChannel, enabled: boolean) => {
    const updated = preferences.map((item) => ({
      ...item,
      channels: { ...item.channels, [channel]: enabled },
    }));
    setPreferences(updated);
    onChange(updated);
  };

  return (
    <section className="flex w-full max-w-[1128px] flex-col items-start gap-4 rounded-[12px] border border-[#E9E9E9] bg-white p-4 sm:gap-5 sm:p-5 lg:gap-6 lg:p-6 xl:max-w-none">
      <div className="w-full min-w-0">
        <h2 className="body-l-medium primary-text">Notification Preferences</h2>
        <p className="body-sm-regular subtext mt-1">
          Choose which notifications you want to receive and how.
        </p>
      </div>

      <div className="w-full min-w-0 overflow-hidden rounded-[12px] border border-[#E9E9E9]">
        <div className="border-b border-[#E9E9E9] bg-[#FAFAFA] px-4 py-3 sm:px-5 sm:py-4 md:grid md:grid-cols-[minmax(0,1fr)_216px] md:items-center md:gap-4 lg:grid-cols-[minmax(0,1fr)_252px] xl:grid-cols-[minmax(0,1fr)_276px]">
          <p className="body-sm-medium subtext mb-3 md:mb-0 md:invisible md:h-0 md:overflow-hidden">
            Select all channels
          </p>

          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {channelLabels.map(({ key, label }) => (
              <NotificationCheckbox
                key={key}
                label={label}
                showLabel
                checked={channelSelectAll[key]}
                onChange={(enabled) => handleToggleAll(key, enabled)}
              />
            ))}
          </div>
        </div>

        {preferences.map((item) => (
          <NotificationPreferenceItemRow
            key={item.id}
            item={item}
            onToggle={handleToggle}
          />
        ))}
      </div>

      <AutoSaveNotice />
    </section>
  );
}
