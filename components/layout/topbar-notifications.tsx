import React from "react";
import { Bell } from "lucide-react";

export default function TopbarNotifications() {
  return (
    <button className="w-10 h-10 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-600 relative transition shrink-0">
      <Bell className="w-5 h-5" />
      <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#F74608] rounded-full" />
    </button>
  );
}
