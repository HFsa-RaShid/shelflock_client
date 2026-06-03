// components/icons/InviteIcon.tsx
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function InviteIcon({
  size = 20,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className || ""}`}
      {...props}
    >
      <path
        d="M8.99253 11.0075C8.97321 10.9888 8.95297 10.971 8.93188 10.9542C8.77896 10.8325 8.57416 10.7885 8.16455 10.7005C5.86377 10.2062 4.71338 9.95909 4.31586 9.59951C3.49593 8.85784 3.43331 7.59161 4.17607 6.77266C4.53617 6.37561 5.65657 6.01619 7.89735 5.29734L11.2382 4.22557C13.8127 3.39967 15.1 2.98672 15.8915 3.49053C16.1391 3.64819 16.3491 3.85844 16.5064 4.10637C17.009 4.89864 16.594 6.18525 15.7642 8.75846L14.6739 12.1392C13.9706 14.3198 13.619 15.4102 13.2394 15.7644C12.4114 16.537 11.1077 16.4687 10.365 15.6137C10.0245 15.2217 9.78881 14.1006 9.31741 11.8584C9.23122 11.4484 9.18812 11.2434 9.06705 11.09C9.04405 11.0608 9.01916 11.0333 8.99253 11.0075ZM8.99253 11.0075L14.167 5.83304"
        stroke="currentColor" // White hardcoded replace kore inline class reactive tracking dewa holo
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
