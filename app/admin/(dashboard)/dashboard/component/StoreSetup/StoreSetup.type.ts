/** স্টোর সেটআপ স্টেপের স্ট্যাটাস — API থেকে আসবে */
export type StoreSetupStepStatus = "completed" | "pending";

/** একটি সেটআপ স্টেপ */
export interface StoreSetupStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  status: StoreSetupStepStatus;
  /** স্টেপ action বাটন — pending স্টেপে দেখাবে */
  actionLabel?: string;
  /** পরবর্তীতে backend route / external URL */
  actionHref?: string;
  /** lucide icon key — UI mapping */
  iconKey: string;
}

/** সেটআপ rewards — sidebar */
export interface StoreSetupReward {
  id: string;
  label: string;
  iconKey: string;
}

/** Why complete setup — sidebar bullet */
export interface StoreSetupBenefit {
  id: string;
  label: string;
}

/** Recommended next step — sidebar */
export interface StoreSetupRecommendedStep {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref?: string;
  iconKey: string;
}

/**
 * API response shape — `/api/dashboard/setup-status`
 * Backend connect করলে শুধু এই interface match করলেই হবে
 */
export interface StoreSetupStatus {
  /** true = নতুন user, overview data empty থাকবে */
  isFirstTimeUser: boolean;
  /** true = সব স্টেপ শেষ — normal dashboard দেখাবে */
  isSetupComplete: boolean;
  /** true = user Skip করেছে — checklist hide, banner + % দেখাবে */
  hasSkippedSetup: boolean;
  completedSteps: number;
  totalSteps: number;
  /** 0–100 */
  completionPercentage: number;
  /** মিনিট — estimated time left */
  estimatedMinutesLeft: number;
  title: string;
  subtitle: string;
  steps: StoreSetupStep[];
  recommendedStep: StoreSetupRecommendedStep;
  benefits: StoreSetupBenefit[];
  rewards: StoreSetupReward[];
  encouragementText: string;
}

export interface StoreSetupSectionProps {
  data: StoreSetupStatus;
  /** full = checklist + sidebar | skipped = শুধু progress banner */
  variant: "full" | "skipped";
  onSkip?: () => void;
  onCompleteSetup?: () => void;
}
