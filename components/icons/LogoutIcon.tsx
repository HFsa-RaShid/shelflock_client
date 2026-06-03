import React from "react";

export default function LogoutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.16667 2.5C6.67436 2.5 5.4282 2.5 4.5 3.0359C3.89192 3.38697 3.38697 3.89192 3.0359 4.5C2.5 5.4282 2.5 6.67436 2.5 9.16667V10.8333C2.5 13.3256 2.5 14.5718 3.0359 15.5C3.38697 16.1081 3.89192 16.613 4.5 16.9641C5.4282 17.5 6.67436 17.5 9.16667 17.5M17.5 10L7.5 10M10 12.5L7.5 10L10 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
