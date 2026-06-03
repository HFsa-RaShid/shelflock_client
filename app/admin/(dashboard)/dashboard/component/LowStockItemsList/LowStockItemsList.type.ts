/** লো স্টক আইটেম */
export interface DashboardLowStockItem {
  id: string;
  name: string;
  price: number;
  sku: string;
  stockLeft: number;
  image: string;
}

export interface LowStockItemsListProps {
  items: DashboardLowStockItem[];
}
