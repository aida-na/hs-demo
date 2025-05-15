"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Edit, Mail, MessageSquare, Phone, Plus, Smartphone, Trash, Users, Check } from "lucide-react"
import ContentStudio from "./content-studio"
import AudienceSelector from "@/components/campaign/segment-selector"

// Types for our journey steps
type ChannelType = "email" | "sms" | "call" | "push" | "mail"
type ContentType = {
  title: string
  body: string
  isAiGenerated: boolean
}

type Channel = {
  type: ChannelType
  content: ContentType | null
  segments: string[]
}

type Step = {
  id: string
  name: string
  delay: number
  delayUnit: "hours" | "days" | "weeks"
  channels: Channel[]
}

interface JourneyBuilderProps {
  selectedAudiences?: string[]
  selectedCohorts?: string[]
  selectedBehaviors?: string[]
}

export default function JourneyBuilder({
  selectedAudiences = [],
  selectedCohorts = [],
  selectedBehaviors = [],
}: JourneyBuilderProps) {
  // Initialize the first step with the selected segments from audience selection
  const [steps, setSteps] = useState<Step[]>([
    {
      id: "step1",
      name: "Welcome",
      delay: 0,
      delayUnit: "days",
      channels: [
        {
          type: "email",
          content: {
            title: "Welcome to Your Health Plan",
            body: "Thank you for joining our health plan. Here's what you need to know to get started.",
            isAiGenerated: true,
          },
          // Pre-populate with selected audiences, cohorts, and behaviors
          segments: [...selectedAudiences, ...selectedCohorts, ...selectedBehaviors],
        },
      ],
    },
  ])

  const [activeStep, setActiveStep] = useState<string | null>("step1")
  const [activeChannel, setActiveChannel] = useState<{ stepId: string; channelIndex: number } | null>(null)
  const [showContentStudio, setShowContentStudio] = useState(false)
  const [showSegmentFilter, setShowSegmentFilter] = useState(false)
  
  // State for the audience dialog
  const [dialogAudiences, setDialogAudiences] = useState<string[]>([])
  const [dialogCohorts, setDialogCohorts] = useState<string[]>([])
  const [dialogBehaviors, setDialogBehaviors] = useState<string[]>([])

  // Add a new step to the journey
  const addStep = () => {
    const newStep: Step = {
      id: `step${steps.length + 1}`,
      name: `Step ${steps.length + 1}`,
      delay: 1,
      delayUnit: "days",
      channels: [],
    }

    setSteps([...steps, newStep])
    setActiveStep(newStep.id)
  }

  // Add a channel to a step
  const addChannel = (stepId: string, channelType: ChannelType) => {
    const updatedSteps = steps.map((step) => {
      if (step.id === stepId) {
        return {
          ...step,
          channels: [
            ...step.channels,
            {
              type: channelType,
              content: null,
              // Pre-populate new channels with selected segments
              segments: [...selectedAudiences, ...selectedCohorts, ...selectedBehaviors],
            },
          ],
        }
      }
      return step
    })

    setSteps(updatedSteps)

    // Set the new channel as active
    const stepIndex = steps.findIndex((s) => s.id === stepId)
    if (stepIndex !== -1) {
      const channelIndex = updatedSteps[stepIndex].channels.length - 1
      setActiveChannel({ stepId, channelIndex })
    }
  }

  // Remove a step from the journey
  const removeStep = (stepId: string) => {
    setSteps(steps.filter((step) => step.id !== stepId))

    if (activeStep === stepId) {
      setActiveStep(steps.length > 1 ? steps[0].id : null)
    }

    if (activeChannel && activeChannel.stepId === stepId) {
      setActiveChannel(null)
    }
  }

  // Remove a channel from a step
  const removeChannel = (stepId: string, channelIndex: number) => {
    const updatedSteps = steps.map((step) => {
      if (step.id === stepId) {
        const updatedChannels = [...step.channels]
        updatedChannels.splice(channelIndex, 1)
        return {
          ...step,
          channels: updatedChannels,
        }
      }
      return step
    })

    setSteps(updatedSteps)

    if (activeChannel && activeChannel.stepId === stepId && activeChannel.channelIndex === channelIndex) {
      setActiveChannel(null)
    }
  }

  // Update step properties
  const updateStep = (stepId: string, updates: Partial<Step>) => {
    setSteps(steps.map((step) => (step.id === stepId ? { ...step, ...updates } : step)))
  }

  // Update channel properties
  const updateChannel = (stepId: string, channelIndex: number, updates: Partial<Channel>) => {
    setSteps(
      steps.map((step) => {
        if (step.id === stepId) {
          const updatedChannels = [...step.channels]
          updatedChannels[channelIndex] = { ...updatedChannels[channelIndex], ...updates }
          return {
            ...step,
            channels: updatedChannels,
          }
        }
        return step
      }),
    )
  }

  // Save content from the content studio
  const saveContent = (content: ContentType) => {
    if (activeChannel) {
      updateChannel(activeChannel.stepId, activeChannel.channelIndex, { content })
      setShowContentStudio(false)
    }
  }

  // When opening the segment dialog, initialize with current channel segments
  useEffect(() => {
    if (showSegmentFilter && activeChannel) {
      const currentSegments = getActiveChannelSegments() || []
      
      // Split segments into audiences, cohorts, and behaviors
      const audiencesList = currentSegments.filter(seg => selectedAudiences.includes(seg))
      const cohortsList = currentSegments.filter(seg => selectedCohorts.includes(seg))
      const behaviorsList = currentSegments.filter(seg => selectedBehaviors.includes(seg))
      
      setDialogAudiences(audiencesList)
      setDialogCohorts(cohortsList)
      setDialogBehaviors(behaviorsList)
    }
  }, [showSegmentFilter, activeChannel])

  // Save segments by combining all selections
  const saveSegments = () => {
    if (activeChannel) {
      const allSegments = [...dialogAudiences, ...dialogCohorts, ...dialogBehaviors]
      updateChannel(activeChannel.stepId, activeChannel.channelIndex, { segments: allSegments })
      setShowSegmentFilter(false)
    }
  }

  // Get channel icon based on type
  const getChannelIcon = (type: ChannelType) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      case "call":
        return <Phone className="h-4 w-4" />
      case "push":
        return <Smartphone className="h-4 w-4" />
      case "mail":
        return <Mail className="h-4 w-4" />
    }
  }

  // Get channel name based on type
  const getChannelName = (type: ChannelType) => {
    switch (type) {
      case "email":
        return "Email"
      case "sms":
        return "SMS"
      case "call":
        return "Phone Call"
      case "mail":
        return "Direct Mail"
    }
  }

  // Helper function to close the dialog and add channel
  const handleAddChannel = (step: Step, type: ChannelType) => {
    addChannel(step.id, type);
    // Use HTMLDialogElement close method instead of click
    const dialogElement = document.querySelector('[data-state="open"]');
    if (dialogElement instanceof HTMLDialogElement) {
      dialogElement.close();
    } else {
      // Fallback: try to find a button that would close the dialog
      const closeButton = document.querySelector('[data-state="open"] button[data-state="closed"]');
      if (closeButton instanceof HTMLButtonElement) {
        closeButton.click();
      }
    }
  }

  // Helper function to get active channel content
  const getActiveChannelContent = (): ContentType | null => {
    if (!activeChannel) return null;
    
    const step = steps.find(s => s.id === activeChannel.stepId);
    if (!step) return null;
    
    const channel = step.channels[activeChannel.channelIndex];
    return channel ? channel.content : null;
  }

  // Helper function to get active channel type
  const getActiveChannelType = (): ChannelType | undefined => {
    if (!activeChannel) return undefined;
    
    const step = steps.find(s => s.id === activeChannel.stepId);
    if (!step) return undefined;
    
    const channel = step.channels[activeChannel.channelIndex];
    return channel ? channel.type : undefined;
  }

  // Helper function to get active channel segments
  const getActiveChannelSegments = (): string[] | undefined => {
    if (!activeChannel) return undefined;
    
    const step = steps.find(s => s.id === activeChannel.stepId);
    if (!step) return undefined;
    
    const channel = step.channels[activeChannel.channelIndex];
    return channel ? channel.segments : undefined;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Journey Steps</h3>
        <Button onClick={addStep} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Step
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {steps.map((step, stepIndex) => (
          <Card
            key={step.id}
            className={`border-l-4 ${activeStep === step.id ? "border-l-primary" : "border-l-muted"}`}
          >
            <CardContent className="p-4">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      {stepIndex + 1}
                    </div>
                    <Input
                      value={step.name}
                      onChange={(e) => updateStep(step.id, { name: e.target.value })}
                      className="h-8 font-medium"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    {stepIndex > 0 && (
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`delay-${step.id}`} className="text-sm">
                          Wait
                        </Label>
                        <Input
                          id={`delay-${step.id}`}
                          type="number"
                          value={step.delay}
                          onChange={(e) => updateStep(step.id, { delay: Number.parseInt(e.target.value) || 0 })}
                          className="w-16 h-8"
                        />
                        <Select
                          value={step.delayUnit}
                          onValueChange={(value) =>
                            updateStep(step.id, { delayUnit: value as "hours" | "days" | "weeks" })
                          }
                        >
                          <SelectTrigger className="w-24 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hours">Hours</SelectItem>
                            <SelectItem value="days">Days</SelectItem>
                            <SelectItem value="weeks">Weeks</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <Button variant="ghost" size="sm" onClick={() => removeStep(step.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {step.channels.map((channel, channelIndex) => (
                    <div
                      key={`${step.id}-channel-${channelIndex}`}
                      className={`p-3 border rounded-md ${
                        activeChannel && activeChannel.stepId === step.id && activeChannel.channelIndex === channelIndex
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() => setActiveChannel({ stepId: step.id, channelIndex })}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                            {getChannelIcon(channel.type)}
                          </div>
                          <div>
                            <h4 className="font-medium">{getChannelName(channel.type)}</h4>
                            <div className="flex items-center text-xs text-muted-foreground">
                              {channel.content ? (
                                <span className="flex items-center">
                                  <Check className="h-3 w-3 mr-1 text-green-500" />
                                  Content added
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  <AlertCircle className="h-3 w-3 mr-1 text-amber-500" />
                                  No content
                                </span>
                              )}

                              {channel.segments.length > 0 && (
                                <Badge variant="outline" className="ml-2 text-xs">
                                  {channel.segments.length} segments
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveChannel({ stepId: step.id, channelIndex })
                              setShowContentStudio(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveChannel({ stepId: step.id, channelIndex })
                              setShowSegmentFilter(true)
                            }}
                          >
                            <Users className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeChannel(step.id, channelIndex)
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-center p-3 border border-dashed rounded-md hover:bg-accent">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="gap-2">
                          <Plus className="h-4 w-4" />
                          Add Channel
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Select Channel Type</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                          {(["email", "sms", "call", "mail"] as ChannelType[]).map((type) => (
                            <Button
                              key={type}
                              variant="outline"
                              className="h-24 flex flex-col items-center justify-center gap-2"
                              onClick={() => {
                                handleAddChannel(step, type);
                              }}
                            >
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                                {getChannelIcon(type)}
                              </div>
                              <span>{getChannelName(type)}</span>
                            </Button>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {steps.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-md">
            <p className="text-muted-foreground mb-4">No steps added yet</p>
            <Button onClick={addStep} className="gap-2">
              <Plus className="h-4 w-4" />
              Add First Step
            </Button>
          </div>
        )}
      </div>

      {/* Content Studio Dialog */}
      <Dialog open={showContentStudio} onOpenChange={setShowContentStudio}>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Content Studio</DialogTitle>
          </DialogHeader>
          <ContentStudio
            initialContent={getActiveChannelContent()}
            channelType={getActiveChannelType()}
            onSave={saveContent}
          />
        </DialogContent>
      </Dialog>

      {/* Audience Selector Dialog instead of SegmentFilter */}
      <Dialog open={showSegmentFilter} onOpenChange={setShowSegmentFilter}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Select Audience for Channel</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <AudienceSelector
              initialSelectedAudiences={dialogAudiences}
              initialSelectedCohorts={dialogCohorts}
              initialSelectedBehaviors={dialogBehaviors}
              onAudienceChange={setDialogAudiences}
              onCohortsChange={setDialogCohorts}
              onBehaviorsChange={setDialogBehaviors}
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setShowSegmentFilter(false)}>
              Cancel
            </Button>
            <Button onClick={saveSegments}>
              Save Segments
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}