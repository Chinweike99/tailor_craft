'use client';

import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({children}: MainLayoutProps) {
  const {  colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex flex-col ${colors.background} ${colors.text}`}>
      {isLoading ? (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 2 }}
          onAnimationComplete={() => setIsLoading(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold text-white flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full border-4 border-white border-t-transparent animate-spin mb-4" />
            <span className="mt-4">Tailors Craft</span>
          </motion.div>
        </motion.div>
      ) : (
        <>
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={typeof window !== 'undefined' ? window.location.pathname : 'initial'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}