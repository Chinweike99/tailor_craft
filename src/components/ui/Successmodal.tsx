// SuccessModal.tsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  autoCloseTime?: number; // Time in ms before auto-closing
}

export const SuccessModal = ({
  isOpen,
  onClose,
  title = "Success!",
  message = "Your request has been processed successfully.",
  autoCloseTime = 5000
}: SuccessModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(isOpen);
    
    let timer: NodeJS.Timeout;
    if (isOpen && autoCloseTime > 0) {
      timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Delay actual close to allow exit animation
      }, autoCloseTime);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, onClose, autoCloseTime]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300 
      }
    },
    exit: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
      transition: { 
        duration: 0.2 
      }
    }
  };

  const checkmarkVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1, 
      transition: { 
        delay: 0.2,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          exit="hidden"
          variants={backdropVariants}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            exit="exit"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden"
          >
            <div className="relative">
              <button 
                onClick={closeModal}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              
              <div className="flex flex-col items-center pt-8 pb-6 px-6">
                <motion.div 
                  variants={checkmarkVariants}
                  className="mb-4"
                >
                  <CheckCircle size={56} className="text-emerald-500" />
                </motion.div>
                
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {title}
                </h2>
                
                <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                  {message}
                </p>
                
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition-colors shadow-sm"
                >
                  Got it
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Example usage:
export const SuccessModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button 
        onClick={openModal}
        className="px-4 py-2 bg-emerald-600 text-white rounded-md"
      >
        Show Success Modal
      </button>
      
      <SuccessModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Booking Confirmed!"
        message="Your appointment has been successfully scheduled. We'll send you a confirmation email with all the details."
      />
    </div>
  );
};

export default SuccessModal;