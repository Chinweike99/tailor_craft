'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ServiceCategory } from '@/types/types';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { testimonials } from '@/data/services';


export default function TestimonialsPage() {
  const [filter, setFilter] = useState<ServiceCategory | 'all'>('all');
  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredTestimonials(testimonials);
    } else {
      setFilteredTestimonials(testimonials.filter(item => item.serviceType === filter));
    }
  }, [filter]);

  const categories: { value: ServiceCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Testimonials' },
    { value: 'native', label: 'Native' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'casual', label: 'Casual' },
    { value: 'sportswear', label: 'Sportswear' },
    { value: 'custom', label: 'Custom' },
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Don&apos;t just take our word for it. See what our clients have to say about their experience with our tailoring services.
        </p>
      </motion.div>

      <div className="mb-8 flex justify-center">
        <div className="inline-flex flex-wrap justify-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setFilter(category.value)}
              className={`px-4 py-2 text-white/80 rounded-md transition-all ${
                filter === category.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={filter} // Force re-render animation when filter changes
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        {filteredTestimonials.length > 0 ? (
          <TestimonialCarousel testimonials={filteredTestimonials} />
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No testimonials available for this category yet.
            </p>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center mt-16"
      >
        <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
        <p className="mb-6">
          We value your feedback. If you&apos;ve enjoyed our services, we&apos;d love to hear from you.
        </p>
        <a
          href="/contact"
          className="inline-block bg-primary-600 hover:bg-primary-700  font-medium py-3 px-8 rounded-lg transition-colors"
        >
          Leave a Review
        </a>
      </motion.div>
    </div>
  );
}