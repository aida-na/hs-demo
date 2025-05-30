"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Activity,
  Heart,
  MessageSquare,
  Plus,
  UserPlus,
  Users,
  Filter,
  MessageCircle,    
  ArrowRight,
  Building,
  Globe,
  UserMinus,
  TrendingUp,
  MapPin,
  DollarSign,
  FileText,
  Mail,
  Calendar,
  AlertTriangle,
  UserX,
  X,
  ChevronDown
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// More actionable funnel steps
const funnelSteps = [
  { id: "onboarding", name: "Onboarding", description: "New members getting started", count: 1200, icon: UserPlus, color: "bg-blue-500" },
  { id: "first_appointment", name: "First Appointment", description: "Scheduling initial care", count: 800, icon: Calendar, color: "bg-green-500" },
  { id: "gaps_in_care", name: "Gaps in Care", description: "Missing recommended care", count: 2100, icon: AlertTriangle, color: "bg-orange-500" },
  { id: "churn_risk", name: "Churn Risk", description: "At risk of leaving", count: 900, icon: UserX, color: "bg-red-500" }
]

// Population options
const populations = [
  { id: "all", name: "All Population", count: 15850 },
  { id: "acme", name: "Acme Corp", count: 5240 },
  { id: "global-health", name: "Global Health Inc", count: 2180 },
  { id: "midwest", name: "Midwest Manufacturing", count: 4750 }
]

// Enhanced cohort data
interface Cohort {
  name: string
  size: number
  demographics: {
    ageRange: string
    avgAge: number
    genderSplit: { male: number, female: number, other: number }
    topZips: string[]
  }
  sdoh: {
    incomeLevel: string
    educationLevel: string
    transportAccess: string
    foodSecurity: string
    riskScore: number
  }
  claims: {
    avgAnnualCost: number
    chronicConditions: string[]
    utilizationPattern: string
    riskLevel: string
  }
  engagementChannels: {
    preferred: string[]
    response_rates: { [key: string]: number }
  }
  engagement: number
  conversion: number
  priority: "High" | "Medium" | "Low"
  recommendedActions: string[]
}

