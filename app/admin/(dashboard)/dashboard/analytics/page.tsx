"use client";
import React from "react";

export default function Analytics() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0E2038]">Storage & Expiry Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">Track shelf metrics, safe stock levels, and automated alert logs.</p>
      </div>

      {/* Grid Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-xs font-bold text-gray-400 uppercase">Alert Execution Success Rate</h4>
          <p className="text-2xl font-bold text-[#0E2038] mt-2">99.4%</p>
          <span className="text-[11px] text-green-600 font-medium">3,421 dispatches delivered safely</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-xs font-bold text-gray-400 uppercase">Average Safe-Lock Period</h4>
          <p className="text-2xl font-bold text-[#0E2038] mt-2">42.5 Days</p>
          <span className="text-[11px] text-gray-400">Duration items remain safely locked</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-xs font-bold text-gray-400 uppercase">Waste Prevention Index</h4>
          <p className="text-2xl font-bold text-green-600 mt-2">+88.2%</p>
          <span className="text-[11px] text-gray-400">Items saved from disposal due to alerts</span>
        </div>
      </div>

      {/* Logs Table Simulation */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-50">
          <h3 className="text-sm font-bold text-[#0E2038] uppercase tracking-wider">Recent Dispatched Alert Triggers</h3>
        </div>
        <div className="p-4 space-y-3">
          {[
            { id: "#ALT-9082", item: "Nestle Cerelac Wheat", trigger: "7-Days Pre-Expiry Alert", target: "SMS & In-App", time: "Today, 09:12 AM" },
            { id: "#ALT-8941", item: "Dano Powdered Milk 1kg", trigger: "3-Days Pre-Expiry Alert", target: "SMS Blast", time: "Yesterday, 04:30 PM" },
            { id: "#ALT-8760", item: "Calpol Paediatric Drops", trigger: "30-Days Pre-Expiry Alert", target: "Email Loop", time: "2 days ago" },
          ].map((log, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-xl gap-2 hover:border-gray-200 transition">
              <div>
                <span className="text-xs font-mono text-gray-400">{log.id}</span>
                <h4 className="text-sm font-bold text-[#0E2038] mt-0.5">{log.item}</h4>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs font-semibold text-[#F74608] bg-orange-50 px-2 py-0.5 rounded inline-block">{log.trigger}</p>
                <p className="text-xs text-gray-400 mt-1">Dispatched via {log.target} • <span className="font-medium text-gray-500">{log.time}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}