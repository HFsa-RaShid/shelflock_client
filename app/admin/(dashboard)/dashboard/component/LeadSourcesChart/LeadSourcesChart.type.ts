/** লিড সোর্স — কোন চ্যানেল থেকে ভিজিট */
export interface LeadSourceItem {
  id: string;
  label: string;
  count: number;
  color: string;
  trackColor: string;
  percentage: number;
}

/** ডোনাট চার্ট ডেটা */
export interface LeadSourcesChartData {
  title: string;
  totalLeads: number;
  totalLabel: string;
  sources: LeadSourceItem[];
}

export interface LeadSourcesChartProps {
  data: LeadSourcesChartData;
}
