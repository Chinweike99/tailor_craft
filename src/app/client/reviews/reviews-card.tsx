"use client";

import { formatDate } from "@/_utils/utils";
import { Star } from "lucide-react";

export default function ReviewCard({ review }: { review: any }) {
  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">
          {review.Booking?.Design?.title || "Custom Design"}
        </h3>
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {formatDate(review.createdAt)}
      </p>
      <p className="mt-4">{review.comment}</p>
    </div>
  );
}