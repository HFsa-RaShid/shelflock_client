// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface StoreState {
//   currentStoreId: string | null;
//   setCurrentStoreId: (id: string) => void;
//   clearStore: () => void;
// }

// export const useStoreContext = create<StoreState>()(
//   persist(
//     (set) => ({
//       currentStoreId: null, // শুরুতে কোনো স্টোর সিলেক্ট থাকবে না
//       setCurrentStoreId: (id) => set({ currentStoreId: id }),
//       clearStore: () => set({ currentStoreId: null }),
//     }),
//     {
//       name: "active-store-storage", // ব্রাউজার রিফ্রেশ করলেও স্টোর আইডি সেভ থাকবে
//     }
//   )
// );



import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  currentStoreId: string | null;
  setCurrentStoreId: (id: string) => void;
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