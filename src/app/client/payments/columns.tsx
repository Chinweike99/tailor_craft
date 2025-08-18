"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/_utils/utils";;
import { Button } from "@/components/ui/Button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { PAYMENT_STATUS } from "@/_utils/constants";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "Booking.Design.title",
    header: "Design",
    cell: ({ row }) => row.original.Booking?.Design?.title || "Custom Design",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.getValue("amount")),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof PAYMENT_STATUS;
      const statusMap: any = {
        [PAYMENT_STATUS.SUCCESS]: "bg-green-500",
        [PAYMENT_STATUS.PENDING]: "bg-yellow-500",
        [PAYMENT_STATUS.PROCESSING]: "bg-blue-500",
        [PAYMENT_STATUS.UNPAID]: "bg-red-500",
      };
      return (
        <Badge className={statusMap[status] || "bg-gray-500"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isInstallment",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.getValue("isInstallment") ? "Installment" : "Full Payment"}
      </Badge>
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
      const payment = row.original;
      return (
        <Link href={`/client/bookings/${payment.bookingId}`}>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      );
    },
  },
];