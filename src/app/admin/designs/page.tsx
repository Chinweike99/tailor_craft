"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Clock, DollarSign, Package, Calendar, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useToast } from "@/components/ui/components/use-toast";
import Link from "next/link";
import { useDelete, useGet, usePatch, usePatchDesign } from "@/_utils/useApi";
import { Button } from "@/components/ui/Button";

// TypeScript interfaces
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
  onDelete: (id: string) => void;
  onToggleActive: (id: string, isActive: boolean) => void;
  index: number;
}

interface DesignModalProps {
  design: Design | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (design: Design) => void;
}

const DesignCard: React.FC<DesignCardProps> = ({ design, onView, onDelete, onToggleActive, index }) => {
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
      className="bg-gray-600 text-white group rounded-xl cursor-pointer overflow-hidden shadow-md h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onView(design)}
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

        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onToggleActive(design.id, !design.isActive);
            }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-md shadow-sm hover:bg-white transition-colors"
            title={design.isActive ? 'Deactivate' : 'Activate'}
          >
            {design.isActive ? 
              <Eye className="w-4 h-4 text-gray-600" /> : 
              <EyeOff className="w-4 h-4 text-gray-400" />
            }
          </motion.button> */}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onDelete(design.id);
            }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-md shadow-sm hover:bg-red-50 transition-colors group/delete"
            title="Delete design"
          >
            <Trash2 className="w-4 h-4 text-gray-600 group-hover/delete:text-red-600 transition-colors" />
          </motion.button>
        </div>

        {!design.isActive && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <span className="px-3 py-1 bg-black/60 text-white text-sm rounded-md">Inactive</span>
          </div>
        )}
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
      
      <div
        className="p-4 border-t border-gray-700 font-medium flex items-center justify-center group-hover:bg-primary/5 transition-colors"
      >
        View Details
        <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
};




const DesignModal: React.FC<DesignModalProps> = ({ design, isOpen, onClose, onUpdate }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<Design | null>(design);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  React.useEffect(() => {
    if (design) {
      setFormData(design);
      setCurrentImageIndex(0);
    }
  }, [design]);

  const handleSave = (): void => {
    if (formData) {
      onUpdate(formData);
      setEditMode(false);
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!design || !formData) return null;

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
              <h2 className="text-2xl font-bold text-gray-900">
                {editMode ? 'Edit Design' : 'Design Details'}
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                  className = "bg-white cursor-pointer"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {editMode ? 'Cancel' : 'Edit'}
                </Button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
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
                  {editMode ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={formData.title || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setFormData({...formData, title: e.target.value})
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={formData.description || ''}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                            setFormData({...formData, description: e.target.value})
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Min Price (₦)
                          </label>
                          <input
                            type="number"
                            value={formData.priceRange?.min || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                              setFormData({
                                ...formData, 
                                priceRange: {...formData.priceRange, min: parseInt(e.target.value) || 0}
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max Price (₦)
                          </label>
                          <input
                            type="number"
                            value={formData.priceRange?.max || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                              setFormData({
                                ...formData, 
                                priceRange: {...formData.priceRange, max: parseInt(e.target.value) || 0}
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Time (days)
                        </label>
                        <input
                          type="number"
                          value={formData.minimumDeliveryTime || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setFormData({...formData, minimumDeliveryTime: parseInt(e.target.value) || 0})
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="flex justify-end space-x-3">
                        <Button variant="outline" onClick={() => setEditMode(false)} className="bg-red-500 cursor-pointer">
                          Cancel
                        </Button>
                        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-500 cursor-pointer">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
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

                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Status</h4>
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                          design.isActive 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            design.isActive ? 'bg-white' : 'bg-gray-400'
                          }`} />
                          {design.isActive ? 'Active' : 'Inactive'}
                        </span>
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
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const AdminDesignsPage: React.FC = () => {
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Using your existing API calls
  const { data: designsResponse, isLoading, refetch } = useGet<DesignResponse>(["designs"], "/design");
  const designs = designsResponse?.response?.data || [];
  const { mutate: deleteDesign } = useDelete(["designs"], "/design");
  const { mutate: updateDesign } = usePatchDesign();

  const handleViewDesign = (design: Design): void => {
    setSelectedDesign(design);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedDesign(null);
  };

  const handleDelete = (id: string): void => {
    deleteDesign(id, {
      onSuccess: () => {
        toast({
          title: "Design deleted",
          description: "The design has been deleted successfully",
        });
        refetch();
      },
    });
  };



  const handleToggleActive = (id: string, isActive: boolean): void => {
  updateDesign({ id, isActive }, {
    onSuccess: () => {
      toast({
        title: "Status updated", 
        description: `Design ${isActive ? 'activated' : 'deactivated'} successfully`,
      });
      refetch();
    },
  });
};

  const handleUpdateDesign = (updatedDesign: Design): void => {
  updateDesign(updatedDesign, {
    onSuccess: () => {
      toast({
        title: "Design updated",
        description: "The design has been updated successfully",
      });
      refetch();
      setSelectedDesign(updatedDesign);
    },
  });
};


  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Designs</h1>
          <Link href="/admin/designs/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Design
            </Button>
          </Link>
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
          <h1 className="text-3xl font-bold text-gray-900">Designs</h1>
          <p className="text-gray-600 mt-1">
            {designs?.length || 0} design{designs?.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Link href="/admin/designs/new">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              New Design
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
                onDelete={handleDelete}
                onToggleActive={handleToggleActive} index={0}              />
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No designs found</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first design</p>
          <Link href="/admin/designs/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Design
            </Button>
          </Link>
        </motion.div>
      )}

      <DesignModal
        design={selectedDesign}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdateDesign}
      />
    </div>
  );
};

export default AdminDesignsPage;