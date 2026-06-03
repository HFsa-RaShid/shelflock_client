interface SegmentedProgressProps {
  percent: number;
  color: string;
  segments?: number;
}

export default function SegmentedProgress({
  percent,
  color,
  segments = 25,
}: SegmentedProgressProps) {
  const filledCount = Math.round((percent / 100) * segments);

  return (
    <div className="flex w-full min-w-0 gap-[2px] sm:gap-[3px]">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className="h-4 min-w-0 flex-1 rounded-full sm:h-5"
          style={{
            backgroundColor: i < filledCount ? color : "#EEEFF2",
          }}
        />
      ))}
    </div>
  );
}
