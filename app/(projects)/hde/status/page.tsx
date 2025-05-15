"use client";

import Link from "next/link"
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from '@/components/ui/separator'
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  CheckCircle2,
  Activity,
  Zap,
  Heart,
  ArrowRight,
  Calendar,
  Clock,
  Database,
  Download,
  FileText,
  Filter,
  HelpCircle,
  LayoutDashboard,
  Layers,
  LineChart,
  Loader2,
  PlusCircle,
  Search,
  Settings,
  Shield,
  Sparkles,
  UserCircle,
  Users,
  XCircle,
  BarChart as BarChartIcon,
  Table as TableIcon
} from "lucide-react"

// Import our chart components - assuming they are in a file named "charts.js" or similar
import { 
  DataCompletenessBySourceChart,
  IdentityResolutionChart,
  ConditionPrevalenceChart,
  DemographicsChart
} from './charts';

// Main component
export default function HDEStatusPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
            <TabsTrigger value="quality">Enrichment</TabsTrigger>
            <TabsTrigger value="profiles">Member Profiles</TabsTrigger>
            <TabsTrigger value="insights">Population Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <DataOverview />
          </TabsContent>
          <TabsContent value="sources" className="space-y-6">
            <DataSources />
          </TabsContent>
          <TabsContent value="quality" className="space-y-6">
            <DataQuality />
          </TabsContent>
          <TabsContent value="profiles" className="space-y-6">
            <MemberProfiles />
          </TabsContent>
          <TabsContent value="insights" className="space-y-6">
            <PopulationInsights />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function DataOverview() {
  const totalMembers = "4.2M"
  const dataSources = "12"
  const rowsReconciled = "218K"
  const lastRunDate = "April 15, 2025"
  const processingTime = "3.2 hours"
  const genderSourcesFixed = "15"
  const zipCodeFixed = "94%"

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
                <TableIcon className="h-8 w-8 text-purple-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-700">Total Fixes Applied</p>
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
      <Card className="mt-6">
</Card>
    </div>
  )
}

// DataQuality tab with the data completeness and identity resolution charts
function DataQuality() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Data Enrichment</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Data Enrichment Status</CardTitle>
          <CardDescription>Progress of data enrichment processes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">SDOH Factors</span>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="text-sm">58% Complete</span>
              </div>
              <Progress value={58} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Enriching member profiles with social determinants of health data
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Clinical Risk Scores</span>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="text-sm">75% Complete</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground">Calculating clinical risk scores based on claims data</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Condition Mapping</span>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="text-sm">82% Complete</span>
              </div>
              <Progress value={82} className="h-2" />
              <p className="text-xs text-muted-foreground">Mapping ICD-10 codes to standardized condition categories</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 ">
<Card>
  <CardHeader>
    <CardTitle>Missing Member Insights</CardTitle>
    <CardDescription>
      Critical care gaps due to disconnected data sources
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="p-4 border rounded-lg text-center">
        <div className="text-3xl font-bold text-amber-500">842</div>
        <p className="text-sm font-medium mt-1">Members at Risk</p>
        <p className="text-xs text-muted-foreground mt-1">
          Due to fragmented profiles
        </p>
      </div>
      
      <div className="p-4 border rounded-lg text-center">
        <div className="text-3xl font-bold text-amber-500">28%</div>
        <p className="text-sm font-medium mt-1">Care Gaps</p>
        <p className="text-xs text-muted-foreground mt-1">
          Currently invisible in your system
        </p>
      </div>
    </div>
    
    <div className="border-t pt-4">
      <h3 className="font-medium mb-3">Impact on High-Priority Members</h3>
      <div className="space-y-3">
        <div className="p-3 border rounded-lg bg-red-50">
          <div className="flex justify-between mb-2">
            <span className="font-medium">High-Risk Diabetic Members</span>
            <Badge className="bg-red-200 text-red-800">320 members</Badge>
          </div>
          <p className="text-sm">
            Missing pharmacy data prevents identification of medication non-adherence
          </p>
          <Button variant="outline" size="sm" className="mt-2">
            Resolve with Pharmacy Data Connection
          </Button>
        </div>
        
        <div className="p-3 border rounded-lg bg-amber-50">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Post-Discharge Patients</span>
            <Badge className="bg-amber-200 text-amber-800">165 members</Badge>
          </div>
          <p className="text-sm">
            Missing clinical data creates blind spots in post-discharge follow-up
          </p>
          <Button variant="outline" size="sm" className="mt-2">
            Resolve with Clinical Data Connection
          </Button>
        </div>
      </div>
    </div>
  </CardContent>
