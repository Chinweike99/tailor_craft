"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge, Eye, Pencil, Trash2 } from "lucide-react";
import { formatCurrency } from "@/_utils/utils";
import { Button } from "@/components/ui/Button";


export const columns = (onDelete: (id: string) => void): ColumnDef<any>[] => [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge >
        {(row.getValue("category") as string).replace("_", " ")}
      </Badge>
    ),
  },
  {
    accessorKey: "priceRange",
    header: "Price Range",
    cell: ({ row }) => {
      const priceRange = row.getValue("priceRange") as { min: number; max: number };
      return `${formatCurrency(priceRange.min)} - ${formatCurrency(priceRange.max)}`;
    },
  },
  {
    accessorKey: "minimumDeliveryTime",
    header: "Delivery Time",
    cell: ({ row }) => `${row.getValue("minimumDeliveryTime")} days`,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge >
        {row.getValue("isActive") ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const design = row.original;
      return (
        <div className="flex space-x-2">
          <Link href={`/admin/designs/${design.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/admin/designs/${design.id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            // variant="destructive"
            size="sm"
            onClick={() => onDelete(design.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];