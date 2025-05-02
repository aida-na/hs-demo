"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

export default function CampaignConfiguration() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input id="campaign-name" placeholder="Enter campaign name" defaultValue="New Member Onboarding" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign-description">Description</Label>
            <Textarea
              id="campaign-description"
              placeholder="Enter campaign description"
              defaultValue="A multi-step journey to welcome new members and guide them through initial steps of their health plan."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign-owner">Campaign Owner</Label>
            <Select defaultValue="marketing">
              <SelectTrigger id="campaign-owner">
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="marketing">Marketing Team</SelectItem>
                <SelectItem value="member-services">Member Services</SelectItem>
                <SelectItem value="clinical">Clinical Team</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Campaign Schedule</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date">End Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-enroll">Auto-enroll new qualifying patients</Label>
              <Switch id="auto-enroll" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="analytics">Enable detailed analytics</Label>
              <Switch id="analytics" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Send admin notifications</Label>
              <Switch id="notifications" defaultChecked />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign-tags">Tags</Label>
            <Input
              id="campaign-tags"
              placeholder="Add tags separated by commas"
              defaultValue="onboarding, new members, welcome"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

