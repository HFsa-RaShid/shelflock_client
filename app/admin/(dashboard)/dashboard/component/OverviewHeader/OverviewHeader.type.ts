import type { DashboardOverviewData } from "@/app/dashboard/mock-data";

/** তারিখ রেঞ্জ অপশন — এক্সপোর্ট ও ফিল্টারে ব্যবহার */
export interface DateRangeOption {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
}

/** হেডার স্টোর তথ্য */
export interface DashboardStoreInfo {
  name: string;
  initial: string;
  dateRangeLabel: string;
  dateRanges: DateRangeOption[];
}

/** ওভারভিউ হেডার সেকশনের ডেটা */
export interface DashboardHeaderData {
  overviewTitle: string;
  overviewSubtitle: string;
  store: DashboardStoreInfo;
}

export interface OverviewHeaderProps {
  data: DashboardHeaderData;
  /** এক্সপোর্ট ক্লিকে নির্বাচিত তারিখের পুরো ওভারভিউ ডাউনলোড */
  overviewData: DashboardOverviewData;
}
