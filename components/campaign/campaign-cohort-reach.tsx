"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type Cohort = {
  name: string
  count: number
  reachPercentage: number
}

type CampaignCohortReachProps = {
  campaignId: string
  cohorts: Cohort[]
}

export default function CampaignCohortReach({ campaignId, cohorts }: CampaignCohortReachProps) {
  // Colors for the bars
  const colors = ["#38bdf8", "#2dd4bf", "#a3e635", "#f59e0b", "#f472b6"]

  return (
    <div className="w-full h-[300px] overflow-hidden">
      <ChartContainer
        config={{
          reachPercentage: {
            label: "Reach Percentage",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cohorts} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <YAxis dataKey="name" type="category" width={120} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="reachPercentage" radius={[0, 4, 4, 0]}>
              {cohorts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
              <LabelList dataKey="reachPercentage" position="right" formatter={(value: number) => `${value}%`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
