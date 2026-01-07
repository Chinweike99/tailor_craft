"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ContactMessage } from "@/types/types";
import { Button } from "@/components/ui/Button";
import { MoreHorizontal, Eye, Trash, CheckCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<ContactMessage>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "subject",
        header: "Subject",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            return format(date, "MMM d, yyyy");
        },
    },
    {
        accessorKey: "read",
        header: "Status",
        cell: ({ row }) => {
            const isRead = row.getValue("read") as boolean;
            return (
                <Badge variant={isRead ? "secondary" : "default"}>
                    {isRead ? "Read" : "Unread"}
                </Badge>
            );
        },
    },
    // Actions column is handled by the page's onRowClick or we can add specific actions here if needed.
    // The DataTable component has onRowClick, so explicit actions for View might be redundant but good for accessibility.
];
