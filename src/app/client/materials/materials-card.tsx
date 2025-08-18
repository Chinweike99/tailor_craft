"use client";

import { Badge } from "@/components/ui/badge";

export default function MaterialCard({ material }: { material: any }) {
  return (
    <div className="rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-medium">{material.name}</h3>
      {material.description && (
        <p className="text-sm text-muted-foreground mt-2">
          {material.description}
        </p>
      )}
      <div className="mt-4">
        <Badge variant="outline">Available</Badge>
      </div>
    </div>
  );
}