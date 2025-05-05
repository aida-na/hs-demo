"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft, Check, Save, Send } from "lucide-react"
import JourneyBuilder from "@/components/journey/journey-builder"
import JourneyTemplates from "@/components/journey/journey-templates"
import CampaignConfiguration from "@/components/campaign/campaign-configuration"

export default function JourneyBuilderPage() {
  const [activeTab, setActiveTab] = useState("scratch")
  const [currentStep, setCurrentStep] = useState("builder")

  const selectedGoal = "Patient Onboarding"
  const selectedSegments = ["New Members", "Age 30-45", "Chronic Condition"]

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-8">
        <Link href="/orchestration/builder/new">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Campaign Setup
          </Button>
        </Link>
        <h1 className="text-3xl font-bold ml-4">Journey Builder</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="md:col-span-3">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Campaign Goal</h2>
            <p className="text-muted-foreground">{selectedGoal}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Selected Segments</h2>
            <ul className="space-y-1">
              {selectedSegments.map((segment, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  {segment}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {currentStep === "builder" && (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="scratch">Start from Scratch</TabsTrigger>
              <TabsTrigger value="template">Choose a Template</TabsTrigger>
            </TabsList>

            <TabsContent value="scratch">
              <Card>
                <CardContent className="pt-6">
                  <JourneyBuilder />

                  <div className="flex justify-end mt-8">
                    <Button variant="outline" className="mr-2" onClick={() => setCurrentStep("builder")}>
                      Save Draft
                    </Button>
                    <Button onClick={() => setCurrentStep("configure")}>Continue to Configuration</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="template">
              <Card>
                <CardContent className="pt-6">
                  <JourneyTemplates />

                  <div className="flex justify-end mt-8">
                    <Button onClick={() => setActiveTab("scratch")}>Customize Selected Template</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      {currentStep === "configure" && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-6">Campaign Configuration</h2>

            <CampaignConfiguration />

            <div className="flex justify-between mt-8">
              <Button variant="outline" className="gap-2" onClick={() => setCurrentStep("builder")}>
                <ArrowLeft className="h-4 w-4" />
                Back to Journey Builder
              </Button>

              <div className="space-x-2">
                <Button variant="outline" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save as Draft
                </Button>
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Launch Campaign
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

