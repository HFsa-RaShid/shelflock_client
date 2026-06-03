"use client";

import { useState } from "react";
import { Coins, TrendingUp } from "lucide-react";
import type { WeeklySalesDayPoint } from "./WeeklySalesChart.type";
import type { WeeklySalesChartProps } from "./WeeklySalesChart.type";

const BAR_MAX_HEIGHT = 169;
const BAR_WIDTH = 65;
const TOOLTIP_SLOT_HEIGHT = 56;

function formatSalesValue(day: WeeklySalesDayPoint) {
  if (day.tooltipValue != null) {
    return day.tooltipValue.toLocaleString();
  }
  if (day.value >= 1000) {
    return `${(day.value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return day.value.toLocaleString();
}

function formatTooltipDate(day: WeeklySalesDayPoint) {
  return day.tooltipDate ?? day.dateLabel;
}

export default function WeeklySalesChart({ data }: WeeklySalesChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const {
    title,
    salesSummaryLabel,
    totalAmount,
    changeLabel,
    highestLabel,
    highestAmount,
    highestDateShort,
    lowestLabel,
    lowestAmount,
    lowestDateShort,
    yAxisLabels,
    days,
  } = data;

  const maxValue = Math.max(...days.map((d) => d.value), 1);

  return (
    <div className="bg-white rounded-xl border border-[#E9E9E9] w-full min-h-[454px] flex flex-col overflow-hidden">
      <div className="flex items-center  gap-2.5 h-16 px-4 border-b border-[#E9E9E9] shrink-0">
        <span
          className="w-8 h-8 flex items-center justify-center rounded-md border border-[#E9E9E9] bg-white shrink-0"
          style={{ boxShadow: "0px 1px 2px 0px #5258660F" }}
        >
          <Coins className="w-4 h-4 primary-text" />
        </span>
        <h3 className="body-l-medium primary-text ">{title}</h3>
      </div>

      <div className="flex flex-col  gap-5 m-4  flex-1 min-w-0">
        <div className="flex  flex-col sm:flex-row sm:items-start sm:justify-between gap-5 w-full shrink-0">
          <div className="flex flex-col gap-1 min-w-0">
            <p className="body-regular subtext leading-[140%]">{salesSummaryLabel}</p>
            <p className="primary-text font-medium text-[32px] leading-[140%]">
              {totalAmount}
            </p>
            {changeLabel.trim() ? (
              <p className="body-sm-regular leading-[18px] flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#3FB250]" />
                <span className="text-[#3FB250]">{changeLabel}</span>
              </p>
            ) : (
              <span className="block h-[18px]" aria-hidden />
            )}
          </div>

          <div className="flex gap-6 shrink-0 ">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3FB250]" />
                <span className="body-regular subtext leading-[140%]">
                  {highestLabel}
                </span>
              </div>
              <p className="body-l-medium leading-[140%] text-[#3FB250CC]">
                {highestAmount}
              </p>
              <p className="body-sm-regular subtext leading-[18px]">
                {highestDateShort}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D50D07]" />
                <span className="body-regular subtext leading-[140%]">
                  {lowestLabel}
                </span>
              </div>
              <p
                className="body-l-medium leading-[140%]"
                style={{ color: "rgba(213, 13, 7, 0.8)" }}
              >
                {lowestAmount}
              </p>
              <p className="body-sm-regular subtext leading-[18px]">
                {lowestDateShort}
              </p>
            </div>
          </div>
        </div>

        {/* চার্ট — টুলটিপ শুধু এই ব্লকের ভিতরে, সামারি সেকশনে ঢোকবে না */}
        <div className="flex gap-3 w-full min-w-0 flex-1 min-h-0 ">
          <div
            className="flex flex-col justify-between shrink-0"
            style={{
              height: BAR_MAX_HEIGHT,
              marginTop: TOOLTIP_SLOT_HEIGHT,
            }}
          >
            {yAxisLabels.map((label) => (
              <span
                key={label}
                className="body-sm-regular subtext leading-[18px] text-right min-w-[28px]"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex-1 min-w-0 flex flex-col min-h-0">
            <div
              className="relative w-full"
              style={{ height: TOOLTIP_SLOT_HEIGHT + BAR_MAX_HEIGHT }}
            >
              <div
                className="absolute top-0 left-0 right-0 flex items-end justify-between pointer-events-none z-20"
                style={{ height: TOOLTIP_SLOT_HEIGHT }}
              >
                {days.map((day, index) => (
                  <div
                    key={`tip-${day.dayLabel}`}
                    className="flex flex-col items-center justify-end h-full transition-opacity duration-150"
                    style={{
                      width: BAR_WIDTH,
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                  >
                    <div className="bg-white rounded-lg px-3 py-2 shadow-md border border-[#E9E9E9] text-center min-w-[96px]">
                      <p className="body-sm-medium primary-text font-bold">
                        {formatSalesValue(day)}
                      </p>
                      <p className="body-sm-regular subtext leading-[18px]">
                        {formatTooltipDate(day)}
                      </p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#3FB250] mt-1 shrink-0" />
                  </div>
                ))}
              </div>

              <div
                className="absolute left-0 right-0 flex items-end justify-between border-b border-[#E9E9E9]"
                style={{
                  top: TOOLTIP_SLOT_HEIGHT,
                  height: BAR_MAX_HEIGHT,
                }}
              >
                {days.map((day, index) => {
                  const barHeight = Math.max(
                    (day.value / maxValue) * BAR_MAX_HEIGHT,
                    24
                  );
                  const isActive = day.isHighlighted;
                  const isHovered = hoveredIndex === index;

                  return (
                    <div
                      key={`${day.dayLabel}-${day.dateLabel}`}
                      className="flex flex-col items-center justify-end h-full cursor-pointer"
                      style={{ width: BAR_WIDTH, maxWidth: BAR_WIDTH }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div
                        className="w-full rounded-t shrink-0 transition-all duration-150"
                        style={{
                          height: barHeight,
                          width: BAR_WIDTH,
                          background: isActive || isHovered
                            ? "rgba(247, 70, 8, 1)"
                            : "linear-gradient(180deg, rgba(247, 70, 8, 0.2) -19.57%, rgba(240, 240, 240, 0.3) 100%)",
                          borderRadius: "4px 4px 0 0",
                          opacity: isHovered && !isActive ? 0.9 : 1,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between w-full mt-2">
              {days.map((day) => (
                <div
                  key={`label-${day.dayLabel}-${day.dateLabel}`}
                  className="flex flex-col items-center text-center"
                  style={{ width: BAR_WIDTH, maxWidth: BAR_WIDTH }}
                >
                  <span className="body-sm-medium primary-text leading-[150%]">
                    {day.dayLabel}
                  </span>
                  <span className="body-sm-regular subtext leading-[18px]">
                    {day.dateLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
