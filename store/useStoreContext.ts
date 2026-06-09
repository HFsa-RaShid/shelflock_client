


// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface StoreState {
//   currentStoreId: string | null;
//   setCurrentStoreId: (id: string | null) => void; // 👈 এখানে string | null করে দেওয়া হলো
// }

// export const useStoreContext = create<StoreState>()(
//   persist(
//     (set) => ({
//       currentStoreId: null, 
//       setCurrentStoreId: (id) => set({ currentStoreId: id }),
//     }),
//     { name: "active-merchant-store" }
//   )
// );


import { create } from "zustand";
import { persist } from "zustand/middleware";

// ১. আপনার স্টোর ইন্টারফেস এখানে ইমপোর্ট করুন অথবা লোকালি ডিফাইন করুন
interface IStore {
  id: string;
  name: string;
  phone: string;
  merchantId: string;
}

interface StoreState {
  currentStoreId: string | null;
  currentStore: IStore | null; // 🎯 এখানে কারেন্ট স্টোর অবজেক্টটি যোগ করা হলো
  setCurrentStoreId: (id: string | null) => void;
  setCurrentStore: (store: IStore | null) => void; // 🎯 স্টোর অবজেক্ট সেট করার ফাংশন
}

export const useStoreContext = create<StoreState>()(
  persist(
    (set) => ({
      currentStoreId: null, 
      currentStore: null, // শুরুতে কোনো স্টোর অবজেক্ট থাকবে না
      setCurrentStoreId: (id) => set({ currentStoreId: id }),
      setCurrentStore: (store) => set({ currentStore: store }), // স্টোর অবজেক্ট আপডেট করার জন্য
    }),
    { name: "active-merchant-store" }
  )
);