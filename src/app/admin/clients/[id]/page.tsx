"use client";

import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Mail, Phone, MapPin, Calendar, Eye, X } from "lucide-react";
import { useGet } from "@/_utils/useApi";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import Image from "next/image";

interface Address {
  city: string;
  state: string;
  street: string;
  country: string;
}

interface CustomDesign {
  title: string;
  images: string[];
  description: string;
}

interface Measurements {
  hips: number;
  chest: number;
  waist: number;
  length: number;
}

interface Booking {
  id: string;
  userId: string;
  designId: string | null;
  customDesign: CustomDesign;
  measurements: Measurements;
  deliveryDate: string;
  notes: string | null;
  status: string;
  paymentStatus: string;
  declineReason: string | null;
  hasReview: boolean;
  createdAt: string;
  updatedAt: string;
  totalAmount: number | null;
}

interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  address: Address;
  preferredPickupAddress: Address;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  Booking: Booking[];
}

export default function ClientDetailsPage() {
  const { id }: any = useParams();
  const router = useRouter();
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);

  const { data: client, isLoading } = useGet<{ response: ClientData }>(
    ["client", id],
    `/client/${id}`
  );

  const clientData = client?.response;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "unpaid":
        return "bg-red-100 text-red-800";
      case "partial":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
  <div className="flex items-center justify-center h-screen w-full">
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => router.push("/admin/clients")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
      {/* Spinner animation */}
      <div className="w-10 h-10 border-4 border-[#efc22e] border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
);
  }

  if (!clientData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4 cursor-pointer">
          <Button variant="outline" onClick={() => router.push("/admin/clients")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Client not found</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => router.push("/admin/clients")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">{clientData.name}</h1>
          </div>
          <Button onClick={() => setIsBookingsModalOpen(true)} 
            className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer"
            >
            <Eye className="h-4 w-4 mr-2" />
            View Bookings ({clientData.Booking?.length || 0})
          </Button>
        </div>

        {/* Client Profile */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  {clientData.profileImage ? (
                    <Image
                      src={clientData.profileImage}
                      alt={clientData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-bold">
                      {clientData.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-semibold mb-2">{clientData.name}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  Client since {formatDate(clientData.createdAt)}
                </p>
              </div>

              <div className="space-y-3 mt-6">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">{clientData.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">{clientData.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-3">About</h3>
              <p className="text-gray-700">{clientData.bio || "No bio available"}</p>
            </div>

            {/* Address Information */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Home Address */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                  Home Address
                </h3>
                <div className="text-gray-700 space-y-1">
                  <p>{clientData.address?.street}</p>
                  <p>{clientData.address?.city}, {clientData.address?.state}</p>
                  <p>{clientData.address?.country}</p>
                </div>
              </div>

              {/* Preferred Pickup Address */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                  Preferred Pickup
                </h3>
                <div className="text-gray-700 space-y-1">
                  <p>{clientData.preferredPickupAddress?.street}</p>
                  <p>{clientData.preferredPickupAddress?.city}, {clientData.preferredPickupAddress?.state}</p>
                  <p>{clientData.preferredPickupAddress?.country}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Statistics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {clientData.Booking?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Total Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {clientData.Booking?.filter(b => b.status.toLowerCase() === 'completed')?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {clientData.Booking?.filter(b => b.status.toLowerCase() === 'pending')?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Modal */}
      {isBookingsModalOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">
                {clientData.name}&apos;s Bookings ({clientData.Booking?.length || 0})
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookingsModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="overflow-auto max-h-[calc(90vh-120px)]">
              {clientData.Booking && clientData.Booking?.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Design
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Measurements
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delivery Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clientData.Booking.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.customDesign?.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.customDesign?.description}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <div>Chest: {booking.measurements?.chest}&quot;</div>
                            <div>Waist: {booking.measurements?.waist}&quot;</div>
                            <div>Hips: {booking.measurements?.hips}&quot;</div>
                            <div>Length: {booking.measurements?.length}&quot;</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            {formatDate(booking.deliveryDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                            {booking.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(booking.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No bookings found for this client.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}