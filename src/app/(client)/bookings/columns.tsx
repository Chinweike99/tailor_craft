"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { Eye, Pencil } from "lucide-react";
import { BOOKING_STATUS, PAYMENT_STATUS } from "@/_utils/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
// import { Button } from "@/components/ui/button";


export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "Design.title",
    header: "Design",
    cell: ({ row }) => {
      const design = row.original.Design;
      return design ? design.title : "Custom Design";
    },
  },
  {
    accessorKey: "deliveryDate",
    header: "Delivery Date",
    cell: ({ row }) => {
      const date = row.getValue("deliveryDate");
      return format(new Date(date as string), "PPP");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof BOOKING_STATUS;
      const statusMap = {
        [BOOKING_STATUS.PENDING]: "bg-yellow-500",
        [BOOKING_STATUS.APPROVED]: "bg-blue-500",
        [BOOKING_STATUS.IN_PROGRESS]: "bg-purple-500",
        [BOOKING_STATUS.COMPLETED]: "bg-green-500",
        [BOOKING_STATUS.DECLINED]: "bg-red-500",
        [BOOKING_STATUS.CANCELLED]: "bg-gray-500",
      };
      return (
        <Badge className={statusMap[status]}>
          {status.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => {
      const paymentStatus = row.getValue("paymentStatus");
      const paymentMap = {
        UNPAID: "bg-red-500",
        PARTIAL: "bg-yellow-500",
        SUCCESS: "bg-green-500",
      };
      return (
        <Badge className={paymentMap[paymentStatus as keyof typeof paymentMap]}>
          {PAYMENT_STATUS[paymentStatus as keyof typeof PAYMENT_STATUS]}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const booking = row.original;
      return (
        <div className="flex space-x-2">
          <Link href={`/client/bookings/${booking.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          {booking.status === BOOKING_STATUS.PENDING && (
            <Link href={`/client/bookings/${booking.id}/edit`}>
              <Button variant="outline" size="sm">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      );
    },
  },
];