// src/data/services.ts

export const services: Service[] = [
  {
    id: "1",
    title: "Native Wear",
    description:
      "Traditional Nigerian attire including Agbada, Senator styles, and other cultural clothing tailored to perfection.",
    category: "native",
    priceRange: "₦15,000 - ₦50,000",
    imageUrl: ["/assets/images/native1.jpg", "/assets/images/native2.jpg", "/assets/images/native3.jpg","/assets/images/native4.jpg", "/assets/images/native5.jpg", "/assets/images/native6.jpg","/assets/images/native7.jpg"],
    estimatedDays: 7,
    features: [
      "Premium quality local fabrics",
      "Traditional and modern designs",
      "Hand-embroidered details",
      "Custom color selection",
    ],
  },
  {
    id: "2",
    title: "Corporate Suits",
    description:
      "Professional suits and formal wear tailored for the modern business environment.",
    category: "corporate",
    priceRange: "₦35,000 - ₦80,000",
    imageUrl: ["/assets/images/corporate.jpg", "/assets/images/corporate1.jpg", "/assets/images/coporate2.jpg", "/assets/images/corporate3.jpg", "/assets/images/corporate4.jpg", "/assets/images/corporate5.jpg"],
    estimatedDays: 10,
    features: [
      "Premium wool and cotton blends",
      "Business-appropriate designs",
      "Perfect fit guarantee",
      "Optional extra trousers",
    ],
  },
  {
    id: "3",
    title: "Casual Outfits",
    description:
      "Smart casual and everyday wear designed for comfort without sacrificing style.",
    category: "casual",
    priceRange: "₦10,000 - ₦30,000",
    imageUrl: ["/assets/images/casual.jpg", "/assets/images/casual3.jpg","/assets/images/casual4.jpg", "/assets/images/casual5.jpg" ],
    estimatedDays: 5,
    features: [
      "Comfortable, breathable fabrics",
      "Versatile styling options",
      "Trendy design elements",
      "Mix and match capabilities",
    ],
  },
  {
    id: "4",
    title: "Sportswear",
    description:
      "Athletic and sports attire designed for maximum comfort and performance.",
    category: "sportswear",
    priceRange: "₦8,000 - ₦25,000",
    imageUrl: ["/assets/images/sports1.jpg", "/assets/images/sports2.jpg", "/assets/images/sports4.jpg", ],
    estimatedDays: 4,
    features: [
      "Performance fabrics",
      "Moisture-wicking materials",
      "Ergonomic designs",
      "Durable construction",
    ],
  },
  {
    id: "5",
    title: "Wedding & Special Events",
    description:
      "Custom designs for weddings, cultural ceremonies, and special occasions.",
    category: "custom",
    priceRange: "₦40,000 - ₦150,000",
    imageUrl: ["/assets/images/customized1.jpg", "/assets/images/customized2.jpg"],
    estimatedDays: 14,
    features: [
      "Luxury fabric options",
      "Multiple fittings",
      "Special detailing and embellishments",
      "Complementary accessory recommendations",
    ],
  },
  {
    id: "6",
    title: "Group Orders",
    description:
      "Uniform designs for groups, teams, organizations, and events with consistent styling.",
    category: "custom",
    priceRange: "Custom Pricing",
    imageUrl: ["/assets/images/uniform1.jpg","/assets/images/uniform3.jpg", "/assets/images/uniform4.jpg"],
    estimatedDays: 21,
    features: [
      "Luxury fabric options",
      "Multiple fittings",
      "Special detailing and embellishments",
      "Complementary accessory recommendations",
    ],
  },
];

// src/data/portfolio.ts

