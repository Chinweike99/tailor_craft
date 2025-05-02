// app/portfolio/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioItem } from '@/types/types';
import { PortfolioCard } from '@/components/ui/PortfolioCard';
import { PortfolioModal } from '@/components/ui/PortfolioModal';

// Mock portfolio items
const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Traditional Agbada Set',
    description: 'Hand-crafted traditional Agbada with intricate embroidery details, made from premium cotton fabric.',
    category: 'native',
    imageUrl: '/assets/images/agbada.jpg',
    featured: true,
    // tags: ['Agbada', 'Traditional', 'Embroidery']
  },
  {
    id: '2',
    title: 'Three-Piece Business Suit',
    description: 'Classic three-piece business suit made from fine wool blend, perfect for formal business settings.',
    category: 'corporate',
    imageUrl: '/assets/images/suit.jpg',
    featured: true,
    tags: ['Suit', 'Business', 'Formal']
  },
  {
    id: '3',
    title: 'Modern Senator Style',
    description: 'Contemporary take on the classic Senator style, featuring clean lines and minimalist design.',
    category: 'native',
    imageUrl: '/assets/images/senator.jpg',
    featured: false,
    tags: ['Senator', 'Modern', 'Minimalist']
  },
  {
    id: '4',
    title: 'Casual Weekend Shirt',
    description: 'Comfortable and stylish casual shirt made from breathable linen, perfect for weekend outings.',
    category: 'casual',
    imageUrl: '/assets/images/casualweekend.jpg',
    featured: false,
    tags: ['Casual', 'Linen', 'Weekend']
  },
  {
    id: '5',
    title: 'Formal Tuxedo',
    description: 'Elegant black tuxedo with satin lapels, designed for special events and formal gatherings.',
    category: 'corporate',
    imageUrl: '/assets/images/tuxedo.jpg',
    featured: true,
    tags: ['Tuxedo', 'Formal', 'Event']
  },
  {
    id: '6',
    title: 'Athletic Training Set',
    description: 'Custom-made athletic set featuring moisture-wicking fabric and ergonomic design for maximum comfort.',
    category: 'sportswear',
    imageUrl: '/assets/images/traininSuit.jpg',
    featured: false,
    tags: ['Athletic', 'Training', 'Performance']
  },
  {
    id: '7',
    title: 'Wedding Party Attire',
    description: 'Coordinated wedding party outfits designed to complement the wedding theme and color scheme.',
    category: 'custom',
    imageUrl: '/assets/images/weddingattire.jpg',
    featured: true,
    tags: ['Wedding', 'Group', 'Celebration']
  },
  {
    id: '8',
    title: 'Smart Casual Set',
    description: 'Versatile smart casual ensemble suitable for semi-formal office environments or social gatherings.',
    category: 'casual',
    imageUrl: '/assets/images/smart.jpg',
    featured: false,
    tags: ['Smart Casual', 'Versatile', 'Office']
  },
  {
    id: '9',
    title: 'Tennis Performance Wear',
    description: 'Custom tennis outfit designed for performance, featuring lightweight, stretchy fabric for ease of movement.',
    category: 'sportswear',
    imageUrl: '/assets/images/tennis.jpg',
    featured: false,
    tags: ['Tennis', 'Sport', 'Performance']
  }
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
 

  const filteredItems = selectedCategory 
    ? portfolioItems.filter(item => item.category === selectedCategory)
    : portfolioItems;

  return (
<<<<<<< HEAD
    <main className="container mx-auto px-4 py-16 max-w-6xl">
=======
<<<<<<< HEAD
<<<<<<< HEAD
    <main className="container mx-auto px-4 py-16 max-w-6xl">
=======
    <main className="pt-24 pb-12">
>>>>>>> 7ea4f7e (main (#16))
=======
    <main className="container mx-auto px-4 py-16 max-w-6xl">
>>>>>>> c9b9f51 (Clean merge branch (#20))
>>>>>>> update-main-temp
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Explore our collection of handcrafted garments created for clients with diverse tastes and needs.
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
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All Works
          </button>
          {['native', 'corporate', 'casual', 'sportswear', 'custom'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedItem(item)}
            >
              <PortfolioCard item={item} 
              onClick={()=>console.log(`Hello 😎 \n ${item.title}`)}
              />
            </motion.div>
          ))}
        </div>
        
        {/* If no items match the filter */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No portfolio items found in this category. Please try another category.
            </p>
          </div>
        )}
      </section>

      {/* Modal for viewing portfolio items */}
      {selectedItem && (
        <PortfolioModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)}
          isOpen={true}
        />
      )} 

      {/* Call to Action */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Impressed by Our Work?</h2>
            <p className="max-w-xl mx-auto mb-8 text-gray-600 dark:text-gray-300">
              Let us create a custom piece tailored specifically for you. Schedule a consultation with our expert tailors today.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <motion.a 
                href="/booking" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-primary text-white font-medium px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
              >
                Book an Appointment
              </motion.a>
              <motion.a 
                href="/contact" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-black/80 border border-primary font-medium px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}