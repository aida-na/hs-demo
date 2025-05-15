"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { EmailBlock } from "@/lib/types"

interface EmailBlockComponentProps {
  block: EmailBlock
  editMode?: boolean
  updateContent?: (content: any) => void
}

export default function EmailBlockComponent({ block, editMode = false, updateContent }: EmailBlockComponentProps) {
  const [isEditing, setIsEditing] = useState(editMode)
  const [localContent, setLocalContent] = useState(block.content)

  const handleContentChange = (key: string, value: any) => {
    const newContent = { ...localContent, [key]: value }
    setLocalContent(newContent)
    if (updateContent) {
      updateContent(newContent)
    }
  }

  const renderEditableContent = () => {
    switch (block.type) {
      case "header":
        return (
          <div className="space-y-2">
            <Textarea
              value={localContent.text}
              onChange={(e) => handleContentChange("text", e.target.value)}
              className="w-full"
            />
            <div className="flex items-center space-x-2">
              <label className="text-sm">Size:</label>
              <select
                value={localContent.size}
                onChange={(e) => handleContentChange("size", e.target.value)}
                className="border rounded p-1 text-sm"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        )
      case "text":
        return (
          <Textarea
            value={localContent.text}
            onChange={(e) => handleContentChange("text", e.target.value)}
            className="w-full min-h-[100px]"
          />
        )
      case "image":
        return (
          <div className="space-y-2">
            <Input
              value={localContent.src}
              onChange={(e) => handleContentChange("src", e.target.value)}
              placeholder="Image URL"
              className="w-full"
            />
            <Input
              value={localContent.alt}
              onChange={(e) => handleContentChange("alt", e.target.value)}
              placeholder="Alt text"
              className="w-full"
            />
            <div className="flex items-center space-x-2">
              <label className="text-sm">Width:</label>
              <Input
                value={localContent.width}
                onChange={(e) => handleContentChange("width", e.target.value)}
                placeholder="Width (px or %)"
                className="w-full"
              />
            </div>
          </div>
        )
      case "button":
        return (
          <div className="space-y-2">
            <Input
              value={localContent.text}
              onChange={(e) => handleContentChange("text", e.target.value)}
              placeholder="Button text"
              className="w-full"
            />
            <Input
              value={localContent.url}
              onChange={(e) => handleContentChange("url", e.target.value)}
              placeholder="Button URL"
              className="w-full"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm">Background:</label>
                <Input
                  type="color"
                  value={localContent.backgroundColor}
                  onChange={(e) => handleContentChange("backgroundColor", e.target.value)}
                  className="w-full h-8"
                />
              </div>
              <div>
                <label className="text-sm">Text color:</label>
                <Input
                  type="color"
                  value={localContent.textColor}
                  onChange={(e) => handleContentChange("textColor", e.target.value)}
                  className="w-full h-8"
                />
              </div>
            </div>
          </div>
        )
      case "spacer":
        return (
          <div className="flex items-center space-x-2">
            <label className="text-sm">Height:</label>
            <Input
              type="number"
              value={localContent.height}
              onChange={(e) => handleContentChange("height", Number.parseInt(e.target.value))}
              className="w-20"
              min="1"
              max="100"
            />
            <span className="text-sm">px</span>
          </div>
        )
      case "divider":
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <label className="text-sm">Color:</label>
              <Input
                type="color"
                value={localContent.color}
                onChange={(e) => handleContentChange("color", e.target.value)}
                className="w-20 h-8"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm">Thickness:</label>
              <Input
                type="number"
                value={localContent.thickness}
                onChange={(e) => handleContentChange("thickness", Number.parseInt(e.target.value))}
                className="w-20"
                min="1"
                max="10"
              />
              <span className="text-sm">px</span>
            </div>
          </div>
        )
      default:
        return <div>Unknown block type</div>
    }
  }

  const renderDisplayContent = () => {
    switch (block.type) {
      case "header":
        return (
          <div
            className={`
            ${localContent.size === "small" ? "text-xl" : localContent.size === "medium" ? "text-2xl" : "text-3xl"} 
            font-bold
          `}
          >
            {localContent.text}
          </div>
        )
      case "text":
        return <div className="whitespace-pre-wrap">{localContent.text}</div>
      case "image":
        return (
          <img
            src={localContent.src || "/placeholder.svg"}
            alt={localContent.alt}
            style={{ width: localContent.width || "100%" }}
            className="mx-auto"
          />
        )
      case "button":
        return (
          <Button
            style={{
              backgroundColor: localContent.backgroundColor,
              color: localContent.textColor,
            }}
            className="mx-auto block"
          >
            {localContent.text}
          </Button>
        )
      case "spacer":
        return <div style={{ height: `${localContent.height}px` }}></div>
      case "divider":
        return (
          <hr
            style={{
              borderColor: localContent.color,
              borderWidth: `${localContent.thickness}px`,
              borderStyle: "solid",
            }}
          />
        )
      case "columns":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-dashed border-gray-300 p-4 rounded">Column 1</div>
            <div className="border border-dashed border-gray-300 p-4 rounded">Column 2</div>
          </div>
        )
      case "grid":
        return (
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="border border-dashed border-gray-300 p-2 rounded text-center text-sm">
                Item {i + 1}
              </div>
            ))}
          </div>
        )
      default:
        return <div>Unknown block type</div>
    }
  }

  return isEditing ? renderEditableContent() : renderDisplayContent()
}
