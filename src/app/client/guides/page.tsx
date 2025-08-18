
"use client";

import { useGet } from "@/_utils/useApi";
import { DataTable } from "@/components/shared/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GuideCard from "./guide-card";
import { clientColumns } from "./columns";

export default function ClientGuidesPage() {
  const { data: guidesData, isLoading } = useGet<any>(
    ["guides"],
    "/guide"
  );

  const guides = guidesData?.response.data || [];
  const guidesArray = Array.isArray(guides) ? guides : [];

  const videoGuides = guidesArray.filter((guide) => guide.type === "VIDEO");
  const documentGuides = guidesArray.filter((guide) => guide.type === "DOCUMENT");
  const imageGuides = guidesArray.filter((guide) => guide.type === "IMAGE");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Measurement Guides</h1>

      <Tabs defaultValue="table" className="space-y-6">
        {/* <TabsList>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="cards">Card View</TabsTrigger>
        </TabsList> */}

        <TabsContent value="table">
          <div className="space-y-4">
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <DataTable
                  columns={clientColumns}
                  data={guidesArray}
                  isLoading={isLoading}
                />
              </TabsContent>
              <TabsContent value="videos">
                <DataTable
                  columns={clientColumns}
                  data={videoGuides}
                  isLoading={isLoading}
                />
              </TabsContent>
              <TabsContent value="documents">
                <DataTable
                  columns={clientColumns}
                  data={documentGuides}
                  isLoading={isLoading}
                />
              </TabsContent>
              <TabsContent value="images">
                <DataTable
                  columns={clientColumns}
                  data={imageGuides}
                  isLoading={isLoading}
                />
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>

        <TabsContent value="cards">
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
                  {guidesArray.map((guide) => (
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
                  {videoGuides.map((guide) => (
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
                  {documentGuides.map((guide) => (
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
                  {imageGuides.map((guide) => (
                    <GuideCard key={guide.id} guide={guide} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}