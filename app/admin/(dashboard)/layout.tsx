// import DashboardShell from "@/components/layout/dashboard-shell";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <DashboardShell>{children}</DashboardShell>;
// }



"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStoreContext } from "@/store/useStoreContext";
import DashboardShell from "@/components/layout/dashboard-shell"; // 👈 আপনার এক্সিস্টিং শেল

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { currentStoreId } = useStoreContext();

  useEffect(() => {
    // 🎯 যদি স্টোর আইডি নাল (null) থাকে, তবে ড্যাশবোর্ডের ভেতরে ঢুকতে না দিয়ে সরাসরি সেটআপ পেজে পাঠিয়ে দেবে
    if (!currentStoreId) {
      router.replace("/admin/store-setup");
    }
  }, [currentStoreId, router]);

  // 🛡️ স্টোর আইডি ভ্যালিডেশন চেক চলাকালীন বা নাল থাকলে সাইডবার/ড্যাশবোর্ডের কিছুই স্ক্রিনে রেন্ডার হবে না
  if (!currentStoreId) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white text-sm font-medium text-gray-500 animate-pulse">
        Checking store access, redirecting...
      </div>
    );
  }

  // ✅ স্টোর আইডি থাকলে আপনার ড্যাশবোর্ড শেলের ভেতর চাইল্ড পেজগুলো লোড হবে
  return <DashboardShell>{children}</DashboardShell>;
}