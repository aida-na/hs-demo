"use client"

import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Save, Send, Smartphone, Monitor, Tablet, Eye, Settings, Users } from "lucide-react"

import ComponentSidebar from "./component-sidebar"
import EmailCanvas from "./email-canvas"
import PersonalizationPanel from "./personalization-panel"
import SegmentManager from "./segment-manager"
import type { EmailBlock, UserSegment } from "@/lib/types"

function EmailDesignerContent() {
  const [emailBlocks, setEmailBlocks] = useState<EmailBlock[]>([])
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [emailSubject, setEmailSubject] = useState("Your Email Subject")
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [showPersonalization, setShowPersonalization] = useState(false)
  const [showSegments, setShowSegments] = useState(false)
  const [userSegments, setUserSegments] = useState<UserSegment[]>([
    { id: "tech-seniors", name: "Tech-Savvy Seniors", description: "Seniors who are comfortable with digital tools" },
    { id: "traditional", name: "Traditional Members", description: "Members who prefer traditional communication methods" },
    { id: "busy-professionals", name: "Busy Professionals", description: "Working professionals who prefer efficient digital communication" },
    { id: "new-rx", name: "New Prescription Users", description: "Members who recently started new prescriptions" },
  ])

  const addBlock = (blockType: string) => {
    const newBlock: EmailBlock = {
      id: `block-${Date.now()}`,
      type: blockType,
      content: getDefaultContent(blockType),
      personalization: {},
    }
    setEmailBlocks([...emailBlocks, newBlock])
  }

  const getDefaultContent = (blockType: string) => {
    switch (blockType) {
      case "header":
        return { text: "Welcome to our newsletter", size: "large" }
      case "text":
        return { text: "This is a paragraph of text. You can edit this text to add your own content." }
      case "image":
        return { src: "/placeholder.svg?height=200&width=600", alt: "Placeholder image", width: "100%" }
      case "button":
        return { text: "Click Me", url: "#", backgroundColor: "#3b82f6", textColor: "#ffffff" }
      case "spacer":
        return { height: 20 }
      case "divider":
        return { color: "#e5e7eb", thickness: 1 }
      default:
        return {}
    }
  }

  const updateBlock = (id: string, content: any) => {
    setEmailBlocks(emailBlocks.map((block) => (block.id === id ? { ...block, content } : block)))
  }

  const updateBlockPersonalization = (blockId: string, segmentId: string, content: any) => {
    setEmailBlocks(
      emailBlocks.map((block) => {
        if (block.id === blockId) {
          if (content === undefined) {
            // Remove personalization for this segment
            const { [segmentId]: removed, ...rest } = block.personalization
            return {
              ...block,
              personalization: rest,
            }
          } else {
            // Add or update personalization
            return {
              ...block,
              personalization: {
                ...block.personalization,
                [segmentId]: content,
              },
            }
          }
        }
        return block
      }),
    )
  }

  const moveBlock = (dragIndex: number, hoverIndex: number) => {
    const dragBlock = emailBlocks[dragIndex]
    const newBlocks = [...emailBlocks]
    newBlocks.splice(dragIndex, 1)
    newBlocks.splice(hoverIndex, 0, dragBlock)
    setEmailBlocks(newBlocks)
  }

  const deleteBlock = (id: string) => {
    setEmailBlocks(emailBlocks.filter((block) => block.id !== id))
    if (selectedBlockId === id) {
      setSelectedBlockId(null)
    }
  }

  const duplicateBlock = (id: string) => {
    const blockToDuplicate = emailBlocks.find((block) => block.id === id)
    if (blockToDuplicate) {
      const newBlock = {
        ...blockToDuplicate,
        id: `block-${Date.now()}`,
      }
      const index = emailBlocks.findIndex((block) => block.id === id)
      const newBlocks = [...emailBlocks]
      newBlocks.splice(index + 1, 0, newBlock)
      setEmailBlocks(newBlocks)
    }
  }

  const addUserSegment = (segment: UserSegment) => {
    setUserSegments([...userSegments, segment])
  }

  const deleteUserSegment = (id: string) => {
    // Remove personalization for this segment from all blocks
    const updatedBlocks = emailBlocks.map((block) => {
      const { [id]: _, ...restPersonalization } = block.personalization
      return {
        ...block,
        personalization: restPersonalization,
      }
    })

    setEmailBlocks(updatedBlocks)
    setUserSegments(userSegments.filter((segment) => segment.id !== id))
  }

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] bg-white rounded-lg shadow-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <div>
            <Label htmlFor="email-subject" className="text-sm font-medium">
              Email Subject
            </Label>
            <Input
              id="email-subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="w-80"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setPreviewMode("desktop")}>
            <Monitor className={`h-4 w-4 ${previewMode === "desktop" ? "text-blue-500" : ""}`} />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPreviewMode("tablet")}>
            <Tablet className={`h-4 w-4 ${previewMode === "tablet" ? "text-blue-500" : ""}`} />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPreviewMode("mobile")}>
            <Smartphone className={`h-4 w-4 ${previewMode === "mobile" ? "text-blue-500" : ""}`} />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline" size="sm" onClick={() => setShowPersonalization(!showPersonalization)}>
            <Settings className={`h-4 w-4 mr-2 ${showPersonalization ? "text-blue-500" : ""}`} />
            Personalization
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowSegments(!showSegments)}>
            <Users className={`h-4 w-4 mr-2 ${showSegments ? "text-blue-500" : ""}`} />
            Segments
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Component Sidebar */}
        <div className="w-64 border-r bg-gray-50 overflow-y-auto">
          <ComponentSidebar onAddBlock={addBlock} />
        </div>

        {/* Email Canvas */}
        <div
          className={`flex-1 overflow-y-auto ${
            previewMode === "mobile" ? "max-w-[375px]" : previewMode === "tablet" ? "max-w-[768px]" : ""
          } mx-auto`}
        >
          <EmailCanvas
            blocks={emailBlocks}
            selectedBlockId={selectedBlockId}
            setSelectedBlockId={setSelectedBlockId}
            updateBlock={updateBlock}
            moveBlock={moveBlock}
            deleteBlock={deleteBlock}
            duplicateBlock={duplicateBlock}
            userSegments={userSegments}
          />
        </div>

        {/* Personalization Panel */}
        {showPersonalization && selectedBlockId && (
          <div className="w-80 border-l bg-gray-50 overflow-y-auto">
            <PersonalizationPanel
              block={emailBlocks.find((block) => block.id === selectedBlockId)!}
              userSegments={userSegments}
              updateBlockPersonalization={updateBlockPersonalization}
            />
          </div>
        )}

        {/* Segment Manager */}
        {showSegments && (
          <div className="w-80 border-l bg-gray-50 overflow-y-auto">
            <SegmentManager 
              segments={userSegments} 
              addSegment={addUserSegment} 
              deleteSegment={deleteUserSegment} 
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function EmailDesigner() {
  return (
    <DndProvider backend={HTML5Backend}>
      <EmailDesignerContent />
    </DndProvider>
  )
}