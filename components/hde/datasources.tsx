'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataSourcesGrid } from "@/components/hde/shared/DataSourceConnection"
import { DataElementsTable } from "@/components/hde/shared/DataTable"
import { Filter, PlusCircle, HelpCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function DataSources() {
  const dataSources = [
    {
      name: "Member Demographics",
      description: "Primary member information database",
      status: "connected" as const,
      lastSync: "15 minutes ago",
      records: "5.2M records"
    },
    {
      name: "Claims Data Warehouse",
      description: "Historical claims and diagnoses",
      status: "connected" as const,
      lastSync: "2 hours ago",
      records: "28.7M records"
    },
    {
      name: "Clinical Data Repository",
      description: "Lab results and clinical measurements",
      status: "syncing" as const,
      records: "12.3M records",
      progress: 68
    },
    {
      name: "Marketing Engagement",
      description: "Campaign and conversion data",
      status: "error" as const,
      errorMessage: "Authentication failed"
    }
  ];

  const dataElements = [
    {
      name: "Global Member ID",
      category: "User Identifiers",
      status: "Active" as const,
      completeness: 100,
      priority: "Required" as const
    },
    {
      name: "Member Eligibility",
      category: "Member Characteristics",
      status: "Active" as const,
      completeness: 98,
      priority: "Required" as const
    },
    {
      name: "Date of Birth",
      category: "Member Characteristics",
      status: "Active" as const,
      completeness: 95,
      priority: "Required" as const
    },
    {
      name: "Gender",
      category: "Member Characteristics",
      status: "Active" as const,
      completeness: 99,
      priority: "Required" as const
    },
    {
      name: "ZIP Code",
      category: "Member Characteristics",
      status: "Active" as const,
      completeness: 97,
      priority: "Required" as const
    },
    {
      name: "Service Eligibility",
      category: "Member Characteristics",
      status: "Active" as const,
      completeness: 100,
      priority: "Required" as const
    },
    {
      name: "Relationship Status",
      category: "Member Characteristics",
      status: "Active" as const,
      completeness: 92,
      priority: "Required" as const
    },
    {
      name: "Claims Data",
      category: "Additional Signals",
      status: "Active" as const,
      completeness: 85,
      priority: "Required" as const
    },
    {
      name: "Email Address",
      category: "Contact Ability",
      status: "Active" as const,
      completeness: 78,
      priority: "Required" as const
    },
    {
      name: "Race/Ethnicity",
      category: "Member Characteristics",
      status: "Partial" as const,
      completeness: 65,
      priority: "Nice to Have" as const
    },
    {
      name: "Medications",
      category: "Additional Signals",
      status: "Partial" as const,
      completeness: 72,
      priority: "Nice to Have" as const
    },
    {
      name: "Clinical Signals (BMI, BP)",
      category: "Additional Signals",
      status: "Partial" as const,
      completeness: 58,
      priority: "Nice to Have" as const
    },
    {
      name: "Marketing Engagement",
      category: "Historical Engagement",
      status: "Partial" as const,
      completeness: 45,
      priority: "Nice to Have" as const
    }
  ];

  const claimsProcessingData = [
    {
      name: "Diagnoses (ICD-10)",
      description: "Primary and secondary diagnoses codes",
      completeness: 92
    },
    {
      name: "Pharmacy Claims",
      description: "Medication prescriptions and fills",
      completeness: 87
    },
    {
      name: "Procedures (CPT/HCPCS)",
      description: "Medical procedures and services",
      completeness: 85
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Data Sources & Integration Status</h2>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button size="sm" variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Data Source
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DataSourcesGrid dataSources={dataSources} />

        <Card>
          <CardHeader>
            <CardTitle>Claims Data Integration</CardTitle>
            <CardDescription>Status of claims data processing and normalization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">ICD-10 Claims Processing</h4>
                <Badge className="bg-green-500">Active</Badge>
              </div>

              <div className="space-y-4">
                {claimsProcessingData.map((item, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          High Value
                        </Badge>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Completeness:</span>
                        <span>{item.completeness}%</span>
                      </div>
                      <Progress value={item.completeness} className="mt-2 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <DataElementsTable
        title="Required Data Elements"
        description="Status of critical data elements for integration"
        data={dataElements}
      />
    </div>
  )
}