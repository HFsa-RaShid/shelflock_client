import React from "react";

interface SecondaryBtnProps {
  children: React.ReactNode;
  icon?: React.ReactNode; 
  onClick?: () => void;   
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function SecondaryBtn({
  children,
  icon,
  onClick,
  type = "button",
  className = "",
}: SecondaryBtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width: "auto",
        minWidth: "118px", 
        height: "46px",
        padding: "12px 24px",
        gap: "8px",
        borderRadius: "8px",
        border: "1px solid var(--Color-Stroke, #E9E9E9)", 
        background: "transparent",
      }}

      className={`flex items-center justify-center font-medium text-[16px] text-[#0E2038] leading-[140%] select-none transition-all duration-150 active:scale-98 hover:bg-[#F7F8FA] ${className}`}
    >

      {icon && (
        <div className="flex items-center justify-center w-5 h-5 text-[#0E2038]">
          {icon}
        </div>
      )}
      
      <span>{children}</span>
    </button>
  );
}