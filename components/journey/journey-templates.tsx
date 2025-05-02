"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, Heart, UserPlus } from "lucide-react"

const templates = [
  {
    id: "onboarding",
    title: "New Member Onboarding",
    description: "A 4-step journey to welcome new members and guide them through initial steps",
    steps: 4,
    channels: ["email", "sms"],
    category: "Onboarding",
    icon: <UserPlus className="h-5 w-5 text-primary" />,
  },
  {
    id: "preventive",
    title: "Preventive Care Reminders",
    description: "A 3-step journey to encourage members to schedule preventive care visits",
    steps: 3,
    channels: ["email", "sms", "call"],
    category: "Care Gaps",
    icon: <Heart className="h-5 w-5 text-primary" />,
  },
  {
    id: "medication",
    title: "Medication Adherence",
    description: "A 5-step journey to improve compliance with prescribed medications",
    steps: 5,
    channels: ["email", "sms", "mail"],
    category: "Adherence",
    icon: <Clock className="h-5 w-5 text-primary" />,
  },
]

export default function JourneyTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all ${
              selectedTemplate === template.id ? "border-primary bg-primary/5" : ""
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                  {template.icon}
                </div>
                {selectedTemplate === template.id && <Check className="h-5 w-5 text-primary" />}
              </div>
              <CardTitle className="text-lg">{template.title}</CardTitle>
              <Badge variant="outline">{template.category}</Badge>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{template.description}</CardDescription>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{template.steps} steps</span>
                <div className="flex items-center space-x-1">
                  {template.channels.map((channel) => (
                    <Badge key={channel} variant="secondary">
                      {channel}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

