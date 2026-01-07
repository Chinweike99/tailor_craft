"use client";

import { columns } from "./columns";
import { useGet } from "@/_utils/useApi";
import { DataTable } from "@/components/shared/data-table";
import { useState, useMemo } from "react";
import { Feedback } from "@/types/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";

export default function AdminFeedbackPage() {
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
    const { data: response, isLoading } = useGet<{ feedbacks: Feedback[], total: number, success: boolean }>(
        ["feedback"],
        "/feedback",
        true,
        { staleTime: 3 * 60 * 1000 }
    );

    const feedbackList = useMemo(() => response?.feedbacks || [], [response]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Feedback</h1>
            </div>

            <DataTable
                columns={columns}
                data={feedbackList}
                isLoading={isLoading}
                onRowClick={(feedback) => setSelectedFeedback(feedback)}
            />

            <Dialog open={!!selectedFeedback} onOpenChange={(open) => !open && setSelectedFeedback(null)}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Feedback Details</DialogTitle>
                        <DialogDescription>
                            Review the feedback submitted by the user.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedFeedback && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium text-right text-sm">Email:</span>
                                <span className="col-span-3 text-sm">{selectedFeedback.email}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium text-right text-sm">Date:</span>
                                <span className="col-span-3 text-sm">
                                    {format(new Date(selectedFeedback.createdAt), "PPP p")}
                                </span>
                            </div>
                            <div className="space-y-2 mt-2">
                                <span className="font-medium text-sm block">Message:</span>
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm border whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                                    {selectedFeedback.message}
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button onClick={() => setSelectedFeedback(null)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
