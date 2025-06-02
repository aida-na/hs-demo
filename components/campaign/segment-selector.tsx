"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, Search, X, Zap } from "lucide-react"
import { 
  Heart, 
  Activity, 
  Calendar, 
  UserPlus, 
  FileText, 
  Users, 
  Laptop, 
  PieChart,
  Phone,
  Mail,
  AlertTriangle,
  Building,
  Calendar as CalendarIcon,
  UserX,
  TrendingUp,
  Stethoscope
} from "lucide-react"

// Define the audience type with cohorts
interface Audience {
  id: string;
  name: string;
  count: number;
  category: string;
  icon: React.ElementType;
  cohorts?: Cohort[];
}

interface Cohort {
  id: string;
  name: string;
  size: number;
  response: string;
}

// Main audience groups aligned with care journey stages
const audiences: Audience[] = [
  { 
    id: "onboarding", 
    name: "New Member Onboarding", 
    count: 1200, 
    category: "Care Journey",
    icon: UserPlus,
    cohorts: [
      { id: "tech-savvy-newcomers", name: "Tech-Savvy Newcomers", size: 340, response: "Mobile App + Email" },
      { id: "guidance-seekers", name: "Guidance Seekers", size: 450, response: "Phone + Email" },
      { id: "hesitant-adopters", name: "Hesitant Adopters", size: 410, response: "SMS + Phone" }
    ]
  },
  { 
    id: "first_appointment", 
    name: "First Appointment Scheduling", 
    count: 800, 
    category: "Care Journey",
    icon: Calendar,
    cohorts: [
      { id: "proactive-schedulers", name: "Proactive Schedulers", size: 280, response: "Portal + Email" },
      { id: "appointment-avoiders", name: "Appointment Avoiders", size: 520, response: "SMS + Telehealth" }
    ]
  },
  { 
    id: "gaps_in_care", 
    name: "Care Gap Closure", 
    count: 2100, 
    category: "Care Journey",
    icon: AlertTriangle,
    cohorts: [
      { id: "chronic-care-gaps", name: "Chronic Care Gaps", size: 890, response: "Phone + Mail" },
      { id: "preventive-care-laggards", name: "Preventive Care Laggards", size: 1210, response: "Email + Portal" }
    ]
  },
  { 
    id: "churn_risk", 
    name: "Member Retention", 
    count: 900, 
    category: "Care Journey",
    icon: UserX,
    cohorts: [
      { id: "disengaged-members", name: "Disengaged Members", size: 540, response: "SMS + Social" },
      { id: "service-dissatisfied", name: "Service Dissatisfied", size: 360, response: "Phone + Email" }
    ]
  },
  { 
    id: "chronic_condition", 
    name: "Chronic Condition Management", 
    count: 1850, 
    category: "Health Management",
    icon: Heart,
    cohorts: [
      { id: "diabetes-management", name: "Diabetes Management", size: 650, response: "SMS + Portal" },
      { id: "hypertension-care", name: "Hypertension Care", size: 580, response: "Phone + Email" },
      { id: "multiple-conditions", name: "Multiple Conditions", size: 620, response: "Phone + Care Coord" }
    ]
  },
  { 
    id: "wellness_prevention", 
    name: "Wellness & Prevention", 
    count: 3200, 
    category: "Preventive Care",
    icon: Activity,
    cohorts: [
      { id: "wellness-champions", name: "Wellness Champions", size: 1240, response: "Email + App" },
      { id: "incentive-motivated", name: "Incentive Motivated", size: 980, response: "SMS + Rewards" },
      { id: "community-focused", name: "Community Focused", size: 980, response: "Social + Events" }
    ]
  },
  { 
    id: "medication_adherence", 
    name: "Medication Adherence", 
    count: 1620, 
    category: "Health Management",
    icon: Stethoscope,
    cohorts: [
      { id: "new-rx-users", name: "New Prescription Users", size: 485, response: "SMS + Call" },
      { id: "chronic-med-users", name: "Chronic Med Users", size: 720, response: "Portal + Reminders" },
      { id: "cost-concerned", name: "Cost Concerned", size: 415, response: "Phone + Financial Aid" }
    ]
  },
  { 
    id: "post_discharge", 
    name: "Post-Discharge Follow-Up", 
    count: 760, 
    category: "Care Transition",
    icon: FileText,
    cohorts: [
      { id: "high-readmission-risk", name: "High Readmission Risk", size: 320, response: "Phone + Home Visit" },
      { id: "surgical-recovery", name: "Surgical Recovery", size: 280, response: "Portal + Nurse Call" },
      { id: "emergency-discharge", name: "Emergency Discharge", size: 160, response: "Phone + Same Day" }
    ]
  },
  { 
    id: "sdoh_support", 
    name: "Social Determinants Support", 
    count: 1320, 
    category: "Social Determinants",
    icon: Users,
    cohorts: [
      { id: "transport-barriers", name: "Transportation Barriers", size: 520, response: "Phone + Telehealth" },
      { id: "food-insecurity", name: "Food Insecurity", size: 450, response: "Mail + Community" },
      { id: "housing-unstable", name: "Housing Unstable", size: 350, response: "Phone + Social Work" }
    ]
  },
  { 
    id: "digital_adoption", 
    name: "Digital Tool Adoption", 
    count: 2450, 
    category: "Digital Engagement",
    icon: Laptop,
    cohorts: [
      { id: "portal-hesitant", name: "Portal Hesitant", size: 980, response: "Tutorial + Support" },
      { id: "app-downloaders", name: "App Downloaders", size: 850, response: "Push + Gamification" },
      { id: "tech-advanced", name: "Tech Advanced", size: 620, response: "API + Integrations" }
    ]
  }
]

