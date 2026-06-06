"use client";
import React, { useState, useEffect } from "react";
// কান্ট্রি ড্রপডাউনের জন্য প্যাকেজ ও সিএসএস ইম্পোর্ট
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function AlertRules() {
  // ১. স্টেট ম্যানেজমেন্ট
  const [selectedIntervals, setSelectedIntervals] = useState<number[]>([30, 7, 3]);
  
  // ফোন নম্বর এবং কান্ট্রি কোডের জন্য স্টেট
  const [fullPhoneNumber, setFullPhoneNumber] = useState<string>("8801838551951"); 

  // নোটিফিকেশন চ্যানেল স্টেট
  const [channels, setChannels] = useState<string[]>(["WhatsApp Alert", "Email Dispatch"]);

  const availableIntervals = [60, 45, 30, 15, 7, 5, 3, 1];

  // 🔄 ২. ব্যাকএন্ড থেকে আগের সেভ করা ডেটা লোড করা (Pre-fill)
  useEffect(() => {
    const fetchAlertSettings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/alert-rules", {
          method: "GET",
          headers: {
            "store-id": "YOUR_STORE_ID_HERE", // আপনার ডাইনামিক স্টোর আইডি
          },
        });
        const resData = await response.json();
        
        if (resData.success && resData.data) {
          const savedData = resData.data;
          if (savedData.intervals) setSelectedIntervals(savedData.intervals);
          if (savedData.whatsappNumber) setFullPhoneNumber(savedData.whatsappNumber);
          if (savedData.channels) setChannels(savedData.channels);
        }
      } catch (error) {
        console.error("Failed to fetch initial alert rules:", error);
      }
    };

    fetchAlertSettings();
  }, []);

  // ৩. ইন্টারভাল সিলেক্ট/ডিসিলেক্ট করার লজিক
  const toggleInterval = (day: number) => {
    if (selectedIntervals.includes(day)) {
      setSelectedIntervals(selectedIntervals.filter((d) => d !== day));
    } else {
      setSelectedIntervals([...selectedIntervals, day].sort((a, b) => b - a));
    }
  };

  // ৪. চ্যানেল সিলেক্ট/ডিসিলেক্ট লজিক
  const toggleChannel = (channel: string) => {
    if (channels.includes(channel)) {
      setChannels(channels.filter((c) => c !== channel));
    } else {
      setChannels([...channels, channel]);
    }
  };

  // 🚀 ৫. নতুন ডেটা ব্যাকএন্ডে সেভ করা (Create/Update)
  const handleSaveAlertSettings = async () => {
    if (!fullPhoneNumber || fullPhoneNumber.length < 10) {
      alert("অনুগ্রহ করে একটি সঠিক ফোন নম্বর দিন।");
      return;
    }

    const payload = {
      intervals: selectedIntervals,
      customMessage: "", // 👈 কাস্টম মেসেজ পার্টটি UI থেকে বাদ দেওয়ায় এখানে খালি স্ট্রিং পাঠানো হচ্ছে, ব্যাকএন্ড তার নিজস্ব ডিফল্ট বাংলা মেসেজ ব্যবহার করবে
      whatsappNumber: fullPhoneNumber, 
      channels: channels,
    };

    try {
      const response = await fetch("http://localhost:5000/api/alert-rules", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "store-id": "YOUR_STORE_ID_HERE",
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();
      if (resData.success) {
        alert("Alert System Rules Saved/Updated Successfully!");
      } else {
        alert("Error: " + resData.error);
      }
    } catch (error) {
      console.error("Failed to save rules:", error);
      alert("Something went wrong while saving settings.");
    }
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0E2038]">Alert Rules Configuration</h1>
        <p className="text-sm text-gray-500 mt-1">Configure multi-stage automated message rules prior to lock expiration.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        
        {/* 🗺️ কান্ট্রি কোড ড্রপডাউন এবং ফোন নম্বর ইনপুট */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Merchant WhatsApp Notification Number
          </label>
          <div className="max-w-md alert-phone-input">
            <PhoneInput
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

        {/* 🔘 Channels (শুধুমাত্র হোয়াটসঅ্যাপ এবং ইমেইল অপশন) */}
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

        {/* Actions */}
        <div className="pt-2  border-gray-50">
          <button 
            type="button" 
            onClick={handleSaveAlertSettings}
            className="rounded-xl bg-[#F74608] px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition"
          >
            Save Alert System Rules
          </button>
        </div>
      </div>
    </div>
  );
}