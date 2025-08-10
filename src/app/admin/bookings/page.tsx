"use client";

import { BOOKING_STATUS } from "@/_utils/constants";
import { useGet } from "@/_utils/useApi";
import { columns } from "@/app/client/bookings/columns";
import { DataTable } from "@/components/shared/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminBookingsPage() {
  const { data: bookings, isLoading } = useGet<any>(
    ["admin-bookings"],
    "/booking/admin/all"
  );
  console.log("Booking ", bookings)

  // const allBookings = bookings || [];
  // const allBookings: any[] = Array.isArray(bookings) ? bookings : Array.isArray((bookings as any)?.bookings) ?(bookings as any).bookings : [];
  const allBookings: any[] = bookings?.response?.data || [];

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
        <h1 className="text-2xl font-bold">Manage Bookings</h1>
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