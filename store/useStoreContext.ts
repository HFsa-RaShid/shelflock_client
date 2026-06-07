


import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  currentStoreId: string | null;
  setCurrentStoreId: (id: string | null) => void; // 👈 এখানে string | null করে দেওয়া হলো
}

export const useStoreContext = create<StoreState>()(
  persist(
    (set) => ({
      currentStoreId: null, 
      setCurrentStoreId: (id) => set({ currentStoreId: id }),
    }),
    { name: "active-merchant-store" }
  )
);