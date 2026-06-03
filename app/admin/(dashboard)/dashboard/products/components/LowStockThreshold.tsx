'use client';

import { useState } from 'react';
import thresholdConfig from '../data/threshold-config.json';

export default function LowStockThreshold() {
  const [threshold, setThreshold] = useState(thresholdConfig.low_stock_threshold_settings.default_alert_level);

  return (
    <div className="border border-[#E5E7EB] p-5 rounded-2xl bg-white shadow-sm flex flex-col justify-between h-full">
      {/* Grid Left vs Right Section */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Side: Input Box Control */}
        <div className="col-span-6 flex flex-col justify-between">
          <div>
            <h3 className="body-medium primary-text">Low Stock Threshold</h3>
            <p className="body-xsm-regular subtext mt-0.5">Set default alert threshold for all products</p>
          </div>
          
          <div className="border border-[#E5E7EB] rounded-2xl p-4 mt-4 bg-white flex flex-col justify-between min-h-[110px]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#111827] font-bold">Default Alert Level</span>
              <div className="flex items-center space-x-1.5 border border-[#E5E7EB] rounded-lg px-2 py-1 bg-white">
                <input 
                  type="number" 
                  value={threshold} 
                  onChange={(e) => setThreshold(Number(e.target.value))} 
                  className="w-8 text-center text-xs font-bold outline-none text-[#111827]"
                />
                
                {/* Custom Up/Down Tiny Arrows built with Tailwind */}
                <div className="flex flex-col text-[8px] text-[#9CA3AF] border-l border-[#E5E7EB] pl-1.5 space-y-0.5">
                  <button type="button" onClick={() => setThreshold(prev => prev + 1)} className="hover:text-black">▲</button>
                  <button type="button" onClick={() => setThreshold(prev => prev - 1)} className="hover:text-black">▼</button>
                </div>
              </div>
              <span className="text-[11px] text-[#9CA3AF] font-medium">units</span>
            </div>
            
            <div className="border-t border-[#F3F4F6] pt-3 mt-3">
              <p className="body-xsm-regular subtext">
                You will be alerted when stock is equal or below this level.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Alert Checkboxes & Save CTA */}
        <div className="col-span-6 flex flex-col justify-between border-l border-[#F3F4F6] pl-6">
          <div>
            <h4 className="body-xsm-regular subtext">Alert Preferences</h4>
            <div className="space-y-3.5 mt-4 body-xsm-regular primary-text">
              <label className="flex items-center space-x-3  cursor-pointer group">
                <input 
                  type="checkbox" 
                  defaultChecked={thresholdConfig.low_stock_threshold_settings.alert_preferences.dashboard_notification} 
                  className="w-4 h-4 accent-[#E05613] rounded border-[#E5E7EB] cursor-pointer" 
                />
                <span className="group-hover:text-black transition-colors">Dashboard Notification</span>
              </label>

              <label className="flex items-center space-x-3 text-xs font-semibold text-[#4B5563] cursor-pointer group">
                <input 
                  type="checkbox" 
                  defaultChecked={thresholdConfig.low_stock_threshold_settings.alert_preferences.email_alert} 
                  className="w-4 h-4 accent-[#E05613] rounded border-[#E5E7EB] cursor-pointer" 
                />
                <span className="group-hover:text-black transition-colors">Email Alert</span>
              </label>

              <label className="flex items-center space-x-3 text-xs font-semibold text-[#4B5563] cursor-pointer group">
                <input 
                  type="checkbox" 
                  defaultChecked={thresholdConfig.low_stock_threshold_settings.alert_preferences.email_alert} 
                  className="w-4 h-4 accent-[#E05613] rounded border-[#E5E7EB] cursor-pointer" 
                />
                <span className="group-hover:text-black transition-colors">WhatsApp Alert</span>
              </label>

            
            </div>
          </div>

          <button className="w-full bg-[#E05613] text-white text-xs py-2.5 rounded-xl font-bold shadow-sm hover:bg-[#C84B0F] transition-all mt-4">
            Save Settings
          </button>
        </div>

      </div>
    </div>
  );
}