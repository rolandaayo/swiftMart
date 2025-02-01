'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Hero() {
  const backgrounds = [
    "/images/bg-0.webp",
    "/images/bg-1.webp",
    "/images/bg-2.webp",
    "/images/bg-3.webp"
  ];

  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000); // Change background every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentBg}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={backgrounds[currentBg]}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </motion.div>
      </AnimatePresence>

      {/* Background Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {backgrounds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBg(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentBg === index 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Switch to background ${index + 1}`}
          />
        ))}
      </div>

      {/* Rest of your content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl tracking-tight font-extrabold text-white sm:text-6xl md:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Welcome to
              </motion.span>
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                swiftMart
              </motion.span>
            </motion.h1>
            <motion.p 
              className="mt-6 max-w-md mx-auto text-lg text-gray-200 sm:text-xl md:mt-8 md:text-2xl md:max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Discover amazing products at unbeatable prices. Shop the latest trends in fashion, electronics, home decor, and more.
            </motion.p>
            <motion.div 
              className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="rounded-md shadow">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/shop" 
                    className="w-full flex items-center justify-center px-8 py-4 border-0 text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 md:text-lg md:px-10"
                  >
                    Shop Now
                  </Link>
                </motion.div>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/categories" 
                    className="w-full flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200 md:text-lg md:px-10"
                  >
                    Browse Categories
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
