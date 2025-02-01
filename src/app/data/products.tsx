export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Premium Headphones",
    price: "$299.99",
    image: "/images/product-1.webp"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$199.99",
    image: "/images/product-2.webp"
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: "$149.99",
    image: "/images/product-3.webp"
  },
  {
    id: 4,
    name: "Laptop Pro",
    price: "$1299.99",
    image: "/images/product-4.webp"
  },
  {
    id: 5,
    name: "Smart Speaker",
    price: "$179.99",
    image: "/images/product-5.webp"
  },
  {
    id: 6,
    name: "Wireless Charger",
    price: "$49.99",
    image: "/images/product-6.webp"
  }
]; 