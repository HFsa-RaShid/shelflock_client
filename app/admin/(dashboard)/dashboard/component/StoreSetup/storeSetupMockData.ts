import type { StoreSetupStatus } from "./StoreSetup.type";

/**
 * Mock store setup data — Figma অনুযায়ী
 * Backend API ready হলে `app/api/dashboard/setup-status/route.ts` replace করবেন
 */
export const storeSetupMockData: StoreSetupStatus = {
  // TODO: backend — user signup পর true; setup complete হলে false
  isFirstTimeUser: true,
  isSetupComplete: false,
  // TODO: backend — user skip করলে true persist করবে
  hasSkippedSetup: false,
  completedSteps: 3,
  totalSteps: 7,
  completionPercentage: 45,
  estimatedMinutesLeft: 6,
  title: "Complete your Store Setup!",
  subtitle:
    "Finish your setup to unlock all feature and start growing your business",
  steps: [
    {
      id: "create-store",
      stepNumber: 1,
      title: "Create Your Store",
      description: "Add your business information and store details",
      status: "completed",
      iconKey: "store",
    },
    {
      id: "upload-logo",
      stepNumber: 2,
      title: "Upload Store Logo",
      description: "Make your brand look professional and trustworthy",
      status: "completed",
      actionLabel: "Add Logo",
      actionHref: "/setup-business",
      iconKey: "image",
    },
    {
      id: "add-product",
      stepNumber: 3,
      title: "Add Your First Product",
      description: "Start selling by adding your first product",
      status: "completed",
      actionLabel: "Add Product",
      actionHref: "/dashboard/products",
      iconKey: "package",
    },
    {
      id: "setup-payment",
      stepNumber: 4,
      title: "Configure Payment Methods",
      description: "Enable secure payment options for customers",
      status: "pending",
      actionLabel: "Setup Payment",
      actionHref: "/setup-business",
      iconKey: "wallet",
    },
    {
      id: "setup-delivery",
      stepNumber: 5,
      title: "Setup Delivery & Shipping",
      description: "Configure delivery zones and shipping rates",
      status: "pending",
      actionLabel: "Setup Delivery",
      actionHref: "/setup-business",
      iconKey: "truck",
    },
    {
      id: "store-theme",
      stepNumber: 6,
      title: "Customize Your Store Theme",
      description: "Choose colors and layout for your storefront",
      status: "pending",
      actionLabel: "Set store theme",
      actionHref: "/setup-business",
      iconKey: "palette",
    },
    {
      id: "connect-tools",
      stepNumber: 7,
      title: "Connect Business Tools",
      description: "Integrate analytics, marketing and automation tools",
      status: "pending",
      actionLabel: "Connect tools",
      actionHref: "/setup-business",
      iconKey: "wrench",
    },
  ],
  recommendedStep: {
    id: "upload-logo",
    title: "Upload Store Logo",
    description: "Make your brand look professional and trustworthy.",
    actionLabel: "Add Logo",
    actionHref: "/setup-business",
    iconKey: "image",
  },
  benefits: [
    { id: "b1", label: "Unlock all the platform feature" },
    { id: "b2", label: "Improve store credibility" },
    { id: "b3", label: "Start receiving orders" },
    { id: "b4", label: "Grow your business" },
  ],
  rewards: [
    { id: "r1", label: "Advance analytics", iconKey: "chart" },
    { id: "r2", label: "Automation workflows", iconKey: "workflow" },
    { id: "r3", label: "Premium templates", iconKey: "template" },
    { id: "r4", label: "Priority support", iconKey: "support" },
  ],
  encouragementText: "Almost there! You're doing great.",
};
