import type { DashboardHeaderData } from "./component/OverviewHeader/OverviewHeader.type";
import type { DashboardStatCard } from "./component/StatsCardsSection/StatsCardsSection.type";
import type { DashboardRecentOrder } from "./component/RecentOrdersTable/RecentOrdersTable.type";
import type { DashboardTopProduct } from "./component/TopProductsList/TopProductsList.type";
import type { DashboardLowStockItem } from "./component/LowStockItemsList/LowStockItemsList.type";
import type { WeeklySalesChartData } from "./component/WeeklySalesChart/WeeklySalesChart.type";
import type { LeadSourcesChartData } from "./component/LeadSourcesChart/LeadSourcesChart.type";
import type { DashboardQuickAction } from "./component/QuickActionsGrid/QuickActionsGrid.type";

export interface DashboardOverviewData {
  header: DashboardHeaderData;
  stats: DashboardStatCard[];
  recentOrders: DashboardRecentOrder[];
  topProducts: DashboardTopProduct[];
  lowStockItems: DashboardLowStockItem[];
  weeklySales: WeeklySalesChartData;
  leadSources: LeadSourcesChartData;
  quickActions: DashboardQuickAction[];
}

const sharedHeader: DashboardHeaderData = {
  overviewTitle: "Overview",
  overviewSubtitle: "Track sales, orders, and store performance at a glance.",
  store: {
    name: "My Store",
    initial: "M",
    dateRangeLabel: "This Month",
    dateRanges: [
      {
        id: "today",
        label: "Today",
        startDate: "2026-05-24",
        endDate: "2026-05-24",
      },
      {
        id: "week",
        label: "This Week",
        startDate: "2026-05-18",
        endDate: "2026-05-24",
      },
      {
        id: "month",
        label: "This Month",
        startDate: "2026-05-01",
        endDate: "2026-05-31",
      },
    ],
  },
};

