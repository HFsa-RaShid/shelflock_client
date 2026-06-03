import React from "react";
import { Bell } from "lucide-react";

interface NotificationBellProps {
  hasNotification?: boolean;
}

export default function NotificationBell({
  hasNotification = false,
}: NotificationBellProps) {
  return (
    <button className="w-9 h-9 bg-white border border-[#E9E9E9] rounded-[10px] flex items-center justify-center relative hover:bg-gray-50 transition text-[#0E2038]">
      <Bell className="w-[18px] h-[18px] sm:w-5 h-5" />
      {hasNotification && (
        <span className="absolute top-[8px] right-[9px] w-2 h-2 bg-[#EF4444] rounded-full border border-white" />
      )}
    </button>
  );
}
