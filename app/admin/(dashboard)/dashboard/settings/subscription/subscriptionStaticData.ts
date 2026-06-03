import type { SubscriptionPageData } from "./subscription.types";

export const SUBSCRIPTION_STATIC_DATA: SubscriptionPageData = {
  currentPlan: {
    tier: "growth",
    name: "Growth Plan",
    isActive: true,
    nextBillingDate: "16 June 2026",
    priceLabel: "৳2,499",
    cycleLabel: "/ month",
    features: ["3 Stores", "3 team members", "1,500 order", "Unlimited product"],
  },
  usage: [
    {
      label: "Stores",
      used: 2,
      limit: 3,
      displayValue: "2/3",
      helperText: "You can add 1 more store",
      barColor: "orange",
    },
    {
      label: "Products",
      used: 360,
      limit: "unlimited",
      displayValue: "360 / Unlimited",
      helperText: "Unlimited",
      barColor: "green",
    },
    {
      label: "Team Members",
      used: 1,
      limit: 3,
      displayValue: "1 / 3",
      helperText: "You can add 1 more store",
      barColor: "orange",
    },
  ],
  renewal: {
    autoRenewEnabled: true,
    accessUntilDate: "June 16",
  },
  plans: [
    {
      id: "starter",
      name: "Starter",
      description: "For solo builders and early teams.",
      monthlyPrice: 999,
      yearlyPrice: 9999,
      features: [
        { text: "2 Stores" },
        { text: "1,500 Orders/month" },
        { text: "3 User" },
        { text: "Basic Analytical Dashboard" },
      ],
      action: "downgrade",
    },
    {
      id: "growth",
      name: "Growth",
      description: "For teams with more control.",
      monthlyPrice: 2499,
      yearlyPrice: 24999,
      features: [
        { text: "4 Stores" },
        { text: "3,000 Orders/month" },
        { text: "5 User" },
        { text: "Upgrade Analytical Dashboard" },
      ],
      action: "current",
      isPopular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For scaling teams and advanced needs.",
      monthlyPrice: 9999,
      yearlyPrice: 99999,
      features: [
        { text: "8 Stores" },
        { text: "5,000 Orders/month" },
        { text: "8 User" },
        { text: "Advance Analytical Dashboard" },
      ],
      action: "upgrade",
    },
  ],
};
