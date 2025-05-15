"use client"

import { useDrag, useDrop } from "react-dnd"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Grip, Trash2, Copy } from "lucide-react"
import type { EmailBlock, UserSegment } from "@/lib/types"
import EmailBlockComponent from "./email-block"

interface EmailCanvasProps {
  blocks: EmailBlock[]
  selectedBlockId: string | null
  setSelectedBlockId: (id: string | null) => void
  updateBlock: (id: string, content: any) => void
  moveBlock: (dragIndex: number, hoverIndex: number) => void
  deleteBlock: (id: string) => void
  duplicateBlock: (id: string) => void
  userSegments: UserSegment[]
}

interface DragItem {
  index: number
  id: string
  type: string
}

const DraggableBlock = ({
  block,
  index,
  isSelected,
  moveBlock,
  selectBlock,
  deleteBlock,
  duplicateBlock,
}: {
  block: EmailBlock
  index: number
  isSelected: boolean
  moveBlock: (dragIndex: number, hoverIndex: number) => void
  selectBlock: () => void
  deleteBlock: () => void
  duplicateBlock: () => void
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag, preview] = useDrag({
    type: "BLOCK",
    item: { type: "BLOCK", id: block.id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "BLOCK",
    hover(item: DragItem, monitor: any) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveBlock(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  drag(drop(ref))

  return (
    <div
      ref={preview}
      className={`mb-4 ${isDragging ? "opacity-50" : "opacity-100"} ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      onClick={selectBlock}
    >
      <Card>
        <div className="flex items-center justify-between p-2 bg-gray-50 border-b">
          <div className="flex items-center">
            <div ref={ref} className="cursor-move p-1">
              <Grip className="h-4 w-4 text-gray-400" />
            </div>
            <span className="text-sm font-medium ml-2 capitalize">{block.type}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                duplicateBlock()
              }}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                deleteBlock()
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <EmailBlockComponent block={block} />
        </CardContent>
      </Card>
    </div>
  )
}

export default function EmailCanvas({
  blocks,
  selectedBlockId,
  setSelectedBlockId,
  updateBlock,
  moveBlock,
  deleteBlock,
  duplicateBlock,
  userSegments,
}: EmailCanvasProps) {
  return (
    <div className="p-6 min-h-full bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-sm min-h-[600px]">
        {blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-4">Drag and drop components here</p>
            <p className="text-gray-400 text-sm">Your email is empty. Add components from the sidebar.</p>
          </div>
        ) : (
          blocks.map((block, index) => (
            <DraggableBlock
              key={block.id}
              block={block}
              index={index}
              isSelected={selectedBlockId === block.id}
              moveBlock={moveBlock}
              selectBlock={() => setSelectedBlockId(block.id)}
              deleteBlock={() => deleteBlock(block.id)}
              duplicateBlock={() => duplicateBlock(block.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}
