import React from "react";
import { User } from "lucide-react";

export default function SidebarProfile() {
  return (
    <div className="p-4 border-t border-[#E9E9E9] flex items-center gap-3 bg-white">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
        <User className="w-5 h-5 text-gray-500" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[14px] font-semibold text-[#0E2038] truncate">
          Imam Hossen
        </span>
        <span className="text-[12px] text-gray-400 truncate">Store Owner</span>
      </div>
    </div>
  );
}
