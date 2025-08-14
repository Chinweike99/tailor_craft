"use client";

import { useDelete, useGet } from "@/_utils/useApi";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/components/use-toast";
// import { useGet, useDelete } from "@/src/_hooks/useApi";
// import { DataTable } from "@/src/_components/admin/data-table";
// import { columns } from "./columns";
// import { Button } from "@/src/_components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";
// import { useToast } from "@/src/_components/ui/use-toast";

export default function AdminGuidesPage() {
  const { toast } = useToast();
  const { data: guides, isLoading, refetch } = useGet<any>(
    ["guides"],
    "/guide"
  );

  // console.log("Measurement Guides", guides);
  const guidesData = guides?.response?.data 

  const { mutate: deleteGuide } = useDelete(["guides"], "/guide");

  const handleDelete = (id: string) => {
    deleteGuide(id, {
      onSuccess: () => {
        toast({
          title: "Guide deleted",
          description: "The guide has been deleted successfully",
        });
        refetch();
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Measurement Guides</h1>
        <Link href="/admin/guides/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Guide
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns(handleDelete)}
        data={guidesData || []}
        isLoading={isLoading}
      />
    </div>
  );
}