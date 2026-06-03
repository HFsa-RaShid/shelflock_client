import React from "react";

interface PrimarybtnProps {
  children: React.ReactNode;
  icon?: React.ReactNode; 
  onClick?: () => void; 
  type?: "button" | "submit" | "reset";
  className?: string;  
}

export default function Primarybtn({
  children,
  icon,
  onClick,
  type = "button",
  className = "",
}: PrimarybtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width: "auto", 
        minWidth: "156px", 
        height: "46px",
        padding: "12px 24px",
        gap: "8px",
        borderRadius: "8px",
        border: "1.3px solid var(--Color-Adsfixter-Primary, #F74608)",
        background: "var(--Color-Adsfixter-Primary, #F74608)",
        boxShadow:
          "inset 0px 3px 3px 0px rgba(255, 255, 255, 0.5), inset 0px -3px 4px 0px rgba(0, 0, 0, 0.3)",
        opacity: 1,
        color: "#FFFFFF",
      }}
      className={`flex items-center justify-center font-bold text-[16px] select-none 
       min-w-[156px] transition-transform duration-150 active:scale-98 ${className}`}
    >
      {icon && <div className="flex items-center justify-center w-5 h-5">{icon}</div>}
      
      <span className="leading-none">{children}</span>
    </button>
  );
}