// Additional behavioral filters
const behaviors = [
  { id: "hospital-visit", name: "Recent Hospital Visit", count: 1243, category: "Utilization", icon: Activity },
  { id: "phone-pickup", name: "Picked Up Phone Call", count: 3567, category: "Engagement", icon: Phone },
  { id: "email-open", name: "Opened Email", count: 4829, category: "Digital Engagement", icon: Mail },
  { id: "signup", name: "Signed Up For Portal", count: 2134, category: "Digital", icon: UserPlus },
  { id: "missed-appt", name: "Missed Appointment", count: 1876, category: "Care Gaps", icon: AlertTriangle },
  { id: "employer", name: "Employer Group", count: 5432, category: "Membership", icon: Building },
  { id: "appointment-due", name: "Appointment Due", count: 2987, category: "Care Gaps", icon: CalendarIcon },
  { id: "high-utilizer", name: "High Healthcare Utilizer", count: 890, category: "Utilization", icon: TrendingUp },
  { id: "er-frequent", name: "Frequent ER Visits", count: 445, category: "Utilization", icon: AlertTriangle },
  { id: "specialty-referral", name: "Pending Specialty Referral", count: 1567, category: "Care Coordination", icon: FileText }
]

interface AudienceSelectorProps {
  initialSelectedAudiences?: string[]
  initialSelectedCohorts?: string[]
  initialSelectedBehaviors?: string[]
  onAudienceChange?: (audiences: string[]) => void
  onCohortsChange?: (cohorts: string[]) => void
  onBehaviorsChange?: (behaviors: string[]) => void
}

