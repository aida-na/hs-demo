import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle, Download, ArrowRight } from "lucide-react"

interface ContactChannel {
  type: string
  value: string
  available: boolean
  badgeClass: string
}

interface HealthCondition {
  type: "Primary" | "Secondary"
  name: string
  code: string
  diagnosedDate: string
}

interface Medication {
  name: string
  dosage: string
  startDate: string
  lastFill: string
  adherence: string
  adherenceColor: string
}

interface ClinicalSignal {
  label: string
  value: string
  status: string
  statusColor: string
}

interface SDOHFactor {
  factor: string
  status: string
  statusColor: string
  description: string
}

interface CohortMembership {
  audienceId: string
  audienceName: string
  audienceIcon: React.ComponentType<{ className?: string }>
  cohortName: string
  size: number
  response: string
  relevanceScore: number
  color: string
}

interface MemberProfileProps {
  member: {
    id: string
    name: string
    initials: string
    age: number
    gender: string
    zipCode: string
    relationship: string
    eligibility: string
    planType: string
    race: string
    language: string
    email: string
    phone: string
    address: string
  }
  contactChannels: ContactChannel[]
  healthConditions: HealthCondition[]
  medications: Medication[]
  clinicalSignals: ClinicalSignal[]
  sdohFactors: SDOHFactor[]
  cohortMemberships: CohortMembership[]
}

export function MemberProfileCard({ 
  member, 
  contactChannels, 
  healthConditions, 
  medications, 
  clinicalSignals, 
  sdohFactors, 
  cohortMemberships 
}: MemberProfileProps) {
  return (
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
                  <AvatarFallback className="text-lg bg-blue-100 text-blue-800">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-xl font-bold">{member.name}</h4>
                  <p className="text-muted-foreground">ID: {member.id}</p>
                </div>
              </div>

              {/* Basic Information */}
              <div className="rounded-lg border p-4 space-y-4">
                <h5 className="font-medium">Basic Information</h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Age</p>
                    <p>{member.age}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Gender</p>
                    <p>{member.gender}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ZIP Code</p>
                    <p>{member.zipCode}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Relationship</p>
                    <p>{member.relationship}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Eligibility</p>
                    <p>{member.eligibility}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Plan Type</p>
                    <p>{member.planType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Race/Ethnicity</p>
                    <p>{member.race}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Language</p>
                    <p>{member.language}</p>
                  </div>
                </div>
              </div>

              {/* Contact Channels */}
              <div className="rounded-lg border p-4 space-y-4">
                <h5 className="font-medium">Contact Channels</h5>
                <div className="space-y-3">
                  {contactChannels.map((channel, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={channel.badgeClass}>
                          {channel.type}
                        </Badge>
                        <span className="text-sm">{channel.value}</span>
                      </div>
                      {channel.available ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Cohort Memberships */}
              <div className="rounded-lg border p-4 space-y-4">
                <h5 className="font-medium">Smart Cohort Membership</h5>
                <div className="space-y-3">
                  {cohortMemberships.map((cohort, idx) => {
                    const IconComponent = cohort.audienceIcon;
                    
                    return (
                      <div key={idx} className="rounded border p-3" style={{ borderColor: cohort.color }}>
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="flex items-center justify-center h-8 w-8 rounded-full"
                            style={{ backgroundColor: `${cohort.color}30` }}
                          >
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{cohort.audienceName}</p>
                            <p className="text-xs font-medium" style={{ color: cohort.color }}>
                              {cohort.cohortName}
                            </p>
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
              {/* Health Conditions */}
              <div className="rounded-lg border p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Health Conditions (from Claims)</h5>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    High Value Data
                  </Badge>
                </div>
                <div className="space-y-3">
                  {healthConditions.map((condition, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={condition.type === "Primary" ? "default" : "secondary"}>
                          {condition.type}
                        </Badge>
                        <span className="text-sm font-medium">{condition.name} ({condition.code})</span>
                      </div>
                      <span className="text-xs text-muted-foreground">First diagnosed: {condition.diagnosedDate}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medications */}
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

              {/* Clinical Signals & SDOH Tabs */}
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
                      {clinicalSignals.map((signal, index) => (
                        <div key={index} className="rounded-lg border p-3 text-center">
                          <p className="text-xs text-muted-foreground">{signal.label}</p>
                          <p className="text-xl font-bold">{signal.value}</p>
                          <Badge className={`mt-1 ${signal.statusColor}`}>{signal.status}</Badge>
                        </div>
                      ))}
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
                      {sdohFactors.map((factor, index) => (
                        <div key={index} className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{factor.factor}</p>
                            <Badge className={factor.statusColor}>{factor.status}</Badge>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {factor.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
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
  )
}