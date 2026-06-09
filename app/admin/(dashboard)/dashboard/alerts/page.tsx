// "use client";
// import React, { useState, useEffect } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { useStoreContext } from "@/store/useStoreContext"; // আপনার স্টোর কনটেক্সট
// import { useGetAlertRule, useSaveAlertRule } from "@/hooks/useAlertRule";

// export default function AlertRules() {
//   const { currentStoreId } = useStoreContext(); // ডাইনামিক স্টোর আইডি

//   // ১. স্টেট ম্যানেজমেন্ট
//   const [selectedIntervals, setSelectedIntervals] = useState<number[]>([30, 7, 3]);
//   const [fullPhoneNumber, setFullPhoneNumber] = useState<string>("8801838551951"); 
//   const [channels, setChannels] = useState<string[]>(["WhatsApp Alert", "Email Dispatch"]);

//   const availableIntervals = [60, 45, 30, 15, 7, 5, 3, 1];

//   // ২. TanStack Query Hooks কল
//   const { data: alertRule, isLoading } = useGetAlertRule(currentStoreId || "");
//   const saveAlertRuleMutation = useSaveAlertRule(currentStoreId || "");

//   // 🔄 ৩. এপিআই থেকে ডেটা আসলে স্টেটগুলো সিন্ক (Pre-fill) করা
//   useEffect(() => {
//     if (alertRule) {
//       if (alertRule.intervals) setSelectedIntervals(alertRule.intervals);
//       if (alertRule.whatsappNumber) setFullPhoneNumber(alertRule.whatsappNumber);
//       if (alertRule.channels) setChannels(alertRule.channels);
//     }
//   }, [alertRule]);

//   // ৪. ইন্টারভাল সিলেক্ট/ডিসিলেক্ট লজিক
//   const toggleInterval = (day: number) => {
//     if (selectedIntervals.includes(day)) {
//       setSelectedIntervals(selectedIntervals.filter((d) => d !== day));
//     } else {
//       setSelectedIntervals([...selectedIntervals, day].sort((a, b) => b - a));
//     }
//   };

//   // ৫. চ্যানেল সিলেক্ট/ডিসিলেক্ট লজিক
//   const toggleChannel = (channel: string) => {
//     if (channels.includes(channel)) {
//       setChannels(channels.filter((c) => c !== channel));
//     } else {
//       setChannels([...channels, channel]);
//     }
//   };

//   // 🚀 ৬. হুক ব্যবহার করে ডেটা ব্যাকএন্ডে সাবমিট করা
//   const handleSaveAlertSettings = () => {
//     if (!currentStoreId) {
//       alert("Please select a store first.");
//       return;
//     }
//     if (!fullPhoneNumber || fullPhoneNumber.length < 10) {
//       alert("অনুগ্রহ করে একটি সঠিক ফোন নম্বর দিন।");
//       return;
//     }

//     const payload = {
//       intervals: selectedIntervals,
//       customMessage: "", 
//       whatsappNumber: fullPhoneNumber,
//       channels: channels,
//     };

//     saveAlertRuleMutation.mutate(payload, {
//       onSuccess: (res) => {
//         if (res.success) {
//           alert("Alert System Rules Saved Successfully!");
//         } else {
//           alert("Error: " + res.error);
//         }
//       },
//       onError: (error) => {
//         console.error("Failed to save rules:", error);
//         alert("Something went wrong while saving settings.");
//       }
//     });
//   };

//   return (
//     <div className="p-6 space-y-8">
//       <div>
//         <h1 className="text-2xl font-bold text-[#0E2038]">Alert Rules Configuration</h1>
//         <p className="text-sm text-gray-500 mt-1">Configure multi-stage automated message rules prior to lock expiration.</p>
//       </div>

//       {/* ⏳ নো-স্টোর হ্যান্ডলিং */}
//       {!currentStoreId && (
//         <div className="p-8 text-center bg-amber-50 text-amber-700 rounded-2xl border border-amber-200">
//           Please select a store from topbar first to view or configure alert rules.
//         </div>
//       )}

//       {currentStoreId && (
//         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 relative">
          
//           {/* লোডিং ইন্ডিকেটর ব্লার ইফেক্ট সহ */}
//           {isLoading && (
//             <div className="absolute inset-0 bg-white/60 backdrop-blur-xs flex items-center justify-center z-10 rounded-2xl">
//               <span className="text-sm font-semibold text-gray-500 animate-pulse">Loading settings...</span>
//             </div>
//           )}

