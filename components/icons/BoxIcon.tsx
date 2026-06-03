// components/icons/BoxIcon.tsx
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function BoxIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="24" height="24" rx="6" fill="#E4EFFD" />
      <path
        d="M14.6251 7.91669L17.2501 9.08337L17.2501 14.9166L12.0001 17.25L6.75 14.9166L6.75 9.08332L12.0001 6.75L14.6251 7.91669ZM12.0001 17.25V11.4167M17.2501 9.08337L12.0001 11.4167M6.75 9.08332L9.37505 10.25M12.0001 11.4167L9.37505 10.25M9.37505 10.25L14.6251 7.91669"
        stroke="#0C5BD1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}