"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { clearAuthSession } from "@/lib/auth";
import { AUTH_ROUTES } from "@/lib/constants";

interface SidebarLogoutProps {
  isCollapsed: boolean;
}

export default function SidebarLogout({ isCollapsed }: SidebarLogoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await clearAuthSession();
    router.push(AUTH_ROUTES.signin);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={() => void handleLogout()}
      className={`flex h-[44px] min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0E2038] text-white transition duration-150 hover:bg-black active:scale-98 ${
        isCollapsed ? "px-0" : "px-4"
      }`}
    >
      <LogOut className="w-5 h-5 shrink-0" />
      {!isCollapsed && <span className="body-sm-medium">Logout</span>}
    </button>
  );
}
