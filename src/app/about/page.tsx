// app/about/page.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Crafting excellence in fashion since 2010, delivering tailor-craft tailoring with passion and precision.
          </p>
        </motion.div>
      </section>

      {/* About Content */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-80 md:h-full"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-lg -rotate-3"></div>
            <div className="absolute inset-0 overflow-hidden rounded-lg rotate-2">
              <Image 
                src="/assets/images/native.jpg" 
                alt="Master Tailor at Work" 
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4">Master Craftsmanship</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              With over 15 years of experience in the tailoring industry, our founder James Wilson has perfected the art of creating bespoke garments that not only fit perfectly but also reflect the personality and style of each client.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              What began as a small studio in 2010 has grown into a respected establishment known for its attention to detail, premium materials, and exceptional customer service.
            </p>
            <Link href="/booking" className="inline-flex items-center text-primary hover:text-primary-dark font-medium">
              Book a consultation <ArrowRight size={16} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We believe in a methodical approach to tailoring that ensures every garment meets our high standards of quality and fit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Consultation",
                description: "We begin with a detailed consultation to understand your style preferences, needs, and the occasions you're dressing for.",
                delay: 0.1
              },
              {
                title: "Measurement & Design",
                description: "Precise measurements are taken, and designs are sketched. We select premium fabrics and materials that match your vision.",
                delay: 0.2
              },
              {
                title: "Creation & Fitting",
                description: "Our skilled tailors craft your garment with meticulous attention to detail, followed by fittings to ensure perfect comfort.",
                delay: 0.3
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step.delay }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our talented team of professional tailors brings decades of combined experience to every garment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "James Wilson",
              role: "Founder & Master Tailor",
              bio: "With over 15 years of experience, James specializes in bespoke suits and formal wear.",
              delay: 0.1,
              imag: "/assets/images/Team4.jpg" 
            },
            {
              name: "Sophia Rodriguez",
              role: "Head of Design",
              bio: "Sophia brings contemporary flair to traditional tailoring with her innovative designs.",
              delay: 0.2,
              imag: "/assets/images/Team1.jpg" 
            },
            {
              name: "David Chen",
              role: "Senior Tailor",
              bio: "David's expertise in traditional techniques ensures impeccable quality in every stitch.",
              delay: 0.3,
              imag: "/assets/images/Team3.jpg" 
            },
            {
              name: "Amara Johnson",
              role: "Fabric Specialist",
              bio: "Amara sources the finest materials from around the world to match each client's needs.",
              delay: 0.4,
              imag: "/assets/images/Team2.jpg" 
            }
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: member.delay }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative h-64 odd:rotate-3 even:rotate-1">
                <Image 
                  src={member.imag} 
                  alt={member.name} 
                  fill
                  className="object-cover "
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready for a Custom Tailoring Experience?</h2>
            <p className="max-w-xl mx-auto mb-8">
              We&apos;re dedicated to crafting the perfect garment for your needs. Book a consultation with our expert tailors today.
            </p>
            <Link 
              href="/booking" 
              className="inline-block bg-white text-black/90 font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Book an Appointment
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}