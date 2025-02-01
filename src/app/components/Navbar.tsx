'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import SearchBar from './SearchBar'
import MiniCart from './MiniCart'

export default function Navbar() {
  const { cartCount } = useCart();
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 text-transparent bg-clip-text hover:scale-105 transition-transform">
              swiftMart
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link href="/categories" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Categories
              </Link>
              <Link href="/deals" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Deals
              </Link>
              <Link href="/new-arrivals" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                New Arrivals
              </Link>
              <Link href="/best-sellers" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Best Sellers
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <SearchBar />

            <button className="text-gray-700 hover:text-blue-600 transition-colors relative group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Account
              </span>
            </button>

            <button 
              onClick={() => setIsMiniCartOpen(true)}
              className="text-gray-700 hover:text-blue-600 transition-colors relative group"
            >
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Cart
              </span>
            </button>
          </div>

          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <MiniCart isOpen={isMiniCartOpen} onClose={() => setIsMiniCartOpen(false)} />
    </nav>
  )
}
