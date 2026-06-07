/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Plus, Filter, CheckCircle, XCircle } from "lucide-react"; // আইকন পরিবর্তন করে Active/Inactive এর সাথে সামঞ্জস্য করা হলো
import { useStoreContext } from "@/store/useStoreContext";
import { useGetProducts, useCreateProduct, useUpdateProduct } from "@/hooks/useProduct";
import { useGetCategories } from "@/hooks/useCategory"; 
import AddProductModal from "./AddProductModal";
import toast from "react-hot-toast";

export default function ShelfStorage() {
  const { currentStoreId } = useStoreContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("All");

  // রিয়্যাক্ট কোয়েরি হুক এپیআই কল
  const { data: products = [], isLoading: isProductsLoading } = useGetProducts(currentStoreId);
  const { data: categories = [], isLoading: isCategoriesLoading } = useGetCategories(currentStoreId || "");
  
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();

  // মোডাল থেকে ডাটা নিয়ে এপিআই-তে পোস্ট করা
  const handleAddProductSubmit = (formData: any) => {
    if (!currentStoreId) return;
    createProductMutation.mutate(
      { productData: formData, storeId: currentStoreId },
      {
        onSuccess: () => {
          setIsModalOpen(false); 
          toast.success("Product added to shelf successfully!");
        },
        onError: () => {
          toast.error("Failed to add product.");
        }
      }
    );
  };

  // 🎯 লাইভ স্ট্যাটাস (Active / Inactive) পরিবর্তন ও টোস্ট অ্যালার্ট ফিক্সড লজিক
  const handleToggleStatus = (id: string, currentStatus: string, title: string) => {
    // Active থাকলে Inactive হবে, অন্যথায় Active হবে
    const targetStatus = currentStatus === "Active" ? "Inactive" : "Active"; 
    
    const updatePromise = new Promise((resolve, reject) => {
      updateProductMutation.mutate(
        {
          id,
          updateData: { status: targetStatus },
        },
        {
          onSuccess: () => resolve(targetStatus),
          onError: (err) => reject(err),
        }
      );
    });

    toast.promise(updatePromise, {
      loading: `'${title}' status updating...`,
      success: (status) => 
        status === "Active" 
          ? `'${title}' is now Active! (Alerts Enabled)` 
          : `'${title}' is now Inactive! (Alerts Muted)`,
      error: "Could not update status.",
    });
  };

  // ডাইনামিক ক্যাটাগরি ফিল্টারিং লজিক
  const filteredProducts = products.filter((p: any) => {
    if (selectedCategoryId === "All") return true;
    return p.categoryId === selectedCategoryId;
  });

  return (
    <div className="p-6 mx-auto space-y-6">
      
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0E2038]">Shelf Storage (Store Room)</h1>
          <p className="text-sm text-gray-500 mt-1">Lock new products with expiry terms into your dedicated categories.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          disabled={!currentStoreId}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#F74608] px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 transition self-start sm:self-auto shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* ⏳ নো-স্টোর হ্যান্ডলিং */}
      {!currentStoreId && (
        <div className="p-8 text-center bg-amber-50 text-amber-700 rounded-2xl border border-amber-200">
          Please select a store from topbar first to view or manage shelf items.
        </div>
      )}

      {currentStoreId && (
        <>
          {/* 🎯 ফিল্টার সেকশন */}
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm max-w-xs">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              disabled={isCategoriesLoading}
              className="w-full bg-transparent text-sm text-[#0E2038] font-medium outline-none cursor-pointer disabled:opacity-50"
            >
              <option value="All">All Categories</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Shelved Items Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-50">
              <h3 className="text-sm font-bold text-[#0E2038] uppercase tracking-wider">Active Shelf Items</h3>
            </div>
            
            {isProductsLoading ? (
              <div className="p-10 text-center text-sm text-gray-400 animate-pulse">Loading items from shelf...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="p-10 text-center text-sm text-gray-400">No products found.</div>
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
                  <tbody className="text-sm text-[#0E2038] ">
                    {filteredProducts.map((p: any) => {
                      // 🎯 ঠিক করা লজিক: সরাসরি 'Active' চেক
                      const isActive = p.status === "Active"; 
                      return (
                        <tr key={p.id} className="hover:bg-gray-50/70 transition">
                          <td className="p-4 pl-6 font-semibold">
                            <div>{p.title}</div>
                          </td>
                          <td className="p-4 text-gray-500">{p.category?.name || "Uncategorized"}</td>
                          <td className="p-4">
                            <div className="font-medium text-gray-700">Qty: {p.quantity}</div>
                            <div className="text-xs text-gray-400 font-mono">Lot: {p.lotNumber || "None"}</div>
                          </td>
                          <td className="p-4 font-mono text-gray-600">
                            {new Date(p.expiryDate).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-center">
                            {/* 🔄 লাইভ স্ট্যাটাস বাটন (ফিক্সড টেক্সট ও কালার) */}
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(p.id, p.status, p.title)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all transform active:scale-95 shadow-2xs ${
                                isActive 
                                  ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100" 
                                  : "bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100"
                              }`}
                            >
                              {isActive ? (
                                <>
                                  <CheckCircle className="w-3 h-3 text-green-600" />
                                  <span>Active</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3 h-3 text-orange-500" />
                                  <span>Inactive</span>
                                </>
                              )}
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
        categories={categories} 
      />
    </div>
  );
}