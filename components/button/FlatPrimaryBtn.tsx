// components/ui/FlatPrimaryBtn.tsx
import React from "react";

interface FlatPrimaryBtnProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string; // Ekhon className diye jekono width pass kora jabe 🎯
  disabled?: boolean;
}

export default function FlatPrimaryBtn({
  children,
  icon,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: FlatPrimaryBtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        height: "36px", // Exact fixed spec height token thaklo
        borderRadius: "8px",
        border: "1px solid var(--Color-Adsfixter-Primary, #F74608)",
        background: "var(--Color-Adsfixter-Primary, #F74608)",
        boxShadow:
          "0px 1px 2px 0px rgba(55, 93, 251, 0.08), inset 0px 1px 2px 0px rgba(255, 255, 255, 0.3)",
        opacity: disabled ? 0.6 : 1,
        padding: "8px",
        gap: "4px",
      }}
      className={`flex items-center justify-center font-semibold text-[14px] text-white select-none
        transition-all duration-150 active:scale-98 hover:brightness-105 disabled:pointer-events-none ${className}`}
    >
      {/* Icon wrapper alignment block */}
      {icon && (
        <div className="flex items-center justify-center w-4 h-4 shrink-0">
          {icon}
        </div>
      )}

      {/* Text rendering context */}
      <span className="leading-none truncate">{children}</span>
    </button>
  );
}
