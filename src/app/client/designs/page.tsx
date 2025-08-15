"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Eye, Calendar, X, Clock, DollarSign, Package, ArrowRight } from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGet } from "@/_utils/useApi";
import { Button } from "@/components/ui/Button";

// Use your existing interfaces
interface PriceRange {
  min: number;
  max: number;
}

interface Design {
  id: string;
  title: string;
  description: string;
  images: string[];
  priceRange: PriceRange;
  category: string;
  minimumDeliveryTime: number;
  requiredMaterials: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DesignResponse {
  status: string;
  response: {
    data: Design[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

interface DesignCardProps {
  design: Design;
  onView: (design: Design) => void;
  onBook: (designId: string) => void;
  index: number;
}

interface DesignModalProps {
  design: Design | null;
  isOpen: boolean;
  onClose: () => void;
}

// Your existing DesignCard component with client modifications
const DesignCard: React.FC<DesignCardProps> = ({ design, onView, onBook, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      className="bg-gray-600 text-white group rounded-xl overflow-hidden shadow-md h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-60 overflow-hidden">
        {design.images && design.images.length > 0 ? (
          <motion.img
            src={design.images[0]}
            alt={design.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <Package className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-4 left-4 z-10 px-2 bg-gray-500 rounded-xl">
          <span className="px-3 py-1 text-sm md:text-xl font-semibold rounded-full">
            {design.category.charAt(0).toUpperCase() + design.category.slice(1)}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <motion.h3 
          className="text-xl mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.8 }}
        >
          {design.title}
        </motion.h3>
        
        <motion.p 
          className="mb-4 flex-grow text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 0.6 : 1 }}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          {design.description}
        </motion.p>
        
        <motion.div 
          className="md:text-xl flex justify-between items-center mt-auto pt-4 border-t border-gray-700"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          <span className="font-medium">
            {formatPrice(design.priceRange.min)} - {formatPrice(design.priceRange.max)}
          </span>
          <span className="font-medium">{design.minimumDeliveryTime} days</span>
        </motion.div>

        <motion.div 
          className="flex flex-wrap gap-1.5 mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 0.8 : 0 }}
          transition={{ duration: 0.2, delay: 0.4 }}
        >
          {design.requiredMaterials.slice(0, 3).map((material: string, index: number) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-gray-700 text-gray-300 text-xs rounded-md font-medium"
            >
              {material}
            </span>
          ))}
          {design.requiredMaterials.length > 3 && (
            <span className="px-2.5 py-1 bg-gray-600 text-gray-400 text-xs rounded-md">
              +{design.requiredMaterials.length - 3} more
            </span>
          )}
        </motion.div>

        <motion.div 
          className="pt-2 mt-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.2, delay: 0.5 }}
        >
          <div className="text-xs text-gray-400">
            Created {formatDate(design.createdAt)}
          </div>
        </motion.div>
      </div>
      
      {/* Client buttons: View and Book */}
      <div className="p-4 border-t border-gray-700 flex space-x-2">
        <button
          onClick={() => onView(design)}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <Eye size={16} className="mr-2" />
          View
        </button>
        <button
          onClick={() => onBook(design.id)}
          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <Calendar size={16} className="mr-2" />
          Book
        </button>
      </div>
    </motion.div>
  );
};

// Simple modal for viewing design details (same as your admin modal but read-only)
const DesignModal: React.FC<DesignModalProps> = ({ design, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  React.useEffect(() => {
    if (design) {
      setCurrentImageIndex(0);
    }
  }, [design]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!design) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/10 backdrop-blur-lg bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Design Details</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                {/* Images Section */}
                <div className="space-y-4">
                  {design.images && design.images.length > 0 ? (
                    <div className="space-y-3">
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={design.images[currentImageIndex]}
                          alt={design.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {design.images.length > 1 && (
                        <div className="flex space-x-2 overflow-x-auto">
                          {design.images.map((image: string, index: number) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                                currentImageIndex === index
                                  ? 'border-blue-500'
                                  : 'border-transparent'
                              }`}
                            >
                              <img
                                src={image}
                                alt={`${design.title} ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{design.title}</h3>
                    <p className="text-gray-600">{design.description}</p>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <span className="font-semibold text-base">
                        {formatPrice(design.priceRange.min)} - {formatPrice(design.priceRange.max)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">{design.minimumDeliveryTime} days delivery</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Category</h4>
                    <span className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-md text-sm font-medium">
                      {design.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Required Materials</h4>
                    <div className="flex flex-wrap gap-2">
                      {design.requiredMaterials.map((material: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Created</h4>
                      <p className="text-gray-600 text-sm">
                        {new Date(design.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Last Updated</h4>
                      <p className="text-gray-600 text-sm">
                        {new Date(design.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main client designs page
const ClientDesignsPage: React.FC = () => {
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  
  // Use your existing API call
  const { data: designsResponse, isLoading } = useGet<DesignResponse>(["designs"], "/design");
  const designs = designsResponse?.response?.data?.filter((design: Design) => design.isActive) || [];

  const handleViewDesign = (design: Design): void => {
    setSelectedDesign(design);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedDesign(null);
  };

  const handleBookDesign = (designId: string): void => {
    // Navigate to your existing booking form with the design ID
    router.push(`/client/booking/new?designId=${designId}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Available Designs</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Custom Design
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Available Designs</h1>
          <p className="text-gray-600 mt-1">
            {designs?.length || 0} design{designs?.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <Link href="/client/booking/new">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Custom Design
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {designs?.map((design: Design, index: number) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <DesignCard
                design={design}
                onView={handleViewDesign}
                onBook={handleBookDesign}
                index={index}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {designs?.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No designs available</h3>
          <p className="text-gray-600 mb-6">Check back later for new designs</p>
          <Link href="/client/booking/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Custom Design
            </Button>
          </Link>
        </motion.div>
      )}

      <DesignModal
        design={selectedDesign}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ClientDesignsPage;