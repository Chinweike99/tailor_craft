"use client";

import { useGet } from "@/_utils/useApi";
import { Skeleton } from "@/components/ui/skeleton";
import MaterialCard from "./materials-card";
// import MaterialCard from "@/src/_components/client/material-card";

export default function ClientMaterialsPage() {
  const { data: materials, isLoading } = useGet<any[]>(
    ["materials"],
    "/material"
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Available Materials</h1>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {materials?.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      )}
    </div>
  );
}