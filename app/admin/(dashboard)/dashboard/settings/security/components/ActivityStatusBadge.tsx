import type { ActivityStatus } from "../security.types";

interface ActivityStatusBadgeProps {
  status: ActivityStatus;
}

export default function ActivityStatusBadge({
  status,
}: ActivityStatusBadgeProps) {
  if (status === "this-device") {
    return (
      <span className="inline-flex items-center rounded-md bg-[#E8F8EF] px-3 py-1 body-sm-medium text-[#22A06B]">
        This device
      </span>
    );
  }

  if (status === "logged-out") {
    return (
      <span className="inline-flex items-center rounded-md bg-[#F7F8FA] px-3 py-1 body-sm-medium subtext">
        Logged Out
      </span>
    );
  }

  return <span className="body-sm-medium primary-text">Active</span>;
}
