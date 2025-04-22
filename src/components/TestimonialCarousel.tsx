// components/TestimonialCarousel.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { Testimonials } from '@/types/types';
// import { Testimonial } from '@/types';

// Mock testimonials data
const testimonials: Testimonials[] = [
  {
    id: '1',
    clientName: 'John Doe',
    clientImage: '/images/testimonials/client-1.jpg',
    rating: 5,
    text: 'The tailoring service was exceptional. My suit fits perfectly and the quality of the fabric is outstanding. I will definitely be returning for more custom garments.',
    date: '2024-03-15',
    serviceType: 'corporate',
  },
  {
    id: '2',
    clientName: 'Michael Johnson',
    clientImage: '/images/testimonials/client-2.jpg',
    rating: 5,
    text: 'I ordered a custom Agbada for my wedding and was blown away by the attention to detail. The craftsmanship is unmatched and I received countless compliments.',
    date: '2024-02-22',
    serviceType: 'native',
  },
  {
    id: '3',
    clientName: 'Sarah Williams',
    clientImage: '/images/testimonials/client-3.jpg',
    rating: 4,
    text: 'The casual wear collection is comfortable yet stylish. I appreciate how the tailor took my preferences into consideration while adding their professional touch.',
    date: '2024-01-10',
    serviceType: 'casual',
  },
  {
    id: '4',
    clientName: 'David Chen',
    clientImage: '/images/testimonials/client-4.jpg',
    rating: 5,
    text: "I've tried many tailors in the past, but none compare to the quality and fit I received here. My sportswear is both functional and stylish.",
    date: '2024-03-05',
    serviceType: 'sportswear',
  },
];

export const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, autoplay]);
  
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };
  
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };
  
  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };
  
  return (
    <div 
      className="relative max-w-4xl mx-auto" 
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div className="relative h-96 overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex items-center justify-center p-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 w-full h-full flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
                  {testimonials[currentIndex].clientImage ? (
                    <Image
                      src={testimonials[currentIndex].clientImage}
                      alt={testimonials[currentIndex].clientName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
                        {testimonials[currentIndex].clientName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="text-center mt-4">
                  <h4 className="text-lg font-bold">{testimonials[currentIndex].clientName}</h4>
                  <div className="flex items-center justify-center mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < testimonials[currentIndex].rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {testimonials[currentIndex].serviceType.charAt(0).toUpperCase() + 
                     testimonials[currentIndex].serviceType.slice(1)}
                  </p>
                </div>
              </div>
              
              <div className="md:w-2/3 flex flex-col justify-center">
                <div className="flex-grow">
                  <div className="text-4xl text-primary font-serif leading-none">&apos;</div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl italic">
                    {testimonials[currentIndex].text}
                  </p>
                  <div className="text-4xl text-primary font-serif leading-none text-right">&apos;</div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="text-gray-800 dark:text-gray-200" size={20} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Next testimonial"
      >
        <ChevronRight className="text-gray-800 dark:text-gray-200" size={20} />
      </button>
      
      {/* Pagination Dots */}
      <div className="flex justify-center mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`mx-1 h-2 w-2 rounded-full ${
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-gray-300 dark:bg-gray-700"
            } transition-all duration-300`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};