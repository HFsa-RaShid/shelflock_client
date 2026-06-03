import { ShieldCheck } from "lucide-react";

export default function PaymentSecurityNote() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-[12px] border border-[#E9E9E9] bg-white p-4">
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F8EF]">
          <ShieldCheck
            className="h-3 w-3 text-[#22A06B]"
            strokeWidth={2.25}
          />
        </div>

        <div className="min-w-0">
          <p className="body-sm-medium primary-text">Your payment is secure</p>
          <p className="body-sm-regular subtext mt-1">
            We use industry-standard encryption to keep your payment
            information safe and secure.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <span className="inline-flex items-center rounded-md bg-[#0E2038] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          SSL<span className="text-[#F74608]">commerz</span>
        </span>
        <span className="inline-flex items-center gap-1 text-[12px] font-semibold primary-text">
          <span className="text-[#F74608]">★</span>
          <span>
            aamar<span className="text-[#F74608]">Pay</span>
          </span>
        </span>
      </div>
    </div>
  );
}
