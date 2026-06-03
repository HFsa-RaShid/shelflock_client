"use client";

import {
  Ban,
  ChevronRight,
  Laptop,
  LogOut,
  Monitor,
  Smartphone,
} from "lucide-react";
import type { ActivityDeviceType, RecentActivity } from "../security.types";
import ActivityStatusBadge from "./ActivityStatusBadge";
import RecentActivityMobileCard from "./RecentActivityMobileCard";

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

function RecentActivitiesTable({
  activities,
}: {
  activities: RecentActivity[];
}) {
  return (
    <div className="hidden w-full overflow-x-auto lg:block">
      <table className="w-full min-w-[920px] border-collapse xl:min-w-0">
        <thead>
          <tr className="border-b border-[#E9E9E9] bg-[#FAFAFA]">
            {[
              "Device",
              "Location",
              "IP Address",
              "Last Active",
              "Status",
              "Action",
            ].map((heading) => (
              <th
                key={heading}
                className="px-4 py-3 text-left body-sm-medium subtext first:pl-5 last:pr-5 xl:px-5 xl:py-4"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr
              key={activity.id}
              className="border-b border-[#E9E9E9] last:border-b-0"
            >
              <td className="px-4 py-4 first:pl-5 xl:px-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F8FA]">
                    <DeviceIcon type={activity.deviceType} />
                  </div>
                  <div className="min-w-0">
                    <p className="body-sm-medium primary-text">
                      {activity.deviceName}
                    </p>
                    <p className="body-sm-regular subtext">
                      {activity.deviceMeta}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 xl:px-5">
                <div className="flex items-center gap-2">
                  <CountryFlag code={activity.countryCode} />
                  <span className="body-sm-regular primary-text">
                    {activity.location}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4 body-sm-regular primary-text xl:px-5">
                {activity.ipAddress}
              </td>
              <td className="px-4 py-4 xl:px-5">
                <span
                  className={`body-sm-regular whitespace-nowrap ${
                    activity.lastActiveHighlight
                      ? "text-[#22A06B]"
                      : "primary-text"
                  }`}
                >
                  {activity.lastActive}
                </span>
              </td>
              <td className="px-4 py-4 xl:px-5">
                <ActivityStatusBadge status={activity.status} />
              </td>
              <td className="px-4 py-4 last:pr-5 xl:px-5">
                {activity.showActions ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Logout device"
                      className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#E9E9E9] bg-white text-[#0E2038] transition hover:bg-[#F7F8FA]"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Block device"
                      className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#E9E9E9] bg-white text-[#0E2038] transition hover:bg-[#F7F8FA]"
                    >
                      <Ban className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <span className="body-sm-regular subtext">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface RecentActivitiesSectionProps {
  activities: RecentActivity[];
}

export default function RecentActivitiesSection({
  activities,
}: RecentActivitiesSectionProps) {
  return (
    <section className="flex w-full max-w-[1128px] flex-col items-start gap-4 rounded-[12px] border border-[#E9E9E9] bg-white p-4 sm:gap-5 sm:p-5 lg:gap-6 lg:p-6 xl:max-w-none">
      <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="body-l-medium primary-text">Recent Activities</h2>
          <p className="body-sm-regular subtext mt-1">
            These are the devices that have accessed your account
          </p>
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1 self-start body-sm-medium primary-text transition hover:opacity-80 sm:self-auto"
        >
          View All Activities
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="w-full min-w-0 overflow-hidden rounded-[12px] border border-[#E9E9E9]">
        <div className="lg:hidden">
          {activities.map((activity) => (
            <RecentActivityMobileCard key={activity.id} activity={activity} />
          ))}
        </div>
        <RecentActivitiesTable activities={activities} />
      </div>
    </section>
  );
}
