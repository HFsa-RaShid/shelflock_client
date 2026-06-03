/** রিসেন্ট অর্ডার স্ট্যাটাস */
export type RecentOrderStatus = "Pending" | "Done" | "Rejected";

/** রিসেন্ট অর্ডার টেবিলের একটি সারি */
export interface DashboardRecentOrder {
  id: string;
  productName: string;
  productImage: string;
  price: number;
  status: RecentOrderStatus;
  /** স্ক্রিনশট — নির্বাচিত প্রোডাক্টে নীল বর্ডার */
  isHighlighted?: boolean;
}

export interface RecentOrdersTableProps {
  orders: DashboardRecentOrder[];
}
