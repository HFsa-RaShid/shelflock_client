import CustomerOverview from "./_component/CustomerOverview";
import CustomerTableSection from "./_component/CustomerTableSection";

const initialCustomers = [
  { id: "1", name: "Monirul Islam", phone: "01300000000", payment: "COD", orders: 23, lastOrder: "Today", spend: 339.0, area: "Dhaka", type: "New", email: "begum@gmail.com", regDate: "15 May 2024" },
  { id: "2", name: "Abdullah Al Nur", phone: "01700000000", payment: "Bkash", orders: 12, lastOrder: "Today", spend: 339.0, area: "Barishal", type: "New", email: "alnur.barishal@gmail.com", regDate: "20 May 2026" },
  { id: "3", name: "Abdullah Al Nur", phone: "01700000000", payment: "Nagad", orders: 12, lastOrder: "Today", spend: 339.0, area: "Chittagong", type: "Large order", email: "alnur.chi@gmail.com", regDate: "12 Jan 2025" },
  { id: "4", name: "Abdullah Al Nur", phone: "01700000000", payment: "COD", orders: 12, lastOrder: "Today", spend: 339.0, area: "Barishal", type: "Repeated", email: "alnur.rep@gmail.com", regDate: "05 Feb 2026" },
  { id: "5", name: "Abdullah Al Nur", phone: "01700000000", payment: "Bkash", orders: 12, lastOrder: "Today", spend: 339.0, area: "Barishal", type: "Large order", email: "alnur.large@gmail.com", regDate: "18 Mar 2026" },
  { id: "6", name: "Abdullah Al Nur", phone: "01700000000", payment: "Bkash", orders: 12, lastOrder: "Today", spend: 339.0, area: "Barishal", type: "New", email: "alnur.rock@gmail.com", regDate: "24 May 2026" },
  { id: "7", name: "Abdullah Al Nur", phone: "01700000000", payment: "Nagad", orders: 12, lastOrder: "Today", spend: 339.0, area: "Barishal", type: "Repeated", email: "alnur.b2@gmail.com", regDate: "01 May 2026" },
];

export default function CustomerDashboardPage() {
  return (
    <div className="w-full mx-auto px-4 md:px-0 gap-6 flex flex-col pb-12 select-none">
      {/* Overview Card Component */}
      <CustomerOverview />
      
      {/* table data - এখন আর কোনো এরর আসবে না */}
      <CustomerTableSection customers={initialCustomers} />
    </div>
  );
}