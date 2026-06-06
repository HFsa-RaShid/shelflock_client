/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export default function AddProductModal({ isOpen, onClose, onSubmit, isSubmitting }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    quantity: 1,
    lotNumber: "",
    expiryDate: "",
    alertDaysBefore: 7,
    categoryId: "Groceries", // আপনার সিস্টেমে আইডি বা নাম যেটা পাস করেন
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.expiryDate) return;
    onSubmit(formData);
    // ফর্ম রিসেট
    setFormData({ title: "", quantity: 1, lotNumber: "", expiryDate: "", alertDaysBefore: 7, categoryId: "Groceries" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-gray-100 shadow-xl overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0E2038]">Shelve New Item</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Product Name *</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Baby Food Step 1" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0E2038] outline-none focus:border-[#F74608] transition" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Quantity *</label>
              <input 
                type="number" 
                min="1"
                required
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
                className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0E2038] outline-none focus:border-[#F74608] transition" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Lot Number</label>
              <input 
                type="text" 
                placeholder="e.g. LOT-1024" 
                value={formData.lotNumber}
                onChange={(e) => setFormData({...formData, lotNumber: e.target.value})}
                className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0E2038] outline-none focus:border-[#F74608] transition" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Category</label>
              <select 
                value={formData.categoryId}
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0E2038] bg-white outline-none focus:border-[#F74608] transition"
              >
                <option value="Groceries">Groceries</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Dairy & Bakery">Dairy & Bakery</option>
                <option value="Cosmetics">Cosmetics</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Alert Days Before</label>
              <input 
                type="number" 
                value={formData.alertDaysBefore}
                onChange={(e) => setFormData({...formData, alertDaysBefore: Number(e.target.value)})}
                className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0E2038] outline-none focus:border-[#F74608] transition" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Expiry Date *</label>
            <input 
              type="date" 
              required
              value={formData.expiryDate}
              onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
              className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0E2038] outline-none focus:border-[#F74608] transition cursor-pointer" 
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="rounded-xl bg-[#F74608] px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 transition disabled:bg-orange-400"
            >
              {isSubmitting ? "Locking..." : "Lock to Shelf"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}