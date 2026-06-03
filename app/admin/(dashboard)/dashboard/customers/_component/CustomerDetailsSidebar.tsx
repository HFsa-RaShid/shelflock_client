// src/app/(dashboard)/dashboard/customers/_component/CustomerDetailsSidebar.tsx
"use client";

import React from "react";
import { FiX, FiSend, FiPercent } from "react-icons/fi";


export interface Customer {
  id: string;
  name: string;
  phone: string;
  payment: string;
  orders: number;
  lastOrder: string;
  spend: number;
  area: string;
  type: string;
  email: string;
  regDate: string;
}

interface SidebarProps {
  customer: Customer; 
  onClose: () => void;
}

export default function CustomerDetailsSidebar({ customer, onClose }: SidebarProps) {
  // যদি কোনো কারণে ডেটা না থাকে তবে সেফটি গার্ড (এরর হ্যান্ডলিং)
  if (!customer) return null;

  return (
    <div className="w-[409px] bg-white border border-[#0000000F] rounded-[12px] p-4 flex flex-col gap-4 shadow-xl shrink-0 sticky top-4 animate-in slide-in-from-right duration-200">
      
      {/* Profile Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#FFF2E9] text-[#F74608] flex items-center justify-center font-bold text-[16px]">
            {customer.name ? customer.name.split(' ').map(n => n[0]).join('') : "C"}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-[18px] font-bold text-[#0E2038]">{customer.name}</h3>
              <span className="bg-[#E6F6EC] text-[#23A455] text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#23A455]"></span> Active
              </span>
            </div>
            <p className="text-[13px] text-[#7F8482] mt-0.5">{customer.phone}</p>
          </div>
        </div>
        
        {/* ক্লোজ বাটন */}
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full border border-[#E9E9E9] flex items-center justify-center text-[#7F8482] hover:bg-gray-50 transition-colors"
        >
          <FiX />
        </button>
      </div>

      {/* Quick Contact Info */}
      <div className="bg-[#FAFBFB] rounded-[8px] p-3 flex flex-col gap-2 text-[13px] text-[#7F8482]">
        <div>📧 {customer.email}</div>
        <div>📍 {customer.area}, Bangladesh</div>
        <div>📅 First order: {customer.regDate}</div>
      </div>

      {/* Recent Orders */}
      <div className="flex flex-col flex-1 gap-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[15px] font-bold text-[#0E2038]">Recent Orders</h4>
          <button className="text-[13px] font-bold text-[#F74608] hover:underline">View all</button>
        </div>
        <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
          {[1, 2, 3].map((item, i) => (
            <div key={i} className="flex items-center justify-between border-b border-[#F5F5F5] py-2.5 last:border-0">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#0E2038]">#ORD-5533</span>
                <span className="text-[11px] text-[#7F8482] mt-0.5">15 May 2024</span>
              </div>
              <div className="text-[13px] font-bold text-[#0E2038]">${customer.spend}</div>
              <span className="bg-[#E6F6EC] text-[#23A455] text-[11px] font-medium px-2 py-0.5 rounded-[4px]">Delivered</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button className="adsfixter-primary text-white text-[14px] font-medium py-2.5 rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#e03e04] transition-colors">
          <FiSend /> Send Message
        </button>
        <button className="bg-white border border-[#0E2038] text-[#0E2038] text-[14px] font-medium py-2.5 rounded-[8px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <FiPercent /> Send Coupon
        </button>
      </div>
    </div>
  );
}