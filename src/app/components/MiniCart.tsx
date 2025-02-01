'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../context/CartContext'

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl text-black font-bold">Shopping Cart ({cartCount} items)</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-250px)]">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center space-x-4 border-b pb-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-blue-600">${item.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                            className="border text-black rounded-md px-2 py-1 text-sm"
                          >
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="ml-4 text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
                <Link
                  href="/cart"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-2"
                  onClick={onClose}
                >
                  View Cart
                </Link>
                <button 
                  className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  onClick={() => {
                    onClose();
                    // Add checkout logic here
                  }}
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />
        </>
      )}
    </AnimatePresence>
  );
} 