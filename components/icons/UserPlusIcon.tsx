// components/icons/UserPlusIcon.tsx
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function UserPlusIcon({ size = 20, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M9.99967 12.083V13.7497M9.99967 13.7497V15.4163M9.99967 13.7497H8.33301M9.99967 13.7497H11.6663"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2422 10H8.75847C6.47314 10 4.40216 11.3459 3.474 13.4342C2.62419 15.3463 4.02382 17.5 6.11623 17.5H13.8844C15.9768 17.5 17.3765 15.3463 16.5267 13.4342C15.5985 11.3459 13.5275 10 11.2422 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 5C7.5 3.61929 8.61929 2.5 10 2.5C11.3807 2.5 12.5 3.61929 12.5 5C12.5 6.38071 11.3807 7.5 10 7.5C8.61929 7.5 7.5 6.38071 7.5 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}