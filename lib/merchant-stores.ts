import type { MerchantStoreSummary } from "@/services/types/merchant-auth.types";

export function normalizeMerchantStoreSummary(
  raw: unknown,
): MerchantStoreSummary | null {
  if (!raw || typeof raw !== "object") return null;

  const record = raw as Record<string, unknown>;
  const id = record.id ?? record._id;
  const name = record.name;
  const subdomain = record.subdomain;

  if (!id || typeof name !== "string" || typeof subdomain !== "string") {
    return null;
  }

  return {
    id: String(id),
    name,
    subdomain,
    templateId:
      record.templateId != null ? String(record.templateId) : undefined,
    templateName:
      typeof record.templateName === "string" ? record.templateName : undefined,
    templateSlug:
      typeof record.templateSlug === "string" ? record.templateSlug : undefined,
  };
}

export function normalizeMerchantStores(raw: unknown): MerchantStoreSummary[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map(normalizeMerchantStoreSummary)
    .filter((store): store is MerchantStoreSummary => store !== null);
}
