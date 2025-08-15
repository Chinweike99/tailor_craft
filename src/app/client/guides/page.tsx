"use client";

import { useGet } from "@/_utils/useApi";
// import { useGet } from "@/src/_hooks/useApi";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GuideCard from "./guide-card";
// import GuideCard from "@/src/_components/client/guide-card";

export default function ClientGuidesPage() {
  const { data: guides, isLoading } = useGet<any[]>(
    ["guides"],
    "/guide"
  );

  console.log("Guides data:", guides);

  // const guidesData = guides?

  const videoGuides = guides?.filter((guide) => guide.type === "VIDEO");
  const documentGuides = guides?.filter((guide) => guide.type === "DOCUMENT");
  const imageGuides = guides?.filter((guide) => guide.type === "IMAGE");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Measurement Guides</h1>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {guides?.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="videos">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {videoGuides?.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="documents">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {documentGuides?.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="images">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {imageGuides?.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}