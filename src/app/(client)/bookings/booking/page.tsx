"use client";

// import { useGet } from "@/src/_hooks/useApi";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { columns } from "../columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGet } from "@/_utils/useApi";
import { BOOKING_STATUS } from "@/_utils/constants";
import { DataTable } from "@/components/shared/data-table";

export default function BookingsPage() {
  const { data: bookings, isLoading } = useGet<any[]>(
    ["bookings"],
    "/booking"
  );

  const allBookings = bookings || [];
  const pendingBookings = allBookings.filter(
    (booking) => booking.status === BOOKING_STATUS.PENDING
  );
  const approvedBookings = allBookings.filter(
    (booking) => booking.status === BOOKING_STATUS.APPROVED
  );
  const inProgressBookings = allBookings.filter(
    (booking) => booking.status === BOOKING_STATUS.IN_PROGRESS
  );
  const completedBookings = allBookings.filter(
    (booking) => booking.status === BOOKING_STATUS.COMPLETED
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <Link href="/client/bookings/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Booking
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <DataTable
            columns={columns}
            data={allBookings}
            isLoading={isLoading}
          />
        </TabsContent>
        <TabsContent value="pending">
          <DataTable
            columns={columns}
            data={pendingBookings}
            isLoading={isLoading}
          />
        </TabsContent>
        <TabsContent value="approved">
          <DataTable
            columns={columns}
            data={approvedBookings}
            isLoading={isLoading}
          />
        </TabsContent>
        <TabsContent value="in_progress">
          <DataTable
            columns={columns}
            data={inProgressBookings}
            isLoading={isLoading}
          />
        </TabsContent>
        <TabsContent value="completed">
          <DataTable
            columns={columns}
            data={completedBookings}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}