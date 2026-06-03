import React from "react";

export default function SubscriptionIcon(
  props: React.SVGProps<SVGSVGElement>
) {
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
        d="M2.5 6.66667L5.83333 9.16667L10 3.33333L14.1667 9.16667L17.5 6.66667L15.8333 15H4.16667L2.5 6.66667Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.16667 17.5H15.8333"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
