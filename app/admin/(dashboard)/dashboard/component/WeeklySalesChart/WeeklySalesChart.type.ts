/** সাপ্তাহিক বিক্রয় চার্টের এক দিন — তারিখ backend থেকে */
export interface WeeklySalesDayPoint {
  dayLabel: string;
  dateLabel: string;
  value: number;
  isHighlighted?: boolean;
  tooltipValue?: number;
  tooltipDate?: string;
}

/** সাপ্তাহিক বিক্রয় চার্ট ডেটা */
export interface WeeklySalesChartData {
  title: string;
  salesSummaryLabel: string;
  totalAmount: string;
  changePercent: number;
  changeLabel: string;
  highestLabel: string;
  highestAmount: string;
  highestDateShort: string;
  lowestLabel: string;
  lowestAmount: string;
  lowestDateShort: string;
  yAxisLabels: string[];
  days: WeeklySalesDayPoint[];
}

export interface WeeklySalesChartProps {
  data: WeeklySalesChartData;
}
