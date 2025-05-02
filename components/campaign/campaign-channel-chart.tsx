"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type ChannelMetrics = {
  sent: number
  delivered: number
  opened: number
  clicked: number
  converted: number
}

type CampaignChannelChartProps = {
  campaignId: string
  channelMetrics: Record<string, ChannelMetrics>
}

export default function CampaignChannelChart({ campaignId, channelMetrics }: CampaignChannelChartProps) {
  // Transform the data for the chart
  const data = Object.entries(channelMetrics || {}).map(([channel, metrics]) => {
    const deliveryRate = metrics.sent > 0 ? Math.round((metrics.delivered / metrics.sent) * 100) : 0
    const openRate = metrics.delivered > 0 ? Math.round((metrics.opened / metrics.delivered) * 100) : 0
    const clickRate = metrics.opened > 0 ? Math.round((metrics.clicked / metrics.opened) * 100) : 0
    const conversionRate = metrics.clicked > 0 ? Math.round((metrics.converted / metrics.clicked) * 100) : 0

    return {
      channel,
      "Delivery Rate": deliveryRate,
      "Open Rate": openRate,
      "Click Rate": clickRate,
      "Conversion Rate": conversionRate,
    }
  })

  // Colors for the bars
  const colors = ["#38bdf8", "#2dd4bf", "#a3e635", "#f59e0b"]

  return (
    <div className="w-full h-[300px] overflow-hidden">
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
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="channel" />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="Delivery Rate" fill={colors[0]} />
            <Bar dataKey="Open Rate" fill={colors[1]} />
            <Bar dataKey="Click Rate" fill={colors[2]} />
            <Bar dataKey="Conversion Rate" fill={colors[3]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
