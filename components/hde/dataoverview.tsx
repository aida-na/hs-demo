'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from '@/components/ui/separator'
import { MetricCardsGrid } from '@/components/hde/shared/MetricCards'
import { Users, Database, Calendar, Clock, TableIcon } from "lucide-react"

export default function DataOverview() {
  const totalMembers = "4.2M"
  const dataSources = "12"
  const rowsReconciled = "218K"
  const lastRunDate = "April 15, 2025"

  const metricCards = [
    {
      title: "Members Processed",
      value: totalMembers,
      icon: Users,
      gradient: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
      titleColor: "text-blue-700",
      valueColor: "text-blue-900"
    },
    {
      title: "Connected Data Sources",
      value: dataSources,
      icon: Database,
      gradient: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-700",
      titleColor: "text-emerald-700",
      valueColor: "text-emerald-900"
    },
    {
      title: "Total Fixes Applied",
      value: rowsReconciled,
      icon: TableIcon,
      gradient: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-700",
      titleColor: "text-purple-700",
      valueColor: "text-purple-900"
    }
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Health Data Integration</h2>
          <p className="text-muted-foreground">
            Stitch member data from dispersed warehouses into rich, actionable profiles
          </p>
        </div>
      </div>

      <MetricCardsGrid metrics={metricCards} />
      
      {/* Processing Run Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="md:col-span-1 bg-white shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Latest Processing Run
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Run Date</span>
                <span className="font-medium">{lastRunDate}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Status</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 bg-white shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Processing Timeline
            </CardTitle>
            <CardDescription>
              From receipt of data to returning scores and Smart Cohorts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Data Processing</span>
                  <span>3 days</span>
                </div>
                <Progress value={45} className="h-2 bg-gray-100" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}