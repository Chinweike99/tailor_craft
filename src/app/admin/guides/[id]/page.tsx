"use client";

import { useGet } from "@/_utils/useApi";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/components/use-toast";
import { formatDate } from "@/_utils/utils";
import { ArrowLeft, Edit, ExternalLink, FileText, Video, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface Guide {
  id: string;
  title: string;
  description: string;
  type: "DOCUMENT" | "VIDEO";
  resourceUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function GuideDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const guideId = params.id as string;

  // Fixed the type definition - removed function signatures and used proper data types
  const { data: guideResponse, isLoading, error } = useGet<{
    status: string;
    response: Guide;
  }>(["guide", guideId], `/guide/${guideId}`);

  const guide = guideResponse?.response;
  console.log("Guide Details", guideResponse);
  console.log("Guide Details", guide);

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
          <p className="text-gray-600">The guide you're looking for doesn't exist or has been removed.</p>
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Guides
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Guide Details</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/admin/guides/${guide.id}/edit`}>
            <Button variant="outline" className="bg-white text-gray-700 hover:bg-gray-50 cursor-pointer">
              <Edit className="mr-2 h-4 w-4" />
              Edit Guide
            </Button>
          </Link>
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
            <h3 className=" text-gray-700 mb-2 font-semibold underline text-md">Description</h3>
            <p className="text-gray-600 leading-relaxed">{guide.description}</p>
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
  );
}