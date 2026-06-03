"use client";
import React, { useState } from "react";
import DashboardCard from "./_components/DashboardCard";





const Analytics = () => {
  const [timeframe, setTimeframe] = useState<string>("today");


  return (
    <div className=" min-h-screen ">
      {/* টপ ফিল্টার ও সার্চ বার */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:max-w-[554px] h-[36px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-[#7F8482]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-full pl-9 pr-4 py-[9px] bg-white border border-[#E9E9E9] rounded-lg text-[14px] font-normal leading-[18px] text-[#0E2038] placeholder-[#7F8482] tracking-[0%] focus:outline-none focus:border-[#0E2038] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          {["today", "week", "month"].map((type) => (
            <button
              key={type}
              onClick={() => setTimeframe(type)}
              className={`h-[36px] px-4 py-1.5 text-sm font-medium rounded-tl-lg rounded-tr-[6px] rounded-br-lg rounded-bl-lg tracking-[-1%] text-center capitalize transition-colors
                ${timeframe === type ? "bg-[#0E2038] text-white" : "bg-white text-[#7F8482] border border-[#E9E9E9]"}`}
            >
              {type === "week" ? "This Week" : type}
            </button>
          ))}
          <button className="flex items-center gap-2 h-[36px] px-4 py-2 bg-white border border-[#E9E9E9] rounded-tl-lg rounded-tr-[6px] rounded-br-lg rounded-bl-lg text-sm font-medium text-[#0E2038] hover:bg-gray-50 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8.00008 4V9.33333M6.33341 7.66667L8.00008 9.33333L9.66675 7.66667M13.3334 8V10C13.3334 11.1046 12.438 12 11.3334 12H4.66675C3.56218 12 2.66675 11.1046 2.66675 10V8"
                stroke="#0E2038"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Export
          </button>
        </div>
      </div>


<DashboardCard timeframe={timeframe}></DashboardCard>
    </div>
  );
};

export default Analytics;
