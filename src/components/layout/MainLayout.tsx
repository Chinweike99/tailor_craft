<<<<<<< HEAD
=======

>>>>>>> feat/integrating-backend
'use client';

import { useTheme } from "@/hooks/useTheme";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({children}: MainLayoutProps) {
  const { colors } = useTheme();
  const pathname = usePathname();
  const hiddenNavRoutes = ['/admin', '/client', '/login', '/register', '/forgot-password', '/reset-password', '/verify-otp'];
  
  const shouldHideNavigation = hiddenNavRoutes.some(route => 
    pathname.startsWith(route)
  );

  return (
    <div className={`flex flex-col ${colors.background} ${colors.text}`}>
      {!shouldHideNavigation && <Navbar />}
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Conditionally render Footer */}
      {!shouldHideNavigation && <Footer />}
    </div>
  );
}