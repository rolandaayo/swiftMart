'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { featuredProducts } from '../data/products'

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof featuredProducts>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = featuredProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 hover:text-blue-600 transition-colors relative group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-4 w-96 bg-white rounded-lg shadow-lg p-4 z-50"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />

              {searchResults.length > 0 && (
                <div className="mt-4 max-h-96 overflow-y-auto">
                  {searchResults.map((product) => (
                    <Link
                      key={product._id}
                      href={`/product/${product._id}`}
                      className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                      <div className="ml-3">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {searchQuery && searchResults.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No products found matching "{searchQuery}"
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 