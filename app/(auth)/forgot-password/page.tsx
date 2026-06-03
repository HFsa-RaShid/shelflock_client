import AuthHeader from "@/components/features/auth/auth-header";
import ForgotPasswordMethodForm from "@/components/features/auth/forgot-password/forgot-password-method-form";
import AuthCard from "@/components/features/auth/layout/auth-card";
import AuthPageLayout from "@/components/features/auth/layout/auth-page-layout";

export default function ForgotPasswordPage() {
  return (
    <AuthPageLayout
      backLink="/signin"
      backText="Back to Login"
      backgroundClassName="bg-[#FAFAFA]"
    >
      <AuthCard className="mt-[128px]">
        <AuthHeader
          title="Reset Your Password"
          subtitle="Choose how you'd like to receive your verification code"
        />
        <ForgotPasswordMethodForm />
      </AuthCard>
    </AuthPageLayout>
  );
}
