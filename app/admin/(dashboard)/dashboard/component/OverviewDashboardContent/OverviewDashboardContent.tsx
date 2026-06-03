import StatsCardsSection from "../StatsCardsSection/StatsCardsSection";
import RecentOrdersTable from "../RecentOrdersTable/RecentOrdersTable";
import TopProductsList from "../TopProductsList/TopProductsList";
import LowStockItemsList from "../LowStockItemsList/LowStockItemsList";
import WeeklySalesChart from "../WeeklySalesChart/WeeklySalesChart";
import LeadSourcesChart from "../LeadSourcesChart/LeadSourcesChart";
import QuickActionsGrid from "../QuickActionsGrid/QuickActionsGrid";
import type { DashboardOverviewData } from "../../mock-data";

interface OverviewDashboardContentProps {
  data: DashboardOverviewData;
  /** first-time user — quick actions section hide */
  hideQuickActions?: boolean;
}

/**
 * Overview grid — stats + tables + charts
 * First-time empty data ও normal data দুটোতেই reuse
 */
export default function OverviewDashboardContent({
  data,
  hideQuickActions = false,
}: OverviewDashboardContentProps) {
  return (
    <>
      <StatsCardsSection
        overviewTitle={data.header.overviewTitle}
        overviewSubtitle={data.header.overviewSubtitle}
        stats={data.stats}
      />

      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4 sm:mb-6 w-full min-h-[380px]">
        <div className="flex-[1.2] min-w-0 flex">
          <RecentOrdersTable orders={data.recentOrders} />
        </div>
        <div className="flex-1 min-w-0 flex flex-col lg:flex-row gap-4">
          <TopProductsList products={data.topProducts} />
          <LowStockItemsList items={data.lowStockItems} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-2 w-full min-w-0">
        <div className="w-full lg:flex-[4] min-w-0">
          <WeeklySalesChart data={data.weeklySales} />
        </div>
        <div className="w-full lg:flex-[2] min-w-0">
          <LeadSourcesChart data={data.leadSources} />
        </div>
      </div>

      {!hideQuickActions && data.quickActions.length > 0 && (
        <QuickActionsGrid actions={data.quickActions} />
      )}
    </>
  );
}
