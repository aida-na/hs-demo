"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Wand2 } from "lucide-react"

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
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai" className="gap-2">
            <Sparkles className="h-4 w-4" />
            AI Generated
          </TabsTrigger>
          <TabsTrigger value="manual" className="gap-2">
            <Wand2 className="h-4 w-4" />
            Create Manually
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiSuggestions.map((suggestion, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all ${
                  content.title === suggestion.title && content.body === suggestion.body
                    ? "border-primary bg-primary/5"
                    : ""
                }`}
                onClick={() => handleSelectAiSuggestion(suggestion)}
              >
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">{suggestion.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-3">{suggestion.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button className="gap-2">
            <Sparkles className="h-4 w-4" />
            Generate More Options
          </Button>

          {content.title && (
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Selected Content Preview</h4>
              <div className="p-4 bg-accent rounded-md">
                <h5 className="font-medium mb-2">{content.title}</h5>
                <p className="text-sm">{content.body}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="manual" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder={getPlaceholderTitle()}
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Content</Label>
              <Textarea
                id="body"
                placeholder={getPlaceholderBody()}
                rows={6}
                value={content.body}
                onChange={(e) => setContent({ ...content, body: e.target.value })}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save Content</Button>
      </div>
    </div>
  )
}

