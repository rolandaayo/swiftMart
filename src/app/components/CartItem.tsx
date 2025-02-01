'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface CartItemProps {
  item: {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string, name: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md p-6 mb-4"
    >
      <div className="flex items-center">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="rounded-md object-cover"
        />
        <div className="ml-4 flex-grow">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-blue-600 font-bold">${item.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={item.quantity}
            onChange={(e) => onUpdateQuantity(item._id, Number(e.target.value))}
            className="border rounded-md px-2 py-1"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button
            onClick={() => onRemove(item._id, item.name)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
} 