"use client";

import { useRouter, useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useToast } from "@/components/ui/components/use-toast";
import { useGet, usePost } from "@/_utils/useApi";
import { PAYSTACK_PUBLIC_KEY } from "@/_utils/constants";
import { Button } from "@/components/ui/components/button";

export default function PaymentPage() {
  const { id }: any = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<"full" | "installment">("full");

  const { data: booking, isLoading } = useGet<any>(
    ["booking", id],
    `/booking/${id}`
  );

  const { mutate: initializePayment, isPending } = usePost<
    { reference: string; authorization_url: string },
    { bookingId: string; isInstallment: boolean }
  >(["payment"], `/payment/${id}`);

  const config:any = {
    reference: new Date().getTime().toString(),
    email: booking?.User?.email || "",
    amount: paymentMethod === "full" ? booking?.totalAmount * 100 : booking?.totalAmount * 100 * 0.6,
    publicKey: PAYSTACK_PUBLIC_KEY,
    metadata: {
      bookingId: id,
      isInstallment: paymentMethod === "installment",
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
      variant: "destructive",
    });
  };

  const handlePayment = () => {
    initializePayment(
      {
        bookingId: id as string,
        isInstallment: paymentMethod === "installment",
      },
      {
        onSuccess: (data: any) => {
          initializePaystackPayment({onSuccess, onClose});
        },
        onError: (error: { message: any; }) => {
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
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payment</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium">Booking Details</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Design:</span>
                <span>{booking?.Design?.title || "Custom Design"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span>{booking?.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Date:</span>
                <span>
                  {new Date(booking?.deliveryDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium">Payment Options</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="full"
                  name="paymentMethod"
                  checked={paymentMethod === "full"}
                  onChange={() => setPaymentMethod("full")}
                />
                <label htmlFor="full" className="font-medium">
                  Pay Full Amount (₦{booking?.totalAmount?.toLocaleString()})
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="installment"
                  name="paymentMethod"
                  checked={paymentMethod === "installment"}
                  onChange={() => setPaymentMethod("installment")}
                />
                <label htmlFor="installment" className="font-medium">
                  Pay 60% Now (₦
                  {((booking?.totalAmount || 0) * 0.6).toLocaleString()}) + 40%
                  Later (₦
                  {((booking?.totalAmount || 0) * 0.4).toLocaleString()})
                </label>
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full"
                onClick={handlePayment}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isPending ? "Processing..." : "Proceed to Payment"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}