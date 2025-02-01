'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import CartItem from '../components/CartItem'
import LoadingSpinner from '../components/LoadingSpinner'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from cart`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
    toast.success('Cart updated');
  };

  if (!cartItems) {
    return <LoadingSpinner />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some items to your cart to see them here.</p>
        <Link 
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence>
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </AnimatePresence>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button 
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                onClick={() => toast.success('Checkout functionality coming soon!')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 