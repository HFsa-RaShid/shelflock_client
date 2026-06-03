"use client"
import React from "react";
import { FiRefreshCw, FiShoppingBag, FiTruck, FiUserPlus, FiUsers } from "react-icons/fi";


const overviewData = [
  {
    id: 1,
    title: "Total Customer",
    value: "882",
    change: "+10%",
    changeText: "increase this month",
    isPositive: true,
    icon: <FiUsers className="w-5 h-5 text-[#2570FC]" />,
    iconBg: "bg-[#2570FC]/10",
  },
  {
    id: 2,
    title: "New Customer",
    value: "37",
    change: "10",
    changeText: "New customer today",
    isPositive: true,
    icon: <FiUserPlus className="w-5 h-5 text-[#23A455]" />,
    iconBg: "bg-[#23A455]/10",
  },
  {
    id: 3,
    title: "COD Rate",
    value: "85%",
    changeText: "Cash on delivery",
    isPositive: null,
    icon: <FiTruck className="w-5 h-5 text-[#E29400]" />,
    iconBg: "bg-[#E29400]/10",
  },
  {
    id: 4,
    title: "Repeated Customer",
    value: "120",
    change: "+10%",
    changeText: "increase this month",
    isPositive: true,
    icon: <FiRefreshCw className="w-5 h-5 text-[#7925FC]" />,
    iconBg: "bg-[#7925FC]/10",
  },
  {
    id: 5,
    title: "Large Order",
    value: "20",
    change: "+10%",
    changeText: "increase this month",
    isPositive: true,
    icon: <FiShoppingBag className="w-5 h-5 text-[#F74608]" />,
    iconBg: "bg-[#F74608]/10",
  },
];


function CustomerOverview() {
  return (
    <div>
      {/* OVERVIEW CARDS */}
      <div className="w-full bg-white border border-[#0000000F] rounded-[12px] p-4 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex flex-col gap-2">
            <h2 className="h6-medium primary-text">Overview</h2>
            <p className="body-sm-regular subtext ">
              Manage your customers, orders, spending insights, and purchase
              activity from one place.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="adsfixter-primary text-white text-[14px] font-medium px-4 py-2.5 rounded-[8px] flex items-center gap-2 hover:bg-[#e03e04] transition-colors">
              <span>+</span> Add Customer
            </button>
            <button className="bg-white border border-[#0000001F] text-[#0E2038] text-[14px] font-medium px-4 py-2.5 rounded-[8px] hover:bg-gray-50 transition-colors">
              Export
            </button>
          </div>
        </div>

        {/* cards  */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
          {overviewData.map((card) => (
            <div
              key={card.id}
              className="bg-white p-4 rounded-xl border border-[#0000000F] shadow-sm flex flex-col justify-between min-h-[130px] w-full transition-all hover:shadow-md"
            >
              {/* Top Section: Icon & Title */}
              <div className="flex items-center space-x-2 text-xs font-medium min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg ${card.iconBg} flex items-center justify-center shrink-0`}
                >
                  {card.icon}
                </div>
                <span className="body-regular subtext truncate block min-w-0 w-full">
                  {card.title}
                </span>
              </div>

              {/* Middle Section: Value */}
              <div className="h6-medium primary-text mt-3 font-bold">
                {card.value}
              </div>

              {/* Bottom Section: Subtext / Change (Strictly Single Line) */}
              <div className="flex items-center gap-1 mt-1 text-[13px] text-[#7F8482] whitespace-nowrap overflow-hidden min-w-0 w-full">
                {card.change && (
                  <span
                    className={`font-medium shrink-0 ${card.isPositive ? "text-[#23A455]" : "text-gray-500"}`}
                  >
                    {card.change}
                  </span>
                )}
                <span className="subtext truncate block min-w-0">
                  {card.changeText}
                </span>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}

export default CustomerOverview;
