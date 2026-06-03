export interface AuthSlide {
  id: number;
  title: string;
  desc: string;
  image: string;
}

export const AUTH_SLIDER_SLIDES: AuthSlide[] = [
  {
    id: 1,
    title: "All-in-One eCommerce Platform",
    desc: "Build your online business with Ecomfixter’s powerful tools for products, payments, delivery, customer management, and automation — all from one dashboard.",
    image: "/images/contact/c1.jpg",
  },
  {
    id: 2,
    title: "Grow Your Sales Faster",
    desc: "Build your online business with Ecomfixter’s powerful tools for products, payments, delivery, customer management, and automation — all from one dashboard.",
    image: "/images/contact/c2.jpg",
  },
  {
    id: 3,
    title: "All-in-One eCommerce Platform",
    desc: "Build your online business with Ecomfixter’s powerful tools for products, payments, delivery, customer management, and automation — all from one dashboard.",
    image: "/images/contact/c3.jpg",
  },
  {
    id: 4,
    title: "Grow Your Sales Faster",
    desc: "Manage everything from one single dashboard efficiently.",
    image: "/images/contact/c4.jpg",
  },
];

export const BUSINESS_TYPES = [
  "E-commerce",
  "Retail Store",
  "Wholesale",
  "Independent Brand",
] as const;
