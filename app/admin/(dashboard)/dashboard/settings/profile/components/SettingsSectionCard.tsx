import type { ReactNode } from "react";

interface SettingsSectionCardProps {
  title: string;
  description: string;
  action?: ReactNode;
  children?: ReactNode;
}

export default function SettingsSectionCard({
  title,
  description,
  action,
  children,
}: SettingsSectionCardProps) {
  return (
    <section className="flex w-full max-w-[1128px] flex-col rounded-[12px] border border-[#E9E9E9] bg-white p-4 sm:p-5 lg:p-6 xl:max-w-none">
      <div className="flex w-full min-w-0 flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="min-w-0 flex-1">
          <h2 className="body-l-medium primary-text">{title}</h2>
          <p className="body-sm-regular subtext mt-1">{description}</p>
        </div>
        {action ? <div className="w-full shrink-0 md:w-auto">{action}</div> : null}
      </div>
      {children ? <div className="mt-4 min-w-0 sm:mt-5 lg:mt-6">{children}</div> : null}
    </section>
  );
}
