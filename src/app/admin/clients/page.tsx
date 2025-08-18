"use client";

import { columns } from "./columns";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGet } from "@/_utils/useApi";
import { DataTable } from "@/components/shared/data-table";

export default function AdminClientsPage() {
  const router = useRouter();
  const { data: clients, isLoading } = useGet<any>(
    ["clients"],
    "/client"
  );

  console.log("This is Admin Client Page: ", clients)
  const clientList = clients?.resonse?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={clientList || []}
        isLoading={isLoading}
        onRowClick={(client: { id: any; }) => router.push(`/admin/clients/${client.id}`)}
      />
    </div>
  );
}