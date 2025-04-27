"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Scissors,
  Users,
  Bookmark,
  Clock,
  DollarSign,
  Star,
  ChevronDown,
} from "lucide-react";
import { services } from "@/data/services";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(new Set());
  const [toggleChevron, setToggleChevron] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<Record<string, number>>({});

  useEffect(() => {
    const initialIndex: Record<string, number> = {};
    services.forEach((service) => {
      initialIndex[service.id] = 0;
    });
    setCurrentIndex(initialIndex);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const newIndex = { ...prev };
        services.forEach((service) => {
          if (service.imageUrl.length > 0) {
            newIndex[service.id] =
              (prev[service.id] + 1) % service.imageUrl.length;
          }
        });

        return newIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleAnswer = (index: number) => {
    const showDropDownAnswer = new Set(showAnswer);
    if (showDropDownAnswer.has(index)) {
      showDropDownAnswer.delete(index);
      setToggleChevron(!toggleChevron);
    } else {
      showDropDownAnswer.add(index);
    }

    setShowAnswer(showDropDownAnswer);
  };

  const filteredServices = selectedCategory
    ? services.filter((service) => service.category === selectedCategory)
    : services;

  return (
    <main className="pt-24 pb-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            TailorCraft tailoring services for every occasion, crafted with
            precision and style.
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === null
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All Services
          </button>

          {["native", "corporate", "casual", "sportswear", "custom"].map(
            (category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full capitalize transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                {service.imageUrl.map((image, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      currentIndex[service.id] === idx
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${service.title} - ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {service.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>

                <div className="flex items-center mb-4">
                  <Clock size={16} className="text-primary mr-2" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    Estimated Time: {service.estimatedDays} days
                  </span>
                </div>

                <div className="flex items-center mb-6">
                  <DollarSign size={16} className="text-primary mr-2" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    Price Range: {service.priceRange}
                  </span>
                </div>

                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="mb-6">
                  {service.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start mb-1">
                      <Star
                        size={16}
                        className="text-primary mr-2 mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/booking?service=${service.category}`}
                  className="block w-full bg-primary text-white text-center py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Tailoring Process</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We follow a meticulous process to ensure your garments are
              perfectly crafted to your specifications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: <Users size={32} className="text-primary" />,
                title: "Consultation",
                description:
                  "Meet with our expert tailors to discuss your style preferences and needs.",
              },
              {
                icon: <Scissors size={32} className="text-primary" />,
                title: "Measurement",
                description:
                  "We take precise measurements to ensure the perfect fit for your custom garments.",
              },
              {
                icon: <Bookmark size={32} className="text-primary" />,
                title: "Creation",
                description:
                  "Our skilled tailors craft your garment with meticulous attention to detail.",
              },
              {
                icon: <Star size={32} className="text-primary" />,
                title: "Final Fitting",
                description:
                  "Try on your finished garment for any final adjustments before delivery.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
              >
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Everything you need to know about our tailoring services.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {[
            {
              question: "How long does it take to complete an order?",
              answer:
                "Completion time varies depending on the complexity of the garment and current workload. On average, simple pieces take 5-7 days, while more complex items like suits may take 2-3 weeks. Rush services are available for an additional fee.",
            },
            {
              question: "Do you provide fabric choices?",
              answer:
                "Yes, we have an extensive collection of premium fabrics for you to choose from. Alternatively, you can bring your own fabric and we'll work with it.",
            },
            {
              question: "How many fittings are included in the process?",
              answer:
                "Most garments require 1-2 fittings. Formal wear like suits and special occasion outfits may require additional fittings to ensure the perfect fit.",
            },
            {
              question: "Can I modify my existing clothes?",
              answer:
                "Absolutely! We offer alteration services for existing garments. Bring them in for an assessment and we'll discuss the possibilities.",
            },
            {
              question: "Do you offer warranty on your work?",
              answer:
                "Yes, we offer a 30-day warranty on all our tailoring work. If you experience any issues related to our craftsmanship, we'll fix it free of charge.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-6 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
            >
              <h3 className="text-xl font-bold mb-2 flex justify-between cursor-pointer">
                {faq.question}
                <ChevronDown
                  onClick={() => toggleAnswer(index)}
                  className={`${
                    showAnswer.has(index) ? "transform rotate-180" : ""
                  }`}
                />
              </h3>

              <motion.div
                initial={false}
                animate={{
                  height: showAnswer.has(index) ? "auto" : 0,
                  opacity: showAnswer.has(index) ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-gray-600 dark:text-gray-300 p-2">
                  {faq.answer}
                </p>
              </motion.div>
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
            <h2 className="text-3xl font-bold mb-4">
              Ready for a TailorCraft Experience?
            </h2>
            <p className="max-w-xl mx-auto mb-8">
              Get started with your custom tailoring journey today. Our expert
              tailors are ready to create the perfect garment for you.
            </p>
            <Link
              href="/booking"
              className="inline-block bg-white text-black/80 font-medium px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Book an Appointment
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
