"use client";

import { useGet } from "@/_utils/useApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/_card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Scissors, DollarSign, Package } from "lucide-react";
import { useMemo } from "react";

export default function AdminDashboardPage() {
  const { data, isLoading } = useGet<any>(
    ["admin-stats"],
    "/client/stats",
    true,
    { staleTime: 2 * 60 * 1000 } // Cache for 2 minutes
  );

  const dashboardStats = useMemo(() => data?.stats, [data]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              // <div className="text-2xl font-bold">{stats?.totalClients || 0}</div>
              <div className="text-2xl font-bold">{dashboardStats?.totalClients || 0}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Scissors className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-2xl font-bold"> {dashboardStats?.totalBookings || 0}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">
                 ₦{(dashboardStats?.totalRevenue?.amount || 0).toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">
                {/* {stats?.pendingBookings || 0} */}
                 {dashboardStats?.pendingBookings || 0}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
            ) : dashboardStats?.recentBookings && dashboardStats.recentBookings.length > 0 ? (
              <div className="space-y-4">
                {dashboardStats.recentBookings.map((booking: any) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <h3 className="font-medium">
                        {booking.Design?.title || "Custom Design"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Client: {booking.User.name}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {booking.status}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent bookings</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : dashboardStats?.recentClients && dashboardStats.recentClients.length > 0 ? (
              <div className="space-y-4">
                {dashboardStats.recentClients.map((client: any) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <h3 className="font-medium">{client.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {client.email}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {client.phone}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent clients</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}