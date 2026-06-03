import {
  DASHBOARD_ROUTES,
  ONBOARDING_ROUTES,
  STORE_SELECTION_ROUTES,
} from "@/lib/constants";
import type {
  MerchantLoginData,
  MerchantOnboarding,
  MerchantRefreshData,
  OnboardingNextStep,
} from "@/services/types/merchant-auth.types";

export type SessionLike = Pick<
  MerchantLoginData | MerchantRefreshData,
  "hasStores" | "skipToStoreSelection" | "onboarding"
>;

export function canAccessDashboard(
  session: Partial<SessionLike> & { onboarding?: MerchantOnboarding },
): boolean {
  if (session.hasStores || session.skipToStoreSelection) {
    return true;
  }
  return (session.onboarding?.storesCount ?? 0) > 0;
}

/** Store picker after business profile (or when merchant already has stores). */
export function canAccessStoreSelection(
  session: Partial<SessionLike> & { onboarding?: MerchantOnboarding },
  onboardingNextStep?: OnboardingNextStep | string | null,
): boolean {
  if (canAccessDashboard(session)) {
    return true;
  }
  const step = onboardingNextStep ?? session.onboarding?.nextStep;
  return step === "select_store";
}

export function pathForOnboardingStep(step?: OnboardingNextStep | string | null): string {
  switch (step) {
    case "choose_role":
    case "join_workplace":
      return ONBOARDING_ROUTES.chooseRole;
    case "business_profile":
      return ONBOARDING_ROUTES.setupBusiness;
    case "select_store":
      return STORE_SELECTION_ROUTES.home;
    default:
      return ONBOARDING_ROUTES.chooseRole;
  }
}

export function resolveOnboardingPath(onboarding: MerchantOnboarding): string {
  if (canAccessStoreSelection({ onboarding })) {
    return STORE_SELECTION_ROUTES.home;
  }

  return pathForOnboardingStep(onboarding.nextStep);
}

export function resolvePostLoginPath(session: SessionLike): string {
  if (canAccessStoreSelection(session)) {
    return STORE_SELECTION_ROUTES.home;
  }

  return resolveOnboardingPath(session.onboarding);
}

export function onboardingSnapshot(session: SessionLike): {
  hasStores: boolean;
  onboardingNextStep: OnboardingNextStep;
} {
  return {
    hasStores: canAccessDashboard(session),
    onboardingNextStep: session.onboarding?.nextStep ?? "choose_role",
  };
}
