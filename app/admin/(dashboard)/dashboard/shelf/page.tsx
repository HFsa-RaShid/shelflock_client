/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Plus, Filter } from "lucide-react";
import { useStoreContext } from "@/store/useStoreContext"; // আপনার টপবারে ব্যবহৃত স্টোর কন্টেক্সট
import { useGetProducts, useCreateProduct, useUpdateProduct } from "@/hooks/useProduct";
import AddProductModal from "./AddProductModal";


export default function ShelfStorage() {
  const { currentStoreId } = useStoreContext(); // গ্লোবাল কারেন্ট স্টোর আইডি আনা হলো
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // রিয়্যাক্ট কোয়েরি হুক এপিআই কল
  const { data: products = [], isLoading } = useGetProducts(currentStoreId);
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();

  // মোডাল থেকে ডাটা নিয়ে এপিআই-তে পোস্ট করা
  const handleAddProductSubmit = (formData: any) => {
    if (!currentStoreId) return;
    createProductMutation.mutate(
      { productData: formData, storeId: currentStoreId },
      {
        onSuccess: () => {
          setIsModalOpen(false); // সফল হলে মোডাল বন্ধ হবে
        },
      }
    );
  };

  // টেবিলে লাইভ স্ট্যাটাস (বা কোয়ান্টিটি/টার্মস) সুইচ বা পরিবর্তন করার মেথড
  const handleToggleStatus = (id: string, currentQuantity: number) => {
    // উদাহরণস্বরূপ: আনলকড থাকলে কোয়ান্টিটি ০ করে দেওয়া বা কাস্টম স্ট্যাটাস লজিক হ্যান্ডেল করা
    // যেহেতু আপনার ব্যাকএন্ডে IProductUpdateInput এ কোয়ান্টিটি বা অন্যান্য ফিল্ড আছে:
    const targetQuantity = currentQuantity > 0 ? 0 : 5; // সিম্পল টগল এক্সাম্পল
    updateProductMutation.mutate({
      id,
      updateData: { quantity: targetQuantity },
    });
  };

  // ক্লায়েন্ট সাইড ক্যাটাগরি ফিল্টারিং লজিক
  const filteredProducts = products.filter((p: any) => {
    if (selectedCategory === "All") return true;
    // আপনার ডাটাবেজে যদি রিলেশন অবজেক্ট থাকে (p.category.name) অথবা ডিরেক্ট আইডি (p.categoryId) থাকে তা চেক করবে
    const productCat = p.category?.name || p.categoryId;
    return productCat?.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="p-6 mx-auto space-y-6">
      
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0E2038]">Shelf Storage (Store Room)</h1>
          <p className="text-sm text-gray-500 mt-1">Lock new products with expiry terms into your dedicated categories.</p>
        </div>
        {/* ➕ অ্যাড প্রোডাক্ট বাটন যা মোডাল ট্রিগার করবে */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#F74608] px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 transition self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* ⏳ লোডিং এবং নো-স্টোর হ্যান্ডলিং */}
      {!currentStoreId && (
        <div className="p-8 text-center bg-amber-50 text-amber-700 rounded-2xl border border-amber-200">
          Please select a store from topbar first to view or manage shelf items.
        </div>
      )}

      {currentStoreId && (
        <>
          {/* 🎯 ফিল্টার সেকশন (লিস্টের উপরে ক্যাটাগরি সিলেক্ট করার ড্রপডাউন) */}
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm max-w-xs">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-transparent text-sm text-[#0E2038] font-medium outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Groceries">Groceries</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Dairy & Bakery">Dairy & Bakery</option>
              <option value="Cosmetics">Cosmetics</option>
            </select>
          </div>

          {/* Shelved Items Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-50">
              <h3 className="text-sm font-bold text-[#0E2038] uppercase tracking-wider">Active Shelf Items</h3>
            </div>
            
            {isLoading ? (
              <div className="p-10 text-center text-sm text-gray-400 animate-pulse">Loading items from shelf...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="p-10 text-center text-sm text-gray-400">No products found in this category.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      <th className="p-4 pl-6">Product Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Lot & Qty</th>
                      <th className="p-4">Expiry Date</th>
                      <th className="p-4 text-center">Status / Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-[#0E2038] divide-y divide-gray-50">
                    {filteredProducts.map((p: any) => {
                      const isLocked = p.quantity > 0; // যদি স্টক থাকে তবে লকড, নয়তো আউট অফ স্টক/আনলকড
                      return (
                        <tr key={p.id} className="hover:bg-gray-50/70 transition">
                          <td className="p-4 pl-6 font-semibold">
                            <div>{p.title}</div>
                            <span className="text-xs text-gray-400 font-normal">Alert: {p.alertDaysBefore} days before</span>
                          </td>
                          <td className="p-4 text-gray-500">{p.category?.name || p.categoryId || "N/A"}</td>
                          <td className="p-4">
                            <div className="font-medium text-gray-700">Qty: {p.quantity}</div>
                            <div className="text-xs text-gray-400 font-mono">Lot: {p.lotNumber || "None"}</div>
                          </td>
                          <td className="p-4 font-mono text-gray-600">
                            {new Date(p.expiryDate).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-center">
                            {/* 🔄 ক্লিক করলে স্ট্যাটাস চেইঞ্জ হবে */}
                            <button
                              onClick={() => handleToggleStatus(p.id, p.quantity)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition transform active:scale-95 ${
                                isLocked ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100" : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isLocked ? "bg-green-600" : "bg-amber-500"}`}></span>
                              {isLocked ? "Locked" : "Unlocked"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* 📄 মডুলার অ্যাড প্রোডাক্ট পপআপ মোডাল */}
      <AddProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProductSubmit}
        isSubmitting={createProductMutation.isPending}
      />
    </div>
  );
}