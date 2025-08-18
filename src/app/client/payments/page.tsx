"use client";
import { useGet } from "@/_utils/useApi";
import { columns } from "./columns";
import { Button } from "@/components/ui/Button";
import { DollarSign } from "lucide-react";
import { formatCurrency } from "@/_utils/utils";
import { DataTable } from "@/components/shared/data-table";
import { useAuthStore } from "@/store/authstore";
import { USER_ROLES } from "@/_utils/constants";


export default function ClientPaymentsPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === USER_ROLES.ADMIN;
  
  const { data: payments, isLoading } = useGet<any>(
    ["payments", isAdmin ? "all" : "user"],
    isAdmin ? "/payment/history" : "/payment/history/user"
  );
  
  const paymentsData = payments?.data || [];
  const paymentsArray = Array.isArray(paymentsData) ? paymentsData : [];
  
  const totalAmount = paymentsArray?.reduce((acc, payment) => {
    if (isAdmin) {
      return acc + payment.amount;
    } else {
      return acc + payment.amount;
    }
  }, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payment History</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" disabled>
            <DollarSign className="mr-2 h-4 w-4" />
            {isAdmin ? "Total Payments" : "Total Spent"}: {formatCurrency(totalAmount)}
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={paymentsArray}
        isLoading={isLoading}
      />
    </div>
  );
}