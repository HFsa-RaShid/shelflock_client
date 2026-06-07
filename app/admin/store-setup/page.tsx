
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStoreContext } from "@/store/useStoreContext";
import { useCreateStore } from "@/hooks/useStore"; 
import { Store, ShoppingBag, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function StoreSetupPage() {
  const router = useRouter();
  const { currentStoreId } = useStoreContext();
  const createStoreMutation = useCreateStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); 
  const [merchantId, setMerchantId] = useState<string | null>(null);

  useEffect(() => {
    const storedMerchant = localStorage.getItem("merchant");
    if (storedMerchant) {
      const merchant = JSON.parse(storedMerchant);
      setMerchantId(merchant.id);
    } else {
      router.push("/admin");
      return;
    }

    if (currentStoreId) {
      router.push("/admin/dashboard/overview");
    }
  }, [currentStoreId, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (phone.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
    createStoreMutation.mutate({
      name: name.trim(),
      phone: formattedPhone,
      merchantId: merchantId!,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E2038] px-4 overflow-y-auto">
      
      
      <div 
        className="w-full rounded-2xl shadow-2xl border border-gray-100 my-8 transform transition-all"
        style={{
          backgroundColor: "#ffffff",
          maxWidth: "440px",
          padding: "40px", // 👈 এই ৪৪ ডিজিটের পিওর প্যাডিং কোনো সিএসএস ছাড়াই কাজ করবে
          boxSizing: "border-box"
        }}
      >
        
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex p-3 bg-orange-50 text-[#F74608] rounded-2xl mb-2">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-[#0E2038] m-0">Setup Your Store</h1>
          <p className="text-sm text-gray-500 mt-1">
            Before accessing the dashboard, you must create a dedicated store room instance.
          </p>
        </div>

        {/* Setup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Store Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Store Name
            </label>
            <div className="relative flex items-center">
              <Store className="w-5 h-5 text-gray-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="e.g. Hafsa's Shop"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={createStoreMutation.isPending}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 text-sm rounded-xl border border-gray-200 outline-none text-[#0E2038] font-medium focus:border-[#F74608] focus:bg-white transition"
                required
              />
            </div>
          </div>

          {/* Store Phone */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Store Phone Number
            </label>
            <div className="phone-input-container">
              <PhoneInput
                country={"bd"}
                value={phone}
                onChange={(value) => setPhone(value)}
                disabled={createStoreMutation.isPending}
                enableSearch={true}
                inputProps={{ required: true }}
                inputStyle={{
                  width: "100%",
                  height: "46px",
                  backgroundColor: "#F9FAFB",
                  borderRadius: "12px",
                  fontSize: "14px",
                  border: "1px solid #E5E7EB",
                  color: "#0E2038",
                  fontWeight: "500",
                  paddingLeft: "48px"
                }}
                buttonStyle={{
                  backgroundColor: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  borderTopLeftRadius: "12px",
                  borderBottomLeftRadius: "12px"
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={createStoreMutation.isPending}
            className="w-full flex items-center justify-center gap-2 bg-[#F74608] hover:bg-orange-700 text-white font-semibold py-3.5 rounded-xl transition shadow-md active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed"
            style={{ marginTop: "24px" }}
          >
            {createStoreMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Digital Shelf...</span>
              </>
            ) : (
              <span>Launch Store & Open Shelf</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}