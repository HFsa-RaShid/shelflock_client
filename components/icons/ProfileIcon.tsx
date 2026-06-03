import React from "react";

export default function ProfileIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M10 10.4167C11.6108 10.4167 12.9167 9.11083 12.9167 7.5C12.9167 5.88917 11.6108 4.58333 10 4.58333C8.38917 4.58333 7.08333 5.88917 7.08333 7.5C7.08333 9.11083 8.38917 10.4167 10 10.4167Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6667 17.0833C16.6667 14.9167 13.6117 13.3333 10 13.3333C6.38833 13.3333 3.33333 14.9167 3.33333 17.0833"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
