import { Check } from "lucide-react";

interface NotificationCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  showLabel?: boolean;
}

export default function NotificationCheckbox({
  checked,
  onChange,
  label,
  showLabel = false,
}: NotificationCheckboxProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1.5">
      {showLabel ? (
        <span className="body-sm-medium primary-text text-center whitespace-nowrap">
          {label}
        </span>
      ) : null}
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border transition-colors sm:h-[22px] sm:w-[22px] ${
          checked
            ? "border-[#22A06B] bg-[#22A06B] text-white"
            : "border-[#E9E9E9] bg-white hover:border-[#C5C9C7]"
        }`}
      >
        {checked ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : null}
      </button>
    </div>
  );
}
