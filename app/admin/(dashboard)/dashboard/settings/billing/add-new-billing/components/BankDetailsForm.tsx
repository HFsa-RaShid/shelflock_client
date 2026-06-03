"use client";

import { useMemo, useRef, useState } from "react";
import { Send } from "lucide-react";
import type { PaymentProvider } from "../../billing.types";
import { OTP_LENGTH } from "../addNewBillingStaticData";
import OtpInput, { type OtpInputHandle } from "./OtpInput";

interface BankDetailsFormProps {
  provider: PaymentProvider;
  onVerify?: (payload: {
    provider: PaymentProvider;
    accountNumber: string;
    accountHolderName: string;
    otp: string;
  }) => void;
}

interface FormCopy {
  sectionSubtitle: string;
  accountFieldLabel: string;
  accountFieldPlaceholder: string;
  accountFieldHelp: string;
  nameFieldHelp: string;
  verifyButtonLabel: string;
  otpHint: string;
}

function buildCopy(provider: PaymentProvider): FormCopy {
  switch (provider) {
    case "bkash":
      return {
        sectionSubtitle: "Enter your bkash account information",
        accountFieldLabel: "Bkash number",
        accountFieldPlaceholder: "01XXXXXXXXX",
        accountFieldHelp: "Enter your bkash payment number",
        nameFieldHelp: "Name associated with your bkash account",
        verifyButtonLabel: "Verify Bkash Number",
        otpHint:
          "You will receive a verification code on your bkash number to confirm this payment method.",
      };
    case "nagad":
      return {
        sectionSubtitle: "Enter your nagad account information",
        accountFieldLabel: "Nagad number",
        accountFieldPlaceholder: "01XXXXXXXXX",
        accountFieldHelp: "Enter your nagad payment number",
        nameFieldHelp: "Name associated with your nagad account",
        verifyButtonLabel: "Verify Nagad Number",
        otpHint:
          "You will receive a verification code on your nagad number to confirm this payment method.",
      };
    case "card":
      return {
        sectionSubtitle: "Enter your card information",
        accountFieldLabel: "Card number",
        accountFieldPlaceholder: "1234 5678 9012 3456",
        accountFieldHelp: "Enter the 16-digit number on your card",
        nameFieldHelp: "Name as it appears on your card",
        verifyButtonLabel: "Verify Card",
        otpHint:
          "You will receive a verification code from your card issuer to confirm this payment method.",
      };
    case "bank":
    default:
      return {
        sectionSubtitle: "Enter your bank account information",
        accountFieldLabel: "Account number",
        accountFieldPlaceholder: "Account number",
        accountFieldHelp: "Enter your bank account number",
        nameFieldHelp: "Name as it appears on the account",
        verifyButtonLabel: "Verify Account",
        otpHint:
          "You will receive a verification code to confirm this payment method.",
      };
  }
}

const fieldInputClass =
  "h-[44px] w-full rounded-[8px] border border-[#E9E9E9] bg-white px-3 body-sm-regular primary-text outline-none transition-colors duration-150 placeholder:text-[#B7BAB9] focus:border-[#F74608]";

export default function BankDetailsForm({
  provider,
  onVerify,
}: BankDetailsFormProps) {
  const copy = useMemo(() => buildCopy(provider), [provider]);

  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isCodeSent, setIsCodeSent] = useState(false);
  const otpRef = useRef<OtpInputHandle>(null);

  const canSendCode =
    accountNumber.trim().length > 0 && accountHolderName.trim().length > 0;
  const otpJoined = otp.join("");
  const canVerify = otpJoined.length === OTP_LENGTH;

  const handleSendCode = () => {
    if (!canSendCode) return;
    setIsCodeSent(true);
    setOtp(Array(OTP_LENGTH).fill(""));
    requestAnimationFrame(() => otpRef.current?.focus(0));
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    requestAnimationFrame(() => otpRef.current?.focus(0));
  };

  const handleVerify = () => {
    if (!canVerify) return;
    onVerify?.({
      provider,
      accountNumber,
      accountHolderName,
      otp: otpJoined,
    });
  };

  return (
    <section className="flex h-full w-full flex-col rounded-[12px] border border-[#E9E9E9] bg-white p-5 lg:p-6">
      <div className="min-w-0">
        <h3 className="body-l-medium primary-text">Bank Details</h3>
        <p className="body-sm-regular subtext mt-1">{copy.sectionSubtitle}</p>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="account-number"
            className="body-sm-medium primary-text"
          >
            {copy.accountFieldLabel}
          </label>
          <input
            id="account-number"
            type="text"
            value={accountNumber}
            onChange={(event) => setAccountNumber(event.target.value)}
            placeholder={copy.accountFieldPlaceholder}
            className={fieldInputClass}
          />
          <p className="body-sm-regular subtext">{copy.accountFieldHelp}</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="account-holder-name"
            className="body-sm-medium primary-text"
          >
            Account Holder Name
          </label>
          <input
            id="account-holder-name"
            type="text"
            value={accountHolderName}
            onChange={(event) => setAccountHolderName(event.target.value)}
            placeholder="Full name"
            className={fieldInputClass}
          />
          <p className="body-sm-regular subtext">{copy.nameFieldHelp}</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleSendCode}
            disabled={!canSendCode || isCodeSent}
            className="inline-flex h-[40px] items-center justify-center gap-2 rounded-[8px] border border-[#E9E9E9] bg-white px-4 body-sm-medium primary-text transition-all duration-150 hover:bg-[#FAFAFA] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
          >
            <Send className="h-4 w-4 text-[#0E2038]" strokeWidth={1.75} />
            <span>Send Verification Code</span>
          </button>

          <p className="body-sm-regular adsfixter-primary-text text-center max-w-[420px]">
            {copy.otpHint}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <OtpInput ref={otpRef} value={otp} onChange={setOtp} />

          <p className="body-sm-regular subtext">
            Didn&apos;t received the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              className="primary-text underline underline-offset-2 transition-opacity duration-150 hover:opacity-80"
            >
              Resend
            </button>
          </p>
        </div>

        <div className="flex w-full justify-center">
          <button
            type="button"
            onClick={handleVerify}
            disabled={!canVerify}
            className={`inline-flex h-[44px] min-w-[220px] items-center justify-center rounded-[10px] px-6 body-sm-medium transition-all duration-150 active:scale-[0.99] ${
              canVerify
                ? "bg-[#0E2038] text-white hover:bg-[#1a3055]"
                : "bg-[#D9D9D9] text-white cursor-not-allowed"
            }`}
          >
            {copy.verifyButtonLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
