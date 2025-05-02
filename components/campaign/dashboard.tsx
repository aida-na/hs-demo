"use client"

import { useState } from "react"
import {
  Activity,
  Calendar,
  FileText,
  Heart,
  Laptop,
  MessageSquare,
  PieChart,
  Plus,
  UserPlus,
  Users,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CohortTreemap from "@/components/campaign/cohort-treemap"
import ChannelEffectivenessChart from "@/components/campaign/channel-effectiveness-chart"
import JourneyMetricsChart from "@/components/campaign/journey-metrics-chart"

const audiences = [
  { id: "medication", name: "Medication Adherence", icon: Heart, count: 3250 },
  { id: "caregap", name: "Care Gap Closure", icon: Activity, count: 2180 },
  { id: "chronic", name: "Chronic Condition Management", icon: Activity, count: 1950 },
  { id: "wellness", name: "Annual Wellness Visit", icon: Calendar, count: 3420 },
  { id: "onboarding", name: "New Member Onboarding", icon: UserPlus, count: 1240 },
  { id: "highrisk", name: "High-Risk Member Intervention", icon: Zap, count: 890 },
  { id: "discharge", name: "Post-Discharge Follow-Up", icon: FileText, count: 760 },
  { id: "sdoh", name: "SDOH Support", icon: Users, count: 1320 },
  { id: "digital", name: "Digital Tool Adoption", icon: Laptop, count: 2450 },
  { id: "benefits", name: "Benefits Utilization", icon: PieChart, count: 1870 },
]

export default function Dashboard() {
  const [activeAudience, setActiveAudience] = useState(audiences[0])
  const [selectedCohort, setSelectedCohort] = useState<string | null>(null)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b bg-background px-6">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-teal-500" />
            <span className="text-lg font-semibold">RadiantGraph</span>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Audience
          </Button>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Smart Cohorts Dashboard</h1>
            <p className="text-muted-foreground">
              Find the right people for your health initiatives with personalized messaging
            </p>
          </div>

          <Tabs
            defaultValue={activeAudience.id}
            onValueChange={(value) => {
              const audience = audiences.find((a) => a.id === value)
              if (audience) setActiveAudience(audience)
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <TabsList className="h-auto p-1">
                {audiences.slice(0, 5).map((audience) => (
                  <TabsTrigger key={audience.id} value={audience.id} className="flex items-center gap-2 px-3 py-2">
                    <audience.icon className="h-4 w-4" />
                    <span className="hidden md:inline">{audience.name}</span>
                    <Badge variant="outline" className="ml-1 hidden md:inline-flex">
                      {audience.count.toLocaleString()}
                    </Badge>
                  </TabsTrigger>
                ))}
                <TabsTrigger value="more" className="px-3 py-2">
                  More
                </TabsTrigger>
              </TabsList>

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

            {audiences.map((audience) => (
              <TabsContent key={audience.id} value={audience.id} className="mt-0">
                <div className="mb-4">
                  <h2 className="text-xl font-bold tracking-tight">{audience.name}</h2>
                  <p className="text-muted-foreground">
                    Optimize your {audience.name.toLowerCase()} with smart cohorts
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{audience.count.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        +{Math.floor(Math.random() * 20)}% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{(Math.random() * 30 + 40).toFixed(1)}%</div>
                      <p className="text-xs text-muted-foreground">
                        +{Math.floor(Math.random() * 15)}% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                      <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{(Math.random() * 20 + 15).toFixed(1)}%</div>
                      <p className="text-xs text-muted-foreground">
                        +{Math.floor(Math.random() * 10)}% from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Smart Cohorts</CardTitle>
                      <CardDescription>Member segmentation for personalized messaging</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 pt-0">
                      <CohortTreemap
                        journeyId={audience.id}
                        onCohortSelect={setSelectedCohort}
                        selectedCohort={selectedCohort}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Channel Effectiveness</CardTitle>
                      <CardDescription>Engagement by communication channel</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 pt-0">
                      <ChannelEffectivenessChart journeyId={audience.id} cohortId={selectedCohort} />
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                      <CardDescription>Key metrics over time for {audience.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="engagement">
                        <TabsList className="mb-4">
                          <TabsTrigger value="engagement">Engagement</TabsTrigger>
                          <TabsTrigger value="conversion">Conversion</TabsTrigger>
                        </TabsList>
                        <TabsContent value="engagement" className="p-0 m-0">
                          <JourneyMetricsChart
                            journeyId={audience.id}
                            metricType="engagement"
                            cohortId={selectedCohort}
                          />
                        </TabsContent>
                        <TabsContent value="conversion" className="p-0 m-0">
                          <JourneyMetricsChart
                            journeyId={audience.id}
                            metricType="conversion"
                            cohortId={selectedCohort}
                          />
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>

                {selectedCohort && (
                  <div className="mt-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Cohort Details</CardTitle>
                          <CardDescription>Personalization recommendations for selected cohort</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          Create Campaign
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <h3 className="mb-4 text-lg font-medium">Recommended Messaging</h3>
                            <div className="space-y-4">
                              <div className="rounded-lg border p-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">Primary Message</h4>
                                  <Badge className="bg-teal-500">High Impact</Badge>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">
                                  Focus on convenience and time-saving benefits for this cohort.
                                </p>
                              </div>
                              <div className="rounded-lg border p-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">Secondary Message</h4>
                                  <Badge className="bg-blue-500">Medium Impact</Badge>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">
                                  Emphasize improved health outcomes and quality of life.
                                </p>
                              </div>
                              <div className="rounded-lg border p-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">Tertiary Message</h4>
                                  <Badge variant="outline">Low Impact</Badge>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">
                                  Mention cost savings and financial benefits.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="mb-4 text-lg font-medium">Recommended Channels</h3>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Laptop className="h-5 w-5 text-teal-500" />
                                  <span>SMS</span>
                                </div>
                                <div className="w-1/2">
                                  <Progress value={92} className="h-2" />
                                </div>
                                <span className="text-sm font-medium">92%</span>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <MessageSquare className="h-5 w-5 text-blue-500" />
                                  <span>Email</span>
                                </div>
                                <div className="w-1/2">
                                  <Progress value={78} className="h-2" />
                                </div>
                                <span className="text-sm font-medium">78%</span>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <MessageSquare className="h-5 w-5 text-orange-500" />
                                  <span>Call</span>
                                </div>
                                <div className="w-1/2">
                                  <Progress value={42} className="h-2" />
                                </div>
                                <span className="text-sm font-medium">42%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </div>
  )
}
