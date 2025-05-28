"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DataOverview from "@/components/hde/dataoverview"
import DataSources from "@/components/hde/datasources"
import { DataQuality } from "@/components/hde/dataquality"

export default function HDEStatusPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
            <TabsTrigger value="quality">Enrichment</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <DataOverview />
          </TabsContent>
          <TabsContent value="sources" className="space-y-6">
            <DataSources />
          </TabsContent>
          <TabsContent value="quality" className="space-y-6">
            <DataQuality />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}