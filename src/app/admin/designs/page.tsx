"use client";

import { useGet, useDelete } from "@/src/_hooks/useApi";
import { DataTable } from "@/src/_components/admin/data-table";
import { columns } from "./columns";
import { Button } from "@/src/_components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/src/_components/ui/use-toast";

export default function AdminDesignsPage() {
  const { toast } = useToast();
  const { data: designs, isLoading, refetch } = useGet<any[]>(
    ["designs"],
    "/design"
  );

  const { mutate: deleteDesign } = useDelete(["designs"], "/design");

  const handleDelete = (id: string) => {
    deleteDesign(id, {
      onSuccess: () => {
        toast({
          title: "Design deleted",
          description: "The design has been deleted successfully",
        });
        refetch();
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Designs</h1>
        <Link href="/admin/designs/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Design
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns(handleDelete)}
        data={designs || []}
        isLoading={isLoading}
      />
    </div>
  );
}