"use client";

import PopulationInsights from "@/components/hde/populationinsights"

export default function PopulationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <PopulationInsights />
      </div>
    </div>
  );
}
