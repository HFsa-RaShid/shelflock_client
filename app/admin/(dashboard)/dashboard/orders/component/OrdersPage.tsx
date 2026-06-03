import OrdersSummarySection from "./OrdersSummarySection";
import OrdersTableSection from "./OrdersTableSection";
import { ORDERS_STATIC_DATA } from "./ordersStaticData";

const layoutClass =
  "flex w-full flex-col items-stretch gap-4 min-w-0 sm:gap-5 lg:gap-6";

export default function OrdersPage() {
  return (
    <div className={layoutClass}>
      <OrdersSummarySection summary={ORDERS_STATIC_DATA.summary} />
      <OrdersTableSection orders={ORDERS_STATIC_DATA.orders} />
    </div>
  );
}
