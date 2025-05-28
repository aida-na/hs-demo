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


      </div>
    </div>
  );
}