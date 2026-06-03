"use client";

import {
  CreditCard,
  Crown,
  Megaphone,
  Package,
  PackageX,
  ShoppingBag,
} from "lucide-react";
import type { NotificationChannel, NotificationPreferenceItem } from "../notifications.types";
import NotificationCheckbox from "./NotificationCheckbox";

const iconMap = {
  "new-order": ShoppingBag,
  "order-cancelled": PackageX,
  "low-stock": Package,
  payment: CreditCard,
  subscription: Crown,
  marketing: Megaphone,
} as const;

const channelOptions: { key: NotificationChannel; label: string }[] = [
  { key: "sms", label: "SMS" },
  { key: "email", label: "Email" },
  { key: "push", label: "Push" },
];

interface NotificationPreferenceItemRowProps {
  item: NotificationPreferenceItem;
  onToggle: (
    id: string,
    channel: NotificationChannel,
    enabled: boolean
  ) => void;
}

export default function NotificationPreferenceItemRow({
  item,
  onToggle,
}: NotificationPreferenceItemRowProps) {
  const Icon = iconMap[item.icon];

  return (
    <div className="border-b border-[#E9E9E9] px-4 py-4 last:border-b-0 sm:px-5 sm:py-5 md:grid md:grid-cols-[minmax(0,1fr)_216px] md:items-center md:gap-4 lg:grid-cols-[minmax(0,1fr)_252px] xl:grid-cols-[minmax(0,1fr)_276px]">
      <div className="flex min-w-0 items-start gap-3 md:pr-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F8FA] text-[#0E2038]">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="body-sm-medium primary-text">{item.title}</p>
          <p className="body-sm-regular subtext mt-0.5 break-words">
            {item.description}
          </p>
        </div>
      </div>

      <div className="mt-4 grid w-full grid-cols-3 gap-2 md:mt-0 md:gap-3">
        {channelOptions.map(({ key, label }) => (
          <div
            key={key}
            className="flex flex-col items-center justify-center rounded-[8px] border border-transparent px-1 py-1 md:border-none md:p-0"
          >
            <span className="body-xsm-regular subtext mb-1.5 md:hidden">
              {label}
            </span>
            <NotificationCheckbox
              label={label}
              checked={item.channels[key]}
              onChange={(enabled) => onToggle(item.id, key, enabled)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
