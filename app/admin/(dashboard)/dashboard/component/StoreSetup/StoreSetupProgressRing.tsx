"use client";

interface StoreSetupProgressRingProps {
  percentage: number;
  size?: number;
}

/** Circular progress — Figma "45% Complete" ring */
export default function StoreSetupProgressRing({
  percentage,
  size = 112,
}: StoreSetupProgressRingProps) {
  const stroke = 10;
  const radius = (size - stroke) / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${percentage}% complete`}
    >
      <svg width={size} height={size} className="block -rotate-90" aria-hidden>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E9E9E9"
          strokeWidth={stroke}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#34C759"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="primary-text font-semibold text-[22px] leading-none">
          {percentage}%
        </span>
        <span className="body-sm-regular subtext mt-1">Complete</span>
      </div>
    </div>
  );
}
