import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = `${BASE_URL}/alerts`;

export interface AlertRule {
  id: string;
  storeId: string;
  intervals: number[];
  customMessage: string;
  whatsappNumber: string | null;
  channels: string[];
}

export interface IAlertRuleInput {
  intervals: number[];
  customMessage: string;
  whatsappNumber: string;
  channels: string[];
}

// ---------------------------------------------
// ১. GET Hook (স্টোর অনুযায়ী রুলস ডাটা আনার জন্য)
// ---------------------------------------------
export function useGetAlertRule(storeId: string) {
  return useQuery<AlertRule | null>({
    queryKey: ["alert-rule", storeId],
    queryFn: async () => {
      if (!storeId) return null;
      const response = await axios.get(`${API_URL}`, {
        headers: { "store-id": storeId },
      });
      return response.data.data;
    },
    enabled: !!storeId, // storeId থাকলে শুধুমাত্র তখনই এপিআই কল হবে
  });
}

// ---------------------------------------------
// ২. POST Hook (Upsert বা সেভ/আপডেট করার জন্য)
// ---------------------------------------------
export function useSaveAlertRule(storeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IAlertRuleInput) => {
      const response = await axios.post(`${API_URL}`, payload, {
        headers: { 
          "Content-Type": "application/json",
          "store-id": storeId 
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // সেভ হওয়ার সাথে সাথে ক্যাশ ডাটা রিফ্রেশ করবে
      queryClient.invalidateQueries({ queryKey: ["alert-rule", storeId] });
    },
  });
}