"use client";
import React, { useState } from "react";

interface Category {
  id: number;
  name: string;
  itemCount: number;
  description: string;
  status: "Active" | "Inactive";
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Groceries", itemCount: 452, description: "Daily cooking essentials.", status: "Active" },
    { id: 2, name: "Pharmacy", itemCount: 189, description: "Prescription drugs and syrups.", status: "Active" },
    { id: 3, name: "Dairy & Bakery", itemCount: 94, description: "Fresh milk, butter, and bread.", status: "Active" },
    { id: 4, name: "Cosmetics", itemCount: 107, description: "Skincare and beauty essentials.", status: "Inactive" },
  ]);

  // স্টেটস
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Inactive">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // নতুন ক্যাটাগরি যোগ করা
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCategory: Category = {
      id: Date.now(),
      name: name,
      itemCount: 0,
      description: description || "No description provided.",
      status: "Active",
    };

    setCategories([...categories, newCategory]);
    setName("");
    setDescription("");
    setIsModalOpen(false);
  };

  // স্ট্যাটাস টগল করা (Active <-> Inactive)
  const toggleStatus = (id: number) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id
          ? { ...cat, status: cat.status === "Active" ? "Inactive" : "Active" }
          : cat
      )
    );
  };

  // ক্যাটাগরি ডিলিট করা
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  // ট্যাব অনুযায়ী ডাটা ফিল্টার
  const filteredCategories = categories.filter((cat) => {
    if (activeTab === "All") return true;
    return cat.status === activeTab;
  });

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      {/* হেডার সেকশন এবং রাইট টপ বাটন */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0E2038]">Category Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Organize storage segments for your virtual store room shelves.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#F74608] hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm self-start sm:self-auto"
        >
          + Add Category
        </button>
      </div>

      {/* ট্যাব ফিল্টারিং */}
      <div className="flex border-b border-gray-200 gap-2">
        {(["All", "Active", "Inactive"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-[#F74608] text-[#F74608]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab} ({tab === "All" ? categories.length : categories.filter(c => c.status === tab).length})
          </button>
        ))}
      </div>

      {/* টেবিল ভিউ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="p-4 pl-6">Category Name</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-center">Items Count</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#0E2038] divide-y divide-gray-50">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    No categories found in this tab.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 pl-6 font-semibold max-w-[200px] truncate">{cat.name}</td>
                    <td className="p-4 text-gray-500 max-w-[300px] truncate">{cat.description}</td>
                    <td className="p-4 text-center font-mono font-medium">{cat.itemCount}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleStatus(cat.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
                          cat.status === "Active"
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${cat.status === "Active" ? "bg-green-500" : "bg-gray-400"}`}></span>
                        {cat.status}
                      </button>
                    </td>
                    <td className="p-4 text-right pr-6 space-x-3">
                      <button 
                        onClick={() => handleDelete(cat.id)}
                        className="text-gray-400 hover:text-red-500 text-xs font-semibold transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* এড ক্যাটাগরি পপআপ মোডাল */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0E2038]">Add New Category</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-medium"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Baby Food, Electronics"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#0E2038] outline-none focus:border-[#F74608] focus:ring-1 focus:ring-[#F74608] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Description (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Brief summary of items..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#0E2038] outline-none focus:border-[#F74608] focus:ring-1 focus:ring-[#F74608] transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#F74608] px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 transition shadow-sm"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}