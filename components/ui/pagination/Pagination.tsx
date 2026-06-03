'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setPage: (page: number) => void;
  setItemsPerPage: (num: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  setPage,
  setItemsPerPage,
}: PaginationProps) {
  return (
    <div className="flex justify-between items-center mt-5 text-xs text-[#6B7280]">
      {/* Items Per Page Selector */}
      <div className="flex items-center space-x-2">
        <span>Show</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setPage(1);
          }}
          className="border border-[#E5E7EB] rounded-lg px-2 py-1 bg-white font-medium outline-none text-[#111827] cursor-pointer"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <span>Per Page</span>
      </div>

      {/* Page Buttons */}
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => setPage(Math.max(currentPage - 1, 1))}
          className="p-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-40 disabled:hover:bg-transparent transition"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Numbered Page Buttons */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`w-7 h-7 flex items-center justify-center rounded-lg border font-semibold transition-all ${
              currentPage === page
                ? 'adsfixter-primary text-white' // আপনার কাস্টম ক্লাসটি এখানে ঠিক রাখা হলো
                : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F9FAFB]'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
          className="p-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-40 disabled:hover:bg-transparent transition"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}