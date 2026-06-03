/** স্ট্যাট কার্ডের ট্রেন্ড রঙের ধরন */
export type StatTrendVariant = "positive" | "warning" | "neutral";

/** একটি স্ট্যাট কার্ড */
export interface DashboardStatCard {
  id: string;
  title: string;
  value: string;
  trendLabel: string;
  trendVariant: StatTrendVariant;
}

export interface StatsCardsSectionProps {
  overviewTitle: string;
  overviewSubtitle: string;
  stats: DashboardStatCard[];
}
