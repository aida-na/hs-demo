"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Wand2 } from "lucide-react"
import EmailDesigner from "@/components/content/email-designer"


type ChannelType = "email" | "sms" | "call" | "push" | "mail"

type ContentType = {
  title: string
  body: string
  isAiGenerated: boolean
}

interface ContentStudioProps {
  initialContent: ContentType | null
  channelType: ChannelType | undefined
  onSave: (content: ContentType) => void
}

export default function ContentStudio({ initialContent, channelType, onSave }: ContentStudioProps) {
  const [activeTab, setActiveTab] = useState("ai")
  const [content, setContent] = useState<ContentType>(
    initialContent || {
      title: "",
      body: "",
      isAiGenerated: false,
    },
  )

  const [aiSuggestions, setAiSuggestions] = useState<ContentType[]>([
    {
      title: "Welcome to Your Health Plan",
      body: "Thank you for joining our health plan. We're excited to have you as a member and look forward to supporting your health journey. Here's what you need to know to get started with your benefits.",
      isAiGenerated: true,
    },
    {
      title: "Getting Started with Your Healthcare",
      body: "Welcome to your new health plan! We've created this guide to help you make the most of your benefits. Please take a moment to review the important information about your coverage and available services.",
      isAiGenerated: true,
    },
    {
      title: "Your Health Plan Membership",
      body: "Congratulations on your new health plan membership! This message contains important information about your benefits, how to access care, and resources available to you as a valued member.",
      isAiGenerated: true,
    },
  ])

  const handleSelectAiSuggestion = (suggestion: ContentType) => {
    setContent(suggestion)
  }

  const handleSave = () => {
    onSave({
      ...content,
      isAiGenerated: activeTab === "ai",
    })
  }

  const getPlaceholderTitle = () => {
    switch (channelType) {
      case "email":
        return "Email Subject Line"
      case "sms":
        return "SMS Message"
      case "call":
        return "Call Script Title"
      case "push":
        return "Push Notification Title"
      case "mail":
        return "Direct Mail Subject"
      default:
        return "Content Title"
    }
  }

  const getPlaceholderBody = () => {
    switch (channelType) {
      case "email":
        return "Email body content..."
      case "sms":
        return "SMS message content (160 characters max)..."
      case "call":
        return "Call script content..."
      case "push":
        return "Push notification content..."
      case "mail":
        return "Direct mail content..."
      default:
        return "Content body..."
    }
  }

  return (
    <div className="space-y-9">
      <h1 className="text-3xl font-bold mb-6">Email Designer</h1>
      <EmailDesigner />
    </div>
  )
}

