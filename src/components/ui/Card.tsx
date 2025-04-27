import { ReactNode } from "react";
import {motion} from 'framer-motion'





interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'outlined' | 'elevated';
    hover?: boolean;
    animate?: boolean;
}


const Card = ({children, className= '', 
    variant = 'default', 
    hover = true, 
    animate = false,
}: CardProps) => {
    const baseClasses = 'rounded-lg over-flow-hidden transition-all duration-300';

    const variantClasses = {
        default: 'bg-white dark:bg-gray-800 shadow-md',
        outlined: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
        elevated: 'bg-white dark:bg-gray-800 shadow-xl', 
    }
    const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';
  
    const cardContent = (
      <div className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}>
        {children}
      </div>
    );
  
    if (animate) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {cardContent}
        </motion.div>
      );
    }
  
    return cardContent;
  };
  
  export default Card;