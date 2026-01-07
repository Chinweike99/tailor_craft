"use client";

import { columns } from "./columns";
import { useRouter } from "next/navigation";
import { useGet } from "@/_utils/useApi";
import { DataTable } from "@/components/shared/data-table";
import { useMemo } from "react";
import { ContactMessage } from "@/types/types";

export default function AdminMessagesPage() {
    const router = useRouter();
    const { data: response, isLoading } = useGet<{ messages: ContactMessage[], total: number, success: boolean }>(
        ["messages"],
        "/contact",
        true,
        { staleTime: 3 * 60 * 1000 }
    );

    const messages = useMemo(() => response?.messages || [], [response]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Messages</h1>
            </div>

            <DataTable
                columns={columns}
                data={messages}
                isLoading={isLoading}
                onRowClick={(message) => router.push(`/admin/messages/${message.id}`)}
            />
        </div>
    );
}
