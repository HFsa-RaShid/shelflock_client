import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  AUTH_TOKEN_KEY,
  MERCHANT_HAS_STORES_KEY,
  ONBOARDING_NEXT_STEP_KEY,
} from "@/lib/auth-constants";
import { pathForOnboardingStep } from "@/lib/onboarding-access";

export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_TOKEN_KEY)?.value;
}

function getOnboardingFromCookies(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  const hasStores = cookieStore.get(MERCHANT_HAS_STORES_KEY)?.value === "1";
  const onboardingNextStep = cookieStore.get(ONBOARDING_NEXT_STEP_KEY)?.value;
  return { hasStores, onboardingNextStep };
}

/** Redirects to sign-in when the session cookie is missing. */
export async function requireAuth(redirectPath = "/dashboard"): Promise<string> {
  const token = await getAccessToken();
  if (!token) {
    redirect(`/signin?redirect=${encodeURIComponent(redirectPath)}`);
  }
  return token;
}

/** Dashboard only when store setup is complete (merchant has at least one store). */
export async function requireDashboardAccess(
  redirectPath = "/dashboard",
): Promise<void> {
  await requireAuth(redirectPath);

  const cookieStore = await cookies();
  const { hasStores, onboardingNextStep } = getOnboardingFromCookies(cookieStore);

  if (!hasStores) {
    redirect(pathForOnboardingStep(onboardingNextStep));
  }
}
