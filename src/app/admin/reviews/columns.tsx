"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatDate } from "@/_utils/utils";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "User.name",
    header: "Client",
  },
  {
    accessorKey: "Booking.Design.title",
    header: "Design",
    cell: ({ row }) => row.original.Booking?.Design?.title || "Custom Design",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < row.original.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    ),
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => (
      <div className="flex items-center justify-center ">
        <div className="max-w-[300px] truncate text-center">
          {row.original.comment}
        </div>
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const review = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button  size="sm" className="bg-white text-gray-900 border cursor-pointer hover:bg-gray-100">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader className="pb-6 border-b">
              <DialogTitle className="text-xl font-semibold self-center justify-center text-gray-900">
                Customer Review Details
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-6 space-y-6">
              {/* Header Section with Client and Date */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {review.User?.name?.charAt(0) || "?"}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {review.User?.name || "Anonymous Customer"}
                      </h3>
                      <p className="text-sm text-gray-500">Verified Customer</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{formatDate(review.createdAt)}</p>
                  <p className="text-xs text-gray-500">Review Date</p>
                </div>
              </div>

              {/* Rating Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Overall Rating</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating 
                                ? "text-amber-400 fill-amber-400" 
                                : "text-gray-300 fill-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-gray-900">
                        {review.rating}.0
                      </span>
                      <span className="text-sm text-gray-500">out of 5</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      review.rating >= 4 
                        ? "bg-green-100 text-green-800"
                        : review.rating >= 3
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {review.rating >= 4 ? "Excellent" : review.rating >= 3 ? "Good" : "Needs Improvement"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Design Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Design Project</h4>
                <div className="bg-white border rounded-lg p-3">
                  <p className="font-medium text-gray-800">
                    {review.Booking?.Design?.title || "Custom Design Project"}
                  </p>
                </div>
              </div>

              {/* Comment Section */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Customer Feedback</h4>
                <div className="bg-white border rounded-lg p-4">
                  {review.comment ? (
                    <blockquote className="text-gray-700 leading-relaxed italic">
                      "{review.comment}"
                    </blockquote>
                  ) : (
                    <p className="text-gray-500 italic">No additional comments provided</p>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];