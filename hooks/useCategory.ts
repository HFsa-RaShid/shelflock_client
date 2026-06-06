import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// 🌍 .env ফাইল থেকে ব্যাকএন্ড এপিআই ইউআরএল নেওয়া হচ্ছে
const BASE_URL = process.env.NEXT_PUBLIC_API_URL; 
const API_URL = `${BASE_URL}/categories`; 

// ক্যাটাগরি ডাটা টাইপ ইন্টারফেস
export interface Category {
  id: string;
  name: string;
  description?: string;
  status: "Active" | "Inactive";
  storeId: string;
}

// ---------------------------------------------
// ১. GET Hook (সব ক্যাটাগরি তুলে আনার জন্য)
// ---------------------------------------------
export function useGetCategories(storeId: string) {
  return useQuery<Category[]>({
    // storeId পরিবর্তন হলে ক্যোয়ারী অটোমেটিক নতুন ডাটা ফেচ করবে
    queryKey: ["categories", storeId], 
    queryFn: async () => {
      if (!storeId) return [];
      const response = await axios.get(`${API_URL}`, {
        headers: { "store-id": storeId },
      });
      return response.data.data;
    },
    enabled: !!storeId, // storeId না থাকলে এপিআই কল হবে না
  });
}

// ---------------------------------------------
// ২. POST Hook (আপনার রাউট: /create-category)
// ---------------------------------------------
export function useCreateCategory(storeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCategory: { name: string; description?: string }) => {
      const response = await axios.post(`${API_URL}/create-category`, newCategory, {
        headers: { "store-id": storeId },
      });
      return response.data;
    },
    onSuccess: () => {
      // কারেন্ট স্টোরের ক্যাশ রিফ্রেশ করা হচ্ছে
      queryClient.invalidateQueries({ queryKey: ["categories", storeId] });
    },
  });
}

// ---------------------------------------------
// ৩. PATCH Hook (আপনার রাউট: /:id)
// ---------------------------------------------
export function useToggleCategoryStatus(storeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Category> }) => {
      const response = await axios.patch(`${API_URL}/${id}`, data, {
        headers: { "store-id": storeId },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", storeId] });
    },
  });
}

// ---------------------------------------------
// ৪. DELETE Hook (আপনার রাউট: /:id)
// ---------------------------------------------
export function useDeleteCategory(storeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { "store-id": storeId },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", storeId] });
    },
  });
}