const cohortData: { [key: string]: { [key: string]: Cohort[] } } = {
  onboarding: {
    all: [
      {
        name: "Tech-Savvy Newcomers",
        size: 340,
        demographics: {
          ageRange: "25-40",
          avgAge: 32,
          genderSplit: { male: 55, female: 43, other: 2 },
          topZips: ["94102", "94103", "94105"]
        },
        sdoh: {
          incomeLevel: "High ($75k+)",
          educationLevel: "College+",
          transportAccess: "Excellent",
          foodSecurity: "Secure",
          riskScore: 2.1
        },
        claims: {
          avgAnnualCost: 2800,
          chronicConditions: ["None", "Minor stress"],
          utilizationPattern: "Self-directed",
          riskLevel: "Low"
        },
        engagementChannels: {
          preferred: ["Mobile App", "Email", "Portal"],
          response_rates: { app: 78, email: 65, portal: 72, sms: 45 }
        },
        engagement: 82,
        conversion: 75,
        priority: "High",
        recommendedActions: ["Digital onboarding flow", "App tutorial", "Gamified goals"]
      },
      {
        name: "Guidance Seekers",
        size: 450,
        demographics: {
          ageRange: "45-65",
          avgAge: 54,
          genderSplit: { male: 40, female: 58, other: 2 },
          topZips: ["94110", "94112", "94134"]
        },
        sdoh: {
          incomeLevel: "Medium ($45-70k)",
          educationLevel: "High School+",
          transportAccess: "Good",
          foodSecurity: "Secure",
          riskScore: 3.2
        },
        claims: {
          avgAnnualCost: 4200,
          chronicConditions: ["Hypertension", "Diabetes"],
          utilizationPattern: "Needs guidance",
          riskLevel: "Medium"
        },
        engagementChannels: {
          preferred: ["Phone", "Email", "Mail"],
          response_rates: { phone: 85, email: 58, mail: 62, sms: 42 }
        },
        engagement: 65,
        conversion: 68,
        priority: "High",
        recommendedActions: ["Welcome call", "Personal health coach", "Step-by-step guides"]
      },
      {
        name: "Hesitant Adopters",
        size: 410,
        demographics: {
          ageRange: "35-55",
          avgAge: 44,
          genderSplit: { male: 52, female: 46, other: 2 },
          topZips: ["94124", "94134", "94158"]
        },
        sdoh: {
          incomeLevel: "Low-Medium ($35-55k)",
          educationLevel: "Some College",
          transportAccess: "Limited",
          foodSecurity: "At Risk",
          riskScore: 4.1
        },
        claims: {
          avgAnnualCost: 3100,
          chronicConditions: ["Anxiety", "Back pain"],
          utilizationPattern: "Reactive",
          riskLevel: "Medium-High"
        },
        engagementChannels: {
          preferred: ["SMS", "Phone"],
          response_rates: { sms: 52, phone: 48, email: 28, portal: 22 }
        },
        engagement: 38,
        conversion: 45,
        priority: "Medium",
        recommendedActions: ["Trust-building content", "Peer testimonials", "Simplified messaging"]
      }
    ]
  },
  first_appointment: {
    all: [
      {
        name: "Proactive Schedulers",
        size: 280,
        demographics: {
          ageRange: "30-50",
          avgAge: 39,
          genderSplit: { male: 48, female: 50, other: 2 },
          topZips: ["94102", "94110", "94117"]
        },
        sdoh: {
          incomeLevel: "High ($70k+)",
          educationLevel: "College+",
          transportAccess: "Excellent",
          foodSecurity: "Secure",
          riskScore: 2.3
        },
        claims: {
          avgAnnualCost: 3400,
          chronicConditions: ["Preventive care focused"],
          utilizationPattern: "Proactive",
          riskLevel: "Low"
        },
        engagementChannels: {
          preferred: ["Portal", "Email", "Mobile App"],
          response_rates: { portal: 82, email: 76, app: 79, phone: 65 }
        },
        engagement: 88,
        conversion: 92,
        priority: "High",
        recommendedActions: ["Online scheduling tools", "Appointment reminders", "Pre-visit prep"]
      },
      {
        name: "Appointment Avoiders",
        size: 520,
        demographics: {
          ageRange: "22-45",
          avgAge: 33,
          genderSplit: { male: 62, female: 36, other: 2 },
          topZips: ["94107", "94124", "94158"]
        },
        sdoh: {
          incomeLevel: "Medium ($40-65k)",
          educationLevel: "High School+",
          transportAccess: "Limited",
          foodSecurity: "Moderate",
          riskScore: 3.8
        },
        claims: {
          avgAnnualCost: 1800,
          chronicConditions: ["None reported"],
          utilizationPattern: "Avoidant",
          riskLevel: "Medium"
        },
        engagementChannels: {
          preferred: ["SMS", "Push notifications"],
          response_rates: { sms: 45, push: 38, email: 25, phone: 18 }
        },
        engagement: 32,
        conversion: 28,
        priority: "High",
        recommendedActions: ["Address barriers", "Flexible scheduling", "Telehealth options"]
      }
    ]
  },
  gaps_in_care: {
    all: [
      {
        name: "Chronic Care Gaps",
        size: 890,
        demographics: {
          ageRange: "50-70",
          avgAge: 58,
          genderSplit: { male: 45, female: 53, other: 2 },
          topZips: ["94112", "94134", "94124"]
        },
        sdoh: {
          incomeLevel: "Medium ($45-70k)",
          educationLevel: "High School+",
          transportAccess: "Limited",
          foodSecurity: "Moderate",
          riskScore: 3.9
        },
        claims: {
          avgAnnualCost: 8200,
          chronicConditions: ["Diabetes", "Hypertension", "High Cholesterol"],
          utilizationPattern: "Inconsistent",
          riskLevel: "High"
        },
        engagementChannels: {
          preferred: ["Phone", "Mail", "SMS"],
          response_rates: { phone: 72, mail: 58, sms: 48, email: 35 }
        },
        engagement: 45,
        conversion: 52,
        priority: "High",
        recommendedActions: ["Care gap alerts", "Provider outreach", "Care coordination"]
      },
      {
        name: "Preventive Care Laggards",
        size: 1210,
        demographics: {
          ageRange: "35-55",
          avgAge: 44,
          genderSplit: { male: 58, female: 40, other: 2 },
          topZips: ["94107", "94110", "94158"]
        },
        sdoh: {
          incomeLevel: "Medium-High ($55-85k)",
          educationLevel: "College",
          transportAccess: "Good",
          foodSecurity: "Secure",
          riskScore: 2.8
        },
        claims: {
          avgAnnualCost: 3600,
          chronicConditions: ["None", "Risk factors present"],
          utilizationPattern: "Reactive only",
          riskLevel: "Medium"
        },
        engagementChannels: {
          preferred: ["Email", "Portal", "SMS"],
          response_rates: { email: 58, portal: 52, sms: 45, phone: 38 }
        },
        engagement: 38,
        conversion: 42,
        priority: "Medium",
        recommendedActions: ["Preventive care campaigns", "Health screenings", "Wellness incentives"]
      }
    ]
  },
  churn_risk: {
    all: [
      {
        name: "Disengaged Members",
        size: 540,
        demographics: {
          ageRange: "25-45",
          avgAge: 34,
          genderSplit: { male: 55, female: 43, other: 2 },
          topZips: ["94124", "94134", "94107"]
        },
        sdoh: {
          incomeLevel: "Low-Medium ($30-55k)",
          educationLevel: "Some College",
          transportAccess: "Poor",
          foodSecurity: "At Risk",
          riskScore: 4.3
        },
        claims: {
          avgAnnualCost: 1200,
          chronicConditions: ["Mental health", "Substance use"],
          utilizationPattern: "Minimal",
          riskLevel: "High"
        },
        engagementChannels: {
          preferred: ["SMS", "Social media"],
          response_rates: { sms: 28, social: 22, email: 15, phone: 12 }
        },
        engagement: 18,
        conversion: 22,
        priority: "High",
        recommendedActions: ["Re-engagement campaign", "Value demonstration", "Peer support"]
      },
      {
        name: "Service Dissatisfied",
        size: 360,
        demographics: {
          ageRange: "40-65",
          avgAge: 51,
          genderSplit: { male: 42, female: 56, other: 2 },
          topZips: ["94110", "94112", "94117"]
        },
        sdoh: {
          incomeLevel: "Medium-High ($60-90k)",
          educationLevel: "College+",
          transportAccess: "Good",
          foodSecurity: "Secure",
          riskScore: 2.9
        },
        claims: {
          avgAnnualCost: 5400,
          chronicConditions: ["Multiple conditions"],
          utilizationPattern: "Frustrated",
          riskLevel: "Medium"
        },
        engagementChannels: {
          preferred: ["Phone", "Email"],
          response_rates: { phone: 65, email: 52, portal: 48, sms: 35 }
        },
        engagement: 42,
        conversion: 35,
        priority: "High",
        recommendedActions: ["Service recovery", "Personal outreach", "Process improvements"]
      }
    ]
  }
}

