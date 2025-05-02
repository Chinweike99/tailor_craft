// components/TestimonialCarousel.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { Testimonials } from '@/types/types';


interface TestimonialCarouselProps {
  testimonials: Testimonials[];
}


export const TestimonialCarousel = ({testimonials}: TestimonialCarouselProps) => {

  const [visibleCount, setVisibleCount] = useState(3);
  const [isMoreAvailable, setMoreAvailable] = useState(true)
  

  useEffect(() => {
    setMoreAvailable(visibleCount < testimonials.length);
  }, [visibleCount, testimonials.length])


  const handleMore =() =>{
    const newCount = Math.min(visibleCount + 3, testimonials.length);
    setVisibleCount(newCount);
  }

  const cardVariant = {
    hidden: (index: number)=>({
      opacity: 0,
      y: 50,
      x: index % 3 === 0 ? -40 : index % 3 === 2 ? 40 : 0
    }),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        delay: 0.1
      }
    }
  };



  return (
 
<div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.slice(0, visibleCount).map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariant}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex items-center mb-4 flex-col">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20">
                  {testimonial.clientImage ? (
                    <Image
                      src={testimonial.clientImage}
                      alt={testimonial.clientName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
                        {testimonial.clientName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className='flex flex-col items-center'>
                  <h4 className="text-lg font-bold text-white/80">{testimonial.clientName}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.serviceType.charAt(0).toUpperCase() + 
                     testimonial.serviceType.slice(1)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex-grow">
                <p className="text-gray-700 dark:text-gray-300 text-center italic">
                  &apos;{testimonial.text}&apos;
                </p>
              </div>
              
              <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-4">
                {new Date(testimonial.date).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {isMoreAvailable && (
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={handleMore}
            className="bg-gray-700 hover:bg-primary-700 text-white font-medium py-2 px-8 rounded-lg transition-colors transform hover:scale-105 active:scale-95"
          >
            More Testimonies
          </button>
        </motion.div>
      )}
    </div>
  );
};