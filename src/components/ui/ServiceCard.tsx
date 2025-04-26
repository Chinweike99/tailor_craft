import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Service } from '@/types/types';
import { useState } from 'react';


interface ServiceCardProps {
  service: Service;
  index: number;
}

export const ServiceCard = ({ service, index }: ServiceCardProps) => {
   const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group rounded-xl cursor-pointer overflow-hidden bg-white dark:bg-gray-800 shadow-md h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={()=> setIsHovered(true)}
        onMouseLeave={()=> setIsHovered(false)}
    >
      <div className="relative h-60 overflow-hidden">
        <Image
          src={service.imageUrl[0]}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-4 left-4 z-10 px-2  bg-gray-500 rounded-xl">
          <span className="px-3 py-1 bg-primary text-white text-2xl font-semibold rounded-full">
            {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <motion.h3 className="text-xl mb-2"
        initial={{y:20, opacity: 0}}
        animate={{y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.8}}
        >
          {service.title}
        </motion.h3>
        <motion.p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow"
        initial={{y:20, opacity: 0}}
        animate={{y: isHovered ? 0 : 20, opacity: isHovered ? 0.4 : 1}}
        transition={{duration: 0.2, delay: 0.3}}
        >
          {service.description}
        </motion.p>
        
        <motion.div className="md:text-xl flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700"
        initial={{y:20, opacity: 0}}
        animate={{y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0}}
        transition={{duration: 0.2, delay: 0.3}}
        >
          <span className=" font-medium">{service.priceRange}</span>
          <span className=" font-medium">{service.estimatedDays} days</span>
        </motion.div>
      </div>
      
      <Link 
        href={`/services#${service.category}`}
        className="p-4 border-t border-gray-200 dark:border-gray-700 text-primary font-medium flex items-center justify-center group-hover:bg-primary/5 transition-colors"
      >
        View Details
        <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
};