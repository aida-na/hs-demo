"use client"

import { useState } from "react"
import {
  Activity,
  BarChart3,
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  Heart,
  Laptop,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Smartphone,
  UserPlus,
  Users,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import CampaignChannelChart from "@/components/campaign/campaign-channel-chart"
import CampaignPerformanceChart from "@/components/campaign/campaign-performance-chart"
import CampaignCohortReach from "@/components/campaign/campaign-cohort-reach"

// Sample campaign data
const campaigns = [
  {
    id: "med-adherence-q2",
    name: "Medication Adherence Q2",
    audience: "Medication Adherence",
    audienceIcon: Heart,
    status: "active",
    startDate: "2023-04-01",
    endDate: "2023-06-30",
    progress: 65,
    channels: ["SMS", "Email", "Call"],
    cohorts: [
      { name: "Seniors 65+", count: 1200, reachPercentage: 78 },
      { name: "Chronic Conditions", count: 950, reachPercentage: 82 },
      { name: "New Prescriptions", count: 650, reachPercentage: 91 },
    ],
    metrics: {
      reach: 2800,
      engagement: 72,
      conversion: 38,
      costPerConversion: 12.45,
    },
    channelMetrics: {
      SMS: { sent: 2500, delivered: 2450, opened: 0, clicked: 1200, converted: 650 },
      Email: { sent: 2800, delivered: 2700, opened: 1800, clicked: 950, converted: 420 },
      Call: { sent: 950, delivered: 0, opened: 0, clicked: 0, converted: 320 },
      Mail: { sent: 0, delivered: 0, opened: 0, clicked: 0, converted: 0 },
    },
  },
  {
    id: "care-gap-q2",
    name: "Care Gap Closure Q2",
    audience: "Care Gap Closure",
    audienceIcon: Activity,
    status: "active",
    startDate: "2023-04-15",
    endDate: "2023-07-15",
    progress: 45,
    channels: ["Email", "Mail", "Call"],
    cohorts: [
      { name: "Preventive Screenings", count: 980, reachPercentage: 72 },
      { name: "Vaccinations", count: 750, reachPercentage: 68 },
      { name: "Lab Tests", count: 450, reachPercentage: 85 },
    ],
    metrics: {
      reach: 2180,
      engagement: 65,
      conversion: 32,
      costPerConversion: 18.75,
    },
    channelMetrics: {
      SMS: { sent: 0, delivered: 0, opened: 0, clicked: 0, converted: 0 },
      Email: { sent: 2180, delivered: 2100, opened: 1450, clicked: 820, converted: 380 },
      Call: { sent: 1200, delivered: 980, opened: 0, clicked: 0, converted: 420 },
      Mail: { sent: 1800, delivered: 0, opened: 0, clicked: 0, converted: 280 },
    },
  },
  {
    id: "wellness-q2",
    name: "Annual Wellness Visit Q2",
    audience: "Annual Wellness Visit",
    audienceIcon: Calendar,
    status: "active",
    startDate: "2023-03-15",
    endDate: "2023-06-15",
    progress: 85,
    channels: ["SMS", "Email", "Call", "Mail"],
    cohorts: [
      { name: "Medicare", count: 1200, reachPercentage: 88 },
      { name: "Commercial", count: 950, reachPercentage: 75 },
      { name: "Medicaid", count: 650, reachPercentage: 82 },
      { name: "High Risk", count: 620, reachPercentage: 92 },
    ],
    metrics: {
      reach: 3420,
      engagement: 78,
      conversion: 42,
      costPerConversion: 14.25,
    },
    channelMetrics: {
      SMS: { sent: 3200, delivered: 3150, opened: 0, clicked: 1950, converted: 450 },
      Email: { sent: 3420, delivered: 3350, opened: 2450, clicked: 1650, converted: 740 },
      Call: { sent: 1500, delivered: 1350, opened: 0, clicked: 0, converted: 58 },
      Mail: { sent: 2200, delivered: 0, opened: 0, clicked: 0, converted: 0 },
    },
  },
  {
    id: "onboarding-q2",
    name: "New Member Onboarding Q2",
    audience: "New Member Onboarding",
    audienceIcon: UserPlus,
    status: "active",
    startDate: "2023-04-01",
    endDate: "2023-06-30",
    progress: 55,
    channels: ["Email", "Mail"],
    cohorts: [
      { name: "Digital Natives", count: 580, reachPercentage: 92 },
      { name: "Digital Immigrants", count: 420, reachPercentage: 68 },
      { name: "New to Insurance", count: 240, reachPercentage: 85 },
    ],
    metrics: {
      reach: 1240,
      engagement: 82,
      conversion: 45,
      costPerConversion: 10.85,
    },
    channelMetrics: {
      SMS: { sent: 0, delivered: 0, opened: 0, clicked: 0, converted: 0 },
      Email: { sent: 1240, delivered: 1220, opened: 980, clicked: 720, converted: 380 },
      Call: { sent: 0, delivered: 0, opened: 0, clicked: 0, converted: 0 },
      Mail: { sent: 950, delivered: 950, opened: 580, clicked: 420, converted: 180 },
    },
  },
  {
    id: "highrisk-q2",
    name: "High-Risk Intervention Q2",
    audience: "High-Risk Member Intervention",
    audienceIcon: Zap,
    status: "active",
    startDate: "2023-03-01",
    endDate: "2023-06-30",
    progress: 75,
    channels: ["Call", "SMS"],
    cohorts: [
      { name: "Multiple Chronic", count: 350, reachPercentage: 95 },
      { name: "Recent Hospitalization", count: 280, reachPercentage: 98 },
      { name: "Polypharmacy", count: 260, reachPercentage: 92 },
    ],
    metrics: {
      reach: 890,
      engagement: 88,
      conversion: 52,
      costPerConversion: 22.35,
    },
    channelMetrics: {
      SMS: { sent: 890, delivered: 870, opened: 820, clicked: 650, converted: 280 },
      Email: { sent: 0, delivered: 0, opened: 0, clicked: 0, converted: 0 },
      Call: { sent: 890, delivered: 780, opened: 780, clicked: 780, converted: 320 },
      Mail: { sent: 0, delivered: 0, opened: 0, clicked: 0, converted: 0 },
    },
  },
]

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date)
}

