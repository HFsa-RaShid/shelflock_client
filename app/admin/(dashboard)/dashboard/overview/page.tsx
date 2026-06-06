"use client";
import React from "react";

export default function DashboardOverview() {
  // ডামি স্ট্যাটিস্টিকস ডাটা
  const stats = [
    { name: "Total Shelved Products", value: "1,240", change: "+12% this week", color: "text-[#0E2038]" },
    { name: "Locked Items (Active)", value: "842", change: "Safe Storage", color: "text-green-600" },
    { name: "Near Expiry Alerts", value: "24", change: "Action required", color: "text-[#F74608]" },
    { name: "Expired & Disposed", value: "7", change: "Cleaned this month", color: "text-gray-400" },
  ];

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0E2038]">ShelfLock Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor your virtual store room and expiry status.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.name}</p>
            <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Analytics Briefing & Storage Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-base font-bold text-[#0E2038] mb-4">Critical Expiry Timeline</h3>
          <div className="space-y-4">
            {[
              { name: "Organic Milk Batch C", days: "Expires in 3 days", type: "Dairy", status: "Critical" },
              { name: "Paracetamol 500mg", days: "Expires in 12 days", type: "Pharma", status: "Warning" },
              { name: "Premium Brown Bread", days: "Expires in 2 days", type: "Bakery", status: "Critical" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="text-sm font-semibold text-[#0E2038]">{item.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Category: {item.type}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                  item.status === "Critical" ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
                }`}>
                  {item.days}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0E2038] mb-2">Room Capacity</h3>
            <p className="text-xs text-gray-400">Total volume usage of your virtual store shelves.</p>
          </div>
          <div className="my-6 flex items-center justify-center relative">
            {/* Simple CSS-based progress ring or bar representation */}
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div className="bg-[#F74608] h-full rounded-full" style={{ width: "68%" }}></div>
            </div>
          </div>
          <div className="flex justify-between text-xs font-semibold text-gray-500">
            <span>68% Occupied</span>
            <span>32% Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}