"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface SidebarGroupProps {
  title?: string;
  items: NavItem[];
  isCollapsed: boolean;
  children?: React.ReactNode;
}

function isNavItemActive(pathname: string, href: string) {
  if (pathname === href) return true;

  if (href === "/dashboard" || href === "/dashboard/overview") {
    return pathname === "/dashboard" || pathname === "/dashboard/overview";
  }

  return pathname.startsWith(`${href}/`);
}

export default function SidebarGroup({
  title,
  items,
  isCollapsed,
  children,
}: SidebarGroupProps) {
  const pathname = usePathname();
  const isOtherMenu = title?.toLowerCase() === "other";

  return (
    <div
      className={`w-full flex flex-col gap-2 ${isOtherMenu ? "pt-[8px]" : ""}`}
    >
      {title && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[14px] font-normal text-[#7f8482] leading-[18px] px-2 block select-none"
        >
          {title}
        </motion.span>
      )}

      <div className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = isNavItemActive(pathname, item.href);
          const IconComponent = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex h-[44px] min-h-[44px] max-h-[44px] shrink-0 items-center gap-3 rounded-[8px] px-3 transition-colors duration-200 select-none group ${
                isActive ? "text-white" : "text-[#0E2038] hover:bg-gray-100/60"
              } ${isCollapsed ? "justify-start pl-[10px]" : ""}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSideNav"
                  className="absolute inset-0 bg-[#0E2038] rounded-[8px] -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <IconComponent
                className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-[#7F8482] group-hover:text-[#0E2038]"
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
                className={`whitespace-nowrap overflow-hidden ${
                  isActive ? "body-sm-medium" : "body-sm-regular"
                }`}
              >
                {item.name}
              </motion.span>

              {isCollapsed && (
                <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 bg-[#0E2038] text-white text-[12px] font-medium px-2.5 py-1.5 rounded-lg shadow-xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 z-50 whitespace-nowrap">
                  {item.name}
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#0E2038] rotate-45" />
                </div>
              )}
            </Link>
          );
        })}
        {children}
      </div>
    </div>
  );
}
