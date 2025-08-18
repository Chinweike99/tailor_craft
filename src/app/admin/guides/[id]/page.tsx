"use client";

import { useGet, usePatch } from "@/_utils/useApi";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/components/use-toast";
import { formatDate } from "@/_utils/utils";
import { ArrowLeft, Edit, ExternalLink, FileText, Video, Calendar, Clock, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Guide {
  id: string;
  title: string;
  description: string;
  type: "DOCUMENT" | "VIDEO";
  resourceUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface EditGuideData {
  title: string;
  description: string;
  type: "DOCUMENT" | "VIDEO";
  resourceUrl: string;
}

export default function GuideDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const guideId = params.id as string;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<EditGuideData>({
    title: "",
    description: "",
    type: "DOCUMENT",
    resourceUrl: "",
  });

  const { data: guideResponse, isLoading, error, refetch } = useGet<{
    status: string;
    response: Guide;
  }>(["guide", guideId], `/guide/${guideId}`);

  const guide = guideResponse?.response;

  const { mutate: updateGuide, isPending: isUpdating } = usePatch<any, any>(
    ["guide", guideId], 
    `/guide/${guideId}`
  );

  // Initialize form data when guide is loaded - Fixed: use useEffect instead of useState
  useEffect(() => {
    if (guide) {
      setEditForm({
        title: guide.title,
        description: guide.description,
        type: guide.type,
        resourceUrl: guide.resourceUrl,
      });
    }
  }, [guide]);

  const handleOpenEditModal = () => {
    if (guide) {
      setEditForm({
        title: guide.title,
        description: guide.description,
        type: guide.type,
        resourceUrl: guide.resourceUrl,
      });
      setIsEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditForm({
      title: "",
      description: "",
      type: "DOCUMENT",
      resourceUrl: "",
    });
  };

  const handleUpdateGuide = () => {
    updateGuide(editForm, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Guide updated successfully",
        });
        refetch();
        handleCloseEditModal();
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Failed to update guide",
          variant: "destructive",
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>
        </div>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Guide Not Found</h2>
          <p className="text-gray-600">The guide you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    return type === "VIDEO" ? (
      <Video className="h-5 w-5 text-blue-600" />
    ) : (
      <FileText className="h-5 w-5 text-green-600" />
    );
  };

  const getTypeBadge = (type: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    return type === "VIDEO" 
      ? `${baseClasses} bg-blue-100 text-blue-800`
      : `${baseClasses} bg-green-100 text-green-800`;
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900">Guide Details</h1>
        <div className="flex items-center justify-between ">
          <div className="flex items-center space-x-4">
            <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Guides
            </button>
            
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              className="bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
              onClick={handleOpenEditModal}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Guide
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-sm rounded-lg border">
          <div className="px-6 py-6">
            {/* Title and Type */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getTypeIcon(guide.type)}
                  <h2 className="text-xl font-semibold text-gray-900">{guide.title}</h2>
                </div>
                <span className={getTypeBadge(guide.type)}>
                  {guide.type}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-gray-700 mb-2 font-semibold underline text-md">Description</h3>
              <p className="text-gray-700 leading-relaxed p-3 bg-gray-50 rounded-lg shadow-xl border">{guide.description}</p>
            </div>

            {/* Resource URL */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Resource URL</h3>
              <div className="flex items-center space-x-2">
                <code className="bg-gray-100 px-3 py-2 rounded text-sm text-gray-800 flex-1">
                  {guide.resourceUrl}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(guide.resourceUrl, '_blank')}
                  className="bg-white text-gray-700 hover:bg-gray-50"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Created</p>
                  <p className="text-sm text-gray-600">{formatDate(guide.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Last Updated</p>
                  <p className="text-sm text-gray-600">{formatDate(guide.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white shadow-sm rounded-lg border">
          <div className="px-6 py-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Resource Preview</h3>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              {guide.type === "VIDEO" ? (
                <div className="space-y-4">
                  <Video className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Video Resource</p>
                    <Button
                      onClick={() => window.open(guide.resourceUrl, '_blank')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open Video
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Document Resource</p>
                    <Button
                      onClick={() => window.open(guide.resourceUrl, '_blank')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open Document
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal - Fixed: Added slide-in animation from right */}
      {isEditModalOpen && (
        <>
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-black/10 transition-opacity duration-300 z-40 ${
              isEditModalOpen ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}
            onClick={handleCloseEditModal}
          />
          
          {/* Modal */}
          <div 
            className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
              isEditModalOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                <h3 className="text-lg font-semibold text-gray-900">Edit Guide</h3>
                <button
                  onClick={handleCloseEditModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter guide title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value as "DOCUMENT" | "VIDEO" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="DOCUMENT">Document</option>
                    <option value="VIDEO">Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter guide description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resource URL
                  </label>
                  <input
                    type="url"
                    value={editForm.resourceUrl}
                    onChange={(e) => setEditForm({ ...editForm, resourceUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter resource URL"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 flex-shrink-0">
                <Button
                  variant="outline"
                  onClick={handleCloseEditModal}
                  disabled={isUpdating}
                  className="text-white bg-red-500"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateGuide}
                  disabled={isUpdating}
                  className="bg-white text-gray-900 hover:bg-gray-50"
                >
                  {isUpdating ? "Updating..." : "Update Guide"}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}