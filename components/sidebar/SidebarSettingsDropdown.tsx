"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import SettingsIcon from "@/components/icons/SettingsIcon";
import ProfileIcon from "../icons/ProfileIcon";
import NotificationsIcon from "../icons/NotificationsIcon";
import SecurityIcon from "../icons/SecurityIcon";
import SubscriptionIcon from "../icons/SubscriptionIcon";
import BillingIcon from "../icons/BillingIcon";

const settingsSubItems = [
  {
    name: "Profile",
    href: "/dashboard/settings/profile",
    icon: ProfileIcon,
  },
  {
    name: "Notifications",
    href: "/dashboard/settings/notifications",
    icon: NotificationsIcon,
  },
  {
    name: "Security",
    href: "/dashboard/settings/security",
    icon: SecurityIcon,
  },
  {
    name: "Subscription",
    href: "/dashboard/settings/subscription",
    icon: SubscriptionIcon,
  },
  {
    name: "Billing",
    href: "/dashboard/settings/billing",
    icon: BillingIcon,
  },
];

interface SidebarSettingsDropdownProps {
  isCollapsed: boolean;
  onExpandSidebar?: () => void;
}

export default function SidebarSettingsDropdown({
  isCollapsed,
  onExpandSidebar,
}: SidebarSettingsDropdownProps) {
  const pathname = usePathname();
  const isSettingsRoute = pathname.startsWith("/dashboard/settings");
  const [isOpen, setIsOpen] = useState(isSettingsRoute);

  useEffect(() => {
    if (isSettingsRoute) {
      setIsOpen(true);
    }
  }, [isSettingsRoute]);

  const handleToggle = () => {
    if (isCollapsed) {
      onExpandSidebar?.();
      setIsOpen(true);
      return;
    }
    setIsOpen((prev) => !prev);
  };

  const isParentActive = isOpen || isSettingsRoute;

  return (
    <motion.div layout className="flex flex-col gap-1">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        className={`relative flex h-[44px] min-h-[44px] max-h-[44px] w-full shrink-0 items-center gap-3 rounded-[8px] px-3 transition-colors duration-200 select-none group ${
          isParentActive ? "text-white" : "text-[#0E2038] hover:bg-gray-100/60"
        } ${isCollapsed ? "justify-start pl-[10px]" : ""}`}
      >
        {isParentActive && (
          <div className="absolute inset-0 bg-[#0E2038] rounded-[8px] -z-10" />
        )}

        <SettingsIcon
          className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
            isParentActive
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
          className={`flex-1 text-left whitespace-nowrap overflow-hidden ${
            isParentActive ? "body-sm-medium" : "body-sm-regular"
          }`}
        >
          Settings
        </motion.span>

        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0"
          >
            <ChevronDown
              className={`w-4 h-4 ${
                isParentActive ? "text-white" : "text-[#0E2038]"
              }`}
            />
          </motion.span>
        )}

        {isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 bg-[#0E2038] text-white text-[12px] font-medium px-2.5 py-1.5 rounded-lg shadow-xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 z-50 whitespace-nowrap"
          >
            Settings
            <motion.div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#0E2038] rotate-45" />
          </motion.div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && !isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -4 }}
              animate={{ y: 0 }}
              exit={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-1 pl-4"
            >
              {settingsSubItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                const IconComponent = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`h-[44px] flex items-center gap-3 px-3 rounded-[8px] transition-colors duration-200 select-none group ${
                      isActive
                        ? "bg-[#7F8482] text-white"
                        : "text-[#0E2038] hover:bg-gray-100/60"
                    }`}
                  >
                    <IconComponent
                      className={`w-5 h-5 shrink-0 transition-colors duration-200 ${
                        isActive
                          ? "text-white"
                          : "text-[#0E2038] group-hover:text-[#0E2038]"
                      }`}
                    />
                    <span
                      className={
                        isActive ? "body-sm-medium" : "body-sm-regular"
                      }
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
