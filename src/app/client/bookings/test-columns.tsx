"use client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye, Pencil, X, User, Mail, Phone, MapPin, Calendar, Ruler, Star, Package, CreditCard, MessageCircle, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { BOOKING_STATUS, PAYMENT_STATUS } from "@/_utils/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useGet, usePatch } from "@/_utils/useApi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authstore";

interface BookingDetailsModalProps {
  bookingId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface StatusEditModalProps {
  bookingId: string;
  currentStatus: string;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: () => void;
}

const BookingDetailsModal = ({ bookingId, isOpen, onClose }: BookingDetailsModalProps) => {

  const [selectedImage, setSelectedImage] = useState<{ src: string; index: number } | null>(null);

  const { data: bookingData, isLoading } = useGet<any>(
    ["booking-details", bookingId],
    `/booking/${bookingId}`,
    isOpen
  );

  console.log("Hello ...............")

  console.log("Booking Data: ", bookingData);
  const booking = bookingData?.getbooking || bookingData?.response?.getbooking;
  console.log("Booking Details:", booking);


// const bookingClientId = booking?.clientId;


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'APPROVED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'IN_PROGRESS': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'COMPLETED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'DECLINED': return 'bg-red-100 text-red-800 border-red-200';
      case 'CANCELLED': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'UNPAID': return 'bg-red-100 text-red-800 border-red-200';
      case 'PARTIAL': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'SUCCESS': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex flex-col items-start">
                <h2 className="text-2xl font-bold">Booking Details </h2>
                <p className="text-indigo-100 text-sm mt-1">ID: {bookingId}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-auto max-h-[calc(90vh-120px)] bg-gray-50">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center py-20"
              >
                <div className="flex flex-col items-center space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"
                  ></motion.div>
                  <p className="text-gray-600">Loading booking details...</p>
                </div>
              </motion.div>
            ) : booking ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-6 space-y-6"
              >
                {/* Status Overview */}
                <motion.div variants={sectionVariants} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-600">Status</span>
                      </div>
                      <Badge className={`px-4 py-2 rounded-full border ${getStatusColor(booking.status)} font-medium`}>
                        {booking.status?.replace("_", " ") || "N/A"}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-600">Payment</span>
                      </div>
                      <Badge className={`px-4 py-2 rounded-full border ${getPaymentStatusColor(booking.paymentStatus)} font-medium`}>
                        {booking.paymentStatus || "N/A"}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Created: {format(new Date(booking.createdAt), "MMM dd, yyyy")}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Client Information */}
                <motion.div variants={sectionVariants} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-indigo-600" />
                      </div>
                      Client Information
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <User className="h-4 w-4 text-gray-500" />
                        <div>
                          <span className="text-sm font-medium text-gray-600">User ID:</span>
                          {/* <p className="text-gray-800 font-mono text-xs break-all">{ clientsData?.name || "N/A"}</p> */}
                          {/* <p className="text-gray-800 font-mono text-xs break-all">{ bookingClient?.name || "N/A"}</p> */}

                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        <span className="text-sm text-amber-700">Full user details not available in current response</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Booking Information */}
                <motion.div variants={sectionVariants} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-50 to-teal-50 px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                        <Package className="h-4 w-4 text-emerald-600" />
                      </div>
                      Booking Information
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Design:</span>
                          <p className="text-gray-800 font-semibold truncate">
                            {booking.Design?.title || booking.customDesign?.title || "Custom Design"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600 flex items-center whitespace-nowrap">
                            <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                            Delivery Date:
                          </span>
                          <p className="text-gray-800 font-semibold">
                            {format(new Date(booking.deliveryDate), "MMM dd, yyyy")}
                          </p>
                        </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                          Total Amount:
                        </span>
                        <p className="text-gray-800 font-semibold text-lg">
                          {booking.totalAmount ? `₦${booking.totalAmount.toLocaleString()}` : "Not set"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Has Review</span>
                        <div className="flex items-center space-x-2">
                          {booking.hasReview ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span className="text-emerald-600 font-medium">Yes</span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-500 font-medium">No</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Updated</span>
                        <p className="text-gray-800">{format(new Date(booking.updatedAt), "MMM dd, yyyy")}</p>
                      </div>
                    </div>
                    
                    {booking.notes && (
                      <div className="flex gap-3 mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-sm font-medium text-blue-800 flex items-center mb-2 self-start">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Notes
                        </span>
                        <p className="text-blue-700 text-center">{booking.notes}</p>
                      </div>
                    )}

                    {booking.declineReason && (
                      <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                        <span className="text-sm font-medium text-red-800 flex items-center mb-2">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Decline Reason
                        </span>
                        <p className="text-red-700">{booking.declineReason}</p>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Design Details */}
                {booking.Design && (
                  <motion.div variants={sectionVariants} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <Package className="h-4 w-4 text-purple-600" />
                        </div>
                        Design Details
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                        
                              <p className="text-gray-800 font-semibold ">Title: {booking.Design.title}</p>
                            </div>
                             <div className="flex items-center space-x-4">
                              <p className="text-gray-800 font-semibold ">Category: {booking.Design.category}</p>
                              
                            </div>
                            <div className="flex items-center gap-2">
                              
                              {/* <span className="text-sm font-medium text-gray-600"</span> */}
                              <p className="text-gray-800 font-semibold ">Description: {booking.Design.description}</p>
                            </div>
                           
                          </div>
                          
                        </div>

                        <div className="space-y-4">
                            
                            {booking.Design.requiredMaterials && booking.Design.requiredMaterials.length > 0 && (
                              <div className="flex items-center gap-3 text-gray-800 font-semibold">
                                <span className="text-sm font-medium text-gray-600 ">Required Materials</span>
                                <div className="flex gap-2">
                                  {booking.Design.requiredMaterials.map((material: string, index: number) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: index * 0.1 }}
                                    >
                                      <Badge className="bg-gray-100 text-gray-700 border border-gray-200 px-3 py-1 rounded-full">
                                        {material}
                                      </Badge>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                        <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 rounded-lg border border-green-200">
                                <span className="text-sm font-medium text-green-800">Price Range</span>
                                <p className="text-green-700 font-semibold">
                                  ₦{booking.Design.priceRange.min.toLocaleString()} - ₦{booking.Design.priceRange.max.toLocaleString()}
                                </p>
                              </div>
                              <div className="p-3  rounded-lg border border-blue-200">
                                <span className="text-sm font-medium text-blue-800">Delivery Time</span>
                                <p className="text-blue-700 font-semibold">{booking.Design.minimumDeliveryTime} days</p>
                              </div>
                            </div>
                        {booking.Design.images && booking.Design.images.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-gray-600 block mb-3">Design Images</span>
                              <div className="flex space-x-3 overflow-x-auto pb-2">
                                {booking.Design.images.map((image: string, index: number) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex-shrink-0"
                                  >
                                    <img
                                      src={image}
                                      alt={`Design ${index + 1}`}
                                      className="w-28 h-28 object-cover rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                      onClick={() => setSelectedImage({ src: image, index })}
                                    />
                                  </motion.div>
                                ))}
                              </div>

                              {/* Image Viewer Modal */}
                              {selectedImage && (
                                <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
                                  <div className="relative max-w-4xl w-full max-h-[90vh]">
                                    <button 
                                      className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors z-10"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImage(null);
                                      }}
                                    >
                                      <X className="h-6 w-6 text-white" />
                                    </button>
                                    
                                    <motion.img
                                      key={selectedImage.index}
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      src={selectedImage.src}
                                      alt={`Design ${selectedImage.index + 1}`}
                                      className="w-full h-full object-contain rounded-lg"
                                    />
                                    
                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                      {booking.Design.images.map((img: string, idx: number) => (
                                        <button
                                          key={idx}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage({ src: img, index: idx });
                                          }}
                                          className={`w-3 h-3 rounded-full transition-colors ${selectedImage.index === idx ? 'bg-white' : 'bg-white/50'}`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Measurements */}
                {booking.measurements && (
                  <motion.div variants={sectionVariants} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                          <Ruler className="h-4 w-4 text-orange-600" />
                        </div>
                        Measurements
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { label: 'Chest', value: booking.measurements.chest, color: 'from-blue-400 to-blue-600' },
                          { label: 'Waist', value: booking.measurements.waist, color: 'from-green-400 to-green-600' },
                          { label: 'Hips', value: booking.measurements.hips, color: 'from-purple-400 to-purple-600' },
                          { label: 'Length', value: booking.measurements.length, color: 'from-pink-400 to-pink-600' }
                        ].map((measurement, index) => (
                          <motion.div
                            key={measurement.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center group hover:shadow-md transition-shadow"
                          >
                            <div className={`absolute inset-0 bg-gradient-to-br ${measurement.color} opacity-5 rounded-xl group-hover:opacity-10 transition-opacity`}></div>
                            <div className="relative">
                              <div className={`text-3xl font-bold bg-gradient-to-r ${measurement.color} bg-clip-text text-transparent`}>
                                {measurement.value}"
                              </div>
                              <div className="text-sm font-medium text-gray-600 mt-1">{measurement.label}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Reviews */}
                {booking.Review && booking.Review.length > 0 && (
                  <motion.div variants={sectionVariants} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-4 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                          <Star className="h-4 w-4 text-yellow-600" />
                        </div>
                        Reviews ({booking.Review.length})
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {booking.Review.map((review: any, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className=" flex flex-col items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                          >
                            <div className="flex items-center justify-between gap-5 mb-3">
                              <div className="flex items-center space-x-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, scale: 0 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: (index * 0.1) + (i * 0.05) }}
                                    >
                                      <Star
                                        className={`h-4 w-4 ${
                                          i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                        }`}
                                      />
                                    </motion.div>
                                  ))}
                                </div>
                                <span className="text-sm font-semibold text-gray-700 self-end">{review.rating}/5</span>
                              </div>
                              {/* <span className="text-xs text-gray-500">
                                {format(new Date(review.createdAt), "MMM dd, yyyy")}
                              </span> */}
                            </div>
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">Booking details not found</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const StatusEditModal = ({ bookingId, currentStatus, isOpen, onClose, onStatusUpdate }: StatusEditModalProps) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateBookingStatus = usePatch<any, { status: string }>(
    ["booking-status", bookingId],
    `/booking/${bookingId}/status`
  );

  const availableStatuses = Object.values(BOOKING_STATUS);

  const handleSubmit = async () => {
    if (selectedStatus === currentStatus) {
      onClose();
      return;
    }

    setIsSubmitting(true);
    try {
      await updateBookingStatus.mutateAsync({ status: selectedStatus });
      onStatusUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
            <div className="absolute inset-0 bg-black/10 rounded-t-2xl"></div>
            <div className="relative flex items-center justify-between">
              <h2 className="text-xl font-bold">Update Status</h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Current Status
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-3 py-1 rounded-full font-medium">
                    {currentStatus.replace("_", " ")}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  New Status
                </label>
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition-all"
                >
                  {availableStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status.replace("_", " ")}
                    </option>
                  ))}
                </motion.select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    ></motion.div>
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update Status"
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const columns: ColumnDef<any>[] = [
  
  {
    accessorKey: "Design.title",
    header: "Design",
    cell: ({ row }) => {
      const design = row.original.Design;
      return (
        <div className="font-medium text-gray-900">
          {design ? design.title : "Custom Design"}
        </div>
      );
    },
  },
  {
    accessorKey: "User.name",
    header: "Client",
    cell: ({ row }) => {
      const design = row.original.User;
      return (
        <div className="font-medium text-gray-900">
          {design ? design.name : "Custom Design"}
        </div>
      );
    },
  },
  {
    accessorKey: "deliveryDate",
    header: "Delivery Date",
    cell: ({ row }) => {
      const date = row.getValue("deliveryDate");
      return (
        <div className="text-gray-700">
          {format(new Date(date as string), "MMM dd, yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof BOOKING_STATUS;
      const statusMap = {
        [BOOKING_STATUS.PENDING]: "bg-amber-100 text-amber-800 border-amber-200",
        [BOOKING_STATUS.APPROVED]: "bg-blue-100 text-blue-800 border-blue-200",
        [BOOKING_STATUS.IN_PROGRESS]: "bg-purple-100 text-purple-800 border-purple-200",
        [BOOKING_STATUS.COMPLETED]: "bg-emerald-100 text-emerald-800 border-emerald-200",
        [BOOKING_STATUS.DECLINED]: "bg-red-100 text-red-800 border-red-200",
        [BOOKING_STATUS.CANCELLED]: "bg-gray-100 text-gray-800 border-gray-200",
      };
      return (
        <Badge className={`${statusMap[status]} border rounded-full px-3 py-1 font-medium`}>
          {status.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => {
      const paymentStatus = row.getValue("paymentStatus");
      const paymentMap = {
        UNPAID: "bg-red-100 text-red-800 border-red-200",
        PARTIAL: "bg-amber-100 text-amber-800 border-amber-200",
        SUCCESS: "bg-emerald-100 text-emerald-800 border-emerald-200",
      };
      return (
        <Badge className={`${paymentMap[paymentStatus as keyof typeof paymentMap]} border rounded-full px-3 py-1 font-medium`}>
          {PAYMENT_STATUS[paymentStatus as keyof typeof PAYMENT_STATUS]}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const booking = row.original;
      const [showDetailsModal, setShowDetailsModal] = useState(false);
      const [showStatusModal, setShowStatusModal] = useState(false);
      const [refreshKey, setRefreshKey] = useState(0);

      const handleViewDetails = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowDetailsModal(true);
      };

      const handleEditStatus = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowStatusModal(true);
      };

      const handleStatusUpdate = () => {
        setRefreshKey(prev => prev + 1);
        window.location.reload();
      };

       const { user } = useAuthStore();
    const isAdmin = user?.role === 'ADMIN';

      return (
        <>
          <div className="flex space-x-2 items-center justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white hover:bg-indigo-50 hover:border-indigo-300 border-gray-200 shadow-sm transition-all"
                onClick={handleViewDetails}
              >
                <Eye className="h-4 w-4 text-indigo-600" />
              </Button>
            </motion.div>
            
            {isAdmin && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white hover:bg-emerald-50 hover:border-emerald-300 border-gray-200 shadow-sm transition-all"
                onClick={handleEditStatus}
              >
                <Pencil className="h-4 w-4 text-emerald-600" />
              </Button>
            </motion.div>
          )}
          </div>

          <BookingDetailsModal
            bookingId={booking.id}
            isOpen={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
          />

          <StatusEditModal
            bookingId={booking.id}
            currentStatus={booking.status}
            isOpen={showStatusModal}
            onClose={() => setShowStatusModal(false)}
            onStatusUpdate={handleStatusUpdate}
          />
        </>
      );
    },
  },
];
