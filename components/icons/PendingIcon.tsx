// components/icons/PendingIcon.tsx
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function PendingIcon({ size = 14, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className || ""}`}
      {...props}
    >
      <path
        d="M6.125 2.625C6.125 2.14175 6.51675 1.75 7 1.75C7.48325 1.75 7.875 2.14175 7.875 2.625C7.875 3.10825 7.48325 3.5 7 3.5C6.51675 3.5 6.125 3.10825 6.125 2.625Z"
        stroke="#FA7319"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.28769 4.52513C2.94598 4.18342 2.94598 3.6294 3.28769 3.28769C3.6294 2.94598 4.18342 2.94598 4.52513 3.28769C4.86684 3.6294 4.86684 4.18342 4.52513 4.52513C4.18342 4.86684 3.6294 4.86684 3.28769 4.52513Z"
        stroke="#FA7319"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.125 11.375C6.125 10.8918 6.51675 10.5 7 10.5C7.48325 10.5 7.875 10.8918 7.875 11.375C7.875 11.8582 7.48325 12.25 7 12.25C6.51675 12.25 6.125 11.8582 6.125 11.375Z"
        stroke="#FA7319"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.75 7C1.75 6.51675 2.14175 6.125 2.625 6.125C3.10825 6.125 3.5 6.51675 3.5 7C3.5 7.48325 3.10825 7.875 2.625 7.875C2.14175 7.875 1.75 7.48325 1.75 7Z"
        stroke="#FA7319"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.28769 10.7123C2.94598 10.3706 2.94598 9.81658 3.28769 9.47487C3.6294 9.13317 4.18342 9.13317 4.52513 9.47487C4.86684 9.81658 4.86684 10.3706 4.52513 10.7123C4.18342 11.054 3.6294 11.054 3.28769 10.7123Z"
        stroke="#FA7319"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.47487 4.52513C9.13317 4.18342 9.13317 3.6294 9.47487 3.28769C9.81658 2.94598 10.3706 2.94598 10.7123 3.28769C11.054 3.6294 11.054 4.18342 10.7123 4.52513C10.3706 4.86684 9.81658 4.86684 9.47487 4.52513Z"
        stroke="#FA7319"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.47516 10.7123C9.13346 10.3706 9.13346 9.81658 9.47516 9.47487C9.81687 9.13317 10.3709 9.13317 10.7126 9.47487C11.0543 9.81658 11.0543 10.3706 10.7126 10.7123C10.3709 11.054 9.81687 11.054 9.47516 10.7123Z"
        stroke="#292556"
        strokeOpacity="0.18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5003 7C10.5003 6.51675 10.892 6.125 11.3753 6.125C11.8585 6.125 12.2503 6.51675 12.2503 7C12.2503 7.48325 11.8585 7.875 11.3753 7.875C10.892 7.875 10.5003 7.48325 10.5003 7Z"
        stroke="#292556"
        strokeOpacity="0.18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}