// import React from "react";
// import Link from "next/link";
// import { Menu } from "lucide-react";
// import StoreDropdown from "../topbar/StoreDropdown";
// import NotificationBell from "../topbar/NotificationBell";
// import ProfileDropdown from "../topbar/ProfileDropdown";

// export default function Topbar() {
//   return (
//     <header className="w-full h-[72px] bg-white border-b border-[#E9E9E9] px-4 flex items-center justify-center shrink-0">
//       {/* Container */}
//       <div className="w-full flex items-center justify-between gap-4">
//         {/* Left Side: Mobile Hamburger & Page Title */}
//         <div className="flex items-center gap-4 min-w-0">
//           <Link
//             href="?sidebar=open"
//             className="lg:hidden p-1.5 rounded-lg border border-[#E9E9E9] hover:bg-gray-50 text-[#0E2038] transition shrink-0"
//           >
//             <Menu className="w-5 h-5" />
//           </Link>

//           {/* Exact Aeonik Font Specs */}
//           <h1 className="h6-bold truncate select-none">Dashboard</h1>
//         </div>

//         {/* Right Side Section: Modular Sub-components */}
//         <div className="flex items-center gap-2 sm:gap-3 shrink-0">
//           <StoreDropdown
//             storeName="MonirFash.."
//             shopLogoSrc="/logo/favicon.svg"
//           />

        

//           <NotificationBell hasNotification={true} />

//           {/* Divider Line */}
//           <div className="h-6 w-[1px] bg-[#E9E9E9] mx-0.5" />

//           <ProfileDropdown imageUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" />
//         </div>
//       </div>
//     </header>
//   );
// }



"use client";
import React, { useEffect, useState } from "react";
import { useStoreContext } from "@/store/useStoreContext";
import { useGetMyStores } from "@/hooks/useStore"; 

export default function Topbar() {
  const [merchantId, setMerchantId] = useState<string>("");
  const { currentStoreId, setCurrentStoreId } = useStoreContext();

  // 🧑‍💻 ক্লায়েন্ট সাইডে লোড হওয়ার পর localStorage থেকে মার্চেন্ট আইডি নেওয়া হচ্ছে
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMerchant = localStorage.getItem("merchant");
      if (storedMerchant) {
        const parsed = JSON.parse(storedMerchant);
        setMerchantId(parsed.id);
      } else {
        // সেফটি ফলব্যাক: যদি কোনো কারণে লোকাল স্টোরেজে না থাকে, আপনার কারেন্ট আইডি বসে যাবে
        setMerchantId("ce26355c-9b87-45af-97a9-f7f5b05c3745");
      }
    }
  }, []);

  // 🔄 মার্চেন্ট আইডি পাওয়ার পর এপিআই থেকে স্টোরগুলো তুলে আনা হচ্ছে
  const { data: stores = [], isLoading } = useGetMyStores(merchantId);

  // ✨ ডিফল্টভাবে ১ম স্টোরটি সিলেক্ট করার লজিক
  useEffect(() => {
    if (stores.length > 0 && !currentStoreId) {
      setCurrentStoreId(stores[0].id); // প্রথম স্টোরের আইডি গ্লোবাল স্টেটে সেট হলো
    }
  }, [stores, currentStoreId, setCurrentStoreId]);

  return (
    <div className="h-16 border-b border-gray-100 bg-white px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-[#F74608]">ShelfLock</span>
        <span className="text-gray-300">|</span>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Dashboard</span>
      </div>

      {/* 🏪 স্টোর সিলেকশন ড্রপডাউন */}
      <div className="flex items-center gap-3">
        <label className="text-xs font-bold text-gray-500 hidden sm:block">Active Store:</label>
        {isLoading || !merchantId ? (
          <div className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-xl border animate-pulse">
            Loading Stores...
          </div>
        ) : (
          <select
            value={currentStoreId || ""}
            onChange={(e) => setCurrentStoreId(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-[#0E2038] text-xs font-bold rounded-xl p-2.5 outline-none focus:border-[#F74608] min-w-[160px] cursor-pointer"
          >
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                🏪 {store.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}