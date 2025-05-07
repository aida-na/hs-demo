"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"

interface SegmentFilterProps {
  initialSegments: string[] | undefined
  onSave: (segments: string[]) => void
}

const availableSegments = [
  { id: "Tech-Savvy Seniors", name: "Tech-Savvy Seniors", category: "Cohorts" },
  { id: "age-30-45", name: "Age 30-45", category: "Demographics" },
  { id: "age-46-65", name: "Age 46-65", category: "Demographics" },
  { id: "age-65-plus", name: "Age 65+", category: "Demographics" },
  { id: "chronic", name: "Chronic Condition", category: "Health Status" },
  { id: "preventive-due", name: "Preventive Care Due", category: "Care Gaps" },
  { id: "high-risk", name: "High Risk", category: "Risk Level" },
  { id: "low-engagement", name: "Low Engagement", category: "Engagement" },
  { id: "rural", name: "Rural Location", category: "Location" },
  { id: "urban", name: "Urban Location", category: "Location" },
  { id: "digital-active", name: "Digitally Active", category: "Digital" },
  { id: "non-digital", name: "Non-Digital Users", category: "Digital" },
]

export default function SegmentFilter({ initialSegments = [], onSave }: SegmentFilterProps) {
  const [selectedSegments, setSelectedSegments] = useState<string[]>(initialSegments)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSegments = availableSegments.filter(
    (segment) =>
      segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      segment.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleToggleSegment = (id: string) => {
    if (selectedSegments.includes(id)) {
      setSelectedSegments(selectedSegments.filter((segmentId) => segmentId !== id))
    } else {
      setSelectedSegments([...selectedSegments, id])
    }
  }

  const handleSave = () => {
    onSave(selectedSegments)
  }

  return (
    <div className="space-y-4 py-4">
      <div className="relative mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search segments..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
        {filteredSegments.map((segment) => (
          <div key={segment.id} className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md">
            <Checkbox
              id={`filter-${segment.id}`}
              checked={selectedSegments.includes(segment.id)}
              onCheckedChange={() => handleToggleSegment(segment.id)}
            />
            <Label htmlFor={`filter-${segment.id}`} className="cursor-pointer flex-1">
              <div className="font-medium">{segment.name}</div>
              <div className="text-xs text-muted-foreground">{segment.category}</div>
            </Label>
          </div>
        ))}

        {filteredSegments.length === 0 && <p className="text-center text-muted-foreground py-4">No segments found</p>}
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium">Selected Segments: {selectedSegments.length}</span>
          <Button variant="ghost" size="sm" onClick={() => setSelectedSegments([])}>
            Clear All
          </Button>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Apply Segments</Button>
      </div>
    </div>
  )
}

