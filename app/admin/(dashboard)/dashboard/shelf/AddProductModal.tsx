/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  categories: any[]; // ডাইনামিক ক্যাটাগরি প্রপ্স টাইপ
}

export default function AddProductModal({ isOpen, onClose, onSubmit, isSubmitting, categories }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    quantity: 1,
    lotNumber: "",
    expiryDate: "",
    categoryId: "", 
  });

  // মোডাল ওপেন হলে ডিফল্ট প্রথম ক্যাটাগরি আইডি সেট করার জন্য
  useEffect(() => {
    if (categories && categories.length > 0) {
      setFormData((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.expiryDate) return;
    
    onSubmit(formData);
    
    // ফর্ম রিসেট
    setFormData({ 
      title: "", 
      quantity: 1, 
      lotNumber: "", 
      expiryDate: "", 
      categoryId: categories[0]?.id || "" 
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* max-w-lg এবং mx-auto দিয়ে মোডালের ফিক্সড ও সুন্দর উইডথ নিশ্চিত করা হয়েছে */}
      <div className="bg-white w-full max-w-lg mx-auto rounded-2xl border border-gray-100 shadow-xl overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0E2038]">Shelve New Item</h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Product Name */}
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

          {/* Quantity & Lot Number */}
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

          {/* Category Dropdown & Expiry Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Category *</label>
              <select 
                value={formData.categoryId}
                required
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0E2038] bg-white outline-none focus:border-[#F74608] transition"
              >
                {categories.length === 0 ? (
                  <option value="" disabled>No categories found</option>
                ) : (
                  categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
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
              disabled={isSubmitting || categories.length === 0}
              className="rounded-xl bg-[#F74608] px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 transition disabled:bg-gray-400"
            >
              {isSubmitting ? "Locking..." : "Lock to Shelf"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}