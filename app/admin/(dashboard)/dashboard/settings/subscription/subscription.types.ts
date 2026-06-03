export type BillingCycle = "monthly" | "yearly";

export type PlanTier = "starter" | "growth" | "enterprise";

export type PlanAction = "downgrade" | "current" | "upgrade";

export interface CurrentPlan {
  tier: PlanTier;
  name: string;
  isActive: boolean;
  nextBillingDate: string;
  priceLabel: string;
  cycleLabel: string;
  features: string[];
}

export interface UsageMetric {
  label: string;
  used: number;
  limit: number | "unlimited";
  displayValue: string;
  helperText: string;
  barColor: "orange" | "green";
}

export interface RenewalSettings {
  autoRenewEnabled: boolean;
  accessUntilDate: string;
}

export interface PlanFeature {
  text: string;
}

export interface PricingPlan {
  id: PlanTier;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PlanFeature[];
  action: PlanAction;
  isPopular?: boolean;
}

export interface SubscriptionPageData {
  currentPlan: CurrentPlan;
  usage: UsageMetric[];
  renewal: RenewalSettings;
  plans: PricingPlan[];
}
