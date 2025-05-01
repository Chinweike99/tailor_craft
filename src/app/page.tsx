
'use client';
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { useTheme } from "@/hooks/useTheme";
import { ServiceCategory } from "@/types/types";
import { motion } from "framer-motion";
import { ChevronRight, Scissors, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const featuredServices = [
  {
    id: '1',
    title: 'Native Attire',
    description: 'Traditional Agbada, Senator styles and other native designs tailored to perfection.',
    category: 'native' as ServiceCategory,
    priceRange: '$150 - $500',
    imageUrl: ['/assets/images/native.jpg'],
    estimatedDays: 14,
  },
  {
    id: '2',
    title: 'Business Suits',
    description: 'Professional suits for corporate environments, perfectly fitted for comfort and style.',
    category: 'corporate' as ServiceCategory,
    priceRange: '$300 - $800',
    imageUrl: ['/assets/images/corporate.jpg'],
    estimatedDays: 21,
  },
  {
    id: '3',
    title: 'Casual Wear',
    description: 'Everyday comfortable clothing tailored for both style and practicality.',
    category: 'casual' as ServiceCategory,
    priceRange: '$80 - $250',
    imageUrl: ['/assets/images/casual.jpg'],
    estimatedDays: 10,
  },
]

// Mock stats
const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '1000+', label: 'Happy Clients' },
  { value: '5000+', label: 'Garments Made' },
  { value: '99%', label: 'Satisfaction Rate' },
];

const features = [
  { 
    icon: <Scissors className="h-6 w-6" />, 
    title: 'Custom Tailoring', 
    description: 'Every garment is hand-crafted to your exact measurements for the perfect fit.'
  },
  { 
    icon: <Star className="h-6 w-6" />, 
    title: 'Premium Materials', 
    description: 'We source only the finest fabrics from around the world for durability and comfort.'
  },
  { 
    icon: <Users className="h-6 w-6" />, 
    title: 'Expert Craftsmanship', 
    description: 'Our master tailors have decades of experience crafting bespoke clothing.'
  },
];



export default function HomePage(){
  const [isLoaded, setIsLoaded] = useState(false);
  const {themeMode} = useTheme();


  useEffect(() => {
    setIsLoaded(true)
  }, []);

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {staggerChildren: 0.2, delayChildren: 0.3}
    }
  };

  const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
      opacity: 1,
      y: 0,
      transition: {duration: 0.6, ease: "easeOut"}
    }
  };

  const statsVariant = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {staggerChildren: 0.1}
    }
  }

  const statsItemVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }


  return(
<main className=" container mx-auto px-4 max-w-6xl">
      {/* Hero Section */}
      <div className="max-w-[1440px]">
      <section className="relative h-screen md:h-[650px] flex items-center justify-center overflow-hidden w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero.jpg" 
            alt="Master tailor at work"
            fill
            priority
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        </div>
        
        {/* Hero Content */}
        <motion.div 
          className="container mx-auto px-4 relative z-10 text-white"
          initial="hidden" 
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h1 
            className="text-3xl md:text-6xl lg:text-7xl font-bold leading-tight"
            variants={itemVariants}
          >
            Custom-Fit Fashion<br />
            <span className="text-primary">For Every Occasion</span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-xl md:text-2xl max-w-2xl text-gray-200"
            variants={itemVariants}
          >
            Tailoring that celebrates your unique style. From traditional to contemporary, we craft garments that fit perfectly.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-wrap gap-4"
            variants={itemVariants}
          >
            <div>
            <Link href="/booking">
              <Button 
                size="lg" 
                rightIcon={<ChevronRight size={16} />}
              >
                Book Now
              </Button>
            
            </Link>
            
            <Link  href="/portfolio">
            <Button 
              variant="outline"   
            >
              View Collection
            </Button>
            </Link>
            </div>

            <motion.div 
          className=" ml-30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 3, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="flex flex-col items-center">
            <span className="text-white text-sm mb-2">Scroll Down</span>
            <div className="w-0.5 h-8 bg-white/50 rounded-full" />
          </div>
        </motion.div>
            
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
       
      </section>
      
      {/* Stats Section */}
      <motion.section 
        className="py-16 bg-gray-100 dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={statsVariant}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={statsItemVariant}
              >
                <h3 className="text-4xl font-bold text-primary">{stat.value}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Services */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">Our Signature Services</h2>
            <p className={`${themeMode === "dark" ? "text-white/50 " : "text-gray-800 "} mt-4 text-xl max-w-3xl mx-auto`}>
              Explore our range of custom tailoring services designed to meet your style needs.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service}
                index={index} 
              />
            ))}
          </div>

          {/* <PortfolioCard 
          item={item}
          onClick={()=>alert("Hello")}
          /> */}
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/services">
            <Button 
              rightIcon={<ChevronRight size={16} />}
            >
              View All Services
            </Button>
            </Link>
            
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
            <p className={`${themeMode === "dark" ? "text-white/50 " : "text-gray-800 "} mt-4 text-xl max-w-3xl mx-auto`}>
              We pride ourselves on offering exceptional tailoring with attention to every detail.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className={`${themeMode === "dark" ? "bg-white/70 text-black/80" : "bg-black/80 text-white/80"} flex flex-col items-center p-8  hover:scale-102 transition-all ease-in-out duration-130 rounded-xl shadow-sm`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className=" text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="pt-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
            <p className={`${themeMode === "dark" ? "text-white/50 " : "text-gray-800 "}mt-4 text-xl  max-w-3xl mx-auto mb-5`}>
              Don&apos;t take our word for it. Hear what our satisfied customers have to say.
            </p>

            <motion.p
            className="mt-16"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
               <Link href='/testimonials' className={`${themeMode === "dark" ? "bg-white text-black/80" : "bg-black/80 text-white/70"} rounded-full  p-2 px-8 font-semibold`}>
              View Tesimonies
            </Link>
            </motion.p>
           
          </motion.div>

          
          
          {/* <TestimonialCarousel /> */}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 ">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Transform Your Style?</h2>
            <p className="mt-6 text-xl max-w-2xl mx-auto">
              Book an appointment today and experience the difference of custom-tailored fashion crafted just for you.
            </p>
            
            <div className="mt-10">
              <Link href="/booking">
              <Button 
                size="lg" 
                variant="secondary"
              >
                Schedule Your Fitting
              </Button>
              </Link>
              
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </main>
  )
}