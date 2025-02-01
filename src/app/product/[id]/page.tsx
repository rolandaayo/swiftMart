'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../../context/CartContext'
import { featuredProducts } from '../../data/products'
import toast from 'react-hot-toast'

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const product = featuredProducts.find(p => p._id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    try {
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full md:w-auto"
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </motion.button>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <ul className="space-y-2 text-gray-600">
                <li>Category: {product.category}</li>
                <li>Stock: {product.countInStock} units</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 