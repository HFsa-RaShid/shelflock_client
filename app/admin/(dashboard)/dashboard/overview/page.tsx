/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import { useStoreContext } from "@/store/useStoreContext";
import { useGetProducts } from "@/hooks/useProduct";
import { 
  Package, 
  ShieldCheck, 
  AlertTriangle, 
  Trash2, 
  Loader2, 
  TrendingUp,
  Activity,
  BarChart3
} from "lucide-react";
import { differenceInDays, isAfter, isBefore, startOfDay } from "date-fns";

// 📈 Highcharts ইম্পোর্টস
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";

if (typeof window !== "undefined") {
  const init3D = (highcharts3d as any).default || highcharts3d;
  if (typeof init3D === "function") {
    init3D(Highcharts);
  }
}

export default function DashboardOverview() {
  const { currentStoreId } = useStoreContext();
  const { data: products = [], isLoading, isError } = useGetProducts(currentStoreId);

  // 🎯 ১. ডাটা প্রসেসিং
  const metrics = useMemo(() => {
    const todayDate = startOfDay(new Date());
    const total = products?.length || 0;
    
    const active = products.filter((p: any) => 
      p.status === "Active" && isAfter(new Date(p.expiryDate), todayDate)
    ).length;

    const nearExpiry = products.filter((p: any) => {
      const daysLeft = differenceInDays(new Date(p.expiryDate), todayDate);
      return daysLeft >= 0 && daysLeft <= 15;
    });

    const expired = products.filter((p: any) => 
      isBefore(new Date(p.expiryDate), todayDate)
    ).length;

    const categoriesMap: Record<string, { safe: number; nearExpiry: number; expired: number }> = {};
    
    products.forEach((p: any) => {
      const catName = p.category?.name || "Uncategorized";
      const qty = Number(p.quantity) || 1;
      
      if (!categoriesMap[catName]) {
        categoriesMap[catName] = { safe: 0, nearExpiry: 0, expired: 0 };
      }

      const daysLeft = differenceInDays(new Date(p.expiryDate), todayDate);
      if (isBefore(new Date(p.expiryDate), todayDate)) {
        categoriesMap[catName].expired += qty;
      } else if (daysLeft >= 0 && daysLeft <= 15) {
        categoriesMap[catName].nearExpiry += qty;
      } else {
        categoriesMap[catName].safe += qty;
      }
    });

    const catNames = Object.keys(categoriesMap);
    const safeSeries = catNames.map(name => categoriesMap[name].safe);
    const nearExpirySeries = catNames.map(name => categoriesMap[name].nearExpiry);
    const expiredSeries = catNames.map(name => categoriesMap[name].expired);

    return {
      totalProducts: total,
      activeProducts: active,
      nearExpiryProducts: nearExpiry,
      expiredProducts: expired,
      today: todayDate,
      barCategories: catNames,
      barSeries: [
        { name: "Safe Stock", data: safeSeries, color: "#10B981" },
        { name: "Near Expiry", data: nearExpirySeries, color: "#F74608" },
        { name: "Expired", data: expiredSeries, color: "#EF4444" }
      ],
      pieData: [
        { name: "Safe Items", y: Math.max(0, active - nearExpiry.length), color: "#10B981" },
        { name: "Near Expiry", y: nearExpiry.length, color: "#F74608" },
        { name: "Expired", y: expired, color: "#EF4444" }
      ]
    };
  }, [products]);

  // 🎯 ২. Highcharts 3D Pie / Donut কনফিগারেশন
  const pieOptions = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      },
      backgroundColor: "transparent",
      height: 320 // চার্টের হাইট ফিক্সড করা হয়েছে যাতে খালি জায়গা না থাকে
    },
    title: { text: "" },
    accessibility: { enabled: false },
    plotOptions: {
      pie: {
        innerSize: 110, 
        depth: 45,     
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b><br>{point.y} Items",
          style: { fontSize: "11px", color: "#4B5563", textOutline: "none" }
        }
      }
    },
    series: [{
      name: "Total Batches",
      data: metrics.pieData
    }],
    credits: { enabled: false }
  };

  // 🎯 ৩. Highcharts Stacked Bar Chart কনফিগারেশন
  const barOptions = {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
      height: 320 // বার চার্টের হাইট সমান করা হয়েছে সমতা বজায় রাখার জন্য
    },
    title: { text: "" },
    xAxis: {
      categories: metrics.barCategories.length > 0 ? metrics.barCategories : ["No Data"],
      gridLineWidth: 0,
      labels: { style: { color: "#4B5563", fontWeight: "600", fontSize: "12px" } }
    },
    yAxis: {
      min: 0,
      title: { text: "Product Quantity Count", style: { color: "#9CA3AF", fontWeight: "500" } },
      labels: { style: { color: "#9CA3AF" } },
      gridLineColor: "#F3F4F6"
    },
    legend: {
      reversed: true,
      itemStyle: { color: "#374151", fontSize: "12px", fontWeight: "600" }
    },
    plotOptions: {
      series: {
        stacking: "normal", 
        borderRadius: 6,
        pointWidth: 26 // বারের থিকনেস সুন্দর করার জন্য ফিক্সড উইডথ
      }
    },
    series: metrics.barSeries,
    credits: { enabled: false },
    accessibility: { enabled: false }
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full flex flex-col items-center justify-center gap-4 bg-gray-50/50">
        <Loader2 className="w-10 h-10 animate-spin text-[#F74608]" />
        <p className="text-base text-gray-500 font-semibold tracking-wide">Assembling Luxury Interface...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center bg-gray-50/50">
        <div className="bg-white p-8 rounded-2xl border border-red-100 text-center max-w-sm shadow-lg">
          <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-[#0E2038]">System Alert</h3>
          <p className="text-sm text-gray-400">Failed to link real-time database metrics.</p>
        </div>
      </div>
    );
  }

  return (
    /* 🎯 মেইন লেআউট স্পেসিং ফিক্সড: py-8 এবং space-y-10 দেওয়া হয়েছে যাতে কোনো সেকশন লেগে না থাকে */
    <div className="p-4 md:p-8 space-y-10 min-h-screen">
      
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#0E2038] tracking-tight">ShelfLock Overview</h1>
          <p className="text-sm text-gray-400 mt-0.5">Real-time status monitoring of your digital store shelves.</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 text-[#F74608] px-4 py-2 rounded-xl text-xs font-bold self-start sm:self-center">
          <TrendingUp className="w-4 h-4" />
          Highcharts Premium Pack Enabled
        </div>
      </div>

      {/* 📊 ১. ডাইনামিক কাউন্টার কার্ডস */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Items */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition duration-300">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Shelved Items</p>
          <p className="text-4xl font-black text-[#0E2038] mt-2">{metrics.totalProducts}</p>
          <div className="text-xs text-gray-400 mt-4 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> All tracked inventory
          </div>
        </div>

        {/* Safe Items */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition duration-300">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Locked & Safe</p>
          <p className="text-4xl font-black text-green-600 mt-2">{metrics.activeProducts}</p>
          <div className="text-xs text-green-600 mt-4 flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" /> Active alerts enabled
          </div>
        </div>

        {/* Near Expiry */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition duration-300">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Near Expiry Alerts</p>
          <p className="text-4xl font-black text-[#F74608] mt-2">{metrics.nearExpiryProducts.length}</p>
          <div className="text-xs text-[#F74608] mt-4 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#F74608] animate-pulse"></span> Expires within 15 days
          </div>
        </div>

        {/* Expired Items */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition duration-300">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Expired / Disposed</p>
          <p className="text-4xl font-black text-red-500 mt-2">{metrics.expiredProducts}</p>
          <div className="text-xs text-red-400 mt-4 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> Immediate removal required
          </div>
        </div>
      </div>

      {/* 📈 ২. Highcharts গ্রাফিক্স সেকশন (গ্যাপ ও সাইড স্পেস খালি থাকা ফিক্সড) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* কলাম চার্ট: Stacked Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between w-full">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#0E2038] uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#F74608]" /> Category Wise Stacked Volume
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Distribution of safe, warning, and expired stock levels.</p>
          </div>
          
          {/* w-full দিয়ে গ্রাফের চারপাশের খালি জায়গা ভরাট করা হয়েছে */}
          <div className="w-full flex-1 mt-2">
            {metrics.barCategories.length > 0 ? (
              <HighchartsReact highcharts={Highcharts} options={barOptions} />
            ) : (
              <div className="h-[320px] flex items-center justify-center text-xs text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                No stock data available to distribute.
              </div>
            )}
          </div>
        </div>

        {/* পাই চার্ট: 3D Pie Donut Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between w-full">
          <div>
            <h3 className="text-sm font-bold text-[#0E2038] uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-500" /> 3D Shelf Health Status
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Interactive 3D structural visualizer of risk ratio.</p>
          </div>
          
          <div className="w-full flex-1 my-auto py-2">
            {metrics.totalProducts > 0 ? (
              <HighchartsReact highcharts={Highcharts} options={pieOptions} />
            ) : (
              <div className="h-[320px] flex items-center justify-center text-xs text-gray-400">
                No health logs to visualize.
              </div>
            )}
          </div>

          <div className="text-center text-[11px] font-bold text-gray-500 uppercase tracking-widest bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            Total Batches Managed: {metrics.totalProducts}
          </div>
        </div>
      </div>

      {/* ⚠️ ৩. ক্রিটিক্যাল এক্সপায়ারি লাইভ ট্র্যাকিং লিস্ট (পারফেক্টলি সেপারেটেড) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition duration-300">
        <div className="mb-5">
          <h3 className="text-sm font-bold text-[#0E2038] uppercase tracking-wider">Critical Expiry Action Board</h3>
          <p className="text-xs text-gray-400 mt-0.5">Immediate management required for these near-deadline products.</p>
        </div>
        
        <div>
          {metrics.nearExpiryProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {metrics.nearExpiryProducts.slice(0, 6).map((item: any) => {
                const daysLeft = differenceInDays(new Date(item.expiryDate), metrics.today);
                return (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50/60 rounded-xl border border-gray-100/80 hover:border-orange-200 hover:bg-white transition duration-200 shadow-2xs">
                    <div className="space-y-1 overflow-hidden pr-2">
                      <h4 className="text-sm font-bold text-[#0E2038] truncate">{item.title}</h4>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        <span className="font-semibold text-gray-600">Qty: {item.quantity}</span> 
                        <span className="text-gray-300">•</span> 
                        <span className="truncate">{item.category?.name || "Uncategorized"}</span>
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-xl shrink-0 ${
                      daysLeft <= 3 ? "bg-red-50 text-red-600 animate-pulse" : "bg-orange-50 text-orange-600"
                    }`}>
                      {daysLeft === 0 ? "Expires Today" : `Expires in ${daysLeft} days`}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-sm text-gray-400 font-medium bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              🎉 No products are approaching critical expiry limits right now.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}