// components/users/RoleSummaryCard.tsx
import React from "react";
import BoxIcon from "@/components/icons/BoxIcon";
import { RoleSummary } from "../data/usersPermissions";

interface Props {
  summary: RoleSummary;
}

export default function RoleSummaryCard({ summary }: Props) {
  return (
    <div
      className="bg-white flex flex-col justify-between opacity-100 transition-all duration-200 p-4 gap-4 w-full flex-1"
      style={{
        // Fixed static width shob bad! Sudhu height ar borders thakbe dynamic behavior er jonno
        height: "160px",
        borderRadius: "10px",
        border: "1px solid #E9E9E9",
      }}
    >
      {/* Top Section: Icon & Role Name */}
      <div className="flex items-center gap-2">
        <BoxIcon size={24} />
        <span className="subtext body-regular">{summary.role}</span>
      </div>

      {/* Middle Section: Count */}
      <div className="h6-bold primary-text">{summary.count}</div>

      {/* Bottom Section: Description */}
      <p className="body-regular max-w-[280px] subtext line-clamp-2">{summary.description}</p>
    </div>
  );
}