"use client";

import { Button } from "@/components/ui/Button";
import { useRouter, useParams } from "next/navigation";
import { Loader2, ArrowLeft, CheckCircle, CreditCard, Calendar, User, Package, DollarSign, Shield } from "lucide-react";
import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useToast } from "@/components/ui/components/use-toast";
import { useGet, usePost } from "@/_utils/useApi";
import { PAYSTACK_PUBLIC_KEY } from "@/_utils/constants";
import { formatCurrency } from "@/_utils/utils";

export default function PaymentPage() {
  const { id }: any = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<"full" | "installment">("full");

  const { data: bookingData, isLoading } = useGet<any>(
    ["booking", id],
    `/booking/${id}`
  );

  console.log("Booking data:", bookingData);
  const booking = bookingData?.getbooking || []

  const { mutate: initializePayment, isPending } = usePost<
    { reference: string; authorization_url: string },
    { bookingId: string; isInstallment: boolean }
  >(["payment"], `/payment/${id}`);

  const config = {
    reference: new Date().getTime().toString(),
    email: booking?.User?.email || "",
    amount: paymentMethod === "full"
      ? (booking?.totalAmount || 0) * 100
      : (booking?.totalAmount || 0) * 100 * 0.6,
    publicKey: PAYSTACK_PUBLIC_KEY,
    metadata: {
      custom_fields: [
        {
          display_name: "Booking ID",
          variable_name: "bookingId",
          value: id,
        },
        {
          display_name: "Installment",
          variable_name: "isInstallment",
          value: paymentMethod === "installment" ? "Yes" : "No",
        },
      ],
    },
  };

  const initializePaystackPayment = usePaystackPayment(config);

  const onSuccess = (reference: any) => {
    console.log("Payment successful", reference);
    toast({
      title: "Payment successful",
      description: "Your payment has been processed successfully",
    });
    router.push(`/client/bookings/${id}`);
  };

  const onClose = () => {
    console.log("Payment closed");
    toast({
      title: "Payment cancelled",
      description: "You cancelled the payment",
    });
  };

  const handlePayment = () => {
    initializePayment(
      {
        bookingId: id as string,
        isInstallment: paymentMethod === "installment",
      },
      {
        onSuccess: (data) => {
          initializePaystackPayment({
            onSuccess,
            onClose,
          });
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message || "Failed to initialize payment",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-600 mb-4" />
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking || booking.status !== "APPROVED") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Booking Not Available
          </h2>
          <p className="text-gray-600 mb-6">
            Only approved bookings are eligible for payment processing.
          </p>
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bookings
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Secure Payment</h1>
              <p className="text-gray-600">Complete your booking payment safely</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Booking Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Booking Summary
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex  items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex items-center  gap-3 justify-center">
                      <p className="text-sm font-medium text-gray-500">Design</p>
                      <p className="text-gray-900">{booking?.Design?.title || "Custom Design"}</p>
                    </div>
                  </div>
                  
                  <div className="flex  items-center gap-3 justify-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Client</p>
                      <p className="text-gray-900">{booking?.User?.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex items-center  gap-3 justify-center">
                      <p className="text-sm font-medium text-gray-500">Delivery Date</p>
                      <p className="text-gray-900">
                        {new Date(booking?.deliveryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex  items-center gap-3 justify-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center  gap-3 justify-center">
                      <p className="text-sm font-medium text-gray-500">Status</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Payment Details
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {formatCurrency(booking?.totalAmount || 0)}
                    </span>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-3">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === "full" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("full")}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="full"
                        name="paymentMethod"
                        checked={paymentMethod === "full"}
                        onChange={() => setPaymentMethod("full")}
                        className="text-blue-600"
                      />
                      <div className="flex-1">
                        <label htmlFor="full" className="font-medium text-gray-900 cursor-pointer">
                          Pay Full Amount
                        </label>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(booking?.totalAmount || 0)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === "installment" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("installment")}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="installment"
                        name="paymentMethod"
                        checked={paymentMethod === "installment"}
                        onChange={() => setPaymentMethod("installment")}
                        className="text-blue-600"
                      />
                      <div className="flex-1">
                        <label htmlFor="installment" className="font-medium text-gray-900 cursor-pointer">
                          Installment Payment
                        </label>
                        <p className="text-sm text-gray-600">
                          Pay {formatCurrency((booking?.totalAmount || 0) * 0.6)} now
                        </p>
                        <p className="text-xs text-gray-500">
                          Remaining {formatCurrency((booking?.totalAmount || 0) * 0.4)} due later
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer text-white"
                  onClick={handlePayment}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Proceed to Payment
                    </>
                  )}
                </Button>

                {/* Security Notice */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-600">
                        Your payment is secured with industry-standard encryption. 
                        We don't store your payment information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}