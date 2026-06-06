"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import SidebarHeader from "../sidebar/SidebarHeader";
import SidebarSearch from "../sidebar/SidebarSearch";
import SidebarGroup from "../sidebar/SidebarGroup";
import SidebarSettingsDropdown from "../sidebar/SidebarSettingsDropdown";
import DashboardIcon from "@/components/icons/DashboardIcon";
import AnalyticsIcon from "@/components/icons/AnalyticsIcon";
import HelpIcon from "@/components/icons/HelpIcon";


const mainNavItems = [
  { 
    name: "Dashboard", 
    href: "/admin/dashboard/overview", 
    icon: DashboardIcon 
  },
  { 
  name: "Categories", 
  href: "/admin/dashboard/categories", 
  icon: DashboardIcon 
},
  { 
    name: "Shelf Storage",   
    href: "/admin/dashboard/shelf", 
    icon: DashboardIcon
  },
  { 
    name: "Alert Rules",     
    href: "/admin/dashboard/alerts", 
    icon: DashboardIcon 
  },
  { 
    name: "Analytics",       
    href: "/admin/dashboard/analytics", 
    icon: AnalyticsIcon 
  },
];

const otherItems = [{ name: "Help & Support", href: "/admin/dashboard/help", icon: HelpIcon }];

const mobileVariants = {
  closed: {
    x: "-100%",
    transition: {
      type: "tween",
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  open: {
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 220,
    },
  },
} as const;

function MobileSidebarDrawer() {
  const searchParams = useSearchParams();
  const isMobileOpen = searchParams.get("sidebar") === "open";

  return (
    <>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.a
            href="?"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 block bg-black/40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className="lg:hidden">
        <AnimatePresence mode="wait">
          {isMobileOpen && (
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileVariants}
              className="fixed inset-y-0 left-0 z-50 flex h-full w-[248px] flex-col overflow-y-auto bg-[#F8F9FA] p-4 scrollbar-none"
            >
              <div className="flex w-full flex-col gap-[24px]">
                <SidebarHeader isCollapsed={false} onToggle={() => {}} />
                <SidebarSearch isCollapsed={false} onOpenSidebar={() => {}} />
                <div className="flex w-full flex-col gap-[24px]">
                  <SidebarGroup
                    title="ShelfLock Core"
                    items={mainNavItems}
                    isCollapsed={false}
                  />
                 
                  <SidebarGroup
                    title="Support"
                    items={otherItems}
                    isCollapsed={false}
                  >
                    <SidebarSettingsDropdown
                      isCollapsed={false}
                      onExpandSidebar={() => {}}
                    />
                  </SidebarGroup>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function DesktopSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const desktopVariants = {
    expanded: { width: "248px" },
    collapsed: { width: "76px" },
  };

  return (
    <motion.aside
      initial={isCollapsed ? "collapsed" : "expanded"}
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={desktopVariants}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="sticky top-0 hidden h-screen shrink-0 flex-col bg-[#F8F9FA] p-4 lg:flex"
    >
      <div className="flex w-full flex-col gap-[32px]">
        <SidebarHeader
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />
        <SidebarSearch
          isCollapsed={isCollapsed}
          onOpenSidebar={() => setIsCollapsed(false)}
        />
        <div className="flex w-full flex-col gap-[24px]">
          <SidebarGroup
            title="ShelfLock Core"
            items={mainNavItems}
            isCollapsed={isCollapsed}
          />
          
          <SidebarGroup
            title="Support"
            items={otherItems}
            isCollapsed={isCollapsed}
          >
            <SidebarSettingsDropdown
              isCollapsed={isCollapsed}
              onExpandSidebar={() => setIsCollapsed(false)}
            />
          </SidebarGroup>
        </div>
      </div>
    </motion.aside>
  );
}

export default function Sidebar() {
  return (
    <>
      <Suspense fallback={null}>
        <MobileSidebarDrawer />
      </Suspense>
      <DesktopSidebar />
    </>
  );
}