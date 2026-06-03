export const PENDING_TEMPLATE_ID_KEY = "pending_template_id";
export const PENDING_TEMPLATE_SLUG_KEY = "pending_template_slug";

export const TEMPLATE_FLOW_ROUTES = {
  subscribe: "/subscribe",
  createStore: "/create-store",
  storeTemplates: "/store-templates",
} as const;

export function savePendingTemplate(params: {
  templateId?: string | null;
  templateSlug?: string | null;
}) {
  if (typeof window === "undefined") return;
  if (params.templateId) {
    sessionStorage.setItem(PENDING_TEMPLATE_ID_KEY, params.templateId);
  }
  if (params.templateSlug) {
    sessionStorage.setItem(PENDING_TEMPLATE_SLUG_KEY, params.templateSlug);
  }
}

export function getPendingTemplateId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(PENDING_TEMPLATE_ID_KEY);
}

export function getPendingTemplateSlug(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(PENDING_TEMPLATE_SLUG_KEY);
}

export function clearPendingTemplate() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PENDING_TEMPLATE_ID_KEY);
  sessionStorage.removeItem(PENDING_TEMPLATE_SLUG_KEY);
}

export function captureTemplateFromSearchParams(
  searchParams: URLSearchParams,
): void {
  const templateId = searchParams.get("templateId");
  const templateSlug = searchParams.get("templateSlug");
  if (templateId || templateSlug) {
    savePendingTemplate({ templateId, templateSlug });
  }
}

export function buildTemplateQuery(params: {
  templateId?: string | null;
  templateSlug?: string | null;
}): string {
  const search = new URLSearchParams();
  if (params.templateId) search.set("templateId", params.templateId);
  if (params.templateSlug) search.set("templateSlug", params.templateSlug);
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export function buildSubscribeUrl(params: {
  templateId?: string | null;
  templateSlug?: string | null;
}): string {
  return `${TEMPLATE_FLOW_ROUTES.subscribe}${buildTemplateQuery(params)}`;
}

export function buildCreateStoreUrl(params: {
  templateId?: string | null;
  templateSlug?: string | null;
}): string {
  return `${TEMPLATE_FLOW_ROUTES.createStore}${buildTemplateQuery(params)}`;
}

export function buildChooseRoleUrl(params: {
  templateId?: string | null;
  templateSlug?: string | null;
}): string {
  return `/choose-role${buildTemplateQuery(params)}`;
}

export function buildPathWithTemplate(
  path: string,
  templateId?: string | null,
  templateSlug?: string | null,
): string {
  const qs = buildTemplateQuery({ templateId, templateSlug });
  return qs ? `${path}${qs}` : path;
}

export function buildSubscribePaymentUrl(params: {
  planId: string;
  billingCycle: "monthly" | "yearly";
  templateId?: string | null;
  templateSlug?: string | null;
}): string {
  const search = new URLSearchParams();
  search.set("planId", params.planId);
  search.set("billingCycle", params.billingCycle);
  if (params.templateId) search.set("templateId", params.templateId);
  if (params.templateSlug) search.set("templateSlug", params.templateSlug);
  return `/subscribe/payment?${search.toString()}`;
}
