"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle2,
  Activity,
  Zap,
  Heart,
  ArrowRight,
  Download,
  XCircle
} from "lucide-react";

export function MemberProfiles() {
  const memberCohorts = [
    {
      audienceId: "medication",
      audienceName: "Medication Adherence",
      audienceIcon: Heart,
      cohortName: "Tech-Savvy Seniors",
      size: 1240,
      response: "SMS + Email",
      relevanceScore: 92,
      color: "#4f46e5"
    },
    {
      audienceId: "chronic",
      audienceName: "Chronic Condition Management",
      audienceIcon: Activity,
      cohortName: "Multiple Condition Patients",
      size: 720,
      response: "Portal + Call",
      relevanceScore: 87,
      color: "#0ea5e9"
    },
    {
      audienceId: "highrisk",
      audienceName: "High-Risk Member Intervention",
      audienceIcon: Zap,
      cohortName: "Complex Conditions",
      size: 290,
      response: "Call + SMS",
      relevanceScore: 78,
      color: "#f59e0b"
    }
  ];

  // Medication data
  const medications = [
    { 
      name: "Metformin", 
      dosage: "1000mg", 
      startDate: "Jan 2018", 
      lastFill: "Last week", 
      adherence: "High (92%)", 
      adherenceColor: "bg-green-500" 
    },
    { 
      name: "Lisinopril", 
      dosage: "20mg", 
      startDate: "Mar 2016", 
      lastFill: "2 weeks ago", 
      adherence: "High (95%)", 
      adherenceColor: "bg-green-500" 
    },
    { 
      name: "Atorvastatin", 
      dosage: "40mg", 
      startDate: "Mar 2016", 
      lastFill: "3 weeks ago", 
      adherence: "Medium (78%)", 
      adherenceColor: "bg-amber-500" 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Member Profiles</h2>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Sample Member Details</CardTitle>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">High Value Member</Badge>
          </div>
          <CardDescription>Comprehensive member profile with integrated data from multiple sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column - Basic Info */}
              <div className="md:w-1/3 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg bg-blue-100 text-blue-800">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-xl font-bold">John Doe</h4>
                    <p className="text-muted-foreground">ID: 1234567890</p>
                  </div>
                </div>

                <div className="rounded-lg border p-4 space-y-4">
                  <h5 className="font-medium">Basic Information</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Age</p>
                      <p>58</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Gender</p>
                      <p>Male</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">ZIP Code</p>
                      <p>90210</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Relationship</p>
                      <p>Primary</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Eligibility</p>
                      <p>Active</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Plan Type</p>
                      <p>PPO</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Race/Ethnicity</p>
                      <p>Caucasian</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Language</p>
                      <p>English</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 space-y-4">
                  <h5 className="font-medium">Contact Channels</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-500">
                          Email
                        </Badge>
                        <span className="text-sm">john.doe@example.com</span>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-500">
                          Phone
                        </Badge>
                        <span className="text-sm">(555) 123-4567</span>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-500">
                          Mail
                        </Badge>
                        <span className="text-sm">123 Main St, Beverly Hills, CA</span>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-50 text-red-500">
                          Text
                        </Badge>
                        <span className="text-sm">Not available</span>
                      </div>
                      <XCircle className="h-4 w-4 text-red-500" />
                    </div>
                  </div>
                </div>

                {/* Smart Cohort Memberships */}
                <div className="rounded-lg border p-4 space-y-4">
                  <h5 className="font-medium">Smart Cohort Membership</h5>
                  <div className="space-y-3">
                    {memberCohorts.map((cohort, idx) => {
                      const IconComponent = cohort.audienceIcon;
                      
                      return (
                        <div key={idx} className="rounded border p-3" style={{ borderColor: cohort.color }}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full" style={{ backgroundColor: `${cohort.color}30` }}>
                              <IconComponent className="h-4 w-4" style={{ color: cohort.color }} />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{cohort.audienceName}</p>
                              <p className="text-xs font-medium" style={{ color: cohort.color }}>{cohort.cohortName}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span>Audience Size: {cohort.size.toLocaleString()}</span>
                            <span>Match Score: {cohort.relevanceScore}%</span>
                          </div>
                          <div className="mt-2 pt-2 border-t flex justify-between items-center">
                            <span className="text-xs font-medium">Best Channels: {cohort.response}</span>
                            <Button size="sm" variant="ghost" className="h-6 text-xs">
                              <ArrowRight className="h-3 w-3 mr-1" />
                              Manage
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>  
              </div>

              {/* Right Column - Health Info */}
              <div className="md:w-2/3 space-y-4">
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Health Conditions (from Claims)</h5>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      High Value Data
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge>Primary</Badge>
                        <span className="text-sm font-medium">Type 2 Diabetes (E11.9)</span>
                      </div>
                      <span className="text-xs text-muted-foreground">First diagnosed: Jan 2018</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Secondary</Badge>
                        <span className="text-sm">Hypertension (I10)</span>
                      </div>
                      <span className="text-xs text-muted-foreground">First diagnosed: Mar 2016</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Secondary</Badge>
                        <span className="text-sm">Hyperlipidemia (E78.5)</span>
                      </div>
                      <span className="text-xs text-muted-foreground">First diagnosed: Mar 2016</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Secondary</Badge>
                        <span className="text-sm">Obesity (E66.9)</span>
                      </div>
                      <span className="text-xs text-muted-foreground">First diagnosed: Jan 2018</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Medications (from Claims)</h5>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      High Value Data
                    </Badge>
                  </div>
                  <div className="overflow-x-auto">
                    <div className="min-w-full border rounded-md">
                      <div className="grid grid-cols-5 bg-muted px-4 py-2 text-xs font-medium">
                        <div>Medication</div>
                        <div>Dosage</div>
                        <div>Start Date</div>
                        <div>Last Fill</div>
                        <div>Adherence</div>
                      </div>
                      <div className="divide-y">
                        {medications.map((med, idx) => (
                          <div key={idx} className="grid grid-cols-5 px-4 py-3 text-sm">
                            <div className="font-medium">{med.name}</div>
                            <div>{med.dosage}</div>
                            <div>{med.startDate}</div>
                            <div>{med.lastFill}</div>
                            <div>
                              <Badge className={med.adherenceColor}>{med.adherence}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="clinical">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="clinical">Clinical Signals</TabsTrigger>
                    <TabsTrigger value="sdoh">SDOH Factors</TabsTrigger>
                  </TabsList>

                  <TabsContent value="clinical">
                    <div className="rounded-lg border p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Clinical Signals</h5>
                        <Badge variant="outline" className="border-amber-500 text-amber-500">
                          Partial Data
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="rounded-lg border p-3 text-center">
                          <p className="text-xs text-muted-foreground">BMI</p>
                          <p className="text-xl font-bold">32.4</p>
                          <Badge className="mt-1 bg-red-500">High</Badge>
                        </div>
                        <div className="rounded-lg border p-3 text-center">
                          <p className="text-xs text-muted-foreground">Blood Pressure</p>
                          <p className="text-xl font-bold">142/88</p>
                          <Badge className="mt-1 bg-amber-500">Elevated</Badge>
                        </div>
                        <div className="rounded-lg border p-3 text-center">
                          <p className="text-xs text-muted-foreground">A1C</p>
                          <p className="text-xl font-bold">7.2%</p>
                          <Badge className="mt-1 bg-amber-500">Elevated</Badge>
                        </div>
                        <div className="rounded-lg border p-3 text-center">
                          <p className="text-xs text-muted-foreground">LDL</p>
                          <p className="text-xl font-bold">118</p>
                          <Badge className="mt-1 bg-amber-500">Elevated</Badge>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="sdoh">
                    <div className="rounded-lg border p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">SDOH Factors</h5>
                        <Badge variant="outline" className="border-amber-500 text-amber-500">
                          Partial Data
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Transportation</p>
                            <Badge className="bg-green-500">Low Risk</Badge>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">
                            Has reliable transportation for medical appointments
                          </p>
                        </div>
                        <div className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Food Security</p>
                            <Badge className="bg-green-500">Low Risk</Badge>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">No indicators of food insecurity</p>
                        </div>
                        <div className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Health Literacy</p>
                            <Badge className="bg-amber-500">Medium Risk</Badge>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">
                            May need additional education on condition management
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Campaign Recommendations Based on Cohort Data */}
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Personalized Recommendations</h5>
                    <Badge variant="outline" className="border-blue-500 text-blue-500">
                      AI-Generated
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-3 rounded-md">
                      <div className="flex items-center mb-2">
                        <Heart className="h-4 w-4 text-blue-600 mr-2" />
                        <h6 className="font-medium text-blue-700">Medication Adherence Focus</h6>
                      </div>
                      <p className="text-sm text-blue-700">
                        Based on "Tech-Savvy Seniors" cohort data, this member responds best to digital reminders.
                        Consider SMS medication reminders with portal follow-up.
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-md">
                      <div className="flex items-center mb-2">
                        <Zap className="h-4 w-4 text-blue-600 mr-2" />
                        <h6 className="font-medium text-blue-700">High Risk Intervention Needed</h6>
                      </div>
                      <p className="text-sm text-blue-700">
                        Member matches "Complex Conditions" cohort profile with elevated clinical markers.
                        Recommend care management outreach with personalized diabetes management plan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">View Full Profile</Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}