export const dashboardMockData: DashboardOverviewData = {
  header: sharedHeader,
  stats: [
    {
      id: "revenue",
      title: "Total Revenue",
      value: "৳1,24,580",
      trendLabel: "+12.5% from last month",
      trendVariant: "positive",
    },
    {
      id: "orders",
      title: "Total Orders",
      value: "356",
      trendLabel: "+8.2% from last month",
      trendVariant: "positive",
    },
    {
      id: "customers",
      title: "New Customers",
      value: "48",
      trendLabel: "+3.1% from last month",
      trendVariant: "positive",
    },
    {
      id: "conversion",
      title: "Conversion Rate",
      value: "3.8%",
      trendLabel: "-0.4% from last month",
      trendVariant: "warning",
    },
  ],
  recentOrders: [
    {
      id: "1",
      productName: "Premium Cotton T-Shirt",
      productImage: "/store-selection/dashboard banner store.jpg",
      price: 1290,
      status: "Done",
    },
    {
      id: "2",
      productName: "Wireless Earbuds Pro",
      productImage: "/store-selection/dashboard banner store.jpg",
      price: 3490,
      status: "Pending",
      isHighlighted: true,
    },
    {
      id: "3",
      productName: "Leather Wallet",
      productImage: "/store-selection/dashboard banner store.jpg",
      price: 890,
      status: "Done",
    },
    {
      id: "4",
      productName: "Smart Watch Band",
      productImage: "/store-selection/dashboard banner store.jpg",
      price: 650,
      status: "Rejected",
    },
  ],
  topProducts: [
    {
      id: "p1",
      category: "Fashion",
      name: "Premium Cotton T-Shirt",
      price: 1290,
      variantLabel: "Black / M",
      colorHex: "#0E2038",
      image: "/store-selection/dashboard banner store.jpg",
    },
    {
      id: "p2",
      category: "Electronics",
      name: "Wireless Earbuds Pro",
      price: 3490,
      variantLabel: "White",
      colorHex: "#F74608",
      image: "/store-selection/dashboard banner store.jpg",
    },
    {
      id: "p3",
      category: "Accessories",
      name: "Leather Wallet",
      price: 890,
      variantLabel: "Brown",
      colorHex: "#8B5E3C",
      image: "/store-selection/dashboard banner store.jpg",
    },
  ],
  lowStockItems: [
    {
      id: "s1",
      name: "Running Shoes",
      price: 4200,
      sku: "SKU-1024",
      stockLeft: 3,
      image: "/store-selection/dashboard banner store.jpg",
    },
    {
      id: "s2",
      name: "Canvas Backpack",
      price: 2100,
      sku: "SKU-2048",
      stockLeft: 5,
      image: "/store-selection/dashboard banner store.jpg",
    },
  ],
  weeklySales: {
    title: "Weekly Sales",
    salesSummaryLabel: "Total Sales",
    totalAmount: "৳84,320",
    changePercent: 14.2,
    changeLabel: "vs last week",
    highestLabel: "Highest",
    highestAmount: "৳18,450",
    highestDateShort: "Wed",
    lowestLabel: "Lowest",
    lowestAmount: "৳6,120",
    lowestDateShort: "Sun",
    yAxisLabels: ["20k", "15k", "10k", "5k", "0"],
    days: [
      { dayLabel: "Mon", dateLabel: "19 May", value: 42 },
      { dayLabel: "Tue", dateLabel: "20 May", value: 58 },
      { dayLabel: "Wed", dateLabel: "21 May", value: 92, isHighlighted: true, tooltipValue: 18450, tooltipDate: "21 May" },
      { dayLabel: "Thu", dateLabel: "22 May", value: 71 },
      { dayLabel: "Fri", dateLabel: "23 May", value: 65 },
      { dayLabel: "Sat", dateLabel: "24 May", value: 48 },
      { dayLabel: "Sun", dateLabel: "25 May", value: 31 },
    ],
  },
  leadSources: {
    title: "Lead Sources",
    totalLeads: 1240,
    totalLabel: "Total Leads",
    sources: [
      { id: "fb", label: "Facebook", count: 420, color: "#1877F2", trackColor: "#E8F0FE", percentage: 34 },
      { id: "ig", label: "Instagram", count: 310, color: "#E1306C", trackColor: "#FCE8F0", percentage: 25 },
      { id: "direct", label: "Direct", count: 280, color: "#F74608", trackColor: "#FFF3E8", percentage: 23 },
      { id: "google", label: "Google", count: 230, color: "#34A853", trackColor: "#E8F6EC", percentage: 18 },
    ],
  },
  quickActions: [
    {
      id: "add-product",
      title: "Add Product",
      description: "Create a new product listing",
      href: "/dashboard/products",
    },
    {
      id: "view-orders",
      title: "View Orders",
      description: "Manage pending and completed orders",
      href: "/dashboard/orders",
    },
    {
      id: "analytics",
      title: "View Analytics",
      description: "Track performance and growth",
      href: "/dashboard/analytics",
    },
  ],
};

export const emptyDashboardMockData: DashboardOverviewData = {
  ...dashboardMockData,
  header: {
    ...sharedHeader,
    overviewSubtitle:
      "Monitor your sales, orders, customers, and overall store performance.",
  },
  stats: [
    {
      id: "today-sales",
      title: "Today's Sales",
      value: "0",
      trendLabel: "",
      trendVariant: "neutral",
    },
    {
      id: "total-orders",
      title: "Total Orders",
      value: "0",
      trendLabel: "",
      trendVariant: "neutral",
    },
    {
      id: "customer",
      title: "Customer",
      value: "0",
      trendLabel: "",
      trendVariant: "neutral",
    },
    {
      id: "total-product",
      title: "Total Product",
      value: "0",
      trendLabel: "",
      trendVariant: "neutral",
    },
    {
      id: "total-revenue",
      title: "Total Revenue",
      value: "0",
      trendLabel: "",
      trendVariant: "neutral",
    },
  ],
  recentOrders: [],
  topProducts: [],
  lowStockItems: [],
  quickActions: [],
  weeklySales: {
    ...dashboardMockData.weeklySales,
    totalAmount: "৳0",
    changePercent: 0,
    days: dashboardMockData.weeklySales.days.map((day) => ({ ...day, value: 0 })),
  },
  leadSources: {
    ...dashboardMockData.leadSources,
    totalLeads: 0,
    sources: dashboardMockData.leadSources.sources.map((source) => ({
      ...source,
      count: 0,
      percentage: 0,
    })),
  },
};
