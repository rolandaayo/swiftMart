'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product, featuredProducts } from '../data/products'
import AddToCartButton from './AddToCartButton'

export default function Container() {
  const [products] = useState<Product[]>(featuredProducts);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-transparent bg-clip-text">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, carefully chosen for quality and value.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {products.map((product) => (
            <motion.div
              key={product._id}
              variants={item}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={`/product/${product._id}`}>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="object-cover object-center w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
              
              <div className="p-4 md:p-6">
                <Link href={`/product/${product._id}`}>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                  <p className="text-xl md:text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
                  <AddToCartButton 
                    product={{
                      _id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    }} 
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/shop" 
            className="inline-flex items-center justify-center px-6 py-2 md:px-8 md:py-3 border border-transparent text-sm md:text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 md:py-4 md:text-lg md:px-10 transform hover:scale-105 transition-all duration-200"
          >
            View All Products
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
