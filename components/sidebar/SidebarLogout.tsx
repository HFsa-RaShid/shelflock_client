import React from "react";
import LogoutIcon from "../icons/LogoutIcon";
import TertiaryButton from "../button/TertiaryButton";


interface SidebarLogoutProps {
  isCollapsed: boolean;
}

export default function SidebarLogout({ isCollapsed }: SidebarLogoutProps) {
  return (
    <TertiaryButton
      className={`w-full h-[44px] transition-all duration-150 !bg-[#0E2038] !border-[#0E2038] hover:!bg-black hover:!border-black ${
        isCollapsed
          ? "!min-w-0 !px-0 justify-center"
          : "!px-4 justify-center gap-2"
      }`}
      icon={<LogoutIcon />}
    >
      {!isCollapsed && (
        <span className="body-sm-medium whitespace-nowrap leading-none">
          Logout
        </span>
      )}
    </TertiaryButton>
  );
}
