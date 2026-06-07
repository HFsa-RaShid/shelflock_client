
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useStoreContext } from "@/store/useStoreContext";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// --- Interfaces ---
export interface Store {
  id: string;
  name: string;
  phone: string;
  merchantId: string;
  _count?: {
    products: number;
  };
}

export interface ICreateStoreInput {
  name: string;
  phone: string;
  merchantId: string;
}


export function useGetMyStores(merchantId: string) {
  return useQuery<Store[]>({
    queryKey: ["my-stores", merchantId],
    queryFn: async () => {
      if (!merchantId) return [];
      const response = await axios.get(`${BASE_URL}/stores/my-stores`, {
        params: { merchantId }, 
      });
      console.log(response.data.data);
      return response.data.data;
    },
    enabled: !!merchantId,
  });
}


export function useCreateStore() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setCurrentStoreId = useStoreContext((state) => state.setCurrentStoreId);

  return useMutation({
    mutationFn: async (storeData: ICreateStoreInput) => {
  
      const response = await axios.post(`${BASE_URL}/stores/create`, storeData);
      return response.data.data || response.data;
    },
    onSuccess: (data, variables) => {
      toast.success("Store launched successfully!");
      
  
      setCurrentStoreId(data.id);
      
 
      queryClient.invalidateQueries({ queryKey: ["my-stores", variables.merchantId] });

      
      router.push("/admin/dashboard/overview");
    },
    onError: (error: any) => {
      const backendMessage = error.response?.data?.message || "Failed to launch store.";
      toast.error(backendMessage);
    },
  });
}