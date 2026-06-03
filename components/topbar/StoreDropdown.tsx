"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ManageIcon from "../icons/ManageIcon"; // Import path thik thak ache kina check kore nio

// JSON Mock Data Structure
const STORES_DATA = [
  {
    id: "store-1",
    name: "Tarik Fashion House",
    domain: "tarikfashion.com",
    logo: "/logo/favicon.svg",
  },
  {
    id: "store-2",
    name: "Monir Clothing Store",
    domain: "monirhello.com",
    logo: "/logo/favicon.svg",
  },
  {
    id: "store-3",
    name: "Monir Clothing Store Dupe",
    domain: "monirhello.com",
    logo: "/logo/favicon.svg",
  },
];

interface StoreDropdownProps {
  storeName: string;
  shopLogoSrc: string;
}

export default function StoreDropdown({
  storeName,
  shopLogoSrc,
}: StoreDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState("store-1");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentActiveStore = STORES_DATA.find(
    (store) => store.id === selectedStoreId,
  ) || {
    name: storeName,
    logo: shopLogoSrc,
  };

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

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-3 py-2 bg-white border border-[#E9E9E9] rounded-[8px] flex items-center gap-1.5 transition max-w-[130px] sm:max-w-[152px] cursor-pointer hover:bg-gray-50 select-none"
      >
        <div className="w-5 h-5 flex items-center justify-center overflow-hidden shrink-0">
          <Image
            src={currentActiveStore.logo}
            alt={`${currentActiveStore.name} Shop Logo`}
            width={16}
            height={16}
            className="object-cover"
          />
        </div>
        <span className="truncate body-sm-medium max-w-[72px] primary-text">
          {currentActiveStore.name}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 flex items-center justify-center"
        >
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 h-4 primary-text" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              boxShadow:
                "4px 4px 40px 0px rgba(0, 0, 0, 0.06), -4px -4px 40px 0px rgba(0, 0, 0, 0.06)",
            }}
            className="absolute right-0 mt-2 w-[289px] bg-white border border-[#E9E9E9] rounded-[10px] pl-4 pr-3 py-5 z-50 flex flex-col select-none"
          >
            {/* Header Title Section */}
            <div className="mb-6">
              <h3 className="body-l-medium primary-text">Switch Store</h3>
              <p className="body-sm-regular subtext mt-1">
                Manage and switch between your stores
              </p>
            </div>

            {/* Dynamic Array Loops Renderer */}
            <div className="flex flex-col gap-2 overflow-y-auto">
              {STORES_DATA.map((store) => {
                const isActive = store.id === selectedStoreId;

                return (
                  <div
                    key={store.id}
                    onClick={() => {
                      setSelectedStoreId(store.id);
                      setIsOpen(false);
                    }}
                    className={`w-full h-[62px] p-2 border border-transparent rounded-[10px] flex items-center gap-3 cursor-pointer transition ${
                      isActive
                        ? "bg-[#FFF6F3] hover:bg-[#FFEBE4]"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {/* Image Frame Wrapper */}
                    <div className="w-11 h-11 overflow-hidden  flex items-center justify-center">
                      <Image
                        src={store.logo}
                        alt={`${store.name} logo`}
                        width={isActive ? 36 : 36}
                        height={isActive ? 36 : 36}
                      />
                    </div>

                    {/* Text block element */}
                    <div className="flex flex-col min-w-0">
                      <span className="body-l-medium primary-text truncate">
                        {store.name}
                      </span>
                      <span className="body-sm-regular subtext truncate">
                        {store.domain}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action Primary Button - Figma Specification Integrated */}
            <button
              style={{
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "6px",
                borderBottomRightRadius: "8px",
                borderBottomLeftRadius: "8px",
              }}
              className="w-full max-w-[200px] h-[38px] pt-2 pb-[10px] px-7 bg-[#0E2038] hover:bg-[#1A3354] active:scale-[0.98] text-white flex items-center justify-center gap-2 transition duration-150 cursor-pointer shadow-sm mt-4 mx-auto"
            >
              {/* Custom SVG icon component */}
              <ManageIcon />

              {/* Text content styles from Aeonik specs */}
              <span className="text-[14px] font-medium leading-[145%] tracking-[0%] text-center whitespace-nowrap">
                Manage all stores
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
