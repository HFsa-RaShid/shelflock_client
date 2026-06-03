import AuthHeader from "@/components/features/auth/auth-header";
import ForgotPasswordPhoneForm from "@/components/features/auth/forgot-password/forgot-password-phone-form";
import AuthCard from "@/components/features/auth/layout/auth-card";
import AuthPageLayout from "@/components/features/auth/layout/auth-page-layout";

export default function ForgotPasswordPhonePage() {
  return (
    <AuthPageLayout
      backLink="/forgot-password"
      backText="Back to Method Selection"
    >
      <AuthCard className="mt-[128px]">
        <AuthHeader
          title="Forgot Password?"
          subtitle="We'll send a verification code to your phone number"
        />
        <ForgotPasswordPhoneForm />
      </AuthCard>
    </AuthPageLayout>
  );
}
