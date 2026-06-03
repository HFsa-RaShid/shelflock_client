import React from "react";

interface ProfileFormFieldProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  type?: "text" | "select";
  options?: string[];
  trailingIcon?: React.ReactNode;
}

export default function ProfileFormField({
  label,
  value,
  onChange,
  type = "text",
  options = [],
  trailingIcon,
}: ProfileFormFieldProps) {
  const inputClassName =
    "w-full h-[44px] rounded-[8px] border border-[#E9E9E9] bg-white px-3 body-sm-regular primary-text outline-none transition-colors focus:border-[#0E2038] min-w-0";

  return (
    <div className="flex flex-col gap-2">
      <label className="body-sm-medium primary-text">{label}</label>

      {type === "select" ? (
        <div className="relative">
          <select
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            className={`${inputClassName} appearance-none pr-10 cursor-pointer`}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7F8482]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      ) : (
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            className={`${inputClassName} ${trailingIcon ? "pr-10" : ""}`}
          />
          {trailingIcon ? (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7F8482]">
              {trailingIcon}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
