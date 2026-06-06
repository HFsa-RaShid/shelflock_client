"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const logoVariants = {
  expanded: { width: "130px", opacity: 1 },
  collapsed: { width: "24px", opacity: 1 },
};

const faviconVariants = {
  hidden: { opacity: 0, scale: 0.8, x: -5 },
  visible: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.8, x: -5 },
};

const fullLogoVariants = {
  hidden: { opacity: 0, scale: 0.9, x: 5 },
  visible: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.9, x: 5 },
};

const toggleIconVariants = {
  expanded: { rotate: 0 },
  collapsed: { rotate: 180 },
};

export default function SidebarHeader({
  isCollapsed,
  onToggle,
}: SidebarHeaderProps) {
  return (
    <div className="w-full select-none">
      <div
        className={`w-full flex items-center justify-between lg:justify-start transition-all duration-300 ${
          isCollapsed ? "lg:gap-4" : "lg:gap-[20px]" 
        }`}
      >
        {/* Brand Logo Wrapper */}
        {/* <Link href="/admin/dashboard/overview" className="flex items-center shrink-0">
          <motion.div
            className="relative h-[24px] overflow-hidden flex items-center"
            initial={isCollapsed ? "collapsed" : "expanded"}
            animate={isCollapsed ? "collapsed" : "expanded"}
            variants={logoVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isCollapsed ? (
                <motion.div
                  key="favicon"
                  className="relative w-[24px] h-[24px]"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={faviconVariants}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src="/logo/favicon.svg"
                    alt="Ecomfixter Favicon"
                    fill
                    priority
                    className="object-contain"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="fullLogo"
                  className="relative w-[130px] h-[24px]"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fullLogoVariants}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src="/logo/fulllogo.png"
                    alt="Ecomfixter Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Link> */}

        {/* Action Toggle Button Container */}
        <div className="flex items-center shrink-0 lg:ml-auto">
          {/* Desktop Collapse Trigger (Hidden on Mobile) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggle();
            }}
            type="button"
            className="hidden lg:block transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <motion.div
              className="relative w-6 h-6"
              initial={isCollapsed ? "collapsed" : "expanded"}
              animate={isCollapsed ? "collapsed" : "expanded"}
              variants={toggleIconVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Image
                src="/icon/sidebar.png"
                alt="Toggle Sidebar"
                fill
                className="object-contain"
              />
            </motion.div>
          </button>

          {/* Mobile Close Button (Hidden on Desktop) */}
          <a
            href="?"
            className="lg:hidden p-1.5 rounded-xl hover:bg-gray-100 text-[#0E2038] transition-all duration-200 active:scale-95 flex items-center justify-center"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </div>
  );
}
