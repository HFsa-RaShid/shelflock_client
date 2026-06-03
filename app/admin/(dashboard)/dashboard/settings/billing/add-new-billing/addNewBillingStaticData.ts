import type { PaymentMethodOption } from "./addNewBilling.types";

export const PAYMENT_METHOD_OPTIONS: PaymentMethodOption[] = [
  {
    id: "bkash",
    name: "Bkash",
    description: "Pay easily using bkash",
  },
  {
    id: "nagad",
    name: "Nagad",
    description: "Pay easily using nagad",
  },
  {
    id: "card",
    name: "Card",
    description: "Credit / Debit Card",
  },
];

export const OTP_LENGTH = 6;
