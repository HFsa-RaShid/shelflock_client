export type PaymentProvider = "bkash" | "nagad" | "card" | "bank";

export type BillingCyclePreference = "monthly" | "yearly";

export interface PaymentMethod {
  id: string;
  provider: PaymentProvider;
  label: string;
  accountNumber: string;
  isPrimary: boolean;
}

export interface BillingInformation {
  fullName: string;
  phone: string;
  email: string;
  billingCycle: BillingCyclePreference;
}

export type PaymentStatus = "paid" | "failed" | "pending" | "refunded";

export interface PaymentHistoryEntry {
  id: string;
  date: string;
  description: string;
  amount: string;
  method: PaymentProvider;
  methodLabel: string;
  transactionId: string;
  status: PaymentStatus;
  invoiceUrl?: string;
}

export interface BillingPageData {
  paymentMethods: PaymentMethod[];
  billingInformation: BillingInformation;
  paymentHistory: PaymentHistoryEntry[];
}