export default function AudienceSelector({
  initialSelectedAudiences = [],
  initialSelectedCohorts = [],
  initialSelectedBehaviors = [],
  onAudienceChange,
  onCohortsChange,
  onBehaviorsChange,
}: AudienceSelectorProps) {
  // Initialize with props or default values
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>(initialSelectedAudiences)
  const [selectedCohorts, setSelectedCohorts] = useState<string[]>(initialSelectedCohorts)
  const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>(initialSelectedBehaviors)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentTab, setCurrentTab] = useState("audiences")

   // Update parent when selections change
   useEffect(() => {
    onAudienceChange?.(selectedAudiences)
  }, [selectedAudiences, onAudienceChange])

  useEffect(() => {
    onCohortsChange?.(selectedCohorts)
  }, [selectedCohorts, onCohortsChange])

  useEffect(() => {
    onBehaviorsChange?.(selectedBehaviors)
  }, [selectedBehaviors, onBehaviorsChange])

  // Combined all selections for display in the right panel
  const allSelections = [...selectedAudiences, ...selectedCohorts, ...selectedBehaviors]
  
  // Filter audiences based on search term
  const filteredAudiences = audiences.filter(
    (audience) =>
      audience.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audience.category.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  // Filter behaviors based on search term
  const filteredBehaviors = behaviors.filter(
    (behavior) =>
      behavior.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      behavior.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Get all available cohorts for selected audiences
  const availableCohorts = audiences
    .filter(audience => selectedAudiences.includes(audience.id) && audience.cohorts)
    .flatMap(audience => audience.cohorts || [])

  // Toggle selection of an audience
  const handleToggleAudience = (id: string) => {
    if (selectedAudiences.includes(id)) {
      setSelectedAudiences(selectedAudiences.filter((audienceId) => audienceId !== id))
      
      // Also remove any cohorts from this audience
      const audienceCohorts = audiences.find(a => a.id === id)?.cohorts?.map(c => c.id) || []
      setSelectedCohorts(selectedCohorts.filter(cohortId => !audienceCohorts.includes(cohortId)))
    } else {
      setSelectedAudiences([...selectedAudiences, id])
    }
  }

  // Toggle selection of a cohort
  const handleToggleCohort = (id: string) => {
    if (selectedCohorts.includes(id)) {
      setSelectedCohorts(selectedCohorts.filter((cohortId) => cohortId !== id))
    } else {
      setSelectedCohorts([...selectedCohorts, id])
    }
  }

  // Toggle selection of a behavior
  const handleToggleBehavior = (id: string) => {
    if (selectedBehaviors.includes(id)) {
      setSelectedBehaviors(selectedBehaviors.filter((behaviorId) => behaviorId !== id))
    } else {
      setSelectedBehaviors([...selectedBehaviors, id])
    }
  }

  // Remove item from selection (generic for all types)
  const handleRemoveItem = (id: string) => {
    // Check if it's an audience
    if (audiences.some(a => a.id === id)) {
      handleToggleAudience(id)
      return
    }
    
    // Check if it's a cohort
    if (availableCohorts.some(c => c.id === id)) {
      handleToggleCohort(id)
      return
    }
    
    // Otherwise it's a behavior
    handleToggleBehavior(id)
  }

  // Find details for any selection by ID
  const getSelectionDetails = (id: string) => {
    // Check audiences
    const audience = audiences.find(a => a.id === id)
    if (audience) return audience
    
    // Check cohorts
    for (const audience of audiences) {
      if (audience.cohorts) {
        const cohort = audience.cohorts.find(c => c.id === id)
        if (cohort) return { ...cohort, category: `${audience.name} Cohort` }
      }
    }
    
    // Check behaviors
    const behavior = behaviors.find(b => b.id === id)
    if (behavior) return behavior
    
    return null
  }
  
  // Calculate total members
  const calculateTotalMembers = () => {
    let total = 0
    
    // Add audience members
    if (selectedCohorts.length === 0) {
      // If no cohorts selected, count whole audiences
      selectedAudiences.forEach(id => {
        const audience = audiences.find(a => a.id === id)
        if (audience) total += audience.count
      })
    } else {
      // If cohorts selected, only count those
      selectedCohorts.forEach(id => {
        for (const audience of audiences) {
          if (audience.cohorts) {
            const cohort = audience.cohorts.find(c => c.id === id)
            if (cohort) total += cohort.size
          }
        }
      })
    }
    
    // Add behavior members (simplification - in real system would calculate overlap)
    selectedBehaviors.forEach(id => {
      const behavior = behaviors.find(b => b.id === id)
      if (behavior) total += behavior.count * 0.2 // Assuming 20% are new members not in other selections
    })
    
    return total
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">

          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="audiences">Care Journey Stages</TabsTrigger>
              <TabsTrigger value="cohorts">Smart Cohorts</TabsTrigger>
              <TabsTrigger value="behaviors">Behavioral Filters</TabsTrigger>
            </TabsList>

            {/* Audiences Tab */}
            <TabsContent value="audiences" className="space-y-2">
              {filteredAudiences.map((audience) => (
                <div
                  key={audience.id}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-accent"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={audience.id}
                      checked={selectedAudiences.includes(audience.id)}
                      onCheckedChange={() => handleToggleAudience(audience.id)}
                    />
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                        {audience.icon && <audience.icon className="h-4 w-4 text-primary" />}
                      </div>
                      <div>
                        <Label htmlFor={audience.id} className="font-medium cursor-pointer">
                          {audience.name}
                        </Label>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Badge variant="outline" className="mr-2">
                            {audience.category}
                          </Badge>
                          {audience.count.toLocaleString()} members
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={selectedAudiences.includes(audience.id) ? "default" : "ghost"} 
                    size="sm" 
                    onClick={() => handleToggleAudience(audience.id)}
                  >
                    {selectedAudiences.includes(audience.id) ? "Selected" : "Add"}
                  </Button>
                </div>
              ))}
            </TabsContent>

            {/* Cohorts Tab */}
            <TabsContent value="cohorts" className="space-y-2">
              {selectedAudiences.length === 0 ? (
                <div className="p-4 border rounded-md bg-muted/50">
                  <p className="text-center text-muted-foreground">
                    Please select at least one care journey stage to view available cohorts
                  </p>
                </div>
              ) : (
                availableCohorts.map((cohort) => {
                  const parentAudience = audiences.find(a => a.cohorts?.some(c => c.id === cohort.id))
                  
                  return (
                    <div
                      key={cohort.id}
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-accent"
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={cohort.id}
                          checked={selectedCohorts.includes(cohort.id)}
                          onCheckedChange={() => handleToggleCohort(cohort.id)}
                        />
                        <div>
                          <Label htmlFor={cohort.id} className="font-medium cursor-pointer">
                            {cohort.name}
                          </Label>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Badge variant="outline" className="mr-2">
                              {parentAudience?.name || "Cohort"}
                            </Badge>
                            {cohort.size.toLocaleString()} members • {cohort.response}
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant={selectedCohorts.includes(cohort.id) ? "default" : "ghost"} 
                        size="sm" 
                        onClick={() => handleToggleCohort(cohort.id)}
                      >
                        {selectedCohorts.includes(cohort.id) ? "Selected" : "Add"}
                      </Button>
                    </div>
                  )
                })
              )}
            </TabsContent>

            {/* Behaviors Tab */}
            <TabsContent value="behaviors" className="space-y-2">
              {filteredBehaviors.map((behavior) => (
                <div
                  key={behavior.id}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-accent"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={behavior.id}
                      checked={selectedBehaviors.includes(behavior.id)}
                      onCheckedChange={() => handleToggleBehavior(behavior.id)}
                    />
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                        {behavior.icon && <behavior.icon className="h-4 w-4 text-primary" />}
                      </div>
                      <div>
                        <Label htmlFor={behavior.id} className="font-medium cursor-pointer">
                          {behavior.name}
                        </Label>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Badge variant="outline" className="mr-2">
                            {behavior.category}
                          </Badge>
                          {behavior.count.toLocaleString()} members
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={selectedBehaviors.includes(behavior.id) ? "default" : "ghost"} 
                    size="sm" 
                    onClick={() => handleToggleBehavior(behavior.id)}
                  >
                    {selectedBehaviors.includes(behavior.id) ? "Selected" : "Add"}
                  </Button>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          <div className="mt-4 flex justify-between">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Custom Audience
            </Button>
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">Your Target Group</h3>

              {allSelections.length === 0 ? (
                <p className="text-muted-foreground text-sm">No selections yet</p>
              ) : (
                <div className="space-y-4">
                  {/* Audiences Section */}
                  {selectedAudiences.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Care Journey Stages</h4>
                      <div className="space-y-2">
                        {selectedAudiences.map((id) => {
                          const audience = audiences.find((a) => a.id === id)
                          if (!audience) return null

                          return (
                            <div key={id} className="flex items-center justify-between p-2 bg-accent rounded-md">
                              <div className="flex items-center">
                                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 mr-2">
                                  {audience.icon && <audience.icon className="h-3 w-3 text-primary" />}
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{audience.name}</p>
                                  <p className="text-xs text-muted-foreground">{audience.count.toLocaleString()} members</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Cohorts Section */}
                  {selectedCohorts.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Smart Cohorts</h4>
                      <div className="space-y-2">
                        {selectedCohorts.map((id) => {
                          let cohortDetails = null
                          let parentAudience = null
                          
                          // Find the cohort and its parent audience
                          for (const audience of audiences) {
                            if (audience.cohorts) {
                              const cohort = audience.cohorts.find(c => c.id === id)
                              if (cohort) {
                                cohortDetails = cohort
                                parentAudience = audience
                                break
                              }
                            }
                          }
                          
                          if (!cohortDetails) return null

                          return (
                            <div key={id} className="flex items-center justify-between p-2 bg-accent rounded-md">
                              <div>
                                <p className="font-medium text-sm">{cohortDetails.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  <span className="text-primary/80">{parentAudience?.name}</span> • {cohortDetails.size.toLocaleString()} members
                                </p>
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Behaviors Section */}
                  {selectedBehaviors.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Behavioral Filters</h4>
                      <div className="space-y-2">
                        {selectedBehaviors.map((id) => {
                          const behavior = behaviors.find((b) => b.id === id)
                          if (!behavior) return null

                          return (
                            <div key={id} className="flex items-center justify-between p-2 bg-accent rounded-md">
                              <div className="flex items-center">
                                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 mr-2">
                                  {behavior.icon && <behavior.icon className="h-3 w-3 text-primary" />}
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{behavior.name}</p>
                                  <p className="text-xs text-muted-foreground">{behavior.count.toLocaleString()} members</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {allSelections.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center text-sm mb-4">
                    <span className="font-medium">Estimated Audience Size:</span>
                    <span className="text-lg font-bold text-primary">
                      {calculateTotalMembers().toLocaleString()} members
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}