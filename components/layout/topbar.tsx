import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import StoreDropdown from "../topbar/StoreDropdown";
import NotificationBell from "../topbar/NotificationBell";
import ProfileDropdown from "../topbar/ProfileDropdown";

export default function Topbar() {
  return (
    <header className="w-full h-[72px] bg-white border-b border-[#E9E9E9] px-4 flex items-center justify-center shrink-0">
      {/* Container */}
      <div className="w-full flex items-center justify-between gap-4">
        {/* Left Side: Mobile Hamburger & Page Title */}
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href="?sidebar=open"
            className="lg:hidden p-1.5 rounded-lg border border-[#E9E9E9] hover:bg-gray-50 text-[#0E2038] transition shrink-0"
          >
            <Menu className="w-5 h-5" />
          </Link>

          {/* Exact Aeonik Font Specs */}
          <h1 className="h6-bold truncate select-none">Dashboard</h1>
        </div>

        {/* Right Side Section: Modular Sub-components */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <StoreDropdown
            storeName="MonirFash.."
            shopLogoSrc="/logo/favicon.svg"
          />

        

          <NotificationBell hasNotification={true} />

          {/* Divider Line */}
          <div className="h-6 w-[1px] bg-[#E9E9E9] mx-0.5" />

          <ProfileDropdown imageUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" />
        </div>
      </div>
    </header>
  );
}
