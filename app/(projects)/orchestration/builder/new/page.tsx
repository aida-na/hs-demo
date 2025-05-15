"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Users,
  Heart,
  Activity,
  Calendar,
  UserPlus,
  Zap,
  Save,
  Check,
  Info,
  AlertCircle,
  ChevronRight,
  BarChart3,
  Clock,
  Send,
  CheckCircle,
  Settings,
} from "lucide-react"
import AudienceSelector from "@/components/campaign/segment-selector"
import JourneyBuilder from "@/components/journey/journey-builder"
import JourneyTemplates from "@/components/journey/journey-templates"
import CampaignConfiguration from "@/components/campaign/campaign-configuration"
import { useRouter } from "next/navigation"

// Define types for our data structures
type TabValue = "goal" | "segments" | "journey" | "configuration" | "review"
type AudienceGoal = {
  id: string
  title: string
  description: string
  icon: React.ElementType
  count: number
  recommendedFor?: string[]
}
type Segment = {
  id: string
  name: string
  count: number
}

// Sample goals and segments for the summary sidebar
const audienceGoals: AudienceGoal[] = [
  {
    id: "medication",
    title: "Medication Adherence",
    description: "Improve compliance with prescribed medications",
    icon: Heart,
    count: 3250,
    recommendedFor: ["Chronic conditions", "Elderly members"],
  },
  {
    id: "caregap",
    title: "Care Gap Closure",
    description: "Identify and address gaps in patient care",
    icon: Activity,
    count: 2180,
    recommendedFor: ["Preventive care", "Quality measures"],
  },
  {
    id: "wellness",
    title: "Annual Wellness Visit",
    description: "Encourage preventive care and regular check-ups",
    icon: Calendar,
    count: 3420,
    recommendedFor: ["Medicare members", "New enrollees"],
  },
  {
    id: "onboarding",
    title: "New Member Onboarding",
    description: "Welcome new members and guide them through initial steps",
    icon: UserPlus,
    count: 1240,
    recommendedFor: ["Recent enrollees", "Plan changes"],
  },
  {
    id: "highrisk",
    title: "High-Risk Member Intervention",
    description: "Targeted support for members with complex needs",
    icon: Zap,
    count: 890,
    recommendedFor: ["Multiple conditions", "High utilizers"],
  },
]

// Sample journey templates
const journeyTemplates = [
  {
    id: "welcome",
    title: "Welcome Series",
    description: "A 3-step journey to welcome new members",
    steps: 3,
    recommended: true,
  },
  {
    id: "medication",
    title: "Medication Reminder",
    description: "Regular reminders with escalation for non-responders",
    steps: 5,
    recommended: false,
  },
  {
    id: "appointment",
    title: "Appointment Follow-up",
    description: "Pre and post appointment communication",
    steps: 4,
    recommended: false,
  },
]

