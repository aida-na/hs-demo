"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { UserSegment } from "@/lib/types"

interface SegmentManagerProps {
  segments: UserSegment[]
  addSegment: (segment: UserSegment) => void
  deleteSegment: (id: string) => void
}

export default function SegmentManager({ segments, addSegment, deleteSegment }: SegmentManagerProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newSegmentName, setNewSegmentName] = useState("")
  const [newSegmentDescription, setNewSegmentDescription] = useState("")

  const handleAddSegment = () => {
    if (newSegmentName.trim()) {
      addSegment({
        id: `segment-${Date.now()}`,
        name: newSegmentName.trim(),
        description: newSegmentDescription.trim(),
      })
      setNewSegmentName("")
      setNewSegmentDescription("")
      setIsAdding(false)
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">User Segments</h3>
        <Button variant="outline" size="sm" onClick={() => setIsAdding(!isAdding)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Segment
        </Button>
      </div>

      {isAdding && (
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">New Segment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={newSegmentName}
                  onChange={(e) => setNewSegmentName(e.target.value)}
                  placeholder="Segment name"
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newSegmentDescription}
                  onChange={(e) => setNewSegmentDescription(e.target.value)}
                  placeholder="Describe who is in this segment"
                  className="w-full"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleAddSegment}>
                  Add Segment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {segments.map((segment) => (
          <Card key={segment.id}>
            <CardContent className="p-3 flex justify-between items-center">
              <div>
                <h4 className="font-medium">{segment.name}</h4>
                <p className="text-sm text-gray-500">{segment.description}</p>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={segment.id === "1"} // Prevent deleting "All Users" segment
                  onClick={() => deleteSegment(segment.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
