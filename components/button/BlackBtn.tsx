import Link from "next/link";
import type { ReactNode } from "react";

import DarkBtn from "@/components/ui/dark-button";

type BlackBtnProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
};

export default function BlackBtn({
  children,
  href,
  className = "",
  onClick,
}: BlackBtnProps) {
  if (href) {
    return (
      <Link href={href} className={`inline-flex ${className}`}>
        <DarkBtn className="min-w-[120px]">{children}</DarkBtn>
      </Link>
    );
  }

  return (
    <DarkBtn className={className} onClick={onClick}>
      {children}
    </DarkBtn>
  );
}
