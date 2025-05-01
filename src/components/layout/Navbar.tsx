// import { Scissors } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import {motion} from 'framer-motion'





// const navLinks = [
//     {name: "Home", path: "/"},
//     {name: "About", path: "/about"},
//     {name: "Services", path: "/services"},
//     {name: "Portfolio", path: "/portfolio"},
//     {name: "Testimonials", path: "/testimonials"},
//     {name: "Contact", path: "/contact"},
// ];

// export const Navbar = () => {
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const pathname = usePathname();
//     // const {theme, setTheme} = useTheme();

//     useEffect(()=> {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 20)
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     // const toggleTheme = () => {
//     //     setTheme(theme === 'dark' ? 'light' : 'dark')
//     // }


//     const handleMobileMenuToggle = () => {
//         setMobileMenuOpen(!mobileMenuOpen);
//     }


//     return (
//         <header
//         className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
//             isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm py-3'
//             : 'bg-transparent py-5'
//         }`}
//         >
//             <div className="container mx-auto px-4">
//                 <div>
//                     <Link href="/" className="flex items-center">
//                         <Scissors 
//                             size={28}
//                             className={`${
//                                 isScrolled || pathname !== '/'
//                                 ? "text-primary"
//                                 : 'text-white'
//                             }`}
//                         />
//                         <span className={`font-bold text-xl ${
//                             isScrolled || pathname !== '/'
//                             ? 'text-gray-900 dark:text-white'
//                             : "text-white"
//                         }`}>
//                         TailorCraft
//                         </span>
//                     </Link>


//                  {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 href={link.path}
//                 className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                   isScrolled || pathname !== '/' 
//                     ? pathname === link.path
//                       ? 'text-primary'
//                       : 'text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary'
//                     : pathname === link.path
//                       ? 'text-white'
//                       : 'text-white/80 hover:text-white'
//                 }`}
//               >
//                 {link.name}
//                 {pathname === link.path && (
//                   <motion.div
//                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mx-4"
//                     layoutId="navbar-indicator"
//                     transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//                   />
//                 )}
//               </Link>
//             ))}
//           </nav>
          
//           {/* Right Side Actions */}
//           <div className="flex items-center">
//             {/* Theme Toggle */}
//             <button
//               onClick={toggleTheme}
//               className={`p-2 rounded-full mr-2 ${
//                 isScrolled || pathname !== '/' 
//                   ? 'text-gray-700 dark:text-gray-200' 
//                   : 'text-white'
//               }`}
//               aria-label="Toggle theme"
//             >
//               {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
//             </button>
            
//             {/* Book Now Button */}
//             <div className="hidden md:block">
//               <Button 
//                 as={Link}
//                 href="/booking"
//                 size="sm"
//                 leftIcon={<PhoneCall size={16} />}
//               >
//                 Book Now
//               </Button>
//             </div>
            
//             {/* Mobile Menu Button */}
//             <button
//               className="p-2 ml-4 rounded-md md:hidden"
//               onClick={handleMobileMenuToggle}
//               aria-label="Toggle menu"
//             >
//               {mobileMenuOpen ? (
//                 <X 
//                   size={24} 
//                   className={`${
//                     isScrolled || pathname !== '/' 
//                       ? 'text-gray-900 dark:text-white' 
//                       : 'text-white'
//                   }`} 
//                 />
//               ) : (
//                 <Menu 
//                   size={24} 
//                   className={`${
//                     isScrolled || pathname !== '/' 
//                       ? 'text-gray-900 dark:text-white' 
//                       : 'text-white'
//                   }`} 
//                 />
//               )}
//             </button>
//           </div>





// components/layout/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {  Menu, X, Scissors } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';


const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Booking', path: '/booking' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check system preference for dark mode
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //   setIsDarkMode(true);
    //   document.documentElement.classList.add('dark');
    // }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <nav
      className={`${ `container  mx-auto px-4 max-w-6xl sticky top-0 w-full z-50 transition-all duration-300 items-center justify-center flex flex-col py-4`}  ${
        isScrolled ? 'bg-white/80 dark:bg-gray-900/10 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
        <div className='max-w-[1440px] w-full '>
      <div className="container mx-auto flex justify-between items-center">
        {/* <Link href="/" className="font-bold text-xl md:text-2xl">
          <span className="text-primary">Bespoke</span>
          <span className="dark:text-white">Tailor</span>
        </Link> */}

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
                            ? 'text-gray-900 dark:text-white'
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
            className="p-2 text-gray-700 dark:text-gray-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
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