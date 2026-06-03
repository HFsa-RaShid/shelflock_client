import React from "react";

interface OutlineOrangeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function OutlineOrangeButton({
  children,
  onClick,
  className = "",
}: OutlineOrangeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-[38px] min-w-[118px] items-center justify-center rounded-[8px] border border-[#F74608] bg-transparent px-4 body-sm-medium adsfixter-primary-text transition-all duration-150 hover:bg-[#FFF5F1] active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
}
