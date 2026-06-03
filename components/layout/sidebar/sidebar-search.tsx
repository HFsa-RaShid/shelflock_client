"use client";

import React from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "@/components/ui/motion";

interface SidebarSearchProps {
  isCollapsed: boolean;
  onOpenSidebar: () => void;
}

export default function SidebarSearch({
  isCollapsed,
  onOpenSidebar,
}: SidebarSearchProps) {
  return (
    <div className="flex h-[41px] min-h-[41px] w-full shrink-0 items-center justify-center select-none">
      <AnimatePresence mode="wait" initial={false}>
        {isCollapsed ? (
          /* === (Collapsed State - Only Icon Button) ==== */
          <motion.button
            key="collapsed-search"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={onOpenSidebar}
            type="button"
            style={{
              boxShadow: "0px 1px 2px 0px rgba(1, 1, 1, 0.05)",
            }}
            className="w-[41px] h-[41px] flex items-center justify-center bg-white border border-[#E9E9E9] rounded-[8px] hover:bg-gray-50 transition-colors active:scale-95 cursor-pointer text-[#7F8482]"
          >
            <Search className="w-[16px] h-[16px] stroke-[1.5]" />
          </motion.button>
        ) : (
          /* === (Full Design Layout) ==== */
          <motion.div
            key="expanded-search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              width: "216px",
              height: "41px",
              boxShadow: "0px 1px 2px 0px rgba(1, 1, 1, 0.05)",
            }}
            className="relative flex items-center bg-white border border-[#E9E9E9] rounded-[8px] py-[8px] px-[12px] gap-[12px]"
          >
            <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 text-[#7F8482]">
              <Search className="w-[16px] h-[16px] stroke-[1.5]" />
            </div>
   
            <input
              type="text"
              placeholder="Search..."       
              className="w-full h-full bg-transparent text-[14px] text-[#0E2038] placeholder-[#7F8482] focus:outline-none"
            />

            {/* keyboard shortcut (⌘ এবং F) */}
            <div className="flex items-center gap-[4px] shrink-0">
              {/* Command (⌘) Icon Container */}
              <div
                style={{
                  boxShadow:
                    "0px 1px 2px 0px rgba(24, 35, 34, 0.06), 0px 1px 3px 0px rgba(24, 35, 34, 0.10)",
                }}
                className="w-[20px] h-[20px] bg-white border border-[#E9E9E9] rounded-[4px] py-[2px] px-[4px] flex items-center justify-center"
              >
                <span className="font-['Aeonik'] font-normal text-[16px] leading-[20px] text-[#0E2038]">
                  ⌘
                </span>
              </div>

              {/* F Icon Container */}
              <div
                style={{
                  boxShadow:
                    "0px 1px 2px 0px rgba(24, 35, 34, 0.06), 0px 1px 3px 0px rgba(24, 35, 34, 0.10)",
                }}
                className="w-[20px] h-[20px] bg-white border border-[#E9E9E9] rounded-[4px] py-[2px] px-[4px] flex items-center justify-center"
              >
                <span className="font-['Aeonik'] font-normal text-[16px] leading-[20px] text-[#0E2038]">
                  F
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
