/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

// console.log("Product API URL:", API_URL); 

// ১. প্রোডাক্ট নিয়ে আসার হুক
export const useGetProducts = (storeId: string | null) => {
  return useQuery({
    queryKey: ["products", storeId],
    queryFn: async () => {
      if (!storeId) return [];
      const response = await axios.get(`${API_URL}/products`, {
        headers: { "store-id": storeId },
      });
      return response.data.data;
    },
    enabled: !!storeId, 
  });
};

// ২. নতুন প্রোডাক্ট অ্যাড করার হুক
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productData, storeId }: { productData: any; storeId: string }) => {
      const response = await axios.post(`${API_URL}/products/create-product`, productData, {
        headers: { "store-id": storeId },
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products", variables.storeId] });
    },
  });
};


export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updateData }: { id: string; updateData: any }) => {
      const response = await axios.patch(`${API_URL}/products/${id}`, updateData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};