</Card>
      </div>
    </div>
  )
}

function DataSources() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <h2 className="text-2xl font-bold tracking-tight">Data Sources & Integration Status</h2>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button size="sm" variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Data Source
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Connected Data Sources</CardTitle>
            <CardDescription>Status of data warehouse connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Member Demographics</p>
                      <p className="text-xs text-muted-foreground">Primary member information database</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Connected</Badge>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Last sync: 15 minutes ago</span>
                    <span>5.2M records</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Claims Data Warehouse</p>
                      <p className="text-xs text-muted-foreground">Historical claims and diagnoses</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Connected</Badge>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Last sync: 2 hours ago</span>
                    <span>28.7M records</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Clinical Data Repository</p>
                      <p className="text-xs text-muted-foreground">Lab results and clinical measurements</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-500">Syncing</Badge>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Sync in progress...</span>
                    <span>12.3M records</span>
                  </div>
                  <Progress value={68} className="mt-2 h-1" />
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Marketing Engagement</p>
                      <p className="text-xs text-muted-foreground">Campaign and conversion data</p>
                    </div>
                  </div>
                  <Badge className="bg-red-500">Error</Badge>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-500">Authentication failed</span>
                    <Button variant="outline" size="sm">
                      Reconnect
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Claims Data Integration</CardTitle>
            <CardDescription>Status of claims data processing and normalization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">ICD-10 Claims Processing</h4>
                <Badge className="bg-green-500">Active</Badge>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Diagnoses (ICD-10)</p>
                      <p className="text-xs text-muted-foreground">Primary and secondary diagnoses codes</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        High Value
                      </Badge>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Completeness:</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="mt-2 h-2" />
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pharmacy Claims</p>
                      <p className="text-xs text-muted-foreground">Medication prescriptions and fills</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        High Value
                      </Badge>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Completeness:</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="mt-2 h-2" />
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Procedures (CPT/HCPCS)</p>
                      <p className="text-xs text-muted-foreground">Medical procedures and services</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        High Value
                      </Badge>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Completeness:</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="mt-2 h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>

      <Card>
        <CardHeader>
        <CardTitle>Required Data Elements</CardTitle>
          <CardDescription>Status of critical data elements for integration</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Data Element</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Completeness</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Global Member ID</TableCell>
                <TableCell>User Identifiers</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Active</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={100} className="h-2 w-[100px]" />
                    <span className="text-xs">100%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    Required
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Member Eligibility</TableCell>
                <TableCell>Member Characteristics</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Active</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={98} className="h-2 w-[100px]" />
                    <span className="text-xs">98%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    Required
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Date of Birth</TableCell>
                <TableCell>Member Characteristics</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Active</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={95} className="h-2 w-[100px]" />
                    <span className="text-xs">95%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    Required
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Gender</TableCell>
                <TableCell>Member Characteristics</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Active</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={99} className="h-2 w-[100px]" />
                    <span className="text-xs">99%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    Required
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ZIP Code</TableCell>
                <TableCell>Member Characteristics</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Active</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={97} className="h-2 w-[100px]" />
                    <span className="text-xs">97%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    Required
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Service Eligibility</TableCell>
                <TableCell>Member Characteristics</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Active</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={100} className="h-2 w-[100px]" />
                    <span className="text-xs">100%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    Required
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Relationship Status</TableCell>
                <TableCell>Member Characteristics</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Active</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={92} className="h-2 w-[100px]" />
                    <span className="text-xs">92%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    Required
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Claims Data</TableCell>
                <TableCell>Additional Signals</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Active</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={85} className="h-2 w-[100px]" />
                    <span className="text-xs">85%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    Required
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Email Address</TableCell>
                <TableCell>Contact Ability</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Active</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={78} className="h-2 w-[100px]" />
                    <span className="text-xs">78%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    Required
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Race/Ethnicity</TableCell>
                <TableCell>Member Characteristics</TableCell>
                <TableCell>
                  <Badge className="bg-amber-500">Partial</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={65} className="h-2 w-[100px]" />
                    <span className="text-xs">65%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-amber-500 text-amber-500">
                    Nice to Have
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Medications</TableCell>
                <TableCell>Additional Signals</TableCell>
                <TableCell>
                  <Badge className="bg-amber-500">Partial</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={72} className="h-2 w-[100px]" />
                    <span className="text-xs">72%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-amber-500 text-amber-500">
                    Nice to Have
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Clinical Signals (BMI, BP)</TableCell>
                <TableCell>Additional Signals</TableCell>
                <TableCell>
                  <Badge className="bg-amber-500">Partial</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={58} className="h-2 w-[100px]" />
                    <span className="text-xs">58%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-amber-500 text-amber-500">
                    Nice to Have
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Marketing Engagement</TableCell>
                <TableCell>Historical Engagement</TableCell>
                <TableCell>
                  <Badge className="bg-amber-500">Partial</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={45} className="h-2 w-[100px]" />
                    <span className="text-xs">45%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-amber-500 text-amber-500">
                    Nice to Have
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  )
}

