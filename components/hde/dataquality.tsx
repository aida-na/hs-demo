'use client';


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { HelpCircle } from "lucide-react";

export function DataQuality() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Data Enrichment</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Enrichment Status</CardTitle>
          <CardDescription>Progress of data enrichment processes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">SDOH Factors</span>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="text-sm">58% Complete</span>
              </div>
              <Progress value={58} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Enriching member profiles with social determinants of health data
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Clinical Risk Scores</span>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="text-sm">75% Complete</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground">Calculating clinical risk scores based on claims data</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Condition Mapping</span>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="text-sm">82% Complete</span>
              </div>
              <Progress value={82} className="h-2" />
              <p className="text-xs text-muted-foreground">Mapping ICD-10 codes to standardized condition categories</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Missing Member Insights</CardTitle>
            <CardDescription>
              Critical care gaps due to disconnected data sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 border rounded-lg text-center">
                <div className="text-3xl font-bold text-amber-500">842</div>
                <p className="text-sm font-medium mt-1">Members at Risk</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Due to fragmented profiles
                </p>
              </div>
              
              <div className="p-4 border rounded-lg text-center">
                <div className="text-3xl font-bold text-amber-500">28%</div>
                <p className="text-sm font-medium mt-1">Care Gaps</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Currently invisible in your system
                </p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Impact on High-Priority Members</h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg bg-red-50">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">High-Risk Diabetic Members</span>
                    <Badge className="bg-red-200 text-red-800">320 members</Badge>
                  </div>
                  <p className="text-sm">
                    Missing pharmacy data prevents identification of medication non-adherence
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Resolve with Pharmacy Data Connection
                  </Button>
                </div>
                
                <div className="p-3 border rounded-lg bg-amber-50">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Post-Discharge Patients</span>
                    <Badge className="bg-amber-200 text-amber-800">165 members</Badge>
                  </div>
                  <p className="text-sm">
                    Missing clinical data creates blind spots in post-discharge follow-up
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Resolve with Clinical Data Connection
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Quality Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Data Quality Metrics</CardTitle>
            <CardDescription>Overall quality assessment of integrated data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">94%</div>
                <p className="text-sm font-medium">Data Accuracy</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Validated against source systems
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">87%</div>
                <p className="text-sm font-medium">Completeness Score</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Required fields populated
                </p>
              </div>
              <div className="text-3xl font-bold text-amber-500 mb-2 text-center">
                <div>2.3%</div>
                <p className="text-sm font-medium">Duplicate Records</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Identified and flagged for review
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Identity Resolution */}
        <Card>
          <CardHeader>
            <CardTitle>Identity Resolution Progress</CardTitle>
            <CardDescription>Linking member records across data sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Exact Match Resolution</p>
                  <p className="text-xs text-muted-foreground">Direct matches on member ID and demographics</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">72%</div>
                  <p className="text-xs text-muted-foreground">3.02M records</p>
                </div>
              </div>
              <Progress value={72} className="h-2" />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Probabilistic Matching</p>
                  <p className="text-xs text-muted-foreground">Advanced algorithms for fuzzy matching</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">18%</div>
                  <p className="text-xs text-muted-foreground">756K records</p>
                </div>
              </div>
              <Progress value={18} className="h-2" />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Manual Review Required</p>
                  <p className="text-xs text-muted-foreground">Ambiguous matches needing human verification</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-600">6%</div>
                  <p className="text-xs text-muted-foreground">252K records</p>
                </div>
              </div>
              <Progress value={6} className="h-2" />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Unresolved Records</p>
                  <p className="text-xs text-muted-foreground">Unable to match across sources</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">4%</div>
                  <p className="text-xs text-muted-foreground">168K records</p>
                </div>
              </div>
              <Progress value={4} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Data Standardization */}
        <Card>
          <CardHeader>
            <CardTitle>Data Standardization</CardTitle>
            <CardDescription>Converting data to standard formats and terminologies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Medical Coding Standards</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ICD-10 Diagnosis Codes</span>
                    <div className="flex items-center gap-2">
                      <Progress value={96} className="w-20 h-2" />
                      <span className="text-sm">96%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CPT Procedure Codes</span>
                    <div className="flex items-center gap-2">
                      <Progress value={89} className="w-20 h-2" />
                      <span className="text-sm">89%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">NDC Drug Codes</span>
                    <div className="flex items-center gap-2">
                      <Progress value={92} className="w-20 h-2" />
                      <span className="text-sm">92%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Data Format Standardization</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Date/Time Formats</span>
                    <div className="flex items-center gap-2">
                      <Progress value={100} className="w-20 h-2" />
                      <span className="text-sm">100%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Address Standardization</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-20 h-2" />
                      <span className="text-sm">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Phone Number Format</span>
                    <div className="flex items-center gap-2">
                      <Progress value={98} className="w-20 h-2" />
                      <span className="text-sm">98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Validation Rules */}
        <Card>
          <CardHeader>
            <CardTitle>Data Validation Results</CardTitle>
            <CardDescription>Business rules and constraints validation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-green-700">Passed Validations</h5>
                    <Badge className="bg-green-500">3.8M records</Badge>
                  </div>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>• Valid date ranges</li>
                    <li>• Consistent member demographics</li>
                    <li>• Valid ZIP codes</li>
                    <li>• Proper claim relationships</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-amber-700">Failed Validations</h5>
                    <Badge className="bg-amber-500">420K records</Badge>
                  </div>
                  <ul className="text-sm text-amber-600 space-y-1">
                    <li>• Future service dates (12K)</li>
                    <li>• Invalid provider IDs (85K)</li>
                    <li>• Missing required fields (220K)</li>
                    <li>• Inconsistent member info (103K)</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-700 mb-2">Automated Corrections Applied</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-lg font-bold text-blue-600">15,240</div>
                    <p className="text-blue-600">Gender standardizations</p>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">8,750</div>
                    <p className="text-blue-600">ZIP code corrections</p>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">12,100</div>
                    <p className="text-blue-600">Phone format fixes</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}