import type { MerchantLoginData } from "@/services/types/merchant-auth.types";
import {
  buildChooseRoleUrl,
  buildCreateStoreUrl,
  buildPathWithTemplate,
  buildSubscribeUrl,
  getPendingTemplateId,
  getPendingTemplateSlug,
} from "@/lib/template-flow";
import { resolvePostLoginPath } from "@/lib/onboarding-access";

function getTemplateParams(templateId?: string | null) {
  const id = templateId ?? getPendingTemplateId();
  const slug = getPendingTemplateSlug();
  return { templateId: id, templateSlug: slug };
}

export function resolveTemplateFlowDestination(
  session: MerchantLoginData,
  templateId?: string | null,
): string | null {
  const params = getTemplateParams(templateId);
  if (!params.templateId && !params.templateSlug) return null;

  if (session.onboarding.platformRole === "unset") {
    return buildChooseRoleUrl(params);
  }

  if (!session.hasActiveSubscription) {
    return buildSubscribeUrl(params);
  }

  if (!session.hasStores) {
    return buildCreateStoreUrl(params);
  }

  return buildPathWithTemplate("/store-selection", params.templateId, params.templateSlug);
}

export function resolveAuthDestination(
  session: MerchantLoginData,
  redirect?: string | null,
): string {
  const templateDestination = resolveTemplateFlowDestination(session);
  if (templateDestination) return templateDestination;

  if (
    redirect &&
    redirect.startsWith("/") &&
    !redirect.startsWith("//")
  ) {
    return redirect;
  }

  return resolvePostLoginPath(session);
}
