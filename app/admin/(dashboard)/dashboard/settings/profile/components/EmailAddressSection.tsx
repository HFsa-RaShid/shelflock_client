import OutlineOrangeButton from "./OutlineOrangeButton";
import SettingsSectionCard from "./SettingsSectionCard";

interface EmailAddressSectionProps {
  email: string;
}

export default function EmailAddressSection({ email }: EmailAddressSectionProps) {
  return (
    <SettingsSectionCard
      title="Email Address"
      description="Update your email address used for login and notifications."
      action={
        <OutlineOrangeButton className="w-full min-w-0 md:w-auto">
          Change Email
        </OutlineOrangeButton>
      }
    >
      <div className="flex min-w-0 flex-col gap-1">
        <span className="body-sm-regular primary-text">Email Address</span>
        <span className="body-sm-regular subtext break-all">{email}</span>
      </div>
    </SettingsSectionCard>
  );
}
