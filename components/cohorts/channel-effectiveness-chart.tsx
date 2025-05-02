"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for different journeys and cohorts
const channelData = {
  medication: {
    default: [
      { name: "SMS", value: 78 },
      { name: "Email", value: 65 },
      { name: "Portal", value: 52 },
      { name: "Call", value: 43 },
      { name: "Mail", value: 31 },
    ],
    "seniors-65+": [
      { name: "Call", value: 82 },
      { name: "Mail", value: 75 },
      { name: "SMS", value: 45 },
      { name: "Email", value: 38 },
      { name: "Portal", value: 25 },
    ],
    "chronic-conditions": [
      { name: "SMS", value: 85 },
      { name: "Portal", value: 72 },
      { name: "Email", value: 68 },
      { name: "Call", value: 55 },
      { name: "Mail", value: 42 },
    ],
    "new-prescriptions": [
      { name: "SMS", value: 88 },
      { name: "Email", value: 75 },
      { name: "Portal", value: 62 },
      { name: "Call", value: 48 },
      { name: "Mail", value: 35 },
    ],
    "non-adherent": [
      { name: "Call", value: 75 },
      { name: "SMS", value: 72 },
      { name: "Mail", value: 58 },
      { name: "Email", value: 45 },
      { name: "Portal", value: 32 },
    ],
  },
  caregap: {
    default: [
      { name: "SMS", value: 72 },
      { name: "Email", value: 68 },
      { name: "Portal", value: 55 },
      { name: "Call", value: 48 },
      { name: "Mail", value: 35 },
    ],
  },
  chronic: {
    default: [
      { name: "SMS", value: 82 },
      { name: "Portal", value: 75 },
      { name: "Email", value: 65 },
      { name: "Call", value: 58 },
      { name: "Mail", value: 42 },
    ],
  },
  wellness: {
    default: [
      { name: "Email", value: 78 },
      { name: "SMS", value: 72 },
      { name: "Portal", value: 65 },
      { name: "Call", value: 52 },
      { name: "Mail", value: 45 },
    ],
  },
  onboarding: {
    default: [
      { name: "Email", value: 85 },
      { name: "Portal", value: 75 },
      { name: "SMS", value: 68 },
      { name: "Mail", value: 55 },
      { name: "Call", value: 42 },
    ],
  },
  highrisk: {
    default: [
      { name: "Call", value: 88 },
      { name: "SMS", value: 72 },
      { name: "Portal", value: 65 },
      { name: "Email", value: 58 },
      { name: "Mail", value: 48 },
    ],
  },
  discharge: {
    default: [
      { name: "Call", value: 92 },
      { name: "SMS", value: 78 },
      { name: "Portal", value: 65 },
      { name: "Email", value: 52 },
      { name: "Mail", value: 38 },
    ],
  },
  sdoh: {
    default: [
      { name: "Call", value: 85 },
      { name: "Mail", value: 72 },
      { name: "SMS", value: 58 },
      { name: "Email", value: 45 },
      { name: "Portal", value: 32 },
    ],
  },
  digital: {
    default: [
      { name: "Portal", value: 92 },
      { name: "Email", value: 85 },
      { name: "SMS", value: 78 },
      { name: "Call", value: 42 },
      { name: "Mail", value: 28 },
    ],
  },
  benefits: {
    default: [
      { name: "Email", value: 82 },
      { name: "Portal", value: 75 },
      { name: "SMS", value: 68 },
      { name: "Mail", value: 55 },
      { name: "Call", value: 48 },
    ],
  },
}

// Custom colors for the bars
const COLORS = ["#38bdf8", "#22d3ee", "#2dd4bf", "#4ade80", "#a3e635"]

type ChannelEffectivenessChartProps = {
  journeyId: string
  cohortId: string | null
}

export default function ChannelEffectivenessChart({ journeyId, cohortId }: ChannelEffectivenessChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Get data for the selected journey and cohort
    const journeyChannels = channelData[journeyId as keyof typeof channelData]
    if (!journeyChannels) return

    const cohortKey = cohortId || "default"
    const cohortData = journeyChannels[cohortKey as keyof typeof journeyChannels] || journeyChannels.default

    setData(cohortData)
  }, [journeyId, cohortId])

  return (
    <div className="h-[300px] w-full">
      <ChartContainer
        config={{
          Effectiveness: {
            label: "Effectiveness",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <YAxis dataKey="name" type="category" width={60} />
            <ChartTooltip
              formatter={(value: number) => [`${value}%`, "Effectiveness"]}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
