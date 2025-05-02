"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type CampaignPerformanceChartProps = {
  campaignId: string
}

export default function CampaignPerformanceChart({ campaignId }: CampaignPerformanceChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Generate mock data for the chart
    const generateData = () => {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      const weeks = 4
      const result = []

      for (let week = 1; week <= weeks; week++) {
        for (let i = 0; i < days.length; i++) {
          const day = days[i]
          const date = `Week ${week} - ${day}`

          // Base values that increase over time
          const baseDelivery = 85 + Math.random() * 10
          const baseOpen = 65 + Math.random() * 15 + (week - 1) * 2
          const baseClick = 40 + Math.random() * 10 + (week - 1) * 3
          const baseConversion = 20 + Math.random() * 8 + (week - 1) * 2

          result.push({
            date,
            "Delivery Rate": Math.min(100, Math.round(baseDelivery + Math.random() * 5)),
            "Open Rate": Math.min(100, Math.round(baseOpen + Math.random() * 8)),
            "Click Rate": Math.min(100, Math.round(baseClick + Math.random() * 6)),
            "Conversion Rate": Math.min(100, Math.round(baseConversion + Math.random() * 4)),
          })
        }
      }

      return result
    }

    setData(generateData())
  }, [campaignId])

  return (
    <div className="w-full h-[400px] overflow-hidden">
      <ChartContainer
        config={{
          "Delivery Rate": {
            label: "Delivery Rate",
            color: "hsl(var(--chart-1))",
          },
          "Open Rate": {
            label: "Open Rate",
            color: "hsl(var(--chart-2))",
          },
          "Click Rate": {
            label: "Click Rate",
            color: "hsl(var(--chart-3))",
          },
          "Conversion Rate": {
            label: "Conversion Rate",
            color: "hsl(var(--chart-4))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="Delivery Rate"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={{ r: 0 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Open Rate"
              stroke="#2dd4bf"
              strokeWidth={2}
              dot={{ r: 0 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Click Rate"
              stroke="#a3e635"
              strokeWidth={2}
              dot={{ r: 0 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Conversion Rate"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
