"use client"

import { useState, useEffect } from 'react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter 
} from '@/components/ui/card'
import { metrics, type Metric } from '@/lib/config/metrics'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  Users, 
  Database, 
  Table, 
  CheckCircle2,
  ArrowRight,
  BarChart,
  FileText,
  Calendar
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function Home() {
  const [metricsData, setMetricsData] = useState<Metric[]>([])
  
  useEffect(() => {
    setMetricsData(metrics)
  }, [])

  // Get sample values for our new UI components
  // In a real implementation, these would come from your metrics data
  const totalMembers = "4.2M"
  const dataSources = "27"
  const rowsReconciled = "1.2B"
  const lastRunDate = "March 15, 2025"
  const processingTime = "3.2 hours"
  const fixesApplied = "218K"
  const genderSourcesFixed = "15"
  const zipCodeFixed = "94%" 

  return (
    <main className="py-8 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Health Data Engine Metrics
          </h1>
          <p className="text-md md:text-lg text-gray-600 mt-2">
            Performance metrics from the most recent run of the Health Data Engine (HDE)
          </p>
        </div>

        {/* Big Numbers Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-8 w-8 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">Members Processed</p>
                  <h3 className="text-4xl md:text-5xl font-bold text-blue-900">{totalMembers}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <Database className="h-8 w-8 text-emerald-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-700">Connected Data Sources</p>
                  <h3 className="text-4xl md:text-5xl font-bold text-emerald-900">{dataSources}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Table className="h-8 w-8 text-purple-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-700">Rows of Data Reconciled</p>
                  <h3 className="text-4xl md:text-5xl font-bold text-purple-900">{rowsReconciled}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
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
                From receipt of data to returning scores + Smart Cohorts
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
        
        {/* Data Reconciliation Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          <div className="md:col-span-6">
            <Card className="h-full bg-white shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  Fixes Applied
                </CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Fixes Applied</span>
                      <span className="text-2xl font-bold text-blue-600">{fixesApplied}</span>
                    </div>
                    <Separator />
                  </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-6">
            <Card className="h-full bg-white shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-blue-600" />
                  Data Reconciliation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                    <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-1">Gender & Zip Code Data</h3>
                    <div className="flex items-center justify-center">
                      <span className="inline-block px-3 py-1 mr-1 bg-white text-green-800 rounded-full text-xs">23,458 conflicts resolved</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </main>
  )
}