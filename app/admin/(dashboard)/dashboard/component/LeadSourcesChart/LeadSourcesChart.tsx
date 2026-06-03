"use client";

import { useState } from "react";
import { Database, MoreVertical } from "lucide-react";
import type { LeadSourcesChartProps } from "./LeadSourcesChart.type";
import LeadSourcesDonut from "./LeadSourcesDonut";

const STRIPED_TRACK =
  "repeating-linear-gradient(-45deg, #E9E9E9 0px, #E9E9E9 2px, #F5F5F5 2px, #F5F5F5 4px)";

export default function LeadSourcesChart({ data }: LeadSourcesChartProps) {
  const { title, totalLeads, totalLabel, sources: segments } = data;
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const isEmpty = segments.length === 0;
  const formattedTotal = totalLeads.toLocaleString("de-DE");
  const colorsById = Object.fromEntries(
    segments.map((source) => [source.id, source.color])
  );

  return (
    <div className="bg-white rounded-xl p-5 border border-[#E9E9E9] w-full min-h-[454px] flex flex-col overflow-hidden">
      <div className="flex items-center justify-between h-16 px-4 border-b border-[#E9E9E9] shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="w-8 h-8 flex items-center justify-center rounded-md border border-[#E9E9E9] bg-white shrink-0"
            style={{ boxShadow: "0px 1px 2px 0px #5258660F" }}
          >
            <Database className="w-4 h-4 primary-text" />
          </span>
          <h3 className="body-l-medium primary-text leading-6 truncate">
            {title}
          </h3>
        </div>
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-md border border-[#E9E9E9] bg-white shrink-0 hover:bg-gray-50"
          style={{ boxShadow: "0px 1px 2px 0px #5258660F" }}
          aria-label="Chart options"
        >
          <MoreVertical className="w-4 h-4 primary-text" />
        </button>
      </div>

      <div className="flex flex-col items-center flex-1 p-4 gap-5 min-w-0">
        {isEmpty ? (
          /* First-time empty overview — Figma ফাঁকা card body */
          <div className="flex-1 w-full min-h-[280px]" aria-hidden />
        ) : (
          <>
        <div className="relative w-[200px] h-[200px] shrink-0 overflow-visible">
          <LeadSourcesDonut
            colorsById={colorsById}
            hoveredId={hoveredId}
            onHover={setHoveredId}
            ariaLabel={`${title}: ${formattedTotal} ${totalLabel}`}
          />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none">
            <p className="primary-text font-medium text-[32px] leading-[140%]">
              {formattedTotal}
            </p>
            <p className="body-sm-regular subtext">{totalLabel}</p>
          </div>
        </div>

        <ul className="w-full space-y-4 min-w-0">
          {segments.map((source) => (
            <li key={source.id} className="flex items-center gap-3 w-full">
              <span
                className="w-3 h-3 rounded-full shrink-0 border-2 border-white shadow-sm"
                style={{ backgroundColor: source.color }}
              />
              <span className="body-sm-medium primary-text leading-[150%] shrink-0 min-w-[72px]">
                {source.label}
              </span>
              <div
                className="flex-1 h-2 rounded-full overflow-hidden min-w-0"
                style={{ background: STRIPED_TRACK }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${source.percentage}%`,
                    backgroundColor: source.color,
                  }}
                />
              </div>
              <span className="body-sm-medium primary-text leading-[150%] shrink-0 tabular-nums">
                {source.count}
              </span>
            </li>
          ))}
        </ul>
          </>
        )}
      </div>
    </div>
  );
}
