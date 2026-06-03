// components/users/StatusBadge.tsx
"use client";

import { Status } from "../data/usersPermissions";
import ActiveIcon from "@/components/icons/ActiveIcon";
import PendingIcon from "@/components/icons/PendingIcon";

interface Props {
  status: Status;
}

const badgeStyles: Record<Status, { bg: string; text: string }> = {
  Active: {
    bg: "#E8FBF0", 
    text: "#46D877",
  },
  Pending: {
    bg: "#FFF1EB", 
    text: "#FA7319",
  },
  Inactive: {
    bg: "#F4F5F7",
    text: "#808897",
  },
};

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className="inline-flex items-center select-none"
      style={{
        height: "24px",
        borderRadius: "6px",
        gap: "4px",
        paddingTop: "2px",
        paddingRight: "8px",
        paddingBottom: "2px",
        paddingLeft: "4px",
        opacity: 1,
        backgroundColor: badgeStyles[status]?.bg,
      }}
    >
      {/* Dynamic Condition Checking Modules */}
      {status === "Active" && <ActiveIcon size={14} />}
      {status === "Pending" && <PendingIcon size={14} />}
      {status === "Inactive" && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#feefe4] ml-1 shrink-0" />
      )}

      <span
        style={{
          color: badgeStyles[status]?.text,
          fontSize: "12px",
          fontWeight: 500,
          lineHeight: "1",
        }}
      >
        {status}
      </span>
    </span>
  );
}