
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { EmailBlock, UserSegment } from "@/lib/types"
import EmailBlockComponent from "./email-block"
import { Check, Copy, Users, Sparkles, Wand2 } from "lucide-react"

interface PersonalizationPanelProps {
  block: EmailBlock
  userSegments: UserSegment[]
  updateBlockPersonalization: (blockId: string, segmentId: string, content: any) => void
}

export default function PersonalizationPanel({
  block,
  userSegments,
  updateBlockPersonalization,
}: PersonalizationPanelProps) {
  const [activeSegment, setActiveSegment] = useState<string>("default")

  const handleUpdateContent = (segmentId: string, content: any) => {
    updateBlockPersonalization(block.id, segmentId, content)
  }

  const handleAIGenerate = (segmentId: string) => {
    // TODO: Implement AI generation logic
    console.log("Generating AI content for segment:", segmentId)
  }

  // Count how many segments have personalized content
  const personalizedCount = Object.keys(block.personalization).length
  const currentSegment = userSegments.find(s => s.id === activeSegment)
  const isPersonalized = activeSegment !== "default" && !!block.personalization[activeSegment]

  return (
    <div className="p-4 space-y-4">
      {/* Header with segment selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Personalization
          </h3>
          {personalizedCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {personalizedCount} variants
            </Badge>
          )}
        </div>
        
        {/* Segment Selector */}
        <Select value={activeSegment} onValueChange={setActiveSegment}>
          <SelectTrigger className="w-full">
            <SelectValue>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {activeSegment === "default" ? "Default Content" : currentSegment?.name}
                {isPersonalized && <Check className="w-3 h-3 text-green-600" />}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">
              <div className="flex items-center gap-2">
                Default Content
              </div>
            </SelectItem>
            {userSegments.map((segment) => {
              const hasPersonalization = !!block.personalization[segment.id]
              return (
                <SelectItem key={segment.id} value={segment.id}>
                  <div className="flex items-center gap-2">
                    {segment.name}
                    {hasPersonalization && <Check className="w-3 h-3 text-green-600" />}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Segment Info */}
      {activeSegment !== "default" && currentSegment && (
        <div className="bg-muted/50 rounded-md p-3">
          <p className="text-sm font-medium mb-1">{currentSegment.name}</p>
          <p className="text-xs text-muted-foreground">{currentSegment.description}</p>
        </div>
      )}

      {/* Personalization Status & Actions */}
      {activeSegment !== "default" && !isPersonalized && (
        <div className="bg-blue-50 rounded-md p-3 space-y-3">
          <p className="text-sm text-blue-900">
            No personalized content for this segment yet.
          </p>
          <div className="flex justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUpdateContent(activeSegment, { ...block.content })}
              className="flex-1 flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAIGenerate(activeSegment)}
              className="flex-1 flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              Generate
            </Button>
          </div>
        </div>
      )}

      {/* Reset Button */}
      {isPersonalized && (
        <div className="flex justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAIGenerate(activeSegment)}
            className="flex items-center gap-2"
          >
            <Wand2 className="w-4 h-4" />
            Regenerate with AI
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const { [activeSegment]: _, ...rest } = block.personalization
              updateBlockPersonalization(block.id, activeSegment, undefined)
            }}
            className="text-sm text-muted-foreground"
          >
            Reset to default
          </Button>
        </div>
      )}

      {/* Content Editor */}
      <div className="border rounded-md">
        <EmailBlockComponent
          block={{
            ...block,
            content: activeSegment === "default" 
              ? block.content 
              : (block.personalization[activeSegment] || block.content)
          }}
          editMode={true}
          updateContent={(content) => handleUpdateContent(activeSegment, content)}
        />
      </div>
    </div>
  )
}