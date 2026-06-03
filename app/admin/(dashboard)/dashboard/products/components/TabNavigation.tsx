"use client";

import { useState } from "react";
import ProductListTab from "./ProductListTab";
import InventoryTab from "./InventoryTab";
import SummaryCards from "./SummaryCards";
import AddProductModal from "../modals/AddProductModal";
import CategoriesTab from "./CategoriesTab";

export default function TabNavigation() {
  const [activeTab, setActiveTab] = useState<
    "product-list" | "inventory" | "categories"
  >("product-list");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="">
      {/* 1. Top Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center border border-[#E5E7EB] rounded-[8px] p-4 mb-6">
        
        
        <div className="flex bg-white border border-[#E5E7EB] rounded-[8px] overflow-x-auto scrollbar-none whitespace-nowrap max-w-full">
          <button
            onClick={() => setActiveTab("product-list")}
            className={`px-4 sm:px-6 py-2.5 body-l-medium transition-all cursor-pointer ${
              activeTab === "product-list"
                ? "adsfixter-primary-text bg-[#F74608]/6 border-b-3 border-[#F74608]"
                : "primary-text hover:text-[#111827]"
            }`}
          >
            Product List
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-4 sm:px-6 py-2.5 body-l-medium transition-all cursor-pointer ${
              activeTab === "inventory"
                ? "adsfixter-primary-text bg-[#F74608]/6 border-b-3 border-[#F74608]"
                : "primary-text hover:text-[#111827]"
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 sm:px-6 py-2.5 body-l-medium transition-all cursor-pointer ${
              activeTab === "categories"
                ? "adsfixter-primary-text bg-[#F74608]/6 border-b-3 border-[#F74608]"
                : "primary-text hover:text-[#111827]"
            }`}
          >
            Categories
          </button>
        </div>

        
        <div className="flex space-x-3 w-full md:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none justify-center bg-[#E05613] hover:bg-[#C84B0F] text-white text-xs sm:text-sm px-4 py-2.5 rounded-lg flex items-center space-x-2 font-medium transition shadow cursor-pointer whitespace-nowrap"
          >
            <span>+</span>
            <span>
              {activeTab === "inventory" ? "Add New Category" : "Add Product"}
            </span>
          </button>
          <button className="flex-1 md:flex-none justify-center border border-[#E5E7EB] text-[#4B5563] text-xs sm:text-sm px-4 py-2.5 rounded-lg flex items-center space-x-2 bg-white hover:bg-[#F9FAFB] transition cursor-pointer whitespace-nowrap">
            <svg
              className="w-4 h-4 text-[#4B5563]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 2. Overview Content  */}
      <div className="bg-white">
        {activeTab !== "categories" && (
          <div className="mb-6 rounded-xl border border-[#E5E7EB] p-4 sm:p-6">
            <h1 className="h6-medium primary-text">Overview</h1>
            <p className="body-sm-regular subtext py-3 sm:py-4">
              Manage your products, categories, pricing, stock levels, and
              inventory performance from a single place.
            </p>

            <SummaryCards />
          </div>
        )}

        {/* Dynamic Tab Layout */}
        <div className="mt-6 sm:mt-8 overflow-x-auto">
          {activeTab === "product-list" && <ProductListTab />}
          {activeTab === "inventory" && <InventoryTab />}
          {activeTab === "categories" && <CategoriesTab />}
        </div>
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}