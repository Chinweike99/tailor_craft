
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
import FeedbackSection from "@/components/home/FeedbackSection";

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



export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { themeMode } = useTheme();


  useEffect(() => {
    setIsLoaded(true)
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const statsVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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


  return (

    <main className=" mx-auto">
      {/* Hero Section */}
      <div className="">

        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">

          <div className="absolute inset-0 w-screen left-1/2 transform -translate-x-1/2 z-0">
            <Image
              src="/assets/images/hero.jpg"
              alt="Master tailor at work"
              fill
              priority
              className="object-cover opacity-80"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
          </div>

          <motion.div
            className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white max-w-7xl"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className="text-center ">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight"
                variants={itemVariants}
              >
                <span className="block">Custom-Fit Fashion</span>
                <span className="block  bg-gradient-to-r from-primary to-primary/80 bg-clip-text">
                  For Every Occasion
                </span>
              </motion.h1>

              <motion.p
                className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto text-gray-200 leading-relaxed"
                variants={itemVariants}
              >
                Tailoring that celebrates your unique style. From traditional to contemporary,
                we craft garments that fit perfectly and make you feel extraordinary.
              </motion.p>

              <motion.div
                className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center "
                variants={itemVariants}
              >
                <Link href="/booking" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300"
                    rightIcon={<ChevronRight size={20} />}
                  >
                    Book Consultation
                  </Button>
                </Link>

                <Link href="/portfolio" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 border-white/30 backdrop-blur-sm bg-white/10 hover:border-white/50 transform hover:scale-105 transition-all duration-300"
                  >
                    View Portfolio
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>


          {/* <motion.div 
  className="absolute left-1/2 transform -translate-x-1/2 z-20
    bottom-6 sm:bottom-8 md:bottom-12 lg:bottom-16 
    px-4"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 2.5, duration: 1.2, ease: "easeOut" }}
>
  <motion.button 
    className="flex flex-col items-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-2"
    animate={{ y: [0, -8, 0] }}
    transition={{ 
      duration: 3, 
      repeat: Infinity, 
      ease: "easeInOut",
      repeatDelay: 1
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => {
      const nextSection = document.querySelector('[data-section="stats"]') || 
      document.querySelector('section:nth-of-type(2)');
      nextSection?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    <motion.span 
      className="text-white/80 font-medium mb-3 group-hover:text-white transition-all duration-300
        text-xs sm:text-sm lg:text-base
        tracking-widest uppercase
        drop-shadow-sm"
      initial={{ opacity: 0.7 }}
      whileHover={{ opacity: 1 }}
    >
      Discover More
    </motion.span>
    
    <div className="relative ">
      <div className="border-2 border-white/40 rounded-full flex justify-center group-hover:border-white/70 transition-all duration-500
        w-5 h-8 sm:w-6 sm:h-10 md:w-7 md:h-12
        backdrop-blur-sm
        group-hover:shadow-lg group-hover:shadow-white/20">
        
        <motion.div 
          className="bg-white/60 rounded-full group-hover:bg-white transition-all duration-300
            w-1 h-2.5 mt-2 sm:h-3 sm:mt-2.5 md:h-4 md:mt-3"
          animate={{ 
            y: [0, 12, 0], 
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatDelay: 0.8
          }}
        />
      </div>
      
      <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
    </div>
  </motion.button>
</motion.div> */}

          <div className="absolute top-20 right-10 w-32 h-32 border border-white/10 rounded-full hidden lg:block" />
          <div className="absolute bottom-20 left-10 w-24 h-24 border border-white/10 rounded-full hidden lg:block" />

          <div className="absolute inset-0 bg-black/20 z-5" />
        </section>



        {/* Stats Section */}
        <motion.section
          className={` py-16  bg-gray-900`}
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
                  <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
                  <p className="mt-2 text-gray-500">{stat.label}</p>
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
              <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
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
        <section className={`py-24 bg-gray-900 rounded-2xl text-white`}>
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Us</h2>
              <p className="mt-4 text-xl max-w-3xl mx-auto">
                We pride ourselves on offering exceptional tailoring with attention to every detail.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="border flex flex-col items-center p-8  dark:bg-gray-800 hover:scale-102 transition-all ease-in-out duration-130 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6">
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
              <p className="mt-4 text-xl  max-w-3xl mx-auto mb-5">
                Don&apos;t take our word for it. Hear what our satisfied customers have to say.
              </p>

              <motion.p
                className={`${themeMode === "dark" ? "bg-white/900" : "bg-black/800"} mt-16 rounded-full`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <Link href='/testimonials' className={`${themeMode === "dark" ? "bg-white/80 text-gray-900" : "bg-gray-900 text-white/80"}  rounded-full  p-2 px-8 font-semibold`}>
                  View Testimonies
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
        {/* Feedback Section */}
        <FeedbackSection />
      </div>
    </main >
  )
}