//           {/* 🗺️ কান্ট্রি কোড ড্রপডাউন এবং ফোন নম্বর ইনপুট */}
//           <div>
//             <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
//               Merchant WhatsApp Notification Number
//             </label>
//             <div className="max-w-md alert-phone-input">
//               <PhoneInput
//                 country={"bd"} 
//                 value={fullPhoneNumber}
//                 onChange={(phone) => setFullPhoneNumber(phone)} 
//                 inputStyle={{
//                   width: "100%",
//                   height: "46px",
//                   borderRadius: "12px",
//                   fontSize: "14px",
//                   color: "#0E2038",
//                   borderColor: "#E5E7EB"
//                 }}
//                 buttonStyle={{
//                   borderTopLeftRadius: "12px",
//                   borderBottomLeftRadius: "12px",
//                   borderColor: "#E5E7EB",
//                   backgroundColor: "#F9FAFB"
//                 }}
//               />
//             </div>
//             <p className="text-xs text-gray-400 mt-1.5">
//               Select country and enter the WhatsApp number for system alerts.
//             </p>
//           </div>

//           {/* Interval Selector */}
//           <div>
//             <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
//               Select Trigger Intervals (Multiple Days Prior to Expiry)
//             </label>
//             <div className="flex flex-wrap gap-3">
//               {availableIntervals.map((day) => {
//                 const isActive = selectedIntervals.includes(day);
//                 return (
//                   <button
//                     key={day}
//                     type="button"
//                     onClick={() => toggleInterval(day)}
//                     className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
//                       isActive
//                         ? "border-[#F74608] bg-[#FFF9F6] text-[#F74608] border-[1.5px]"
//                         : "border-gray-200 text-gray-500 hover:border-gray-300 bg-white"
//                     }`}
//                   >
//                     {day} Days Before
//                   </button>
//                 );
//               })}
//             </div>
//             <p className="text-xs text-gray-400 mt-2">System will push separate alerts at every selected milestone stage.</p>
//           </div>

//           {/* 🔘 Channels (হোয়াটসঅ্যাপ এবং ইমেইল অপশন) */}
//           <div>
//             <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
//               Notification Channels
//             </label>
//             <div className="flex gap-6 pt-1">
//               {["WhatsApp Alert", "Email Dispatch"].map((channel, idx) => {
//                 const isChecked = channels.includes(channel);
//                 return (
//                   <label key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-[#0E2038] cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={isChecked}
//                       onChange={() => toggleChannel(channel)}
//                       className="h-4 w-4 rounded text-[#F74608] border-gray-300 focus:ring-0 accent-[#F74608]"
//                     />
//                     {channel}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Actions Button */}
//           <div className="pt-2">
//             <button 
//               type="button" 
//               onClick={handleSaveAlertSettings}
//               disabled={saveAlertRuleMutation.isPending}
//               className="rounded-xl bg-[#F74608] px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition disabled:bg-orange-400"
//             >
//               {saveAlertRuleMutation.isPending ? "Saving Settings..." : "Save Alert System Rules"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useStoreContext } from "@/store/useStoreContext"; // আপনার স্টোর কনটেক্সট
import { useGetAlertRule, useSaveAlertRule } from "@/hooks/useAlertRule";

