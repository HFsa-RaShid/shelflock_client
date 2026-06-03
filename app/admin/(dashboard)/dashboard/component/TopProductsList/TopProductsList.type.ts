/** টপ প্রোডাক্ট লিস্টের একটি আইটেম */
export interface DashboardTopProduct {
  id: string;
  category: string;
  name: string;
  price: number;
  variantLabel: string;
  colorHex: string;
  image: string;
}

export interface TopProductsListProps {
  products: DashboardTopProduct[];
}
