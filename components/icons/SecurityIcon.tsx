import React from "react";

export default function SecurityIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M5.83333 9.16667V5.83333C5.83333 4.94928 6.18452 4.10143 6.80964 3.47631C7.43477 2.85119 8.28261 2.5 9.16667 2.5H10.8333C11.7174 2.5 12.5652 2.85119 13.1904 3.47631C13.8155 4.10143 14.1667 4.94928 14.1667 5.83333V9.16667"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33333 9.16667H16.6667C17.5871 9.16667 18.3333 9.91286 18.3333 10.8333V16.6667C18.3333 17.5871 17.5871 18.3333 16.6667 18.3333H3.33333C2.41286 18.3333 1.66667 17.5871 1.66667 16.6667V10.8333C1.66667 9.91286 2.41286 9.16667 3.33333 9.16667Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 13.3333V15"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
