"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Eye, Calendar, X, Clock, DollarSign, Package, ArrowRight, User, Ruler, MessageSquare, CheckCircle } from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGet, usePost } from "@/_utils/useApi";
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

interface Measurements {
  chest: number;
  waist: number;
  hips: number;
  length: number;
}

interface BookingRequest {
  designId: string;
  measurements: Measurements;
  deliveryDate: string;
  notes?: string;
}

interface DesignCardProps {
  design: Design;
  onView: (design: Design) => void;
  onBook: (design: Design) => void;
  index: number;
}

interface DesignModalProps {
  design: Design | null;
  isOpen: boolean;
  onClose: () => void;
}

interface BookingModalProps {
  design: Design | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookingData: BookingRequest) => void;
  isLoading: boolean;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  design: Design | null;
}

// Success Modal Component
const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, design }) => {
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl max-w-md w-full p-8 text-center"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Successful!</h3>
            <p className="text-gray-600 mb-4">
              Your booking for "{design?.title}" has been submitted successfully.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to bookings page...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Booking Modal Component
const BookingModal: React.FC<BookingModalProps> = ({ design, isOpen, onClose, onSubmit, isLoading }) => {
  const [measurements, setMeasurements] = useState<Measurements>({
    chest: 0,
    waist: 0,
    hips: 0,
    length: 0
  });
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setMeasurements({ chest: 0, waist: 0, hips: 0, length: 0 });
      setDeliveryDate('');
      setNotes('');
      setErrors({});
    }
  }, [isOpen]);

  // Set minimum delivery date based on design's minimum delivery time
  React.useEffect(() => {
    if (design && isOpen) {
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + design.minimumDeliveryTime);
      setDeliveryDate(minDate.toISOString().split('T')[0]);
    }
  }, [design, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!measurements.chest || measurements.chest <= 0) newErrors.chest = 'Chest measurement is required';
    if (!measurements.waist || measurements.waist <= 0) newErrors.waist = 'Waist measurement is required';
    if (!measurements.hips || measurements.hips <= 0) newErrors.hips = 'Hips measurement is required';
    if (!measurements.length || measurements.length <= 0) newErrors.length = 'Length measurement is required';
    if (!deliveryDate) newErrors.deliveryDate = 'Delivery date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!design || !validateForm()) return;

    const bookingData: BookingRequest = {
      designId: design.id,
      measurements,
      deliveryDate: new Date(deliveryDate).toISOString(),
      notes: notes.trim() || undefined
    };

    onSubmit(bookingData);
  };

  const handleMeasurementChange = (field: keyof Measurements, value: string) => {
    const numValue = parseFloat(value) || 0;
    setMeasurements(prev => ({ ...prev, [field]: numValue }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (!design) return null;

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + design.minimumDeliveryTime);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Book Design</h2>
                <p className="text-gray-600 text-sm mt-1">{design.title}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                disabled={isLoading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-6 space-y-6">
                {/* Measurements Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <Ruler className="w-5 h-5 text-gray-400 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Measurements (inches)</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Chest *
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="0.5"
                        value={measurements.chest || ''}
                        onChange={(e) => handleMeasurementChange('chest', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.chest ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 40"
                        disabled={isLoading}
                      />
                      {errors.chest && <p className="text-red-500 text-xs mt-1">{errors.chest}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Waist *
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="0.5"
                        value={measurements.waist || ''}
                        onChange={(e) => handleMeasurementChange('waist', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.waist ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 32"
                        disabled={isLoading}
                      />
                      {errors.waist && <p className="text-red-500 text-xs mt-1">{errors.waist}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hips *
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="0.5"
                        value={measurements.hips || ''}
                        onChange={(e) => handleMeasurementChange('hips', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.hips ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 38"
                        disabled={isLoading}
                      />
                      {errors.hips && <p className="text-red-500 text-xs mt-1">{errors.hips}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Length *
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="0.5"
                        value={measurements.length || ''}
                        onChange={(e) => handleMeasurementChange('length', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.length ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 30"
                        disabled={isLoading}
                      />
                      {errors.length && <p className="text-red-500 text-xs mt-1">{errors.length}</p>}
                    </div>
                  </div>
                </div>

                {/* Delivery Date Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Delivery Date</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Delivery Date *
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      min={minDate.toISOString().split('T')[0]}
                      onChange={(e) => {
                        setDeliveryDate(e.target.value);
                        if (errors.deliveryDate) {
                          setErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.deliveryDate;
                            return newErrors;
                          });
                        }
                      }}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.deliveryDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      disabled={isLoading}
                    />
                    {errors.deliveryDate && <p className="text-red-500 text-xs mt-1">{errors.deliveryDate}</p>}
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum delivery time: {design.minimumDeliveryTime} days
                    </p>
                  </div>
                </div>

                {/* Notes Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <MessageSquare className="w-5 h-5 text-gray-400 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Additional Notes</h3>
                  </div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Any special instructions or preferences..."
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 mr-2" />
                      Submit Booking
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Updated DesignCard component
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
          onClick={() => onBook(design)}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
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
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [bookingDesign, setBookingDesign] = useState<Design | null>(null);
  const router = useRouter();
  
  // Use your existing API calls
  const { data: designsResponse, isLoading } = useGet<DesignResponse>(["designs"], "/design");
  const { mutate: createBooking, isPending: isCreatingBooking } = usePost(["/booking"], "/booking");
  
  const designs = designsResponse?.response?.data?.filter((design: Design) => design.isActive) || [];

  const handleViewDesign = (design: Design): void => {
    setSelectedDesign(design);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = (): void => {
    setIsViewModalOpen(false);
    setSelectedDesign(null);
  };

  const handleBookDesign = (design: Design): void => {
    setBookingDesign(design);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = (): void => {
    setIsBookingModalOpen(false);
    setBookingDesign(null);
  };

  const handleBookingSubmit = async (bookingData: BookingRequest): Promise<void> => {
    try {
      await createBooking(bookingData);
      setIsBookingModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Booking failed:', error);
      // You can add error handling here (e.g., show error toast)
    }
  };

  const handleSuccessModalClose = (): void => {
    setIsSuccessModalOpen(false);
    setBookingDesign(null);
    router.push('/client/bookings/booking');
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

      {/* View Design Modal */}
      <DesignModal
        design={selectedDesign}
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
      />

      {/* Booking Modal */}
      <BookingModal
        design={bookingDesign}
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        onSubmit={handleBookingSubmit}
        isLoading={isCreatingBooking}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        design={bookingDesign}
      />
    </div>
  );
};

export default ClientDesignsPage;