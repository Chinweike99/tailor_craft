import { PortfolioItem } from "@/types/types";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";



interface PortfolioModalProps {
    item: PortfolioItem | null;
    isOpen: boolean;
    onClose: () => void;
}

export const PortfolioModal = ({item, isOpen, onClose}: PortfolioModalProps) => {

    // Close on escape Key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if(e.key === "Escape") onClose();
        }

        window.addEventListener("keydown", handleEsc);
        return ()=>window.removeEventListener("keydown", handleEsc);
    }, [onClose])


// Prevent body scroll when modal is open

    useEffect(()=> {
        if(isOpen){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    // Animation variants
    const backdropVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1}
    }

    const modalVariants = {
        hidden: {opacity: 0, scale: 0.8, y:50},
        visible: {opacity: 1, Scale: 1, y: 0, transition: {delay: 0.2}}
    };

    
    return(
        <AnimatePresence>
      {isOpen && item && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full shadow-2xl max-h-[90vh] relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors"
              onClick={onClose}
            >
              <XIcon size={20} />
            </button>
            
            <div className="grid md:grid-cols-2 h-full">
              <div className="relative h-72 md:h-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h2>
                
                <div className="mt-2 inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </div>
                
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  {item.description}
                </p>
                
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Features</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    )
}





