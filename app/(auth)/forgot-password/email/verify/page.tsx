import AuthHeader from "@/components/features/auth/auth-header";
import OtpVerifyForm from "@/components/features/auth/forgot-password/otp-verify-form";
import VerifyEmailNotice from "@/components/features/auth/forgot-password/verify-email-notice";
import AuthCard from "@/components/features/auth/layout/auth-card";
import AuthPageLayout from "@/components/features/auth/layout/auth-page-layout";

export default function VerifyEmailPage() {
  return (
    <AuthPageLayout backLink="/forgot-password/email" backText="Back">
      <AuthCard className="mt-[128px]">
        <AuthHeader title="Verify Your Email" subtitle="" />
        <VerifyEmailNotice />
        <OtpVerifyForm />
      </AuthCard>
    </AuthPageLayout>
  );
}
