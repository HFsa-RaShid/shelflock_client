import overviewData from '../data/overview-counters.json';

export default function SummaryCards() {
  const cards = [
    { ...overviewData.summary.total_sku, bg: 'bg-[#EEF2F6]', iconColor: 'text-blue-500' },
    { ...overviewData.summary.active_product, bg: 'bg-[#EBF7EE]', iconColor: 'text-green-500' },
    { ...overviewData.summary.low_stock, bg: 'bg-[#FFF4EC]', iconColor: 'text-orange-500' },
    { ...overviewData.summary.out_of_stock, bg: 'bg-[#FDF2F2]', iconColor: 'text-red-500' },
    { ...overviewData.summary.in_stock, bg: 'bg-[#F3E8FF]', iconColor: 'text-purple-500' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
          <div className="flex items-center space-x-2 text-xs text-[#6B7280] font-medium">
            <div className={`p-1.5 rounded-lg ${card.bg} w-7 h-7 flex items-center justify-center`}>
              <svg className={`w-4 h-4 ${card.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span className="body-regular subtext">{card.label}</span>
          </div>
          <div className="h6-bold primary-text mt-3">{card.value}</div>
          <div className="body-sm-regular subtext mt-0.5">{card.subtext}</div>
        </div>
      ))}
    </div>
  );
}