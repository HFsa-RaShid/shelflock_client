/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie"; // 🍪 কুকি হ্যান্ডেল করার জন্য
import { useRouter } from "next/navigation"; // 🚀 নেক্সট জেএস রাউটার

// Backend Response Interface
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

// Form Input Interface
interface LoginInput {
  email: string;
  password: string;
}

export const useMerchantLogin = () => {
  const router = useRouter(); // রাউটার ইনিশিয়ালাইজেশন

  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async (credentials) => {
      const response = await axios.post<LoginResponse>(
        "http://localhost:8080/api/v1/auth/login", 
        credentials
      );
      return response.data;
    },
    onSuccess: (data) => {
      // ✅ এখন কনসোলে ডাটা নিখুঁতভাবে দেখতে পাবেন (রিফ্রেশে মুছে যাবে相应 না)
      console.log("Login response data:", data);
      console.log("Login successful:", data.message);
      
      // ✅ টোকেন সরাসরি কুকিতে (Cookies) সেভ করা হলো (মেয়াদ ৭ দিন)
      // সিকিউর এবং সেম-সাইট পলিসি অ্যাড করা হয়েছে যাতে মিডলওয়্যার সহজে রিড করতে পারে
      Cookies.set("token", data.token, { 
        expires: 7, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict" 
      });
      
      // মার্চেন্টের বেসিক প্রোফাইল ডাটা লোকাল স্টোরেজে সেভ রাখা হলো
      localStorage.setItem("merchant", JSON.stringify(data.merchant));
      
      // ✅ ক্লায়েন্ট-সাইড স্মুথ রিডাইরেকশন (হার্ড রিফ্রেশ ছাড়া)
      router.push("/admin/dashboard/overview");
    },
    onError: (error: any) => {
      // ব্যাকএন্ড থেকে আসা কাস্টম এরর মেসেজ হ্যান্ডেলিং
      const backendMessage = error.response?.data?.message || "Something went wrong!";
      alert(backendMessage);
    },
  });
};