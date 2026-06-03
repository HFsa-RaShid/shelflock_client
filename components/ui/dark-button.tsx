import React from "react";

interface DarkBtnProps {
  children: React.ReactNode;
  icon?: React.ReactNode; 
  onClick?: () => void; 
  type?: "button" | "submit" | "reset";
  className?: string;   
}

export default function DarkBtn({
  children,
  icon,
  onClick,
  type = "button",
  className = "",
}: DarkBtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width: "auto", 
        minWidth: "154px",
        height: "38px", 
        padding: "8px 16px 10px 16px", 
        gap: "6px", 
        borderRadius: "8px",
        background: "var(--Color-Primary-Text, #0E2038)", 
        opacity: 1,
        border: "none", 
      }}

      className={`flex items-center justify-center font-medium text-[14px] text-white  leading-[145%] text-center select-none transition-all duration-150 active:scale-98 hover:bg-[#162a45] ${className}`}
    >
      {icon && (
        <div className="flex items-center justify-center w-4 h-4 text-white">
          {icon}
        </div>
      )}
      
      <span className="w-full text-center">{children}</span>
    </button>
  );
}