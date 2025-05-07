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
  Filter,
  MessageCircle,    
  ArrowRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ChannelEffectivenessChart from "@/components/cohorts/channel-effectiveness-chart"
import JourneyMetricsChart from "@/components/cohorts/journey-metrics-chart"

// Define the type for audience ID
type AudienceId = 
  | "medication" 
  | "caregap" 
  | "chronic" 
  | "wellness" 
  | "onboarding" 
  | "highrisk" 
  | "discharge" 
  | "sdoh" 
  | "digital" 
  | "benefits"

// Define audience type
interface Audience {
  id: AudienceId
  name: string
  icon: React.ElementType
  count: number
}

const audiences: Audience[] = [
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

// Define the type for cohort
interface Cohort {
  name: string
  size: number
  response: string
}

// Define the type for cohort data
type CohortData = {
  [key in AudienceId]: Cohort[]
}

const COLORS = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

const cohortData: CohortData = {
  "medication": [
    { name: "Tech-Savvy Seniors", size: 1240, response: "SMS + Email" },
    { name: "Traditional Patients", size: 980, response: "Call + Mail" },
    { name: "Busy Professionals", size: 675, response: "Email + Portal" },
    { name: "New Prescription Users", size: 355, response: "SMS + Call" }
  ],
  "caregap": [
    { name: "Preventive Care Avoiders", size: 890, response: "Call + SMS" },
    { name: "Schedule Challenged", size: 760, response: "SMS + Email" },
    { name: "Health Conscious", size: 530, response: "Email + Portal" }
  ],
  "chronic": [
    { name: "Multiple Condition Patients", size: 720, response: "Portal + Call" },
    { name: "Daily Management Focus", size: 640, response: "SMS + Email" },
    { name: "Care Team Engaged", size: 590, response: "Email + Call" }
  ],
  "wellness": [
    { name: "Annual Visitors", size: 1380, response: "Email + SMS" },
    { name: "Wellness Advocates", size: 1050, response: "Portal + Email" },
    { name: "Reluctant Preventers", size: 990, response: "Call + Mail" }
  ],
  "onboarding": [
    { name: "Digital First", size: 520, response: "Email + Portal" },
    { name: "Support Seekers", size: 410, response: "Call + SMS" },
    { name: "Benefits Explorers", size: 310, response: "Portal + Email" }
  ],
  "highrisk": [
    { name: "Intensive Care Needs", size: 290, response: "Call + Home Visit" },
    { name: "Readmission Risks", size: 310, response: "Call + Portal" },
    { name: "Complex Conditions", size: 290, response: "Call + SMS" }
  ],
  "discharge": [
    { name: "Post-Surgical", size: 280, response: "Call + SMS" },
    { name: "Transition Care", size: 260, response: "SMS + Email" },
    { name: "Medication Reconciliation", size: 220, response: "Call + Portal" }
  ],
  "sdoh": [
    { name: "Resource Limited", size: 480, response: "Call + Mail" },
    { name: "Transportation Needs", size: 460, response: "SMS + Call" },
    { name: "Digital Divide", size: 380, response: "Mail + Call" }
  ],
  "digital": [
    { name: "App Users", size: 980, response: "Push + Email" },
    { name: "Portal Engagers", size: 890, response: "Email + SMS" },
    { name: "Digital Curious", size: 580, response: "SMS + Email" }
  ],
  "benefits": [
    { name: "Benefit Maximizers", size: 720, response: "Email + Portal" },
    { name: "Occasional Users", size: 680, response: "SMS + Email" },
    { name: "Benefit Unfamiliar", size: 470, response: "Call + Mail" }
  ]
}

export default function Dashboard() {
  const [activeAudience, setActiveAudience] = useState<Audience>(audiences[0])
  const [selectedCohort, setSelectedCohort] = useState<string | null>(null)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <div className="flex flex-1 flex-col overflow-hidden">

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold tracking-tight">Smart Cohorts Dashboard</h1>
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
            <p className="text-muted-foreground">
              Target your best prospects for each marketing campaign. Use Smart Cohorts to personalize messaging and engagement approach inside your campaign audience.
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
              <TabsList className="h-auto p-1 bg-gray-200">
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

              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Audience
              </Button>
            </div>

            {audiences.map((audience) => (
              <TabsContent key={audience.id} value={audience.id} className="mt-0">
 

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

                <Card className="mt-6 grid grid-cols-3 gap-6 lg:grid-cols-3">
                  {/* Smart Cohorts Section - Takes up 2/3 of the grid in large screens */}
                  <div className="col-span-1 lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Smart Cohorts</CardTitle>
                      <CardDescription>
                        RadiantGraph has identified {cohortData[audience.id].length} distinct member cohorts for your {audience.name} campaign. Each cohort has unique characteristics and requires different engagement approaches.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="bg-white rounded-lg p-6">
                        <div className="space-y-6">
                          {cohortData[audience.id].map((cohort: Cohort, idx: number) => (
                            <div 
                              key={idx} 
                              className="border rounded-lg p-4"
                              onClick={() => setSelectedCohort(cohort.name)}
                              style={{ 
                                cursor: 'pointer',
                                borderColor: selectedCohort === cohort.name ? COLORS[idx % COLORS.length] : 'inherit',
                                borderWidth: selectedCohort === cohort.name ? '2px' : '1px'
                              }}
                            >
                              <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-medium flex items-center">
                                  <div 
                                    className="w-4 h-4 rounded-full mr-2" 
                                    style={{ backgroundColor: COLORS[idx % COLORS.length] }} 
                                  />
                                  {cohort.name}
                                </h3>
                                <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">{cohort.size.toLocaleString()} members</span>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="text-xs text-gray-500">Recommended Channel</p>
                                  <p className="font-medium">{cohort.response.split(' + ')[0]}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="text-xs text-gray-500">Secondary Channel</p>
                                  <p className="font-medium">{cohort.response.split(' + ')[1] || "N/A"}</p>
                                </div>
                              </div>
                              <div className="text-sm text-gray-700 mb-4">
                                <p><strong>Key Characteristics:</strong></p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                  <li>Demographics: {idx === 0 ? "65+ age group, urban" : idx === 1 ? "45-64, suburban" : idx === 2 ? "25-44, tech-savvy" : "Mixed demographics, rural focus"}</li>
                                  <li>Behavioral Pattern: {idx === 0 ? "Prefers guided support" : idx === 1 ? "Self-directed research" : idx === 2 ? "Highly responsive to incentives" : "Requires multiple touchpoints"}</li>
                                  <li>Risk Level: {idx === 0 ? "High" : idx === 1 ? "Medium" : idx === 2 ? "Low" : "Variable"}</li>
                                </ul>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <button className="text-xs bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg flex items-center">
                                  <Filter className="h-3 w-3 mr-1" /> Refine Segment
                                </button>
                                <button className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-lg flex items-center">
                                  <MessageCircle className="h-3 w-3 mr-1" /> Customize Messaging
                                </button>
                                <button className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg flex items-center">
                                  <ArrowRight className="h-3 w-3 mr-1" /> Deploy Campaign
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </div>

                  {/* Right column - Channel Effectiveness and Performance Metrics stacked */}
                  <div className="col-span-1 space-y-7">
                    {/* Channel Effectiveness Card */}
                    <Card className="mt-10">
                      <CardHeader>
                        <CardTitle>Channel Effectiveness</CardTitle>
                        <CardDescription>Engagement by communication channel</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="h-66">
                          <ChannelEffectivenessChart journeyId={audience.id} cohortId={selectedCohort} />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Performance Metrics Card - Now directly under Channel Effectiveness */}
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
                            <div className="h-51">
                              <JourneyMetricsChart
                                journeyId={audience.id}
                                metricType="engagement"
                                cohortId={selectedCohort}
                              />
                            </div>
                          </TabsContent>
                          <TabsContent value="conversion" className="p-0 m-0">
                            <div className="h-51">
                              <JourneyMetricsChart
                                journeyId={audience.id}
                                metricType="conversion"
                                cohortId={selectedCohort}
                              />
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </div>
  )
}