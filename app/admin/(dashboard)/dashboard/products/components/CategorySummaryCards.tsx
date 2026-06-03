'use client';

// এপিআই থেকে যে ডেটা আসবে তার টাইপ ডেফিনিশন
interface CategorySummary {
  label: string;
  value: number;
  subtext: string;
}

interface CategoryOverviewData {
  total_categories: CategorySummary;
  active_categories: CategorySummary;
  inactive_categories: CategorySummary;
  total_subcategories: CategorySummary;
}

interface CategorySummaryCardsProps {
  data?: CategoryOverviewData; 
  isLoading?: boolean;
}

export default function CategorySummaryCards({ data, isLoading }: CategorySummaryCardsProps) {
  
 
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="border border-[#E5E7EB] rounded-2xl p-4 bg-white h-27 animate-pulse">
            <div className="w-24 h-4 bg-gray-200 rounded mb-4"></div>
            <div className="w-12 h-6 bg-gray-200 rounded mb-2"></div>
            <div className="w-20 h-3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }


  const summary = data || {
    total_categories: { label: 'Total Categories', value: 32, subtext: 'All categories' },
    active_categories: { label: 'Active Categories', value: 24, subtext: 'Active categories' },
    inactive_categories: { label: 'Inactive Categories', value: 8, subtext: 'Inactive categories' },
    total_subcategories: { label: 'Total Subcategories', value: 128, subtext: 'Total subcategories' },
  };

  const cards = [
    { ...summary.total_categories, bg: 'bg-[#EEF2F6]', iconColor: 'text-blue-500' },
    { ...summary.active_categories, bg: 'bg-[#EBF7EE]', iconColor: 'text-green-500' },
    { ...summary.inactive_categories, bg: 'bg-[#FDF2F2]', iconColor: 'text-red-500' },
    { ...summary.total_subcategories, bg: 'bg-[#FFF4EC]', iconColor: 'text-orange-500' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div 
          key={idx} 
          className="border border-[#E5E7EB] rounded-2xl p-4 bg-white shadow-sm flex flex-col justify-between transition hover:shadow-md"
        >
          {/* Top Section: Icon & Label */}
          <div className="flex items-center space-x-2 text-xs text-[#6B7280] font-medium">
            <div className={`p-1.5 rounded-lg ${card.bg} w-7 h-7 flex items-center justify-center`}>
              <svg className={`w-4 h-4 ${card.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span className="body-regular subtext">{card.label}</span>
          </div>

          {/* Bottom Section: Value & Subtext */}
          <div className="mt-4">
            <h3 className="primary-text h6-bold">
              {card.value}
            </h3>
            <p className="body-sm-regular subtext mt-2.5">
              {card.subtext}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}