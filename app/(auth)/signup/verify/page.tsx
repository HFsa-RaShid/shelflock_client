import AuthHeader from "@/components/features/auth/auth-header";
import SignupVerifyForm from "@/components/features/auth/signup-verify-form";
import AuthCard from "@/components/features/auth/layout/auth-card";
import AuthPageLayout from "@/components/features/auth/layout/auth-page-layout";

export default function SignupVerifyPage() {
  return (
    <AuthPageLayout backLink="/signup" backText="Back to Sign Up">
      <AuthCard className="mt-[128px]">
        <AuthHeader
          title="Verify Your Account"
          subtitle="Enter the 6-digit code sent to your email or phone"
        />
        <SignupVerifyForm />
      </AuthCard>
    </AuthPageLayout>
  );
}