import { PortfolioItem, Service, Testimonials } from "@/types/types";

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Premium Agbada Set",
    description:
      "Hand-crafted traditional Agbada with detailed embroidery for special occasions.",
    category: "native",
    imageUrl: "/images/portfolio/agbada1.jpg",
    featured: true,
    tags: ["Agbada", "Traditional", "Embroidery"],
  },
  {
    id: "2",
    title: "Classic Senator Style",
    description:
      "Modern take on the traditional Senator style with simplified elegance.",
    category: "native",
    imageUrl: "/images/portfolio/senator1.jpg",
    featured: true,
    tags: ["Senator", "Modern", "Traditional"],
  },
  {
    id: "3",
    title: "Three-Piece Business Suit",
    description:
      "Tailored three-piece suit perfect for business meetings and formal events.",
    category: "corporate",
    imageUrl: "/images/portfolio/suit1.jpg",
    featured: true,
    tags: ["Suit", "Business", "Formal"],
  },
  {
    id: "4",
    title: "Wedding Tuxedo",
    description:
      "Custom-fitted black tuxedo designed for a groom's special day.",
    category: "custom",
    imageUrl: "/images/portfolio/tuxedo1.jpg",
    featured: false,
    tags: ["Tuxedo", "Wedding", "Formal"],
  },
  {
    id: "5",
    title: "Smart Casual Blazer",
    description:
      "Versatile blazer that transitions easily from office to evening events.",
    category: "casual",
    imageUrl: "/images/portfolio/blazer1.jpg",
    featured: false,
    tags: ["Blazer", "Casual", "Versatile"],
  },
  {
    id: "6",
    title: "Summer Linen Set",
    description:
      "Breathable linen outfit perfect for hot weather and casual outings.",
    category: "casual",
    imageUrl: "/images/portfolio/linen1.jpg",
    featured: true,
    tags: ["Linen", "Summer", "Casual"],
  },
  {
    id: "7",
    title: "Performance Sportswear",
    description: "Athletic wear designed for maximum comfort and performance.",
    category: "sportswear",
    imageUrl: "/images/portfolio/sport1.jpg",
    featured: false,
    tags: ["Athletic", "Performance", "Comfort"],
  },
  {
    id: "8",
    title: "Corporate Team Uniforms",
    description: "Consistent styling for a corporate team of 25 members.",
    category: "custom",
    imageUrl: "/images/portfolio/corporate1.jpg",
    featured: false,
    tags: ["Corporate", "Uniform", "Team"],
  },
  {
    id: "9",
    title: "Ankara Fashion Set",
    description:
      "Modern outfit using traditional Ankara fabric with contemporary styling.",
    category: "native",
    imageUrl: "/images/portfolio/ankara1.jpg",
    featured: true,
    tags: ["Ankara", "Contemporary", "Colorful"],
  },
  {
    id: "10",
    title: "Bespoke Wedding Outfit",
    description:
      "Custom designed wedding attire for a traditional Nigerian ceremony.",
    category: "custom",
    imageUrl: "/images/portfolio/wedding1.jpg",
    featured: true,
    tags: ["Wedding", "Custom", "Traditional"],
  },
  {
    id: "11",
    title: "Professional Dress Shirt Collection",
    description:
      "Set of five custom-fitted dress shirts for professional settings.",
    category: "corporate",
    imageUrl: "/images/portfolio/shirts1.jpg",
    featured: false,
    tags: ["Shirts", "Professional", "Collection"],
  },
  {
    id: "12",
    title: "Jogger Set",
    description:
      "Comfortable and stylish jogger set for casual wear or light workouts.",
    category: "sportswear",
    imageUrl: "/images/portfolio/jogger1.jpg",
    featured: false,
    tags: ["Jogger", "Casual", "Comfortable"],
  },
];

export const testimonials: Testimonials[] = [
  {
    id: "1",
    clientName: "Oluwaseun Adebayo",
    clientImage: "/images/testimonials/client1.jpg",
    rating: 5,
    text: "The Agbada set I ordered was absolutely stunning! The attention to detail in the embroidery was beyond my expectations. I received so many compliments at my brother's wedding. Will definitely be ordering more pieces soon.",
    date: "2025-01-15",
    serviceType: "native",
  },
  {
    id: "2",
    clientName: "David Okoye",
    clientImage: "/images/testimonials/client2.jpg",
    rating: 5,
    text: "As a business executive, I need suits that make a statement without being flashy. The three-piece suit I received was perfect - excellent fabric, immaculate stitching, and a perfect fit. My go-to tailor from now on.",
    date: "2025-02-03",
    serviceType: "corporate",
  },
  {
    id: "3",
    clientName: "Amina Ibrahim",
    clientImage: "/images/testimonials/client3.jpg",
    rating: 4,
    text: "I ordered custom outfits for my entire bridal train and was very impressed with the consistency in quality. Each piece was tailored to perfection, and the team was very patient with all our adjustments.",
    date: "2024-12-20",
    serviceType: "custom",
  },
  {
    id: "4",
    clientName: "Chinedu Eze",
    clientImage: "/images/testimonials/client4.jpg",
    rating: 5,
    text: "The linen sets I ordered for my vacation were perfect - light, comfortable, and very stylish. The tailor really understood what I was looking for, and the fits were spot on. Will definitely order again.",
    date: "2025-03-11",
    serviceType: "casual",
  },
  {
    id: "5",
    clientName: "Folake Adeyemi",
    clientImage: "/images/testimonials/client5.jpg",
    rating: 5,
    text: "I was skeptical about ordering a Senator style outfit online but decided to give it a try. The result was amazing! The fabric quality, the stitching, and most importantly, the fit were all perfect. Thank you!",
    date: "2025-01-30",
    serviceType: "native",
  },
  {
    id: "6",
    clientName: "Tunde Johnson",
    clientImage: "/images/testimonials/client6.jpg",
    rating: 4,
    text: "As a fitness instructor, I needed sportswear that's both functional and presentable. The custom pieces designed for me work perfectly for both training sessions and casual outings. Great quality and very durable.",
    date: "2025-02-18",
    serviceType: "sportswear",
  },
  {
    id: "7",
    clientName: "Blessing Nnamdi",
    clientImage: "/images/testimonials/client7.jpg",
    rating: 5,
    text: "Ordered corporate uniforms for our entire staff of 15, and the consistency in quality was impressive. The tailor worked with our specific requirements and delivered exactly what we wanted within the promised timeframe.",
    date: "2024-11-28",
    serviceType: "corporate",
  },
  {
    id: "8",
    clientName: "Yusuf Lawal",
    clientImage: "/images/testimonials/client8.jpg",
    rating: 5,
    text: "My wedding outfit was nothing short of perfect. The tailor captured my vision exactly and added wonderful details I hadn't even thought of. The compliments were endless, and I felt amazing on my special day.",
    date: "2025-03-05",
    serviceType: "custom",
  },
];
