import {
  Ban,
  Laptop,
  LogOut,
  Monitor,
  Smartphone,
} from "lucide-react";
import type { ActivityDeviceType, RecentActivity } from "../security.types";
import ActivityStatusBadge from "./ActivityStatusBadge";

const deviceIconMap = {
  laptop: Laptop,
  desktop: Monitor,
  mobile: Smartphone,
  unknown: Smartphone,
} as const;

function DeviceIcon({ type }: { type: ActivityDeviceType }) {
  const Icon = deviceIconMap[type];
  return <Icon className="h-5 w-5 text-[#0E2038]" />;
}

function CountryFlag({ code }: { code: string }) {
  return (
    <span
      className="inline-flex h-4 w-6 shrink-0 items-center justify-center overflow-hidden rounded-[2px] border border-[#E9E9E9] bg-[#F7F8FA] text-[10px]"
      aria-hidden
    >
      {code === "BD" ? "🇧🇩" : code}
    </span>
  );
}

interface RecentActivityMobileCardProps {
  activity: RecentActivity;
}

export default function RecentActivityMobileCard({
  activity,
}: RecentActivityMobileCardProps) {
  return (
    <article className="border-b border-[#E9E9E9] p-4 last:border-b-0 sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F8FA]">
          <DeviceIcon type={activity.deviceType} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="body-sm-medium primary-text">{activity.deviceName}</p>
          <p className="body-sm-regular subtext">{activity.deviceMeta}</p>
        </div>
        <ActivityStatusBadge status={activity.status} />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <p className="body-xsm-regular subtext mb-1">Location</p>
          <div className="flex items-center gap-2">
            <CountryFlag code={activity.countryCode} />
            <span className="body-sm-regular primary-text">{activity.location}</span>
          </div>
        </div>
        <div>
          <p className="body-xsm-regular subtext mb-1">IP Address</p>
          <p className="body-sm-regular primary-text break-all">
            {activity.ipAddress}
          </p>
        </div>
        <div className="sm:col-span-2">
          <p className="body-xsm-regular subtext mb-1">Last Active</p>
          <span
            className={`body-sm-regular ${
              activity.lastActiveHighlight ? "text-[#22A06B]" : "primary-text"
            }`}
          >
            {activity.lastActive}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#E9E9E9] pt-4">
        <p className="body-xsm-regular subtext">Action</p>
        {activity.showActions ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Logout device"
              className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#E9E9E9] bg-white text-[#0E2038] transition hover:bg-[#F7F8FA]"
            >
              <LogOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Block device"
              className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#E9E9E9] bg-white text-[#0E2038] transition hover:bg-[#F7F8FA]"
            >
              <Ban className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <span className="body-sm-regular subtext">-</span>
        )}
      </div>
    </article>
  );
}
