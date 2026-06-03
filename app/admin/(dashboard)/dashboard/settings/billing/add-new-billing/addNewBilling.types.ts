import type { PaymentProvider } from "../billing.types";

export interface PaymentMethodOption {
  id: PaymentProvider;
  name: string;
  description: string;
}

export interface AddPaymentMethodFormState {
  accountNumber: string;
  accountHolderName: string;
  otp: string[];
  isCodeSent: boolean;
}
