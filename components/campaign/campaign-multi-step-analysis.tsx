"use client"

import { useState } from "react"
import {
  Activity,
  BarChart3,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Heart,
  Mail,
  MessageSquare,
  Phone,
  Smartphone,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"

// Types for multi-step campaign structure
interface CohortMetrics {
  name: string
  count: number
  reachPercentage: number
  engagementRate: number
  conversionRate: number
}

interface ChannelMetrics {
  sent: number
  delivered: number
  opened: number
  clicked: number
  converted: number
}

interface StepMetrics {
  totalSent: number
  totalDelivered: number
  totalEngaged: number
  totalConverted: number
  deliveryRate: number
  engagementRate: number
  conversionRate: number
  costPerConversion: number
}

interface CampaignStep {
  id: string
  name: string
  description: string
  stepNumber: number
  channels: string[]
  cohorts: CohortMetrics[]
  channelMetrics: Record<string, ChannelMetrics>
  stepMetrics: StepMetrics
  triggerDelay: number // days after previous step
  status: "completed" | "active" | "scheduled"
  startDate: string
  endDate: string
}

interface MultiStepCampaign {
  id: string
  name: string
  audience: string
  status: "active" | "completed" | "draft"
  startDate: string
  endDate: string
  totalSteps: number
  completedSteps: number
  overallMetrics: {
    totalReach: number
    overallEngagement: number
    overallConversion: number
    totalCostPerConversion: number
    dropoffRate: number
  }
  steps: CampaignStep[]
}

interface MultiStepCampaignAnalysisProps {
  campaign: MultiStepCampaign
  onEdit?: () => void
}

// Sample multi-step campaign data
export const sampleMultiStepCampaign: MultiStepCampaign = {
  id: "medication-adherence-journey",
  name: "Medication Adherence Journey",
  audience: "New Prescription Members",
  status: "active" as const,
  startDate: "2023-04-01",
  endDate: "2023-07-30",
  totalSteps: 4,
  completedSteps: 2,
  overallMetrics: {
    totalReach: 2500,
    overallEngagement: 66.9,
    overallConversion: 32.0,
    totalCostPerConversion: 12.50,
    dropoffRate: 22,
  },
  steps: [
    {
      id: "welcome-onboarding",
      name: "Welcome & Onboarding",
      description: "Initial welcome message and prescription information",
      stepNumber: 1,
      channels: ["Email", "SMS"],
      triggerDelay: 0,
      status: "completed" as const,
      startDate: "2023-04-01",
      endDate: "2023-04-15",
      cohorts: [
        { name: "Seniors 65+", count: 800, reachPercentage: 100, engagementRate: 75, conversionRate: 45 },
        { name: "Chronic Conditions", count: 950, reachPercentage: 100, engagementRate: 82, conversionRate: 52 },
        { name: "First-time Prescription", count: 750, reachPercentage: 100, engagementRate: 88, conversionRate: 38 },
      ],
      channelMetrics: {
        Email: { sent: 2500, delivered: 2450, opened: 1850, clicked: 1200, converted: 850 },
        SMS: { sent: 2500, delivered: 2480, opened: 0, clicked: 1450, converted: 750 },
      },
      stepMetrics: {
        totalSent: 5000,
        totalDelivered: 4930,
        totalEngaged: 3300,
        totalConverted: 1600,
        deliveryRate: 98.6,
        engagementRate: 66.9,
        conversionRate: 32.0,
        costPerConversion: 12.50,
      },
    },
    {
      id: "education-reminders",
      name: "Education & Reminders",
      description: "Educational content about medication importance and daily reminders",
      stepNumber: 2,
      channels: ["SMS", "Email", "Call"],
      triggerDelay: 7,
      status: "completed" as const,
      startDate: "2023-04-08",
      endDate: "2023-05-08",
      cohorts: [
        { name: "Seniors 65+", count: 720, reachPercentage: 90, engagementRate: 78, conversionRate: 42 },
        { name: "Chronic Conditions", count: 890, reachPercentage: 94, engagementRate: 85, conversionRate: 48 },
        { name: "First-time Prescription", count: 650, reachPercentage: 87, engagementRate: 82, conversionRate: 35 },
      ],
      channelMetrics: {
        SMS: { sent: 2260, delivered: 2240, opened: 0, clicked: 1580, converted: 680 },
        Email: { sent: 2260, delivered: 2180, opened: 1620, clicked: 1050, converted: 520 },
        Call: { sent: 1200, delivered: 980, opened: 0, clicked: 0, converted: 420 },
      },
      stepMetrics: {
        totalSent: 5720,
        totalDelivered: 5400,
        totalEngaged: 3250,
        totalConverted: 1620,
        deliveryRate: 94.4,
        engagementRate: 60.2,
        conversionRate: 30.0,
        costPerConversion: 15.25,
      },
    },
    {
      id: "adherence-check",
      name: "Adherence Check-in",
      description: "Follow-up on medication adherence and address barriers",
      stepNumber: 3,
      channels: ["Call", "SMS"],
      triggerDelay: 30,
      status: "active" as const,
      startDate: "2023-05-08",
      endDate: "2023-06-08",
      cohorts: [
        { name: "Seniors 65+", count: 650, reachPercentage: 81, engagementRate: 72, conversionRate: 38 },
        { name: "Chronic Conditions", count: 820, reachPercentage: 87, engagementRate: 79, conversionRate: 44 },
        { name: "First-time Prescription", count: 580, reachPercentage: 78, engagementRate: 75, conversionRate: 32 },
      ],
      channelMetrics: {
        Call: { sent: 2050, delivered: 1850, opened: 0, clicked: 0, converted: 720 },
        SMS: { sent: 2050, delivered: 2020, opened: 0, clicked: 1420, converted: 580 },
      },
      stepMetrics: {
        totalSent: 4100,
        totalDelivered: 3870,
        totalEngaged: 2140,
        totalConverted: 1300,
        deliveryRate: 94.4,
        engagementRate: 55.3,
        conversionRate: 33.6,
        costPerConversion: 18.90,
      },
    },
    {
      id: "long-term-support",
      name: "Long-term Support",
      description: "Ongoing support and intervention for non-adherent members",
      stepNumber: 4,
      channels: ["Call", "Mail", "Email"],
      triggerDelay: 60,
      status: "scheduled" as const,
      startDate: "2023-06-08",
      endDate: "2023-07-30",
      cohorts: [
        { name: "Seniors 65+", count: 480, reachPercentage: 0, engagementRate: 0, conversionRate: 0 },
        { name: "Chronic Conditions", count: 620, reachPercentage: 0, engagementRate: 0, conversionRate: 0 },
        { name: "First-time Prescription", count: 420, reachPercentage: 0, engagementRate: 0, conversionRate: 0 },
      ],
      channelMetrics: {
        Call: { sent: 0, delivered: 0, opened: 0, clicked: 0, converted: 0 },
        Mail: { sent: 0, delivered: 0, opened: 0, clicked: 0, converted: 0 },
        Email: { sent: 0, delivered: 0, opened: 0, clicked: 0, converted: 0 },
      },
      stepMetrics: {
        totalSent: 0,
        totalDelivered: 0,
        totalEngaged: 0,
        totalConverted: 0,
        deliveryRate: 0,
        engagementRate: 0,
        conversionRate: 0,
        costPerConversion: 0,
      },
    },
  ],
}

// Helper functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date)
}

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case "SMS":
      return <Smartphone className="h-4 w-4" />
    case "Email":
      return <Mail className="h-4 w-4" />
    case "Call":
      return <Phone className="h-4 w-4" />
    case "Mail":
      return <FileText className="h-4 w-4" />
    default:
      return <MessageSquare className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500 hover:bg-green-600"
    case "active":
      return "bg-blue-500 hover:bg-blue-600"
    case "scheduled":
      return "bg-amber-500 hover:bg-amber-600"
    default:
      return "bg-gray-500"
  }
}

