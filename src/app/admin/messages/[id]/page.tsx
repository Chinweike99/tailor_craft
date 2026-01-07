"use client";

import { useParams, useRouter } from "next/navigation";
import { useGet, usePatch, useDelete } from "@/_utils/useApi";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/_card";
import { ArrowLeft, Trash, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { ContactMessage } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function MessageDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { data: response, isLoading } = useGet<{ message: ContactMessage, success: boolean }>(
        ["message", id],
        `/contact/${id}`,
        !!id
    );

    const message = response?.message;

    const { mutate: markAsRead, isPending: isMarkingRead } = usePatch(
        ["message", id],
        `/contact/${id}/read`
    );

    const { mutate: deleteMessage, isPending: isDeleting } = useDelete(
        ["messages"],
        "/contact"
    );

    if (isLoading) {
        return <Skeleton className="h-[400px] w-full" />;
    }

    if (!message) {
        return <div>Message not found</div>;
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
                <h1 className="text-2xl font-bold">Message Details</h1>
            </div>

            <Card>
                <CardHeader className="border-b bg-gray-50/50">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <CardTitle className="text-xl flex items-center gap-2">
                                {message.subject}
                                <Badge variant={message.read ? "secondary" : "default"}>
                                    {message.read ? "Read" : "Unread"}
                                </Badge>
                            </CardTitle>
                            <div className="text-sm text-muted-foreground flex flex-col gap-1">
                                <span>From: <span className="font-medium text-foreground">{message.name}</span> ({message.email})</span>
                                <span>Date: {format(new Date(message.createdAt), "PPP p")}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {!message.read && (
                                <Button
                                    variant="outline"
                                    onClick={() => markAsRead({})}
                                    disabled={isMarkingRead}
                                >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Mark as Read
                                </Button>
                            )}
                            <Button
                                // variant="destructive"
                                onClick={() => {
                                    if (confirm("Are you sure you want to delete this message?")) {
                                        deleteMessage(id, {
                                            onSuccess: () => {
                                                router.push("/admin/messages");
                                            }
                                        });
                                    }
                                }}
                                disabled={isDeleting}
                            >
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="prose max-w-none whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                        {message.message}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
