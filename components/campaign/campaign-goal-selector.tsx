"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  UserPlus,
  Calendar,
  AlertTriangle,
  UserX,
  Activity,
  Heart,
  FileText,
  Users
} from "lucide-react"

// Define types for our audience goal
interface AudienceGoal {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  count: number;
  color: string;
}

// Define props interface for our component
interface CampaignGoalSelectorProps {
  onSelectGoal?: (goalId: string) => void;
}

const audienceGoals: AudienceGoal[] = [
  {
    id: "onboarding",
    title: "Member Onboarding",
    description: "Help new members get started with their healthcare journey",
    icon: <UserPlus className="h-5 w-5" />,
    count: 1200,
    color: "text-blue-600"
  },
  {
    id: "first_appointment",
    title: "First Appointment Scheduling",
    description: "Guide members to schedule and attend their initial care visit",
    icon: <Calendar className="h-5 w-5" />,
    count: 800,
    color: "text-green-600"
  },
  {
    id: "gaps_in_care",
    title: "Care Gap Closure",
    description: "Address missing recommended care and preventive services",
    icon: <AlertTriangle className="h-5 w-5" />,
    count: 2100,
    color: "text-orange-600"
  },
  {
    id: "churn_risk",
    title: "Member Retention",
    description: "Re-engage members at risk of leaving or becoming inactive",
    icon: <UserX className="h-5 w-5" />,
    count: 900,
    color: "text-red-600"
  },
  {
    id: "chronic_care",
    title: "Chronic Condition Management",
    description: "Support ongoing management of chronic health conditions",
    icon: <Heart className="h-5 w-5" />,
    count: 1850,
    color: "text-purple-600"
  },
  {
    id: "wellness",
    title: "Wellness & Prevention",
    description: "Promote healthy behaviors and preventive care practices",
    icon: <Activity className="h-5 w-5" />,
    count: 3200,
    color: "text-teal-600"
  }
]

export default function CampaignGoalSelector({ onSelectGoal }: CampaignGoalSelectorProps) {
  const [selectedGoal, setSelectedGoal] = useState("onboarding")

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
            <Card className={`h-full transition-all hover:shadow-md ${
              selectedGoal === goal.id 
                ? "border-primary bg-primary/5 shadow-sm" 
                : "border-gray-200 hover:border-gray-300"
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${
                    selectedGoal === goal.id ? "bg-primary/15" : "bg-gray-100"
                  }`}>
                    <span className={selectedGoal === goal.id ? "text-primary" : goal.color}>
                      {goal.icon}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-muted-foreground mr-2">
                      {goal.count.toLocaleString()}
                    </span>
                    {selectedGoal === goal.id && (
                      <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{goal.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm leading-relaxed">
                  {goal.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}