export type OrderStatus = "Pending" | "Done" | "Processing" | "Rejected";

export type PaymentMethod = "COD" | "Nagad" | "Bkash" | "SSLCommerz";

export type StatCardIcon = "check" | "truck" | "x";

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

export interface Order {
  id: string;
  referenceId: string;
  customer: OrderCustomer;
  date: string;
  itemCount: number;
  paymentMethod: PaymentMethod;
  amount: number;
  status: OrderStatus;
}

export interface StatCard {
  id: string;
  label: string;
  count: number;
  changeLabel: string;
  progressPercent: number;
  progressColor: string;
  icon: StatCardIcon;
}

export interface OrdersSummary {
  totalOrders: number;
  statCards: StatCard[];
}

export interface OrdersResponse {
  summary: OrdersSummary;
  orders: Order[];
}
