"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/_utils/utils";
import { useState, useEffect, useRef } from "react";
import { Eye, X, Play, FileText, Image as ImageIcon, ExternalLink } from "lucide-react";

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function GuideDetailsModal({ guide, isOpen, onClose }: { guide: any; isOpen: boolean; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isVideo = guide.type === "VIDEO";
  const isDocument = guide.type === "DOCUMENT";
  const isImage = guide.type === "IMAGE";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">{guide.title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Guide Type Badge */}
          <div className="flex items-center gap-2">
            {isVideo && <Play className="h-4 w-4" />}
            {isDocument && <FileText className="h-4 w-4" />}
            {isImage && <ImageIcon className="h-4 w-4" />}
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
              {guide.type}
            </span>
          </div>

          {/* Guide Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preview</h3>
            <div className="relative h-64 w-full bg-gray-100 rounded-lg overflow-hidden">
              {isVideo ? (
                <>
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                    <Play className="h-16 w-16 text-white" fill="white" />
                  </div>
                  {getYouTubeId(guide.resourceUrl) ? (
                    <img
                      src={`https://img.youtube.com/vi/${getYouTubeId(guide.resourceUrl)}/hqdefault.jpg`}
                      alt={guide.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Play className="h-16 w-16 mx-auto text-gray-400" />
                        <p className="mt-2 text-gray-500">Video Guide</p>
                      </div>
                    </div>
                  )}
                </>
              ) : isDocument ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <FileText className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">Document Guide</p>
                  </div>
                </div>
              ) : isImage ? (
                <img
                  src={guide.resourceUrl}
                  alt={guide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.parentElement?.querySelector('.fallback-content');
                    if (fallback) {
                      (fallback as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              {isImage && (
                <div className="fallback-content hidden items-center justify-center h-full">
                  <div className="text-center">
                    <ImageIcon className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">Image Guide</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Guide Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-500">Title</label>
                <p className="mt-1">{guide.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Type</label>
                <p className="mt-1">{guide.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Created</label>
                <p className="mt-1">{formatDate(guide.createdAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Updated</label>
                <p className="mt-1">{formatDate(guide.updatedAt)}</p>
              </div>
            </div>
            
            {guide.description && (
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="mt-1 text-gray-700">{guide.description}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              className="flex items-center gap-2 bg-white  border rounded-xl text-gray-700 hover:bg-gray-100"
            //   asChild
            >
              <a
                href={guide.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 "
              >
                <ExternalLink className="h-4 w-4" />
                Open Guide
              </a>
            </Button>
            <Button variant="outline" onClick={onClose} className="flex items-center gap-2 bg-red-500 text-white hover:bg-gray-100">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const clientColumns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const isVideo = type === "VIDEO";
      const isDocument = type === "DOCUMENT";
      const isImage = type === "IMAGE";

      return (
        <div className="flex items-center gap-2">
          {isVideo && <Play className="h-4 w-4" />}
          {isDocument && <FileText className="h-4 w-4" />}
          {isImage && <ImageIcon className="h-4 w-4" />}
          <span>{type}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const [showModal, setShowModal] = useState(false);
      const guide = row.original;

      return (
        <>
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 h-8 px-3"
            >
              <Eye className="h-4 w-4" />
              View
            </Button>
          </div>
          
          <GuideDetailsModal
            guide={guide}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
        </>
      );
    },
  },
];