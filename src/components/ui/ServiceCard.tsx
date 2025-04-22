// components/ui/ServiceCard.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Service } from '@/types/types';


interface ServiceCardProps {
  service: Service;
  index: number;
}

export const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <motion.div
      className="group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="relative h-60 overflow-hidden">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-4 left-4 z-10">
          <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
            {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{service.description}</p>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm font-medium">From {service.priceRange}</span>
          <span className="text-sm font-medium">{service.estimatedDays} days</span>
        </div>
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