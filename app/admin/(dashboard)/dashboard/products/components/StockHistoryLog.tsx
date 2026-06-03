import stockLogs from '../data/stock-logs.json';

export default function StockHistoryLog() {
  return (
    <div className="border border-[#E5E7EB] p-5 rounded-2xl bg-white shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Card Header Section */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="body-medium primary-text">Stock History Log</h3>
            <p className="body-xsm-regular subtext mt-0.5">View all inventory activities and changes</p>
          </div>
          
          {/* Custom Styled View All Link Button with Orange Arrow */}
          <button className="text-xs text-[#E05613] font-bold hover:text-[#C84B0F] transition flex items-center space-x-1">
            <span>View All</span>
            <span className="text-sm font-medium relative top-[-0.5px]">➔</span>
          </button>
        </div>

        {/* List Log Rows - Design matching the inner light divider layout */}
        <div className="divide-y divide-[#F3F4F6]">
          {stockLogs.stock_history_log.map((log) => {
            // Checking if the item is stock-out or restocked to match colored icons
            const isOutOfStock = log.title.toLowerCase().includes('out of stock');
            
            return (
              <div key={log.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 transition-colors duration-150">
                <div className="flex items-center space-x-3.5">
                  {/* Circular Dynamic Badge Pill */}
                  <div className={`w-6 h-6 text-white rounded-full flex items-center justify-center text-xs font-bold select-none ${
                    isOutOfStock ? ' bg-red-500' : ' bg-green-600'
                  }`}>
                    {isOutOfStock ? '−' : '+'}
                  </div>
                  
                  <div>
                    <h4 className="body-sm-medium primary-text">{log.title}</h4>
                    <p className="body-xsm-regular subtext mt-0.5">{log.responsible_party}</p>
                  </div>
                </div>
                
                {/* Timestamp align perfectly on the right row edge */}
                <span className="text-[10px] text-[#9CA3AF] font-medium text-right whitespace-nowrap pl-4">
                  {log.time_stamp}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}