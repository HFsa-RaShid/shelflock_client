// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import Cookies from "js-cookie"; // 🍪 কুকি হ্যান্ডেল করার জন্য
// import { useRouter } from "next/navigation"; // 🚀 নেক্সট জেএস রাউটার

// // Backend Response Interface
// interface LoginResponse {
//   success: boolean;
//   message: string;
//   token: string;
//   merchant: {
//     id: string;
//     name: string;
//     email: string;
//   };
// }

// // Form Input Interface
// interface LoginInput {
//   email: string;
//   password: string;
// }

// export const useMerchantLogin = () => {
//   const router = useRouter();
//   const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

//   return useMutation<LoginResponse, Error, LoginInput>({
//     mutationFn: async (credentials) => {
//       const response = await axios.post<LoginResponse>(
//         `${BASE_URL}/api/v1/auth/login`,
//         credentials
//       );
//       return response.data;
//     },
//     onSuccess: (data) => {
//       // ✅ এখন কনসোলে ডাটা নিখুঁতভাবে দেখতে পাবেন (রিফ্রেশে মুছে যাবে相应 না)
//       console.log("Login response data:", data);
//       console.log("Login successful:", data.message);

//       // ✅ টোকেন সরাসরি কুকিতে (Cookies) সেভ করা হলো (মেয়াদ ৭ দিন)
//       // সিকিউর এবং সেম-সাইট পলিসি অ্যাড করা হয়েছে যাতে মিডলওয়্যার সহজে রিড করতে পারে
//       Cookies.set("token", data.token, {
//         expires: 7,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict"
//       });

//       // মার্চেন্টের বেসিক প্রোফাইল ডাটা লোকাল স্টোরেজে সেভ রাখা হলো
//       localStorage.setItem("merchant", JSON.stringify(data.merchant));

//       // ✅ ক্লায়েন্ট-সাইড স্মুথ রিডাইরেকশন (হার্ড রিফ্রেশ ছাড়া)
//       router.push("/admin/dashboard/overview");
//     },
//     onError: (error: any) => {
//       // ব্যাকএন্ড থেকে আসা কাস্টম এরর মেসেজ হ্যান্ডেলিং
//       const backendMessage = error.response?.data?.message || "Something went wrong!";
//       alert(backendMessage);
//     },
//   });
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query"; // 👈 useQueryClient ইম্পোর্ট করুন
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useStoreContext } from "@/store/useStoreContext";

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
  const queryClient = useQueryClient(); // 👈 রিয়্যাক্ট কোয়েরি ক্লায়েন্ট ইনস্ট্যান্স
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
      console.log("Full Login response data:", data);

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
      alert(backendMessage);
    },
  });
};
