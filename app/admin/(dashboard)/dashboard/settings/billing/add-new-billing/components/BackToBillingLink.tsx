import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackToBillingLinkProps {
  href?: string;
  label?: string;
}

export default function BackToBillingLink({
  href = "/dashboard/settings/billing",
  label = "Back to billing",
}: BackToBillingLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 transition-opacity duration-150 hover:opacity-80"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E9E9E9] bg-white text-[#0E2038]">
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <span className="body-sm-medium primary-text">{label}</span>
    </Link>
  );
}
