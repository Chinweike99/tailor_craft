"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { Badge } from "@/src/_components/ui/badge";
// import { Button } from "@/src/_components/ui/button";
import Link from "next/link";
import { Badge, Eye, Trash2 } from "lucide-react";
import { formatDate } from "@/_utils/utils";
import { Button } from "@/components/ui/Button";
// import { formatDate } from "@/src/_utils/utils";

export const columns: ColumnDef<{id: any}>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
    cell: ({ row }) => (
      <Badge >
        {row.getValue("isVerified") ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;
      return (
        <div className="flex space-x-2">
          <Link href={`/admin/clients/${client.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Button  size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];