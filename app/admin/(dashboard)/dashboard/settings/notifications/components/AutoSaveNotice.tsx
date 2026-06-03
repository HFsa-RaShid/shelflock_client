import { AlertCircle } from "lucide-react";

export default function AutoSaveNotice() {
  return (
    <div className="flex w-full flex-col items-start gap-3 rounded-[12px] border border-[#E9E9E9] bg-[#E8F8EF] p-4 sm:flex-row sm:items-center sm:p-5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#22A06B] text-white">
        <AlertCircle className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="body-sm-medium primary-text">
          Changes are saved automatically.
        </p>
        <p className="body-sm-regular subtext mt-0.5">
          You will start receiving notifications based on your preferences.
        </p>
      </div>
    </div>
  );
}
