import OutlineOrangeButton from "./OutlineOrangeButton";
import SettingsSectionCard from "./SettingsSectionCard";

interface PhoneNumberSectionProps {
  phone: string;
}

export default function PhoneNumberSection({ phone }: PhoneNumberSectionProps) {
  return (
    <SettingsSectionCard
      title="Phone Number"
      description="Update your contact number."
      action={
        <OutlineOrangeButton className="w-full min-w-0 md:w-auto">
          Change Phone
        </OutlineOrangeButton>
      }
    >
      <div className="flex min-w-0 flex-col gap-1">
        <span className="body-sm-regular primary-text">Current Phone</span>
        <span className="body-sm-regular subtext break-words">{phone}</span>
      </div>
    </SettingsSectionCard>
  );
}
