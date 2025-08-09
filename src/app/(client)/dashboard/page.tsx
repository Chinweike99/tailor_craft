"use client";

// import { useGet } from "@/src/_hooks/useApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/_card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { CalendarDays, Scissors, Clock, CheckCircle } from "lucide-react";
import { useAuthStore } from "@/store/authstore";
import { useGet } from "@/_utils/useApi";
import { BOOKING_STATUS } from "@/_utils/constants";
// import {Card} from "@/components/ui/_card";

export default function ClientDashboardPage() {
  const { user } = useAuthStore();
  const { data: bookings, isLoading } = useGet<any[]>(
    ["bookings"],
    "/booking"
  );

  const upcomingBookings = bookings?.filter(
    (booking) =>
      booking.status === BOOKING_STATUS.APPROVED ||
      booking.status === BOOKING_STATUS.IN_PROGRESS
  );

  const pendingBookings = bookings?.filter(
    (booking) => booking.status === BOOKING_STATUS.PENDING
  );

  const completedBookings = bookings?.filter(
    (booking) => booking.status === BOOKING_STATUS.COMPLETED
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Scissors className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">{bookings?.length || 0}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">
                {upcomingBookings?.length || 0}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">
                {pendingBookings?.length || 0}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">
                {completedBookings?.length || 0}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : upcomingBookings && upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <h3 className="font-medium">
                        {booking.Design?.title || "Custom Design"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Delivery: {format(new Date(booking.deliveryDate), "PPP")}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {booking.status}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No upcoming bookings
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : bookings && bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <h3 className="font-medium">
                        {booking.Design?.title || "Custom Design"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(booking.createdAt), "PPP")}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {booking.status}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No bookings yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}