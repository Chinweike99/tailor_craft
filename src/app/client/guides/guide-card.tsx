"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Play, FileText } from "lucide-react";

export default function GuideCard({ guide }: { guide: any }) {
  const isVideo = guide.type === "VIDEO";
  const isDocument = guide.type === "DOCUMENT";

  return (
    <div className="rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center">
        {isVideo ? (
          <>
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Play className="h-12 w-12 text-white" fill="white" />
            </div>
            <Image
              src={`https://img.youtube.com/vi/${getYouTubeId(guide.resourceUrl)}/hqdefault.jpg`}
              alt={guide.title}
              fill
              className="object-cover"
            />
          </>
        ) : isDocument ? (
          <div className="p-6 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Document Guide</p>
          </div>
        ) : (
          <Image
            src={guide.resourceUrl}
            alt={guide.title}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium">{guide.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {guide.description}
        </p>
        <div className="mt-3">
          <Button
            size="sm"
            className="w-full"
            asChild
          >
            <a
              href={guide.resourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Guide
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}