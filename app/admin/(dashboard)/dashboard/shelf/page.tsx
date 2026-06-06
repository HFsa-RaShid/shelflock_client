"use client";
import React, { useState } from "react";

export default function ShelfStorage() {
  const [products, setProducts] = useState([
    { id: 1, name: "Alpha Premium Soy Oil", category: "Groceries", expiry: "2026-08-15", status: "Locked" },
    { id: 2, name: "Amoxicillin Capsules", category: "Pharmacy", expiry: "2027-01-10", status: "Locked" },
    { id: 3, name: "Fresh Dairy Butter 200g", category: "Dairy & Bakery", expiry: "2026-06-25", status: "Unlocked" },
  ]);

  const [form, setForm] = useState({ name: "", category: "Groceries", expiry: "" });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.expiry) return;
    
    setProducts([
      ...products,
      { id: Date.now(), name: form.name, category: form.category, expiry: form.expiry, status: "Locked" }
    ]);
    setForm({ name: "", category: "Groceries", expiry: "" });
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0E2038]">Shelf Storage (Store Room)</h1>
        <p className="text-sm text-gray-500 mt-1">Lock new products with expiry terms into your dedicated categories.</p>
      </div>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-[#0E2038] uppercase tracking-wider mb-4">Shelve New Item</h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Product Name</label>
            <input 
              type="text" 
              placeholder="e.g. Baby Food Step 1" 
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#0E2038] outline-none focus:border-[#F74608] focus:ring-1 focus:ring-[#F74608] transition" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Category</label>
            <select 
              value={form.category}
              onChange={(e) => setForm({...form, category: e.target.value})}
              className="block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#0E2038] bg-white outline-none focus:border-[#F74608] focus:ring-1 focus:ring-[#F74608] transition"
            >
              <option>Groceries</option>
              <option>Pharmacy</option>
              <option>Dairy & Bakery</option>
              <option>Cosmetics</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Expiry Date</label>
            <input 
              type="date" 
              value={form.expiry}
              onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
              onChange={(e) => setForm({...form, expiry: e.target.value})}
              className="block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#0E2038] outline-none focus:border-[#F74608] focus:ring-1 focus:ring-[#F74608] transition cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4" 
            />
          </div>
        </div>
        <button type="submit" className="mt-5 rounded-xl bg-[#F74608] px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition">
          Lock to Shelf
        </button>
      </form>

      {/* Shelved Items Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-50">
          <h3 className="text-sm font-bold text-[#0E2038] uppercase tracking-wider">Active Shelf Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="p-4 pl-6">Product Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#0E2038] divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/70 transition">
                  <td className="p-4 pl-6 font-semibold">{p.name}</td>
                  <td className="p-4 text-gray-500">{p.category}</td>
                  <td className="p-4 font-mono text-gray-600">{p.expiry}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      p.status === "Locked" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.status === "Locked" ? "bg-green-600" : "bg-amber-500"}`}></span>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}