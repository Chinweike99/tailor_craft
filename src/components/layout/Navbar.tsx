
// components/layout/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {  Menu, X, Scissors } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';


const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Booking', path: '/booking' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Contact', path: '/contact' },
  { name: 'Login', path: '/login' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const {themeMode} = useTheme();



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <nav
      className={`${ `container  mx-auto px-4  sticky top-0 w-full z-50 transition-all duration-300 items-center justify-center flex flex-col py-4`}  ${
        isScrolled ? 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
        <div className=' w-full '>
      <div className="container mx-auto flex justify-between items-center">

<Link href="/" className="flex items-center">
                        <Scissors 
                            size={28}
                            className={`${
                                isScrolled || pathname !== '/'
                                ? "text-blue-600 font-bold"
                                : 'text-amber-600'
                            }`}
                        />
                        <span className={`font-bold text-xl ${
                            isScrolled || pathname !== '/'
                            ? `${themeMode === "dark" ? "text-white" : "text-black/80"}`
                            : "text-amber-600"
                        }`}>
                        TailorCraft
                        </span>
                    </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`transition-all  text-sm ${
                pathname === item.path 
                  ? 'text-primary font-semibold underline' 
                  : ''
              }`}
            >
              {item.name}
            </Link>
          ))}


          <ThemeToggle />
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className={`${themeMode === "dark" ? "text-white" : "text-black/80"} p-2 text-gray-700 dark:text-gray-200`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} className={`${themeMode === "dark" ? "text-white" : "text-black/80"}`}/> : <Menu size={24} className={`${themeMode === "dark" ? "text-white" : "text-black/80"}`}/>}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`py-2 px-4 rounded transition-all ${
                    pathname === item.path
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </nav>

  );
};

export default Navbar;