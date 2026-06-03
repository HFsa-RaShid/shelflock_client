import type { ReactNode } from "react";

interface SecuritySettingRowProps {
  icon: ReactNode;
  title: string;
  description: string;
  action: ReactNode;
  showDivider?: boolean;
}

export default function SecuritySettingRow({
  icon,
  title,
  description,
  action,
  showDivider = true,
}: SecuritySettingRowProps) {
  return (
    <>
      <div className="flex flex-col gap-4 py-3 md:flex-row md:items-center md:justify-between md:py-1">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F8FA] text-[#0E2038]">
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <p className="body-sm-medium primary-text">{title}</p>
            <p className="body-sm-regular subtext mt-0.5">{description}</p>
          </div>
        </div>
        <div className="flex w-full shrink-0 items-center justify-end pl-[52px] md:w-auto md:pl-0">
          {action}
        </div>
      </div>
      {showDivider ? <div className="my-3 h-px bg-[#E9E9E9] md:my-4" /> : null}
    </>
  );
}
