/** কুইক অ্যাকশন কার্ড */
export interface DashboardQuickAction {
  id: string;
  title: string;
  description: string;
  href: string;
}

export interface QuickActionsGridProps {
  actions: DashboardQuickAction[];
}