export default function PopulationCohortsDashboard() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(funnelSteps[0])
  const [selectedPopulation, setSelectedPopulation] = useState("all")
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null)

  const getCurrentCohorts = (): Cohort[] => {
    const stepData = cohortData[activeStep.id]
    if (!stepData) return []
    
    const populationData = stepData[selectedPopulation]
    if (!populationData) return stepData.all || []
    
    return populationData
  }

  const cohorts = getCurrentCohorts()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className={`flex-1 p-6 transition-all ${selectedCohort ? 'mr-96' : ''}`}>
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Population Health Management</h1>
              <p className="text-gray-600 mt-1">Actionable insights for member engagement and care delivery</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedPopulation} onValueChange={setSelectedPopulation}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select population" />
                </SelectTrigger>
                <SelectContent>
                  {populations.map((pop) => (
                    <SelectItem key={pop.id} value={pop.id}>
                      {pop.name} ({pop.count.toLocaleString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => router.push("/hde/smart-cohorts/builder")}>
                <Plus className="w-4 h-4 mr-2" />
                Create Audience
              </Button>
            </div>
          </div>

          {/* Funnel Stages */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="font-medium text-gray-900 mb-4">Care Journey Stages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {funnelSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step)}
                  className={`p-4 rounded-lg border transition-all text-left ${
                    activeStep.id === step.id
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div className={`${step.color} text-white p-2 rounded-lg mr-3`}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`font-medium ${activeStep.id === step.id ? 'text-blue-700' : 'text-gray-900'}`}>
                        {step.name}
                      </div>
                      <div className="text-sm text-gray-600">{step.count.toLocaleString()} members</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cohorts</p>
                  <p className="text-2xl font-bold text-gray-900">{cohorts.length}</p>
                </div>
                <Users className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {cohorts.reduce((sum, c) => sum + c.size, 0).toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {cohorts.filter(c => c.priority === "High").length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Engagement</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {cohorts.length > 0 
                      ? Math.round(cohorts.reduce((sum, c) => sum + c.engagement, 0) / cohorts.length)
                      : 0}%
                  </p>
                </div>
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Cohorts List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {activeStep.name} Cohorts
            </h2>
            
            {cohorts.length > 0 ? (
              <div className="space-y-4">
                {cohorts.map((cohort, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-lg border p-6 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setSelectedCohort(cohort)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-gray-900 mr-3">{cohort.name}</h3>
                        <Badge 
                          variant={cohort.priority === "High" ? "destructive" : cohort.priority === "Medium" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {cohort.priority} Priority
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {cohort.size.toLocaleString()} members
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {cohort.engagement}% engaged
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Key Characteristics</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>Age: {cohort.demographics.ageRange} (avg {cohort.demographics.avgAge})</div>
                          <div>Claims: ${cohort.claims.avgAnnualCost.toLocaleString()} avg</div>
                          <div>SDOH Risk: {cohort.sdoh.riskScore}/5</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Recommended Actions</h4>
                        <div className="flex flex-wrap gap-1">
                          {cohort.recommendedActions.slice(0, 3).map((action, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {action}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Create Campaign
                      </Button>
                      <Button size="sm" variant="outline">
                        <Filter className="w-3 h-3 mr-1" />
                        Refine Segment
                      </Button>
                      <Button size="sm" variant="outline">
                        <ArrowRight className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border p-12 text-center">
                <Users className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Cohorts Found</h3>
                <p className="text-gray-500 mb-4">
                  No cohorts available for this stage and population.
                </p>
                <Button onClick={() => router.push("/hde/smart-cohorts/builder")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Cohort
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      {selectedCohort && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white border-l shadow-lg overflow-y-auto z-50">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedCohort.name}</h2>
                <p className="text-sm text-gray-600">{selectedCohort.size.toLocaleString()} members</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedCohort(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Priority & Engagement */}
            <div className="mb-6">
              <div className="flex gap-2 mb-3">
                <Badge 
                  variant={selectedCohort.priority === "High" ? "destructive" : selectedCohort.priority === "Medium" ? "default" : "secondary"}
                >
                  {selectedCohort.priority} Priority
                </Badge>
                <Badge variant="outline">
                  {selectedCohort.engagement}% Engaged
                </Badge>
              </div>
            </div>

            {/* Demographics */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Demographics
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Age Range:</span>
                  <span className="font-medium">{selectedCohort.demographics.ageRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Age:</span>
                  <span className="font-medium">{selectedCohort.demographics.avgAge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender Split:</span>
                  <span className="font-medium">{selectedCohort.demographics.genderSplit.male}%M / {selectedCohort.demographics.genderSplit.female}%F</span>
                </div>
                <div>
                  <span className="text-gray-600">Top Zip Codes:</span>
                  <div className="flex gap-1 mt-1">
                    {selectedCohort.demographics.topZips.map((zip, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {zip}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SDOH */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Social Determinants of Health
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Income Level:</span>
                  <span className="font-medium">{selectedCohort.sdoh.incomeLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Education:</span>
                  <span className="font-medium">{selectedCohort.sdoh.educationLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transport Access:</span>
                  <span className="font-medium">{selectedCohort.sdoh.transportAccess}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Food Security:</span>
                  <span className="font-medium">{selectedCohort.sdoh.foodSecurity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SDOH Risk Score:</span>
                  <Badge variant={selectedCohort.sdoh.riskScore < 3 ? "default" : "destructive"} className="text-xs">
                    {selectedCohort.sdoh.riskScore}/5
                  </Badge>
                </div>
              </div>
            </div>

            {/* Claims */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Claims & Health
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Annual Cost:</span>
                  <span className="font-medium">${selectedCohort.claims.avgAnnualCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Level:</span>
                  <Badge variant={selectedCohort.claims.riskLevel === "Low" ? "default" : "destructive"} className="text-xs">
                    {selectedCohort.claims.riskLevel}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Utilization:</span>
                  <span className="font-medium">{selectedCohort.claims.utilizationPattern}</span>
                </div>
                <div>
                  <span className="text-gray-600">Conditions:</span>
                  <div className="text-xs text-gray-500 mt-1">
                    {selectedCohort.claims.chronicConditions.join(", ")}
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Channels */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Engagement Channels
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Preferred Channels:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedCohort.engagementChannels.preferred.map((channel, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Response Rates:</span>
                  <div className="space-y-1 mt-2">
                    {Object.entries(selectedCohort.engagementChannels.response_rates).map(([channel, rate]) => (
                      <div key={channel} className="flex justify-between items-center">
                        <span className="capitalize text-xs">{channel}:</span>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${rate}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium w-8">{rate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Recommended Actions
              </h3>
              <div className="space-y-2">
                {selectedCohort.recommendedActions.map((action, i) => (
                  <div key={i} className="flex items-center p-2 bg-gray-50 rounded text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    {action}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Create Targeted Campaign
              </Button>
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                Refine Segment
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Export Cohort Data
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
