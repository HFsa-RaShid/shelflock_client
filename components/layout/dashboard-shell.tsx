"use client";

import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

interface DashboardShellProps {
  children: React.ReactNode;
}

const MAIN_CONTENT_CLASS =
  "flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden bg-white p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8";

const INNER_CONTENT_CLASS = " w-full mx-auto ";

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="relative flex h-screen w-full gap-4 overflow-hidden bg-[#F8F9FA] p-4 md:gap-4 md:p-4">
      <Sidebar />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[16px] border border-[#E9E9E9] bg-white">
        <Topbar />

        <main className={MAIN_CONTENT_CLASS}>
          <div className={INNER_CONTENT_CLASS}>{children}</div>
        </main>
      </div>
    </div>
  );
}