// Helper function to get channel icon
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

export default function CampaignDashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0])
  const [viewMode, setViewMode] = useState<"overview" | "details">("overview")

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Campaign Dashboard</h1>
            <p className="text-muted-foreground">Monitor and optimize your active campaigns across multiple cohorts and channels</p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "overview" | "details")}
              className="w-[400px]"
            >
              <TabsList>
                <TabsTrigger value="overview">Campaign Overview</TabsTrigger>
                <TabsTrigger value="details">Campaign Details</TabsTrigger>
              </TabsList>
            </Tabs>

            <Select defaultValue="last30days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="last90days">Last 90 days</SelectItem>
                <SelectItem value="lastyear">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {viewMode === "overview" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <Card
                  key={campaign.id}
                  className={`cursor-pointer transition-all hover:border-primary ${
                    selectedCampaign.id === campaign.id ? "border-primary" : ""
                  }`}
                  onClick={() => {
                    setSelectedCampaign(campaign)
                    setViewMode("details")
                  }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`${
                          campaign.status === "active" ? "bg-green-500 hover:bg-green-600" : "bg-amber-500"
                        }`}
                      >
                        {campaign.status === "active" ? "Active" : "Draft"}
                      </Badge>
                      <campaign.audienceIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg mt-2">{campaign.name}</CardTitle>
                    <CardDescription>{campaign.audience}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Campaign Progress</span>
                      <span className="font-medium">{campaign.progress}%</span>
                    </div>
                    <Progress value={campaign.progress} className="h-2" />

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Timeline</span>
                        </div>
                        <span className="font-medium">
                          {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Reach</span>
                        </div>
                        <span className="font-medium">{campaign.metrics.reach.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Conversion</span>
                        </div>
                        <span className="font-medium">{campaign.metrics.conversion}%</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">Channels</div>
                      <div className="flex flex-wrap gap-2">
                        {campaign.channels.map((channel) => (
                          <Badge key={channel} variant="outline" className="flex items-center gap-1">
                            {getChannelIcon(channel)}
                            <span>{channel}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex items-center justify-between w-full">

                      <Button variant="ghost" size="sm" className="gap-1">
                        <span className="text-xs">Details</span>
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <selectedCampaign.audienceIcon className="h-8 w-8 text-primary" />
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCampaign.name}</h2>
                    <p className="text-muted-foreground">{selectedCampaign.audience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Campaign Timeline</span>
                    </div>
                    <span className="font-medium">
                      {formatDate(selectedCampaign.startDate)} - {formatDate(selectedCampaign.endDate)}
                    </span>
                  </div>
                  <Button variant="outline">Edit Campaign</Button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedCampaign.metrics.reach.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Members targeted in campaign</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedCampaign.metrics.engagement}%</div>
                    <p className="text-xs text-muted-foreground">Opened or interacted with campaign</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedCampaign.metrics.conversion}%</div>
                    <p className="text-xs text-muted-foreground">Completed desired action</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Campaign Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedCampaign.progress}%</div>
                    <Progress value={selectedCampaign.progress} className="h-2 mt-2" />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Channel Performance</CardTitle>
                    <CardDescription>Effectiveness across communication channels</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 pt-0">
                    <CampaignChannelChart
                      campaignId={selectedCampaign.id}
                      channelMetrics={selectedCampaign.channelMetrics}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cohort Reach</CardTitle>
                    <CardDescription>Campaign reach by member cohort</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 pt-0">
                    <CampaignCohortReach campaignId={selectedCampaign.id} cohorts={selectedCampaign.cohorts} />
                  </CardContent>
                </Card>
                </div>

              <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Key metrics over time</CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-0">
                  <CampaignPerformanceChart campaignId={selectedCampaign.id} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Channel Funnel Analysis</CardTitle>
                  <CardDescription>Conversion funnel by communication channel</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue={selectedCampaign.channels[0]}>
                    <TabsList className="mb-4">
                      {selectedCampaign.channels.map((channel) => (
                        <TabsTrigger key={channel} value={channel} className="flex items-center gap-2">
                          {getChannelIcon(channel)}
                          {channel}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {selectedCampaign.channels.map((channel) => {
                      const metrics = selectedCampaign.channelMetrics[
                        channel as keyof typeof selectedCampaign.channelMetrics
                      ] || {
                        sent: 0,
                        delivered: 0,
                        opened: 0,
                        clicked: 0,
                        converted: 0,
                      }
                      const sentToDelivered = Math.round((metrics.delivered / metrics.sent) * 100) || 0
                      const deliveredToOpened = Math.round((metrics.opened / metrics.delivered) * 100) || 0
                      const openedToClicked = Math.round((metrics.clicked / metrics.opened) * 100) || 0
                      const clickedToConverted = Math.round((metrics.converted / metrics.clicked) * 100) || 0

                      return (
                        <TabsContent key={channel} value={channel} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="text-center">
                              <div className="text-2xl font-bold">{metrics.sent.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">Sent</div>
                            </div>
                            <Separator orientation="vertical" className="h-8" />
                            <div className="text-center">
                              <div className="text-2xl font-bold">{metrics.delivered.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">Delivered</div>
                              <div className="text-xs text-green-600">{sentToDelivered}%</div>
                            </div>
                            <Separator orientation="vertical" className="h-8" />
                            <div className="text-center">
                              <div className="text-2xl font-bold">{metrics.opened.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">Opened</div>
                              <div className="text-xs text-green-600">{deliveredToOpened}%</div>
                            </div>
                            <Separator orientation="vertical" className="h-8" />
                            <div className="text-center">
                              <div className="text-2xl font-bold">{metrics.clicked.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">Clicked</div>
                              <div className="text-xs text-green-600">{openedToClicked}%</div>
                            </div>
                            <Separator orientation="vertical" className="h-8" />
                            <div className="text-center">
                              <div className="text-2xl font-bold">{metrics.converted.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">Converted</div>
                              <div className="text-xs text-green-600">{clickedToConverted}%</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span>Sent → Delivered</span>
                                <span className="font-medium">{sentToDelivered}%</span>
                              </div>
                              <Progress value={sentToDelivered} className="h-2" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span>Delivered → Opened</span>
                                <span className="font-medium">{deliveredToOpened}%</span>
                              </div>
                              <Progress value={deliveredToOpened} className="h-2" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span>Opened → Clicked</span>
                                <span className="font-medium">{openedToClicked}%</span>
                              </div>
                              <Progress value={openedToClicked} className="h-2" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span>Clicked → Converted</span>
                                <span className="font-medium">{clickedToConverted}%</span>
                              </div>
                              <Progress value={clickedToConverted} className="h-2" />
                            </div>
                          </div>
                        </TabsContent>
                      )
                    })}
                  </Tabs>
                </CardContent>
              </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
