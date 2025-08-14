"use client";


import { useGet } from "@/_utils/useApi";
import { columns } from "./columns";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/shared/data-table";

export default function AdminReviewsPage() {
  const { data: reviews, isLoading } = useGet<any[]>(
    ["reviews"],
    "/review/admin"
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Client Reviews</h1>
        <Button variant="outline" disabled>
          <Star className="mr-2 h-4 w-4" />
          View Ratings
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={reviews || []}
        isLoading={isLoading}
      />
    </div>
  );
}