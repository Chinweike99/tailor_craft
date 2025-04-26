// src/app/booking/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ServiceCategory } from '@/types/types';

const categories: { value: ServiceCategory; label: string }[] = [
  { value: 'native', label: 'Native (Agbada, Senator)' },
  { value: 'corporate', label: 'Corporate (Suits, Formalwear)' },
  { value: 'casual', label: 'Casual (Smart, Everyday Wears)' },
  { value: 'sportswear', label: 'Sportswear' },
  { value: 'custom', label: 'Custom Orders (Weddings, Groups)' },
];

export default function BookingPage() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Perfect Fit</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Start your journey to custom tailoring excellence. Let us create something that fits you perfectly.
        </p>
      </motion.div>

      {!selectedCategory ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {categories.map((category) => (
            <motion.div
              key={category.value}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => setSelectedCategory(category.value)}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{category.label}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Tailored to perfection for your specific needs.
                </p>
                <button className="text-primary-600 font-medium hover:underline">
                  Select this style →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {categories.find(cat => cat.value === selectedCategory)?.label}
            </h2>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="text-primary-600 hover:underline flex items-center"
            >
              ← Back to categories
            </button>
          </div>
          
          {/* <BookingForm 
            initialCategory={selectedCategory} 
            onSubmitSuccess={() => {
              // In a real app, you might redirect or show success message
              alert("Booking submitted successfully! We'll contact you soon.");
              setSelectedCategory(null);
            }}
          /> */}
        </motion.div>
      )}
    </div>
  );
}