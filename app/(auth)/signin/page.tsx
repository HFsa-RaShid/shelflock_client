import { Suspense } from "react";

import AuthHeader from "@/components/features/auth/auth-header";
import AuthCredentialsLayout from "@/components/features/auth/layout/auth-credentials-layout";
import AuthFormPanel from "@/components/features/auth/layout/auth-form-panel";
import AuthSplitCard from "@/components/features/auth/layout/auth-split-card";
import SignInFields from "@/components/features/auth/signin-fields";
import TemplateFlowCapture from "@/components/features/auth/template-flow-capture";
import AuthMarketingSlider from "@/components/features/auth/ui/auth-marketing-slider";

export default function SignInPage() {
  return (
    <AuthCredentialsLayout>
      <AuthSplitCard>
        <AuthFormPanel>
          <AuthHeader
            title="Get Started Now"
            subtitle="Enter your credentials to access your account"
          />
          <Suspense fallback={<div className="py-8 text-center subtext">Loading...</div>}>
            <TemplateFlowCapture />
            <SignInFields />
          </Suspense>
        </AuthFormPanel>
        <AuthMarketingSlider />
      </AuthSplitCard>
    </AuthCredentialsLayout>
  );
}
