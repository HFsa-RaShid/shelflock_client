import Link from "next/link";
import { Info } from "lucide-react";
import type { TopProductsListProps } from "./TopProductsList.type";

export default function TopProductsList({ products }: TopProductsListProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E9E9E9] p-4 flex flex-col gap-3 flex-1 min-w-0 w-full h-full">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <h3 className="body-l-medium primary-text leading-[135%]">Top Products</h3>
          <button
            type="button"
            className="subtext hover:primary-text"
            aria-label="More info"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
        <Link
          href="/dashboard/products"
          className="body-sm-medium adsfixter-primary-text underline leading-[135%] align-middle"
        >
          View All
        </Link>
      </div>

      <ul className="flex-1 overflow-y-auto  flex flex-col">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex  items-center gap-3 border-b border-[#E9E9E9] last:border-b-0 py-3"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-12 h-12 rounded-lg object-cover border border-[#E9E9E9] shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="body-sm-regular subtext">{product.category}</p>
              <p className="body-sm-medium primary-text leading-[145%] truncate">
                {product.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="body-sm-medium primary-text font-bold leading-[150%]">
                  ${product.price}
                </p>
                <span className="body-sm-regular subtext">·</span>
                <p className="body-sm-regular subtext">{product.variantLabel}</p>
                <span
                  className="w-3 h-3 rounded-full border border-[#E9E9E9] shrink-0"
                  style={{ backgroundColor: product.colorHex }}
                  title="Variant color"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
