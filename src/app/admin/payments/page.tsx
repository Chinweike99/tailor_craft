"use client";

import { useGet } from "@/_utils/useApi";
import { columns } from "./columns";
import { Button } from "@/components/ui/Button";
import { DollarSign } from "lucide-react";
import { formatCurrency } from "@/_utils/utils";
import { DataTable } from "@/components/shared/data-table";

export default function AdminPaymentsPage() {
  const { data: payments, isLoading } = useGet<any>(
    ["payments"],
    "/payment/all-payment"
  );

  const paymentsData = payments?.data || [];
  const paymentsArray = Array.isArray(paymentsData) ? paymentsData : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payment History</h1>
        <div className="flex items-center space-x-4">
          <Button disabled className="bg-white rounded-full text-[20px] font-bold  border text-black">
            {/* <DollarSign className="mr-2 h-4 w-4" /> */}
            <span className="mr-2">₦ </span>
            Total Revenue: {formatCurrency(
              paymentsArray?.reduce((acc, paymentsData) => acc + paymentsData.amount, 0) || 0
            )}
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={paymentsData || []}
        isLoading={isLoading}
      />
    </div>
  );
}