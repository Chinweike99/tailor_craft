"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { Badge } from "@/src/_components/ui/badge";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/_utils/utils";


export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "User.name",
    header: "Client",
  },
  {
    accessorKey: "Booking.Design.title",
    header: "Design",
    cell: ({ row }) => row.original.Booking?.Design?.title || "Custom Design",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < row.original.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    ),
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">{row.original.comment}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const review = row.original;
      return (
        <Button variant="outline" size="sm">
          View Details
        </Button>
      );
    },
  },
];