function MemberProfiles() {
  const memberCohorts = [
    {
      audienceId: "medication",
      audienceName: "Medication Adherence",
      audienceIcon: Heart,
      cohortName: "Tech-Savvy Seniors",
      size: 1240,
      response: "SMS + Email",
      relevanceScore: 92,
      color: "#4f46e5"
    },
    {
      audienceId: "chronic",
      audienceName: "Chronic Condition Management",
      audienceIcon: Activity,
      cohortName: "Multiple Condition Patients",
      size: 720,
      response: "Portal + Call",
      relevanceScore: 87,
      color: "#0ea5e9"
    },
    {
      audienceId: "highrisk",
      audienceName: "High-Risk Member Intervention",
      audienceIcon: Zap,
      cohortName: "Complex Conditions",
      size: 290,
      response: "Call + SMS",
      relevanceScore: 78,
      color: "#f59e0b"
    }
  ];

  // Medication data
  const medications = [
    { name: "Metformin", dosage: "1000mg", startDate: "Jan 2018", lastFill: "Last week", adherence: "High (92%)", adherenceColor: "bg-green-500" },
    { name: "Lisinopril", dosage: "20mg", startDate: "Mar 2016", lastFill: "2 weeks ago", adherence: "High (95%)", adherenceColor: "bg-green-500" },
    { name: "Atorvastatin", dosage: "40mg", startDate: "Mar 2016", lastFill: "3 weeks ago", adherence: "Medium (78%)", adherenceColor: "bg-amber-500" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Member Profiles</h2>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Sample Member Details</CardTitle>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">High Value Member</Badge>
          </div>
          <CardDescription>Comprehensive member profile with integrated data from multiple sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column - Basic Info */}
              <div className="md:w-1/3 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg bg-blue-100 text-blue-800">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-xl font-bold">John Doe</h4>
                    <p className="text-muted-foreground">ID: 1234567890</p>
                  </div>
                </div>

                <div className="rounded-lg border p-4 space-y-4">
                  <h5 className="font-medium">Basic Information</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Age</p>
                      <p>58</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Gender</p>
                      <p>Male</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">ZIP Code</p>
                      <p>90210</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Relationship</p>
                      <p>Primary</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Eligibility</p>
                      <p>Active</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Plan Type</p>
                      <p>PPO</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Race/Ethnicity</p>
                      <p>Caucasian</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Language</p>
                      <p>English</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 space-y-4">
                  <h5 className="font-medium">Contact Channels</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-500">
                          Email
                        </Badge>
                        <span className="text-sm">john.doe@example.com</span>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-500">
                          Phone
                        </Badge>
                        <span className="text-sm">(555) 123-4567</span>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-500">
                          Mail
                        </Badge>
                        <span className="text-sm">123 Main St, Beverly Hills, CA</span>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-50 text-red-500">
                          Text
                        </Badge>
                        <span className="text-sm">Not available</span>
                      </div>
                      <XCircle className="h-4 w-4 text-red-500" />
                    </div>
                  </div>
                </div>

                {/* NEW: Smart Cohort Memberships */}
                <div className="rounded-lg border p-4 space-y-4">
  <h5 className="font-medium">Smart Cohort Membership</h5>
  <div className="space-y-3">
    {memberCohorts.map((cohort, idx) => {
      const IconComponent = cohort.audienceIcon;
      
      return (
        <div key={idx} className="rounded border p-3" style={{ borderColor: cohort.color }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-full" style={{ backgroundColor: `${cohort.color}30` }}>
              <IconComponent className="h-4 w-4" style={{ color: cohort.color }} />
            </div>
            <div>
              <p className="text-sm font-medium">{cohort.audienceName}</p>
              <p className="text-xs font-medium" style={{ color: cohort.color }}>{cohort.cohortName}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Audience Size: {cohort.size.toLocaleString()}</span>
            <span>Match Score: {cohort.relevanceScore}%</span>
          </div>
          <div className="mt-2 pt-2 border-t flex justify-between items-center">
            <span className="text-xs font-medium">Best Channels: {cohort.response}</span>
            <Button size="sm" variant="ghost" className="h-6 text-xs">
              <ArrowRight className="h-3 w-3 mr-1" />
              Manage
            </Button>
          </div>
        </div>
      );
    })}
  </div>
</div>  
              </div>

              {/* Right Column - Health Info */}
              <div className="md:w-2/3 space-y-4">
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Health Conditions (from Claims)</h5>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      High Value Data
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge>Primary</Badge>
                        <span className="text-sm font-medium">Type 2 Diabetes (E11.9)</span>
                      </div>
                      <span className="text-xs text-muted-foreground">First diagnosed: Jan 2018</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Secondary</Badge>
                        <span className="text-sm">Hypertension (I10)</span>
                      </div>
                      <span className="text-xs text-muted-foreground">First diagnosed: Mar 2016</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Secondary</Badge>
                        <span className="text-sm">Hyperlipidemia (E78.5)</span>
                      </div>
                      <span className="text-xs text-muted-foreground">First diagnosed: Mar 2016</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Secondary</Badge>
                        <span className="text-sm">Obesity (E66.9)</span>
                      </div>
                      <span className="text-xs text-muted-foreground">First diagnosed: Jan 2018</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Medications (from Claims)</h5>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      High Value Data
                    </Badge>
                  </div>
                  <div className="overflow-x-auto">
                    <div className="min-w-full border rounded-md">
                      <div className="grid grid-cols-5 bg-muted px-4 py-2 text-xs font-medium">
                        <div>Medication</div>
                        <div>Dosage</div>
                        <div>Start Date</div>
                        <div>Last Fill</div>
                        <div>Adherence</div>
                      </div>
                      <div className="divide-y">
                        {medications.map((med, idx) => (
                          <div key={idx} className="grid grid-cols-5 px-4 py-3 text-sm">
                            <div className="font-medium">{med.name}</div>
                            <div>{med.dosage}</div>
                            <div>{med.startDate}</div>
                            <div>{med.lastFill}</div>
                            <div>
                              <Badge className={med.adherenceColor}>{med.adherence}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="clinical">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="clinical">Clinical Signals</TabsTrigger>
                    <TabsTrigger value="sdoh">SDOH Factors</TabsTrigger>
                  </TabsList>

                  <TabsContent value="clinical">
                    <div className="rounded-lg border p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Clinical Signals</h5>
                        <Badge variant="outline" className="border-amber-500 text-amber-500">
                          Partial Data
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="rounded-lg border p-3 text-center">
                          <p className="text-xs text-muted-foreground">BMI</p>
                          <p className="text-xl font-bold">32.4</p>
                          <Badge className="mt-1 bg-red-500">High</Badge>
                        </div>
                        <div className="rounded-lg border p-3 text-center">
                          <p className="text-xs text-muted-foreground">Blood Pressure</p>
                          <p className="text-xl font-bold">142/88</p>
                          <Badge className="mt-1 bg-amber-500">Elevated</Badge>
                        </div>
                        <div className="rounded-lg border p-3 text-center">
                          <p className="text-xs text-muted-foreground">A1C</p>
                          <p className="text-xl font-bold">7.2%</p>
                          <Badge className="mt-1 bg-amber-500">Elevated</Badge>
                        </div>
                        <div className="rounded-lg border p-3 text-center">
                          <p className="text-xs text-muted-foreground">LDL</p>
                          <p className="text-xl font-bold">118</p>
                          <Badge className="mt-1 bg-amber-500">Elevated</Badge>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="sdoh">
                    <div className="rounded-lg border p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">SDOH Factors</h5>
                        <Badge variant="outline" className="border-amber-500 text-amber-500">
                          Partial Data
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Transportation</p>
                            <Badge className="bg-green-500">Low Risk</Badge>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">
                            Has reliable transportation for medical appointments
                          </p>
                        </div>
                        <div className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Food Security</p>
                            <Badge className="bg-green-500">Low Risk</Badge>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">No indicators of food insecurity</p>
                        </div>
                        <div className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Health Literacy</p>
                            <Badge className="bg-amber-500">Medium Risk</Badge>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">
                            May need additional education on condition management
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Campaign Recommendations Based on Cohort Data */}
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Personalized Recommendations</h5>
                    <Badge variant="outline" className="border-blue-500 text-blue-500">
                      AI-Generated
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-3 rounded-md">
                      <div className="flex items-center mb-2">
                        <Heart className="h-4 w-4 text-blue-600 mr-2" />
                        <h6 className="font-medium text-blue-700">Medication Adherence Focus</h6>
                      </div>
                      <p className="text-sm text-blue-700">
                        Based on "Tech-Savvy Seniors" cohort data, this member responds best to digital reminders.
                        Consider SMS medication reminders with portal follow-up.
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-md">
                      <div className="flex items-center mb-2">
                        <Zap className="h-4 w-4 text-blue-600 mr-2" />
                        <h6 className="font-medium text-blue-700">High Risk Intervention Needed</h6>
                      </div>
                      <p className="text-sm text-blue-700">
                        Member matches "Complex Conditions" cohort profile with elevated clinical markers.
                        Recommend care management outreach with personalized diabetes management plan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">View Full Profile</Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Population Insights tab with the condition prevalence and demographics charts
function PopulationInsights() {
  const employerData = [
    { 
      name: "Acme Corporation", 
      members: 5240, 
      growth: 3.2, 
      dataCompleteness: 92,
      topConditions: ["Hypertension", "Diabetes"]
    },
    { 
      name: "Global Health Inc", 
      members: 2180, 
      growth: -1.5,
      dataCompleteness: 85,
      topConditions: ["Hypertension", "Obesity"]
    },
    { 
      name: "Midwest Manufacturing", 
      members: 4750, 
      growth: 5.4, 
      dataCompleteness: 78,
      topConditions: ["Diabetes", "COPD"]
    }
  ];

  const conditionPrevalenceData = [
    { name: "Type 2 Diabetes", value: 18 },
    { name: "Hypertension", value: 28 },
    { name: "Hyperlipidemia", value: 22 },
    { name: "Obesity", value: 20 },
    { name: "Depression", value: 15 },
    { name: "Asthma", value: 12 },
  ];

  const clinicalFactorsData = [
    { name: "Uncontrolled BP", value: 24 },
    { name: "A1C > 9.0", value: 16 },
    { name: "BMI > 30", value: 38 },
    { name: "Low Medication Adherence", value: 32 }
  ];

  const behavioralFactorsData = [
    { name: "Low Physical Activity", value: 45 },
    { name: "Tobacco Use", value: 22 },
    { name: "Poor Nutrition", value: 36 },
    { name: "High Stress", value: 29 }
  ];

  const demographicData = {
    age: [
      { name: "18-24", value: 8 },
      { name: "25-34", value: 22 },
      { name: "35-44", value: 27 },
      { name: "45-54", value: 20 },
      { name: "55-64", value: 18 },
      { name: "65+", value: 5 }
    ],
    gender: [
      { name: "Male", value: 53 },
      { name: "Female", value: 47 }
    ]
  };
  
  const careGapData = [
    { name: "Annual Physical", value: 32 },
    { name: "Diabetes Eye Exam", value: 42 },
    { name: "Cancer Screening", value: 28 },
    { name: "Vaccination", value: 18 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <h2 className="text-2xl font-bold tracking-tight">Population Insights</h2>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <select className="px-3 py-2 rounded-md border border-gray-300 bg-white">
            <option value="acme">Acme Corporation</option>
            <option value="global">Global Health Inc</option>
            <option value="midwest">Midwest Manufacturing</option>
          </select>
          <button className="px-3 py-2 rounded-md bg-white border border-gray-300 flex items-center gap-2 text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-gray-500">Total Population</p>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-bold">5,240</span>
            <span className="text-sm text-green-600 flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              3.2%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">vs last year</p>
        </div>
    
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-gray-500">Cost per Member</p>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-bold">$7,845</span>
            <span className="text-sm text-red-600 flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
              5.4%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">vs last year</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-gray-500">Engagement Rate</p>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-bold">68%</span>
            <span className="text-sm text-green-600 flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              12%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">vs industry average</p>
        </div>
      </div>

      {/* First row of charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="mb-3">
            <h4 className="text-base font-medium">Condition Prevalence</h4>
            <p className="text-sm text-gray-500">Most common conditions at Acme Corporation</p>
          </div>
          <div className="h-64">
            {/* Placeholder for chart */}
            <div className="h-full w-full flex flex-col justify-between">
              {conditionPrevalenceData.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="w-32 text-sm">{item.name}</div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-100 rounded-md overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-md" 
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-10 text-sm text-right ml-2">{item.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="mb-3">
            <h4 className="text-base font-medium">Demographics</h4>
            <p className="text-sm text-gray-500">Age and gender distribution at Acme Corporation</p>
          </div>
          <div className="h-64 grid grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium mb-2">Age Distribution</h5>
              {demographicData.age.map((item, index) => (
                <div key={index} className="flex items-center mb-1.5">
                  <div className="w-12 text-xs">{item.name}</div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-100 rounded-sm overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-sm" 
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-8 text-xs text-right ml-1">{item.value}%</div>
                </div>
              ))}
            </div>
            <div>
              <h5 className="text-sm font-medium mb-2">Gender Distribution</h5>
              <div className="h-32 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gray-100 relative">
                  <div 
                    className="absolute top-0 left-0 w-32 h-32 rounded-full overflow-hidden"
                    style={{ 
                      clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                      background: `conic-gradient(#3b82f6 0% ${demographicData.gender[0].value}%,rgb(245, 204, 220) ${demographicData.gender[0].value}% 100%)`
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="text-xs flex gap-2 mb-1">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mr-1"></div>
                        <span>Male</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-400 mr-1"></div>
                        <span>Female</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second row of charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="mb-3">
            <h4 className="text-base font-medium">Clinical Risk Factors</h4>
            <p className="text-sm text-gray-500">Key clinical indicators at Acme Corporation</p>
          </div>
          <div className="h-64">
            {/* Placeholder for chart */}
            <div className="h-full w-full flex flex-col justify-between">
              {clinicalFactorsData.map((item, index) => (
                <div key={index} className="flex items-center mb-3">
                  <div className="w-40 text-sm">{item.name}</div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-100 rounded-md overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 rounded-md" 
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-10 text-sm text-right ml-2">{item.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="mb-3">
            <h4 className="text-base font-medium">Behavioral Risk Factors</h4>
            <p className="text-sm text-gray-500">Key behavioral indicators at Acme Corporation</p>
          </div>
          <div className="h-64">
            {/* Placeholder for chart */}
            <div className="h-full w-full flex flex-col justify-between">
              {behavioralFactorsData.map((item, index) => (
                <div key={index} className="flex items-center mb-3">
                  <div className="w-40 text-sm">{item.name}</div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-100 rounded-md overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-md" 
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-10 text-sm text-right ml-2">{item.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Care Gap Analysis Card */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="mb-3">
          <h4 className="text-base font-medium">Care Gap Analysis</h4>
          <p className="text-sm text-gray-500">Percentage of Acme Corporation members with care gaps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {careGapData.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4 border rounded-md">
              <div className="w-20 h-20 relative mb-2">
                <svg viewBox="0 0 36 36" className="w-20 h-20">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeDasharray={`${item.value}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{item.value}%</span>
                </div>
              </div>
              <p className="text-sm text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Employer Group Table */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="mb-3">
          <h4 className="text-base font-medium">All Employer Groups Comparison</h4>
          <p className="text-sm text-gray-500">Population insights across employer groups</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Employer</th>
                <th className="py-2 px-4 text-left">Members</th>
                <th className="py-2 px-4 text-left">Growth</th>
                <th className="py-2 px-4 text-left">Top Conditions</th>
                <th className="py-2 px-4 text-left">Data Completeness</th>
                <th className="py-2 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {employerData.map((employer, index) => (
                <tr key={index} className={index < employerData.length - 1 ? "border-b" : ""}>
                  <td className="py-3 px-4 font-medium">{employer.name}</td>
                  <td className="py-3 px-4">{employer.members.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={employer.growth >= 0 ? "text-green-600" : "text-red-600"}>
                      {employer.growth >= 0 ? "+" : ""}{employer.growth}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {employer.topConditions.map((condition, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full" 
                          style={{ width: `${employer.dataCompleteness}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{employer.dataCompleteness}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="mb-3">
          <h4 className="text-base font-medium">Action Recommendations</h4>
          <p className="text-sm text-gray-500">Suggested interventions based on population analysis</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-md">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h5 className="font-medium">High-Risk Care Management</h5>
            </div>
            <p className="text-sm text-gray-600">Target 320 members with multiple chronic conditions for enhanced care management program.</p>
          </div>
          
          <div className="p-4 border rounded-md">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h5 className="font-medium">Diabetes Management Program</h5>
            </div>
            <p className="text-sm text-gray-600">Implement targeted diabetes program for 940 members with uncontrolled A1C levels.</p>
          </div>
          
          <div className="p-4 border rounded-md">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                </svg>
              </div>
              <h5 className="font-medium">Preventive Screening Campaign</h5>
            </div>
            <p className="text-sm text-gray-600">Launch targeted outreach for 1,850 members overdue for preventive screenings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

