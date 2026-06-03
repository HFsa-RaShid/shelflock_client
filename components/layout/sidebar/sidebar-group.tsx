"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { motion } from "@/components/ui/motion";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarGroupProps {
  title?: string;
  items: NavItem[];
  isCollapsed: boolean;
}

function isNavItemActive(pathname: string, href: string) {
  if (pathname === href) return true;
  if (href === "/dashboard/overview") return false;
  return pathname.startsWith(`${href}/`);
}

export default function SidebarGroup({
  title,
  items,
  isCollapsed,
}: SidebarGroupProps) {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col gap-2">
      {title ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="block min-h-[26px] select-none px-2 text-[14px] font-normal leading-[26px] text-[#7f8482]"
        >
          {title}
        </motion.span>
      ) : (
        <span className="min-h-[26px]" aria-hidden />
      )}

      <div className="flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = isNavItemActive(pathname, item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative flex h-[44px] min-h-[44px] max-h-[44px] shrink-0 items-center gap-3 rounded-[8px] px-3 transition-colors duration-200 select-none ${
                isActive ? "text-white" : "text-[#0E2038] hover:bg-gray-100/60"
              } ${isCollapsed ? "justify-start pl-[10px]" : ""}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSideNav"
                  className="absolute inset-0 -z-10 rounded-[8px] bg-[#0E2038]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <Icon
                className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-gray-600 group-hover:text-[#0E2038]"
                }`}
              />

              <motion.span
                initial={
                  isCollapsed
                    ? { width: 0, opacity: 0 }
                    : { width: "auto", opacity: 1 }
                }
                animate={
                  isCollapsed
                    ? { width: 0, opacity: 0 }
                    : { width: "auto", opacity: 1 }
                }
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className={`min-w-0 flex-1 truncate whitespace-nowrap overflow-hidden ${
                  isActive ? "body-sm-medium" : "body-sm-regular"
                }`}
              >
                {item.name}
              </motion.span>

              {isCollapsed && (
                <div className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-50 -translate-y-1/2 scale-95 whitespace-nowrap rounded-lg bg-[#0E2038] px-2.5 py-1.5 text-[12px] font-medium text-white opacity-0 shadow-xl transition-all duration-150 group-hover:scale-100 group-hover:opacity-100">
                  {item.name}
                  <p className="absolute top-1/2 -left-1 h-2 w-2 -translate-y-1/2 rotate-45 bg-[#0E2038]" />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
