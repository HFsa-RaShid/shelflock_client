"use client";

import { LogOut } from "lucide-react";
import Cookies from "js-cookie"; 
import { useStoreContext } from "@/store/useStoreContext"; 

interface SidebarLogoutProps {
  isCollapsed: boolean;
}

export default function SidebarLogout({ isCollapsed }: SidebarLogoutProps) {
  const setCurrentStoreId = useStoreContext((state) => state.setCurrentStoreId);

  return (
    <button
      type="button"
      // 🎯 onClick সরাসরি ইনলাইনে বসানো হয়েছে যেন রিঅ্যাক্ট ইভেন্ট বাবলিং কোনোভাবেই মিস না হয়
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log("🔥 BOOM! Logout Clicked Successfully!");

        try {
          // ১. ফ্রন্টএন্ড ডাটা ক্লিয়ার
          Cookies.remove("token", { path: '/' });
          localStorage.removeItem("merchant");
          setCurrentStoreId(null);

          // ২. হার্ড রিডাইরেক্ট (যা রাউটার ক্যাশ ভেঙে দেবে)
          if (typeof window !== "undefined") {
            window.location.href = "/admin"; 
          }
        } catch (error) {
          console.error("Logout process crashed:", error);
        }
      }} 
      // 🎯 pointer-events-auto এবং z-[999999] বাটনকে সব লেয়ারের ওপরে নিয়ে আসবে
      className="w-full h-[44px] min-h-[44px] shrink-0 flex items-center justify-center gap-2 rounded-xl bg-[#0E2038] text-white transition duration-150 hover:bg-black active:scale-95 px-4 relative z-[999999] pointer-events-auto cursor-pointer"
      style={{ 
        pointerEvents: 'auto', 
        cursor: 'pointer',
        position: 'relative',
        zIndex: 999999
      }}
    >
      <LogOut className="w-5 h-5 shrink-0" />
      {!isCollapsed && <span className="text-sm font-medium select-none">Logout</span>}
    </button>
  );
}