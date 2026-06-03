import Link from "next/link";
import type { LowStockItemsListProps } from "./LowStockItemsList.type";

export default function LowStockItemsList({ items }: LowStockItemsListProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E9E9E9] p-4 flex flex-col gap-3 flex-1 min-w-0 w-full h-full">
      <div className="flex items-center justify-between">
        <h3 className="body-l-medium primary-text leading-[135%]">Low Stock Items</h3>
        <Link
          href="/dashboard/products"
          className="body-sm-medium adsfixter-primary-text underline leading-[135%] align-middle"
        >
          View All
        </Link>
      </div>

      <ul className="flex-1 overflow-y-auto flex flex-col">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 border-b border-[#E9E9E9] last:border-b-0 py-3"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover border border-[#E9E9E9] shrink-0"
              />
              <div className="min-w-0">
                <p className="body-sm-medium primary-text leading-[145%] truncate">
                  {item.name}
                </p>
                <p className="body-sm-medium primary-text font-bold leading-[150%]">
                  ${item.price}
                </p>
                <p className="body-sm-regular subtext">{item.sku}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="body-sm-medium text-[#666D80] leading-[150%] mb-0.5">
                Stock Left
              </p>
              <p className="body-sm-medium font-bold text-[#DF1C41] leading-[150%]">
                {String(item.stockLeft).padStart(2, "0")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
