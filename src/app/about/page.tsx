'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background dark:bg-gray-900 text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Our Story</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Crafting excellence in fashion since 2010, delivering tailor-craft tailoring with passion and precision.
            </p>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-0"></div>
      </section>

      {/* About Content */}
      <section className="container mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] md:h-[500px]"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-2xl -rotate-3 transform transition-transform hover:rotate-0 duration-500"></div>
            <div className="absolute inset-0 overflow-hidden rounded-2xl rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl">
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
            <h2 className="text-3xl font-bold mb-6 text-foreground">Master Craftsmanship</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                With over 15 years of experience in the tailoring industry, our founder James Wilson has perfected the art of creating bespoke garments that not only fit perfectly but also reflect the personality and style of each client.
              </p>
              <p>
                What began as a small studio in 2010 has grown into a respected establishment known for its attention to detail, premium materials, and exceptional customer service.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/booking" className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors group">
                Book a consultation <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Process</h2>
            <p className="text-muted-foreground text-lg">
              We believe in a methodical approach to tailoring that ensures every garment meets our high standards of quality and fit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
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
                className="bg-white dark:bg-gray-800 text-card-foreground p-8 rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <span className="text-primary font-bold text-2xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Meet Our Team</h2>
          <p className="text-muted-foreground text-lg">
            Our talented team of professional tailors brings decades of combined experience to every garment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-border/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={member.imag}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary text-primary-foreground rounded-2xl p-12 text-center shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] opacity-10"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a Custom Tailoring Experience?</h2>
            <p className="text-primary-foreground/90 text-lg mb-10">
              We&apos;re dedicated to crafting the perfect garment for your needs. Book a consultation with our expert tailors today.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center bg-background text-foreground font-semibold px-8 py-4 rounded-lg hover:bg-background/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book an Appointment
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}