export default function NewCampaign() {
  // All hooks must be at the top of the component
  const [selectedGoal, setSelectedGoal] = useState<string>("medication")
  const [activeTab, setActiveTab] = useState<TabValue>("goal")
  const [selectedSegments, setSelectedSegments] = useState<Segment[]>([
    { id: "new-members", name: "New Members", count: 1240 },
    { id: "age-30-45", name: "Age 30-45", count: 2850 },
    { id: "chronic", name: "Chronic Condition", count: 1950 },
  ])
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [campaignName, setCampaignName] = useState("Medication Adherence Campaign")
  
  // Custom goal states
  const [customGoalTitle, setCustomGoalTitle] = useState("")
  const [customGoalDescription, setCustomGoalDescription] = useState("")
  const [customGoalTarget, setCustomGoalTarget] = useState("")
  
  // Journey Builder specific states
  const [journeyActiveTab, setJourneyActiveTab] = useState("scratch") 
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  
  // NEW: Audience selection states
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([])
  const [selectedCohorts, setSelectedCohorts] = useState<string[]>([])
  const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>([])
  
  const router = useRouter()

  // Calculate total reach based on selected segments
  const totalReach = selectedSegments.reduce((total, segment) => total + segment.count, 0)

  // Get active step number for progress indicator
  const getActiveStepNumber = (): number => {
    switch (activeTab) {
      case "goal":
        return 0
      case "segments":
        return 1
      case "journey":
        return 2
      case "configuration":
        return 3
      case "review":
        return 4
      default:
        return 0
    }
  }

  // Find the selected goal details
  const selectedGoalDetails = audienceGoals.find((goal) => goal.id === selectedGoal)

  // Handle tab change with proper type annotation
  const handleTabChange = (value: TabValue): void => {
    setActiveTab(value)
  }

  // Handle template selection
  const handleTemplateSelect = (templateId: string): void => {
    setSelectedTemplate(templateId)
  }
  
  // Handle launching the campaign
  const handleLaunchCampaign = () => {
    // Here you would typically make an API call to launch the campaign
    // Then show success dialog when complete
    setShowSuccessDialog(true)
  }
  
  // Handle navigating to dashboard after launch
  const handleViewDashboard = () => {
    router.push("/orchestration")
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      {/* Enhanced Header with Campaign Name */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Create New Campaign</h1>
            <p className="text-muted-foreground mt-1">{campaignName || "Untitled Campaign"}</p>
          </div>
        </div>

        {/* Enhanced Progress Visualization - now with 5 steps */}
        <div className="relative">
          {/* The main progress track - positioned exactly */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200"></div>
          
          {/* The filled progress - using calculation to precisely align with step centers */}
          <div 
            className="absolute top-6 left-0 h-0.5 bg-primary transition-all duration-500"
            style={{ 
              width: activeTab === "goal" ? "0%" : `calc(${(getActiveStepNumber()) / (4)} * 100%)`,
            }}
          ></div>
          
          {/* Step indicators - precisely positioned */}
          <div className="relative flex justify-between">
            {[
              { step: "Campaign Goal", value: "goal" as TabValue, icon: <Target className="h-5 w-5" /> },
              { step: "Audience Selection", value: "segments" as TabValue, icon: <Users className="h-5 w-5" /> },
              { step: "Journey Builder", value: "journey" as TabValue, icon: <ArrowRight className="h-5 w-5" /> },
              { step: "Campaign Configuration", value: "configuration" as TabValue, icon: <Settings className="h-5 w-5" /> },
              { step: "Review & Launch", value: "review" as TabValue, icon: <Check className="h-5 w-5" /> },
            ].map((item, index) => {
              const isActive = activeTab === item.value;
              const isCompleted = getActiveStepNumber() > index;
              
              return (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleTabChange(item.value as TabValue)}
                >
                  {/* Step circle - positioned exactly at center of progress bar */}
                  <div 
                    className={`
                      relative z-10 flex items-center justify-center w-12 h-12 rounded-full 
                      border-2 transition-all duration-300
                      ${isActive 
                        ? 'bg-primary border-primary text-white'
                        : isCompleted
                          ? 'bg-emerald-700 border-emerald-700 text-white'
                          : 'bg-white border-gray-300 text-gray-400'}
                      shadow-sm
                    `}
                  >
                    {isCompleted ? <Check className="h-6 w-6" /> : item.icon}
                  </div>
                  
                  {/* Step label */}
                  <span className={`
                    mt-2 text-sm text-center whitespace-nowrap
                    ${isActive 
                      ? 'font-medium text-primary'
                      : isCompleted
                        ? 'font-medium text-emerald-700'
                        : 'text-gray-500'}
                    hidden md:block
                  `}>
                    {item.step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area - 3/4 width on large screens */}
        <div className="lg:col-span-4">
          <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value as TabValue)}>
            {/* Hidden TabsList to manage state - visually replaced by our custom progress indicator */}
            <TabsList className="hidden">
              <TabsTrigger value="goal">Campaign Goal</TabsTrigger>
              <TabsTrigger value="segments">Select Segments</TabsTrigger>
              <TabsTrigger value="journey">Build Journey</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="review">Review & Launch</TabsTrigger>
            </TabsList>

            {/* Campaign Goal Tab Content */}
            <TabsContent value="goal">
              <Card className="border-t-4 border-t-primary">
                <CardHeader className="pb-0">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 mr-4">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Select Campaign Goal</CardTitle>
                      <CardDescription className="mt-1">
                        Choose the primary objective for your personalized health campaign
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Visual Campaign Goal Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {audienceGoals.map((goal) => (
                      <Card
                        key={goal.id}
                        className={`cursor-pointer transition-all hover:border-primary hover:shadow-md ${
                          selectedGoal === goal.id ? "border-primary bg-primary/5 ring-1 ring-primary" : ""
                        }`}
                        onClick={() => setSelectedGoal(goal.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-3">
                            <div
                              className={`flex items-center justify-center h-10 w-10 rounded-full ${
                                selectedGoal === goal.id ? "bg-primary text-white" : "bg-primary/10 text-primary"
                              }`}
                            >
                              <goal.icon className="h-5 w-5" />
                            </div>
                            {selectedGoal === goal.id && <Badge className="bg-primary">Selected</Badge>}
                          </div>
                          <h3 className="font-semibold text-lg mb-1">{goal.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {goal.count.toLocaleString()} members
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {/* Custom Goal Option */}
                    <Card
                      className={`cursor-pointer transition-all hover:border-primary hover:shadow-md ${
                        selectedGoal === "custom" ? "border-primary bg-primary/5 ring-1 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedGoal("custom")}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div
                            className={`flex items-center justify-center h-10 w-10 rounded-full ${
                              selectedGoal === "custom" ? "bg-primary text-white" : "bg-primary/10 text-primary"
                            }`}
                          >
                            <Target className="h-5 w-5" />
                          </div>
                          {selectedGoal === "custom" && <Badge className="bg-primary">Selected</Badge>}
                        </div>
                        <h3 className="font-semibold text-lg mb-1">Define Custom Goal</h3>
                        <p className="text-sm text-muted-foreground mb-3">Create your own personalized campaign objective</p>
                        <Badge variant="outline" className="text-xs">
                          Customize your target
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Custom Goal Form - Show when custom is selected */}
                  {selectedGoal === "custom" && (
                    <div className="mb-8 p-6 border rounded-lg bg-gray-50">
                      <h3 className="text-lg font-medium mb-4">Define Your Custom Goal</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="custom-goal-title" className="block text-sm font-medium mb-1">
                            Goal Title
                          </label>
                          <input
                            type="text"
                            id="custom-goal-title"
                            value={customGoalTitle}
                            onChange={(e) => setCustomGoalTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Enter your campaign goal title"
                          />
                        </div>
                        <div>
                          <label htmlFor="custom-goal-description" className="block text-sm font-medium mb-1">
                            Goal Description
                          </label>
                          <textarea
                            id="custom-goal-description"
                            value={customGoalDescription}
                            onChange={(e) => setCustomGoalDescription(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            rows={3}
                            placeholder="Describe what you want to achieve with this campaign"
                          />
                        </div>
                        <div>
                          <label htmlFor="custom-goal-target" className="block text-sm font-medium mb-1">
                            Target Outcome (Optional)
                          </label>
                          <input
                            type="text"
                            id="custom-goal-target"
                            value={customGoalTarget}
                            onChange={(e) => setCustomGoalTarget(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="e.g., 30% increase in engagement, 50 completed appointments"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Campaign Name Input */}
                  <div className="mb-6">
                    <label htmlFor="campaign-name" className="block text-sm font-medium mb-1">
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      id="campaign-name"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      placeholder="Enter campaign name"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div></div> {/* Empty div to maintain layout with justify-between */}
                  <div className="flex gap-2">
                    <Button variant="outline">Save Draft</Button>
                    <Button 
                      className="gap-2" 
                      onClick={() => {
                        // Validate custom goal if selected
                        if (selectedGoal === "custom" && !customGoalTitle.trim()) {
                          alert("Please enter a goal title for your custom goal");
                          return;
                        }
                        setActiveTab("segments");
                      }}
                    >
                      Continue to Segments
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Segments Tab Content */}
            <TabsContent value="segments">
              <Card className="border-t-4 border-t-primary">
                <CardHeader className="pb-0">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 mr-4">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Select Member Segments</CardTitle>
                      <CardDescription className="mt-1">
                        Define your target audience by selecting patient segments
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Enhanced Audience Selector with Recommendations */}
                  <div className="mb-6">
                    <AudienceSelector
                      initialSelectedAudiences={selectedAudiences}
                      initialSelectedCohorts={selectedCohorts}
                      initialSelectedBehaviors={selectedBehaviors}
                      onAudienceChange={setSelectedAudiences}
                      onCohortsChange={setSelectedCohorts}
                      onBehaviorsChange={setSelectedBehaviors}
                    />
                  </div>

                  {/* Segment Combination Logic */}
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" className="gap-2" onClick={() => setActiveTab("goal")}>
                    <ArrowLeft className="h-4 w-4" />
                    Back to Goals
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">Save Draft</Button>
                    <Button className="gap-2" onClick={() => setActiveTab("journey")}>
                      Continue to Journey Builder
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Journey Tab Content - Updated to pass props */}
            <TabsContent value="journey">
              <Card className="border-t-4 border-t-primary">
                <CardHeader className="pb-0">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 mr-4">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Build Your Journey</CardTitle>
                      <CardDescription className="mt-1">
                        Design the communication flow for your campaign
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">

                  {/* Journey Builder Interface */}
                  <Tabs value={journeyActiveTab} onValueChange={setJourneyActiveTab} className="mb-10">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="scratch">Start from Scratch</TabsTrigger>
                      <TabsTrigger value="template">Choose a Template</TabsTrigger>
                    </TabsList>

                    <TabsContent value="scratch">
                      <Card>
                        <CardContent className="pt-6">
                          <JourneyBuilder
                            selectedAudiences={selectedAudiences}
                            selectedCohorts={selectedCohorts}
                            selectedBehaviors={selectedBehaviors}
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="template">
                      <Card>
                        <CardContent className="pt-6">
                          <JourneyTemplates />

                          <div className="flex justify-end mt-8">
                            <Button onClick={() => setJourneyActiveTab("scratch")}>Customize Selected Template</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" className="gap-2" onClick={() => setActiveTab("segments")}>
                    <ArrowLeft className="h-4 w-4" />
                    Back to Segments
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">Save Draft</Button>
                    <Button className="gap-2" onClick={() => setActiveTab("configuration")}>
                      Continue to Configuration
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* NEW Configuration Tab Content */}
            <TabsContent value="configuration">
              <Card className="border-t-4 border-t-primary">
                <CardHeader className="pb-0">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 mr-4">
                      <Settings className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Campaign Configuration</CardTitle>
                      <CardDescription className="mt-1">
                        Set up the details and parameters for your campaign
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CampaignConfiguration />
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" className="gap-2" onClick={() => setActiveTab("journey")}>
                    <ArrowLeft className="h-4 w-4" />
                    Back to Journey Builder
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">Save Draft</Button>
                    <Button className="gap-2" onClick={() => setActiveTab("review")}>
                      Continue to Review
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Review Tab Content */}
            <TabsContent value="review">
              <Card className="border-t-4 border-t-primary">
                <CardHeader className="pb-0">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 mr-4">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Review & Launch</CardTitle>
                      <CardDescription className="mt-1">Review your campaign details before launching</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Campaign Overview */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Campaign Overview</h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Campaign Name</p>
                              <p className="font-medium">{campaignName}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Goal</p>
                              <div className="flex items-center">
                                {selectedGoal === "custom" ? (
                                  <>
                                    <Target className="h-4 w-4 text-primary mr-2" />
                                    <span>{customGoalTitle || "Custom Goal"}</span>
                                  </>
                                ) : selectedGoalDetails && (
                                  <>
                                    <selectedGoalDetails.icon className="h-4 w-4 text-primary mr-2" />
                                    <span>{selectedGoalDetails.title}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Estimated Reach</p>
                              <p className="font-medium">{totalReach.toLocaleString()} members</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Journey Template</p>
                              <p className="font-medium">
                                {journeyTemplates.find((t) => t.id === selectedTemplate)?.title || "Custom Journey"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Audience Summary */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Audience Summary</h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            {selectedSegments.map((segment) => (
                              <div
                                key={segment.id}
                                className="flex items-center justify-between py-2 border-b last:border-0"
                              >
                                <span>{segment.name}</span>
                                <Badge variant="outline">{segment.count.toLocaleString()}</Badge>
                              </div>
                            ))}
                            <div className="flex items-center justify-between pt-2 font-medium">
                              <span>Total Reach</span>
                              <span>{totalReach.toLocaleString()} members</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Journey Preview */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Journey Preview</h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-center bg-gray-50 rounded-md p-6 min-h-[200px]">
                            <div className="text-center">
                              <p className="text-muted-foreground mb-2">Journey visualization will appear here</p>
                              <Button variant="outline" size="sm">
                                View Full Journey
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Launch Options */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Launch Options</h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name="launch-option"
                                  className="h-4 w-4 text-primary"
                                  defaultChecked
                                />
                                <span>Launch immediately</span>
                              </label>
                            </div>
                            <div>
                              <label className="flex items-center space-x-2">
                                <input type="radio" name="launch-option" className="h-4 w-4 text-primary" />
                                <span>Schedule for later</span>
                              </label>
                              <div className="ml-6 mt-2">
                                <input type="datetime-local" className="px-3 py-1 border rounded-md text-sm" disabled />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" className="gap-2" onClick={() => setActiveTab("configuration")}>
                    <ArrowLeft className="h-4 w-4" />
                    Back to Configuration
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">Save as Draft</Button>
                    <Button className="gap-2 bg-green-600 hover:bg-green-700" onClick={handleLaunchCampaign}>
                      Launch Campaign
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">Campaign Launched!</DialogTitle>
            <DialogDescription className="text-center">
              Your campaign has been successfully launched and is now active.
              You can view and monitor performance in the dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2 mt-4">
            <Button className="w-full sm:w-auto" onClick={handleViewDashboard}>
              View in Dashboard
            </Button>
            <Button variant="outline" className="mt-3 sm:mt-0 w-full sm:w-auto" onClick={() => setShowSuccessDialog(false)}>
              Create Another Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}