export default function AlertRules() {
  // ১. কনটেক্সট থেকে প্রয়োজনীয় ডেটা নেওয়া হলো
  const { currentStoreId, currentStorePhone, currentStore } = useStoreContext(); 

  // ২. স্টেট ম্যানেজমেন্ট
  const [selectedIntervals, setSelectedIntervals] = useState<number[]>([30, 7, 3]);
  const [fullPhoneNumber, setFullPhoneNumber] = useState<string>(""); 
  const [channels, setChannels] = useState<string[]>(["WhatsApp Alert", "Email Dispatch"]);

  const availableIntervals = [60, 45, 30, 15, 7, 5, 3, 1];

  // ৩. TanStack Query Hooks কল
  const { data: alertRule, isLoading } = useGetAlertRule(currentStoreId || "");
  const saveAlertRuleMutation = useSaveAlertRule(currentStoreId || "");

  // 🔄 ৪. এপিআই ডেটা অথবা স্টোর ক্রিয়েশনের ফোন নম্বর সিঙ্ক লজিক
  useEffect(() => {
    // ক) যদি ডাটাবেজে আগে থেকেই এই স্টোরের কোনো এলার্ট রুল সেভ করা থাকে
    if (alertRule && alertRule.whatsappNumber) {
      if (alertRule.intervals) setSelectedIntervals(alertRule.intervals);
      if (alertRule.channels) setChannels(alertRule.channels);
      setFullPhoneNumber(alertRule.whatsappNumber);
      return; 
    }

    // খ) ডাটাবেজে রুলস না থাকলে কনটেক্সট/স্টোর ক্রিয়েশনের সময় দেওয়া নম্বরটি বসবে
    const fallbackPhone = currentStorePhone || currentStore?.phone || currentStore?.whatsapp || "";
    
    if (fallbackPhone) {
      // ফোন নম্বরের শুরুতে যদি '+' বা কান্ট্রি কোড না থাকে, PhoneInput এর সুবিধার্থে শুধু নম্বর পাস করা হচ্ছে
      const cleanPhone = fallbackPhone.toString().replace(/[^0-9]/g, "");
      setFullPhoneNumber(cleanPhone);
    } else {
      setFullPhoneNumber(""); 
    }
  }, [alertRule, currentStorePhone, currentStore, currentStoreId]);

  // ৫. ইন্টারভাল সিলেক্ট/ডিসিলেক্ট লজিক
  const toggleInterval = (day: number) => {
    if (selectedIntervals.includes(day)) {
      setSelectedIntervals(selectedIntervals.filter((d) => d !== day));
    } else {
      setSelectedIntervals([...selectedIntervals, day].sort((a, b) => b - a));
    }
  };

  // ৬. চ্যানেল সিলেক্ট/ডিসিলেক্ট লজিক
  const toggleChannel = (channel: string) => {
    if (channels.includes(channel)) {
      setChannels(channels.filter((c) => c !== channel));
    } else {
      setChannels([...channels, channel]);
    }
  };

  // 🚀 ৭. হুক ব্যবহার করে ডেটা ব্যাকএন্ডে সাবমিট করা
  const handleSaveAlertSettings = () => {
    if (!currentStoreId) {
      alert("Please select a store first.");
      return;
    }
    if (!fullPhoneNumber || fullPhoneNumber.length < 10) {
      alert("অনুগ্রহ করে একটি সঠিক ফোন নম্বর দিন।");
      return;
    }

    const payload = {
      intervals: selectedIntervals,
      customMessage: "", 
      whatsappNumber: fullPhoneNumber,
      channels: channels,
    };

    saveAlertRuleMutation.mutate(payload, {
      onSuccess: (res) => {
        if (res.success) {
          alert("Alert System Rules Saved Successfully!");
        } else {
          alert("Error: " + res.error);
        }
      },
      onError: (error) => {
        console.error("Failed to save rules:", error);
        alert("Something went wrong while saving settings.");
      }
    });
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0E2038]">Alert Rules Configuration</h1>
        <p className="text-sm text-gray-500 mt-1">Configure multi-stage automated message rules prior to lock expiration.</p>
      </div>

      {/* ⏳ নো-স্টোর হ্যান্ডলিং */}
      {!currentStoreId && (
        <div className="p-8 text-center bg-amber-50 text-amber-700 rounded-2xl border border-amber-200">
          Please select a store from topbar first to view or configure alert rules.
        </div>
      )}

      {currentStoreId && (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 relative">
          
          {/* লোডিং ইন্ডিকেটর ব্লার ইফেক্ট সহ */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-xs flex items-center justify-center z-10 rounded-2xl">
              <span className="text-sm font-semibold text-gray-500 animate-pulse">Loading settings...</span>
            </div>
          )}

          {/* 🗺️ কান্ট্রি কোড ড্রপডাউন এবং ফোন নম্বর ইনপুট */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Merchant WhatsApp Notification Number
            </label>
            <div className="max-w-md alert-phone-input">
              {/* 🎯 key={currentStoreId} দেওয়ার কারণে স্টোর পরিবর্তনের সাথে সাথে ইনপুট ফিল্ডের ক্যাশ ক্লিন হয়ে ফোর্স রি-রেন্ডার হবে */}
              <PhoneInput
                key={currentStoreId || "loading"}
                country={"bd"} 
                value={fullPhoneNumber}
                onChange={(phone) => setFullPhoneNumber(phone)} 
                inputStyle={{
                  width: "100%",
                  height: "46px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  color: "#0E2038",
                  borderColor: "#E5E7EB"
                }}
                buttonStyle={{
                  borderTopLeftRadius: "12px",
                  borderBottomLeftRadius: "12px",
                  borderColor: "#E5E7EB",
                  backgroundColor: "#F9FAFB"
                }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Select country and enter the WhatsApp number for system alerts.
            </p>
          </div>

          {/* Interval Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
              Select Trigger Intervals (Multiple Days Prior to Expiry)
            </label>
            <div className="flex flex-wrap gap-3">
              {availableIntervals.map((day) => {
                const isActive = selectedIntervals.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleInterval(day)}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                      isActive
                        ? "border-[#F74608] bg-[#FFF9F6] text-[#F74608] border-[1.5px]"
                        : "border-gray-200 text-gray-500 hover:border-gray-300 bg-white"
                    }`}
                  >
                    {day} Days Before
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-2">System will push separate alerts at every selected milestone stage.</p>
          </div>

          {/* 🔘 Channels (হোয়াটসঅ্যাপ এবং ইমেইল অপশন) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Notification Channels
            </label>
            <div className="flex gap-6 pt-1">
              {["WhatsApp Alert", "Email Dispatch"].map((channel, idx) => {
                const isChecked = channels.includes(channel);
                return (
                  <label key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-[#0E2038] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleChannel(channel)}
                      className="h-4 w-4 rounded text-[#F74608] border-gray-300 focus:ring-0 accent-[#F74608]"
                    />
                    {channel}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Actions Button */}
          <div className="pt-2">
            <button 
              type="button" 
              onClick={handleSaveAlertSettings}
              disabled={saveAlertRuleMutation.isPending}
              className="rounded-xl bg-[#F74608] px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition disabled:bg-orange-400"
            >
              {saveAlertRuleMutation.isPending ? "Saving Settings..." : "Save Alert System Rules"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}