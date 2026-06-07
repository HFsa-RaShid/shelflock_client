

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query"; // 👈 useQueryClient ইম্পোর্ট করুন
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useStoreContext } from "@/store/useStoreContext";
import toast from "react-hot-toast";

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  merchant: {
    id: string;
    name: string;
    email: string;
  };
}

interface LoginInput {
  email: string;
  password: string;
}

export const useMerchantLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient(); 
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const setCurrentStoreId = useStoreContext((state) => state.setCurrentStoreId);

  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async (credentials) => {
      const response = await axios.post<LoginResponse>(
        `${BASE_URL}/auth/login`,
        credentials,
      );
      return response.data;
    },
    onSuccess: async (data) => {
      // console.log("Full Login response data:", data);
      toast.success(data.message || "লগইন সফল হয়েছে! 🎉");
      // ১. টোকেন ও মার্চেন্ট ডাটা লোকাল সেভ
      Cookies.set("token", data.token, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      localStorage.setItem("merchant", JSON.stringify(data.merchant));

      try {
        // 🎯 ২. আপনার তৈরি করা হুকের কুয়েরি ফাংশনটি এখানে সরাসরি রান (Fetch) করা হচ্ছে
        const merchantId = data.merchant.id;

        const stores = await queryClient.fetchQuery({
          queryKey: ["my-stores", merchantId],
          queryFn: async () => {
            const response = await axios.get(`${BASE_URL}/stores/my-stores`, {
              params: { merchantId },
            });
            return response.data.data;
          },
        });

        // ৩. ডাইনামিক রাউটিং এবং জুস্ট্যান্ড স্টেট সিঙ্ক
        const hasStores = Array.isArray(stores) && stores.length > 0;

        if (hasStores) {
          // স্টোর থাকলে প্রথম স্টোরের ID জুস্ট্যান্ডে সেভ হবে
          const firstStoreId = stores[0].id;
          setCurrentStoreId(firstStoreId);

          // ড্যাশবোর্ডের ওভারভিউ পেজে রিডাইরেক্ট
          router.push("/admin/dashboard/overview");
        } else {
          // কোনো স্টোর না থাকলে নাল সেট করে সেটআপ পেজে যাবে
          setCurrentStoreId(null);
          router.push("/admin/store-setup");
        }
      } catch (storeError) {
        console.error("Error fetching stores during login flow:", storeError);
        // এপিআই ক্র্যাশ করলে বা কোনো সমস্যা হলে সেফগার্ড হিসেবে ড্যাশবোর্ডে পাঠানো হচ্ছে
        router.push("/admin/dashboard/overview");
      }
    },
    onError: (error: any) => {
      const backendMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(backendMessage);
    },
  });
};
