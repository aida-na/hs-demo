"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { 
  Heart, 
  Activity, 
  Calendar, 
  UserPlus, 
  Zap, 
  FileText, 
  Users, 
  Laptop, 
  PieChart 
} from "lucide-react"

// Define types for our audience goal
interface AudienceGoal {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  count: number;
}

// Define props interface for our component
interface CampaignGoalSelectorProps {
  onSelectGoal?: (goalId: string) => void;
}

const audienceGoals: AudienceGoal[] = [
  {
    id: "medication",
    title: "Medication Adherence",
    description: "Improve compliance with prescribed medications",
    icon: <Heart className="h-5 w-5 text-primary" />,
    count: 3250
  },
  {
    id: "caregap",
    title: "Care Gap Closure",
    description: "Identify and address gaps in patient care",
    icon: <Activity className="h-5 w-5 text-primary" />,
    count: 2180
  },
  {
    id: "chronic",
    title: "Chronic Condition Management",
    description: "Support patients with ongoing health conditions",
    icon: <Activity className="h-5 w-5 text-primary" />,
    count: 1950
  },
  {
    id: "wellness",
    title: "Annual Wellness Visit",
    description: "Encourage preventive care and regular check-ups",
    icon: <Calendar className="h-5 w-5 text-primary" />,
    count: 3420
  },
  {
    id: "onboarding",
    title: "New Member Onboarding",
    description: "Welcome new patients and guide them through initial steps",
    icon: <UserPlus className="h-5 w-5 text-primary" />,
    count: 1240
  },
  {
    id: "highrisk",
    title: "High-Risk Member Intervention",
    description: "Targeted support for members with complex needs",
    icon: <Zap className="h-5 w-5 text-primary" />,
    count: 890
  },
  {
    id: "discharge",
    title: "Post-Discharge Follow-Up",
    description: "Support patients transitioning from hospital to home",
    icon: <FileText className="h-5 w-5 text-primary" />,
    count: 760
  },
  {
    id: "sdoh",
    title: "SDOH Support",
    description: "Address social determinants of health barriers",
    icon: <Users className="h-5 w-5 text-primary" />,
    count: 1320
  },
  {
    id: "digital",
    title: "Digital Tool Adoption",
    description: "Increase usage of health apps and digital services",
    icon: <Laptop className="h-5 w-5 text-primary" />,
    count: 2450
  },
]

export default function CampaignGoalSelector({ onSelectGoal }: CampaignGoalSelectorProps) {
  const [selectedGoal, setSelectedGoal] = useState("medication")

  const handleGoalChange = (value: string) => {
    setSelectedGoal(value)
    if (onSelectGoal) {
      onSelectGoal(value)
    }
  }

  return (
        <RadioGroup
          value={selectedGoal}
          onValueChange={handleGoalChange}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {audienceGoals.map((goal) => (
            <div key={goal.id} className="relative">
              <RadioGroupItem value={goal.id} id={goal.id} className="sr-only" />
              <Label htmlFor={goal.id} className="cursor-pointer">
                <Card className={`h-full transition-all ${selectedGoal === goal.id ? "border-primary bg-primary/5" : ""}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                        {goal.icon}
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-muted-foreground mr-2">
                          {goal.count.toLocaleString()} members
                        </span>
                        {selectedGoal === goal.id && (
                          <div className="h-4 w-4 rounded-full bg-primary"></div>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{goal.description}</CardDescription>
                  </CardContent>
                </Card>
              </Label>
            </div>
          ))}
        </RadioGroup>
  )
}