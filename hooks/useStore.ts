import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Store {
  id: string;
  name: string;
  phone: string;
  merchantId: string;
  _count?: {
    products: number;
  };
}

// মার্চেন্টের আইডি পাস করে সব স্টোর নিয়ে আসার হুক
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