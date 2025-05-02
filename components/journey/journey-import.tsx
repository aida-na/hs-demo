"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

export default function JourneyImport() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md">
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Import Journey</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Drag and drop your journey file here, or click to browse
            </p>
            <Button variant="outline">Browse Files</Button>
          </div>

          <div className="mt-6">
            <div className="space-y-2">
              <Label htmlFor="import-url">Or import from URL</Label>
              <div className="flex space-x-2">
                <Input id="import-url" placeholder="https://example.com/journey.json" />
                <Button>Import</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

