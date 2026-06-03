import React, { ButtonHTMLAttributes } from "react";

interface TertiaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function TertiaryButton({
  children,
  icon,
  className = "",
  ...props
}: TertiaryButtonProps): React.JSX.Element {
  return (
    <button
      {...props}
      className={`
        /* Figma Dimensions & Padding */
        min-w-[129px] h-[38px] px-3 py-2 gap-2 flex items-center justify-center
        
        /* Shape & Border */
        rounded-lg border-[1.3px] border-[#111111]
        
        /* Colors & Figma Box Shadow (Inset Glaze) */
        bg-[#111111] text-white text-sm font-medium
        shadow-[inset_0_3px_3px_0_rgba(255,255,255,0.5)]
        
        /* Smooth Interaction Effects */
        transition-all duration-200 select-none opacity-100
        hover:bg-[#222222] hover:border-[#222222] active:scale-[0.98]
        
        ${className}
      `}
    >
      {icon && (
        <div className="flex items-center justify-center shrink-0">{icon}</div>
      )}

      <span className="leading-none">{children}</span>
    </button>
  );
}
