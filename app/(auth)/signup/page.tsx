import { Suspense } from "react";

import AuthHeader from "@/components/features/auth/auth-header";
import AuthCredentialsLayout from "@/components/features/auth/layout/auth-credentials-layout";
import AuthFormPanel from "@/components/features/auth/layout/auth-form-panel";
import AuthSplitCard from "@/components/features/auth/layout/auth-split-card";
import SignUpFields from "@/components/features/auth/signup-fields";
import TemplateFlowCapture from "@/components/features/auth/template-flow-capture";
import AuthMarketingSlider from "@/components/features/auth/ui/auth-marketing-slider";

export default function SignUpPage() {
  return (
    <AuthCredentialsLayout>
      <AuthSplitCard className="max-w-[1280px] lg:h-[825px]">
        <AuthFormPanel>
          <AuthHeader
            title="Get Started Now"
            subtitle="Enter your credentials to access your account"
          />
          <Suspense fallback={<div className="py-8 text-center subtext">Loading...</div>}>
            <TemplateFlowCapture />
            <SignUpFields />
          </Suspense>
        </AuthFormPanel>
        <AuthMarketingSlider />
      </AuthSplitCard>
    </AuthCredentialsLayout>
  );
}
