interface UsageProgressBarProps {
  used: number;
  limit: number | "unlimited";
  color: "orange" | "green";
}

export default function UsageProgressBar({
  used,
  limit,
  color,
}: UsageProgressBarProps) {
  const fillPercent =
    limit === "unlimited"
      ? 100
      : Math.max(0, Math.min(100, Math.round((used / Math.max(limit, 1)) * 100)));

  const colorClass = color === "green" ? "bg-[#22A06B]" : "bg-[#F74608]";

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EFE9E5]">
      <div
        className={`h-full rounded-full transition-[width] duration-300 ${colorClass}`}
        style={{ width: `${fillPercent}%` }}
      />
    </div>
  );
}
