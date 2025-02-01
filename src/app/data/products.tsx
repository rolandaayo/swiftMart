export interface Product {
  _id: string;  // MongoDB id
  name: string;
  price: number; // Change to number instead of string
  image: string;
  description: string;
  category: string;
  countInStock: number;
  createdAt: string;
}

export const featuredProducts: Product[] = [
  {
    _id: "1",
    name: "Premium phones",
    price: 299.99,
    image: "/images/product-1.webp",
    description: "High-quality premium headphones with noise cancellation",
    category: "Electronics",
    countInStock: 10,
    createdAt: new Date().toISOString()
  },
  {
    _id: "2",
    name: "Smart Watch",
    price: 199.99,
    image: "/images/product-2.webp",
    description: "Smart watch with health tracking features",
    category: "Electronics",
    countInStock: 15,
    createdAt: new Date().toISOString()
  },
  {
    _id: "3",
    name: "Wireless Earbuds",
    price: 149.99,
    image: "/images/product-3.webp",
    description: "Wireless earbuds with active noise cancellation",
    category: "Electronics",
    countInStock: 20,
    createdAt: new Date().toISOString()
  },
  {
    _id: "4",
    name: "Laptop Pro",
    price: 1299.99,
    image: "/images/product-4.webp",
    description: "High-performance laptop with a powerful processor",
    category: "Electronics",
    countInStock: 5,
    createdAt: new Date().toISOString()
  },
  {
    _id: "5",
    name: "Smart Speaker",
    price: 179.99,
    image: "/images/product-5.webp",
    description: "Smart speaker with voice assistant capabilities",
    category: "Electronics",
    countInStock: 12,
    createdAt: new Date().toISOString()
  },
  {
    _id: "6",
    name: "Wireless Charger",
    price: 49.99,
    image: "/images/product-6.webp",
    description: "Wireless charger for smartphones and tablets",
    category: "Electronics",
    countInStock: 18,
    createdAt: new Date().toISOString()
  },
  {
    _id: "7",
    name: "Laptop Pro",
    price: 1299.99,
    image: "/images/product-7.webp",
    description: "High-performance laptop with a powerful processor",
    category: "Electronics",
    countInStock: 3,
    createdAt: new Date().toISOString()
  },
  {
    _id: "8",
    name: "Smart Speaker",
    price: 179.99,
    image: "/images/product-8.webp",
    description: "Smart speaker with voice assistant capabilities",
    category: "Electronics",
    countInStock: 8,
    createdAt: new Date().toISOString()
  },
  {
    _id: "9",
    name: "Wireless Charger",
    price: 49.99,
    image: "/images/product-9.webp",
    description: "Wireless charger for smartphones and tablets",
    category: "Electronics",
    countInStock: 15,
    createdAt: new Date().toISOString()
  }
]; 