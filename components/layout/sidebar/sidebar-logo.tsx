import React from "react";
import Link from "next/link";

export default function SidebarLogo() {
  return (
    <div className="h-[70px] px-6 flex items-center border-b border-[#E9E9E9]">
      <Link
        href="/dashboard"
        className="text-[20px] font-bold text-[#0E2038] tracking-tight"
      >
        Ecom<span className="text-[#F74608]">fixter</span>
      </Link>
    </div>
  );
}
