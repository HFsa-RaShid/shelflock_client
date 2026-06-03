// components/icons/DeleteIcon.tsx
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function DeleteIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className || ""}`}
      {...props}
    >
      <path
        d="M3.33333 4L3.33333 9.33333C3.33333 10.5742 3.33333 11.1946 3.49648 11.6967C3.8262 12.7115 4.62182 13.5071 5.63661 13.8369C6.13872 14 6.75915 14 8 14C9.24085 14 9.86128 14 10.3634 13.8369C11.3782 13.5071 12.1738 12.7115 12.5035 11.6967C12.6667 11.1946 12.6667 10.5742 12.6667 9.33333L12.6667 4M3.33333 4H2M3.33333 4H6M12.6667 4H14M12.6667 4L10 4M6 4L10 4M6 4C6 3.37874 6 3.06812 6.10149 2.82309C6.23682 2.49638 6.49638 2.23682 6.82309 2.10149C7.06812 2 7.37874 2 8 2C8.62126 2 8.93188 2 9.17691 2.10149C9.50362 2.23682 9.76318 2.49638 9.89851 2.82309C10 3.06812 10 3.37874 10 4M6.33333 6.33333V11M9.66667 6.33333V11"
        stroke="#DF1C41"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}