"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Target, Users } from "lucide-react"
import CampaignGoalSelector from "@/components/campaign/campaign-goal-selector"
import AudienceSelector from "@/components/campaign/segment-selector"

export default function NewCampaign() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-8">
        <h1 className="text-3xl font-bold ml-4">Create New Campaign</h1>
      </div>

      <Tabs defaultValue="goal" className="mb-10">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="goal">1. Campaign Goal</TabsTrigger>
          <TabsTrigger value="segments">2. Select Segments</TabsTrigger>
          <TabsTrigger value="journey">3. Build Journey</TabsTrigger>
        </TabsList>

        <TabsContent value="goal">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 mr-6">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Select Campaign Goal</h2>
                </div>
                <div className="flex items-center mb-6">
                <CardDescription>
                Choose the primary objective for your personalized health campaign
               </CardDescription>
               </div>
              <CampaignGoalSelector />

              <div className="flex justify-end mt-8">
                <Link href="/orchestration/builder/new?step=segments">
                  <Button className="gap-2">
                    Continue to Segments
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 mr-4">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Select Patient Segments</h2>
              </div>

              <AudienceSelector />

              <div className="flex justify-between mt-8">
                <Link href="/campaigns/new">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Goals
                  </Button>
                </Link>
                <Link href="/orchestration/builder/new/journey">
                  <Button className="gap-2">
                    Continue to Journey Builder
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journey">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-semibold">Build Your Journey</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                You have selected your campaign goal and patient segments. Now lets build your journey.
              </p>

              <Link href="/orchestration/builder/new/journey">
                <Button className="gap-2">
                  Go to Journey Builder
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

