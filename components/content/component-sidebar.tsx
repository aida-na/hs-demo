"use client"

import { ImageIcon, BoxIcon as ButtonIcon, Columns, Heading, AlignLeft, Minus, ArrowDown, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ComponentSidebarProps {
  onAddBlock: (blockType: string) => void
}

export default function ComponentSidebar({ onAddBlock }: ComponentSidebarProps) {
  const components = [
    { type: "header", icon: <Heading className="h-4 w-4" />, label: "Header" },
    { type: "text", icon: <AlignLeft className="h-4 w-4" />, label: "Text" },
    { type: "image", icon: <ImageIcon className="h-4 w-4" />, label: "Image" },
    { type: "button", icon: <ButtonIcon className="h-4 w-4" />, label: "Button" },
    { type: "spacer", icon: <ArrowDown className="h-4 w-4" />, label: "Spacer" },
    { type: "divider", icon: <Minus className="h-4 w-4" />, label: "Divider" },
    { type: "columns", icon: <Columns className="h-4 w-4" />, label: "Columns" },
    { type: "grid", icon: <Grid3X3 className="h-4 w-4" />, label: "Grid" },
  ]

  return (
    <div className="p-4">
      <h3 className="font-medium mb-4">Components</h3>
      <div className="grid grid-cols-2 gap-2">
        {components.map((component) => (
          <Button
            key={component.type}
            variant="outline"
            className="flex flex-col h-20 items-center justify-center text-xs"
            onClick={() => onAddBlock(component.type)}
          >
            {component.icon}
            <span className="mt-2">{component.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
