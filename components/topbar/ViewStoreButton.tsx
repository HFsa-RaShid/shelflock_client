import React from "react";
import { ExternalLink } from "lucide-react";

export default function ViewStoreButton() {
  return (
    <button className="h-9 px-2.5 sm:px-3 bg-white border border-[#E9E9E9] rounded-[10px] flex items-center gap-1.5 text-[13px] sm:text-[14px] font-medium text-[#0E2038] hover:bg-gray-50 transition">
      <span className="hidden md:inline">View Store</span>
      <ExternalLink className="w-4 h-4 text-[#0E2038]" />
    </button>
  );
}
