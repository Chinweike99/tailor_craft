"use client";

// import { useGet } from "@/src/_hooks/useApi";
import { useParams, useRouter } from "next/navigation";
// import { Button } from "@/src/_components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useGet } from "@/_utils/useApi";
import { Button } from "@/components/ui/components/button";
// import ClientDetails from "@/src/_components/admin/client-details";
// import ClientBookings from "@/src/_components/admin/client-bookings";

export default function ClientDetailsPage() {
  const { id }: any = useParams();
  const router = useRouter();

  const { data: client, isLoading } = useGet<any>(
    ["client", id],
    `/client/${id}`
  );

  console.log("My clinet: ", client)


  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          // size="icon"
          onClick={() => router.push("/admin/clients")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">
          {isLoading ? "Loading..." : client?.name}
        </h1>
      </div>

      {client && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* <ClientDetails client={client} />
          <ClientBookings clientId={id as string} /> */}
        </div>
      )}
    </div>
  );
}