export default function MultiStepCampaignAnalysis({ campaign, onEdit }: MultiStepCampaignAnalysisProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null)
  const [selectedView, setSelectedView] = useState<"overview" | "funnel" | "cohorts">("overview")

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId)
  }

  return (
    <div className="space-y-6">
      {/* Campaign Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Heart className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">{campaign.name}</h2>
            <p className="text-muted-foreground">{campaign.audience}</p>
          </div>
          <Badge className={getStatusColor(campaign.status)}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Campaign Timeline</span>
            </div>
            <span className="font-medium">
              {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
            </span>
          </div>
          {onEdit && <Button variant="outline" onClick={onEdit}>Edit Campaign</Button>}
        </div>
      </div>

      {/* Overall Campaign Metrics */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.overallMetrics.totalReach.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Members in campaign</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.overallMetrics.overallEngagement}%</div>
            <p className="text-xs text-muted-foreground">Across all steps</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.overallMetrics.overallConversion}%</div>
            <p className="text-xs text-muted-foreground">End-to-end conversion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Step Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaign.completedSteps}/{campaign.totalSteps}
            </div>
            <Progress 
              value={(campaign.completedSteps / campaign.totalSteps) * 100} 
              className="h-2 mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Dropoff Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{campaign.overallMetrics.dropoffRate}%</div>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </div>
            <p className="text-xs text-muted-foreground">Between steps</p>
          </CardContent>
        </Card>
      </div>

      {/* View Selection */}
      <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as any)}>
        <TabsList>
          <TabsTrigger value="overview">Step Overview</TabsTrigger>
          <TabsTrigger value="funnel">Campaign Funnel</TabsTrigger>
          <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {campaign.steps.map((step, index) => (
            <Card key={step.id}>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <CardHeader 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleStep(step.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                            step.status === 'completed' ? 'bg-green-500' : 
                            step.status === 'active' ? 'bg-blue-500' : 'bg-gray-400'
                          }`}>
                            {step.stepNumber}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{step.name}</CardTitle>
                            <CardDescription>{step.description}</CardDescription>
                          </div>
                        </div>
                        <Badge className={getStatusColor(step.status)}>
                          {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm">
                          <div className="font-medium">{step.stepMetrics.conversionRate}% conversion</div>
                          <div className="text-muted-foreground">
                            {step.stepMetrics.totalConverted.toLocaleString()} converted
                          </div>
                        </div>
                        {expandedStep === step.id ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="grid gap-4 md:grid-cols-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{step.stepMetrics.totalSent.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Sent</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{step.stepMetrics.deliveryRate}%</div>
                        <div className="text-sm text-muted-foreground">Delivery Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{step.stepMetrics.engagementRate}%</div>
                        <div className="text-sm text-muted-foreground">Engagement Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">${step.stepMetrics.costPerConversion}</div>
                        <div className="text-sm text-muted-foreground">Cost per Conversion</div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Channel Performance */}
                      <div>
                        <h4 className="font-semibold mb-3">Channel Performance</h4>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {step.channels.map((channel) => {
                            const metrics = step.channelMetrics[channel]
                            const conversionRate = metrics.sent > 0 ? Math.round((metrics.converted / metrics.sent) * 100) : 0

                            return (
                              <Card key={channel}>
                                <CardHeader className="pb-2">
                                  <div className="flex items-center gap-2">
                                    {getChannelIcon(channel)}
                                    <CardTitle className="text-sm">{channel}</CardTitle>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Sent</span>
                                      <span className="font-medium">{metrics.sent.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Delivered</span>
                                      <span className="font-medium">{metrics.delivered.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Converted</span>
                                      <span className="font-medium">{metrics.converted.toLocaleString()}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-sm font-medium">
                                      <span>Conversion Rate</span>
                                      <span className="text-green-600">{conversionRate}%</span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          })}
                        </div>
                      </div>

                      {/* Cohort Performance */}
                      <div>
                        <h4 className="font-semibold mb-3">Cohort Performance</h4>
                        <div className="space-y-2">
                          {step.cohorts.map((cohort) => (
                            <div key={cohort.name} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="font-medium">{cohort.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {cohort.count.toLocaleString()} members
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-6 text-sm">
                                <div className="text-center">
                                  <div className="font-medium">{cohort.reachPercentage}%</div>
                                  <div className="text-muted-foreground">Reach</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium">{cohort.engagementRate}%</div>
                                  <div className="text-muted-foreground">Engagement</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium">{cohort.conversionRate}%</div>
                                  <div className="text-muted-foreground">Conversion</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Conversion Funnel</CardTitle>
              <CardDescription>Step-by-step conversion progression through the campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {campaign.steps.map((step, index) => {
                  const previousStep = index > 0 ? campaign.steps[index - 1] : null
                  const dropoffRate = previousStep 
                    ? Math.round(((previousStep.stepMetrics.totalSent - step.stepMetrics.totalSent) / previousStep.stepMetrics.totalSent) * 100)
                    : 0

                  return (
                    <div key={step.id} className="relative">
                      {index > 0 && (
                        <div className="flex items-center justify-center mb-4">
                          <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm">
                            <TrendingDown className="h-3 w-3" />
                            <span>{dropoffRate}% dropoff</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            step.status === 'completed' ? 'bg-green-500' : 
                            step.status === 'active' ? 'bg-blue-500' : 'bg-gray-400'
                          }`}>
                            {step.stepNumber}
                          </div>
                          <div>
                            <div className="font-semibold">{step.name}</div>
                            <div className="text-sm text-muted-foreground">{step.description}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-8">
                          <div className="text-center">
                            <div className="text-2xl font-bold">{step.stepMetrics.totalSent.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Reached</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{step.stepMetrics.totalEngaged.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Engaged</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{step.stepMetrics.totalConverted.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Converted</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{step.stepMetrics.conversionRate}%</div>
                            <div className="text-sm text-muted-foreground">Rate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohorts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cohort Performance Across Steps</CardTitle>
              <CardDescription>How different member segments perform throughout the campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Get unique cohort names */}
                {Array.from(new Set(campaign.steps.flatMap(step => step.cohorts.map(cohort => cohort.name)))).map(cohortName => (
                  <div key={cohortName} className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {cohortName}
                    </h4>
                    <div className="grid gap-4 md:grid-cols-4">
                      {campaign.steps.map(step => {
                        const cohort = step.cohorts.find(c => c.name === cohortName)
                        return (
                          <Card key={`${cohortName}-${step.id}`} className="relative">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-sm">Step {step.stepNumber}</CardTitle>
                                <Badge variant="outline" className={`text-xs ${
                                  step.status === 'completed' ? 'border-green-500 text-green-700' : 
                                  step.status === 'active' ? 'border-blue-500 text-blue-700' : 'border-gray-400'
                                }`}>
                                  {step.status}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              {cohort ? (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Count</span>
                                    <span className="font-medium">{cohort.count.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Reach</span>
                                    <span className="font-medium">{cohort.reachPercentage}%</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Engagement</span>
                                    <span className="font-medium">{cohort.engagementRate}%</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Conversion</span>
                                    <span className="font-medium text-green-600">{cohort.conversionRate}%</span>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-sm text-muted-foreground text-center py-4">
                                  Not included in this step
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Export the types for use in other components
export type { MultiStepCampaign, CampaignStep, CohortMetrics, ChannelMetrics, StepMetrics }