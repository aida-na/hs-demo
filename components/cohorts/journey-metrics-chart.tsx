"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Generate mock data for the metrics
const generateMetricsData = (journeyId: string, metricType: string, cohortId: string | null) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentMonth = new Date().getMonth()

  // Last 6 months
  const recentMonths = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - 5 + i) % 12
    return months[monthIndex < 0 ? monthIndex + 12 : monthIndex]
  })

  // Generate random data based on metric type
  if (metricType === "engagement") {
    return recentMonths.map((month, index) => {
      const baseValue = 40 + Math.random() * 30
      const trend = index * 2 // Increasing trend
      return {
        month,
        "Open Rate": Math.min(95, Math.round(baseValue + trend + Math.random() * 10)),
        "Click Rate": Math.min(85, Math.round((baseValue + trend) * 0.7 + Math.random() * 8)),
        "Response Rate": Math.min(70, Math.round((baseValue + trend) * 0.5 + Math.random() * 6)),
      }
    })
  } else if (metricType === "conversion") {
    return recentMonths.map((month, index) => {
      const baseValue = 15 + Math.random() * 10
      const trend = index * 1.2 // Increasing trend
      return {
        month,
        "Conversion Rate": Math.min(40, Math.round(baseValue + trend + Math.random() * 5)),
        "Goal Completion": Math.min(60, Math.round((baseValue + trend) * 1.5 + Math.random() * 7)),
      }
    })
  }

  return []
}

type JourneyMetricsChartProps = {
  journeyId: string
  metricType: "engagement" | "conversion"
  cohortId: string | null
}

export default function JourneyMetricsChart({ journeyId, metricType, cohortId }: JourneyMetricsChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(generateMetricsData(journeyId, metricType, cohortId))
  }, [journeyId, metricType, cohortId])

  // Define colors based on metric type
  const getLineColors = () => {
    if (metricType === "engagement") {
      return ["#38bdf8", "#2dd4bf", "#a3e635"]
    } else if (metricType === "conversion") {
      return ["#f59e0b", "#f97316"]
    } else {
      return ["#8b5cf6", "#ec4899"]
    }
  }

  // Get the keys for the lines (excluding 'month')
  const lineKeys = data.length > 0 ? Object.keys(data[0]).filter((key) => key !== "month") : []
  const lineColors = getLineColors()

  return (
    <div className="h-[300px] w-full">
      <ChartContainer
        config={{
          ...lineKeys.reduce(
            (acc, key, index) => {
              acc[key] = {
                label: key,
                color: `hsl(var(--chart-${index + 1}))`,
              }
              return acc
            },
            {} as Record<string, { label: string; color: string }>,
          ),
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            {lineKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={lineColors[index % lineColors.length]}
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
