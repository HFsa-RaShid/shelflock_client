interface SecurityToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
}

export default function SecurityToggle({
  enabled,
  onChange,
  label,
}: SecurityToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
        enabled ? "bg-[#22A06B]" : "bg-[#D9D9D9]"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          enabled ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
