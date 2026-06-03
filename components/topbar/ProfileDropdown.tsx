"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import ProfileIcon from "@/components/icons/ProfileIcon";
import LogoutIcon from "@/components/icons/LogoutIcon";
import { clearAuthSession } from "@/lib/auth";
import { AUTH_ROUTES } from "@/lib/constants";

interface ProfileDropdownProps {
  imageUrl: string;
}

export default function ProfileDropdown({ imageUrl }: ProfileDropdownProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await clearAuthSession();
    router.push(AUTH_ROUTES.signin);
    router.refresh();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="h-9 w-9 shrink-0 overflow-hidden rounded-[10px] border border-[#E9E9E9] transition hover:opacity-90"
      >
        <img
          src={imageUrl}
          alt="User profile"
          className="h-full w-full object-cover"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              boxShadow:
                "4px 4px 40px 0px rgba(0, 0, 0, 0.06), -4px -4px 40px 0px rgba(0, 0, 0, 0.06)",
            }}
            className="absolute right-0 z-50 mt-2 w-[180px] overflow-hidden rounded-[10px] border border-[#E9E9E9] bg-white py-1.5"
            role="menu"
          >
            <Link
              href="/dashboard/settings/profile"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="flex h-11 items-center gap-3 px-4 text-[#0E2038] transition hover:bg-gray-50"
            >
              <ProfileIcon className="h-5 w-5 shrink-0 text-[#7F8482]" />
              <span className="body-sm-medium">Profile</span>
            </Link>

            <button
              type="button"
              role="menuitem"
              onClick={() => void handleLogout()}
              className="flex h-11 w-full items-center gap-3 px-4 text-[#0E2038] transition hover:bg-gray-50"
            >
              <LogoutIcon className="h-5 w-5 shrink-0 text-[#7F8482]" />
              <span className="body-sm-medium">Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
