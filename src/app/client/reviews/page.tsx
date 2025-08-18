"use client";

import { useGet } from "@/_utils/useApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/_card";
import { Skeleton } from "@/components/ui/skeleton";
import ReviewCard from "./reviews-card";

export default function ClientReviewsPage() {
  const { data: reviews, isLoading } = useGet<any[]>(
    ["reviews"],
    "/review"
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Reviews</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              You haven't left any reviews yet
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}