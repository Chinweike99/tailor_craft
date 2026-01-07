"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Feedback } from "@/types/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { Trash, CheckCircle } from "lucide-react";
import { usePatch, useDelete } from "@/_utils/useApi";

export const columns: ColumnDef<Feedback>[] = [
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "message",
        header: "Message",
        cell: ({ row }) => {
            return <div className="truncate max-w-md">{row.getValue("message")}</div>
        }
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
        accessorKey: "isRead",
        header: "Status",
        cell: ({ row }) => {
            const isRead = row.getValue("isRead") as boolean;
            return (
                <Badge variant={isRead ? "secondary" : "default"}>
                    {isRead ? "Read" : "Unread"}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const feedback = row.original;
            // eslint-disable-next-line
            const { mutate: markAsRead, isPending: isMarkingRead } = usePatch(
                ["feedback"],
                `/feedback/${feedback.id}/read`
            );
            // eslint-disable-next-line
            const { mutate: deleteFeedback, isPending: isDeleting } = useDelete(
                ["feedback"],
                "/feedback"
            );

            return (
                <div className="flex items-center gap-2">
                    {!feedback.isRead && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                markAsRead({});
                            }}
                            disabled={isMarkingRead}
                            title="Mark as Read"
                        >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (confirm("Are you sure?")) {
                                deleteFeedback(feedback.id);
                            }
                        }}
                        disabled={isDeleting}
                        title="Delete"
                    >
                        <Trash className="h-4 w-4 text-red-600" />
                    </Button>
                </div>
            )
        }
    }
];
