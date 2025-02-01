'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

interface AddToCartButtonProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    try {
      addToCart({
        ...product,
        quantity,
      });
      toast.success(`${product.name} added to cart!`);
      setShowQuantity(false);
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showQuantity ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center space-x-2"
          >
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded-md px-2 py-2"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              onClick={handleAddToCart}
            >
              Add
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            onClick={() => setShowQuantity(true)}
          >
            Add to Cart
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
} 