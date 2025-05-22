"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PopulationInsights() {
  const employerData = [
    { 
      name: "Acme Corporation", 
      members: 5240, 
      growth: 3.2, 
      dataCompleteness: 92,
      topConditions: ["Hypertension", "Diabetes"]
    },
    { 
      name: "Global Health Inc", 
      members: 2180, 
      growth: -1.5,
      dataCompleteness: 85,
      topConditions: ["Hypertension", "Obesity"]
    },
    { 
      name: "Midwest Manufacturing", 
      members: 4750, 
      growth: 5.4, 
      dataCompleteness: 78,
      topConditions: ["Diabetes", "COPD"]
    }
  ];

  const conditionPrevalenceData = [
    { name: "Type 2 Diabetes", value: 18 },
    { name: "Hypertension", value: 28 },
    { name: "Hyperlipidemia", value: 22 },
    { name: "Obesity", value: 20 },
    { name: "Depression", value: 15 },
    { name: "Asthma", value: 12 },
  ];

  const clinicalFactorsData = [
    { name: "Uncontrolled BP", value: 24 },
    { name: "A1C > 9.0", value: 16 },
    { name: "BMI > 30", value: 38 },
    { name: "Low Medication Adherence", value: 32 }
  ];

  const behavioralFactorsData = [
    { name: "Low Physical Activity", value: 45 },
    { name: "Tobacco Use", value: 22 },
    { name: "Poor Nutrition", value: 36 },
    { name: "High Stress", value: 29 }
  ];

  const demographicData = {
    age: [
      { name: "18-24", value: 8 },
      { name: "25-34", value: 22 },
      { name: "35-44", value: 27 },
      { name: "45-54", value: 20 },
      { name: "55-64", value: 18 },
      { name: "65+", value: 5 }
    ],
    gender: [
      { name: "Male", value: 53 },
      { name: "Female", value: 47 }
    ]
  };
  
  const careGapData = [
    { name: "Annual Physical", value: 32 },
    { name: "Diabetes Eye Exam", value: 42 },
    { name: "Cancer Screening", value: 28 },
    { name: "Vaccination", value: 18 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Population Insights</h2>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <select className="px-3 py-2 rounded-md border border-gray-300 bg-white">
            <option value="acme">Acme Corporation</option>
            <option value="global">Global Health Inc</option>
            <option value="midwest">Midwest Manufacturing</option>
          </select>
          <button className="px-3 py-2 rounded-md bg-white border border-gray-300 flex items-center gap-2 text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-gray-500">Total Population</p>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-bold">5,240</span>
            <span className="text-sm text-green-600 flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              3.2%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">vs last year</p>
        </div>
    
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-gray-500">Cost per Member</p>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-bold">$7,845</span>
            <span className="text-sm text-red-600 flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
              5.4%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">vs last year</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-gray-500">Engagement Rate</p>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-bold">68%</span>
            <span className="text-sm text-green-600 flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              12%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">vs industry average</p>
        </div>
      </div>

      {/* First row of charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="mb-3">
            <h4 className="text-base font-medium">Condition Prevalence</h4>
            <p className="text-sm text-gray-500">Most common conditions at Acme Corporation</p>
          </div>
          <div className="h-64">
            <div className="h-full w-full flex flex-col justify-between">
              {conditionPrevalenceData.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="w-32 text-sm">{item.name}</div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-100 rounded-md overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-md" 
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-10 text-sm text-right ml-2">{item.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="mb-3">
            <h4 className="text-base font-medium">Demographics</h4>
            <p className="text-sm text-gray-500">Age and gender distribution at Acme Corporation</p>
          </div>
          <div className="h-64 grid grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium mb-2">Age Distribution</h5>
              {demographicData.age.map((item, index) => (
                <div key={index} className="flex items-center mb-1.5">
                  <div className="w-12 text-xs">{item.name}</div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-100 rounded-sm overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-sm" 
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-8 text-xs text-right ml-1">{item.value}%</div>
                </div>
              ))}
            </div>
            <div>
              <h5 className="text-sm font-medium mb-2">Gender Distribution</h5>
              <div className="h-32 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gray-100 relative">
                  <div 
                    className="absolute top-0 left-0 w-32 h-32 rounded-full overflow-hidden"
                    style={{ 
                      clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                      background: `conic-gradient(#3b82f6 0% ${demographicData.gender[0].value}%,rgb(245, 204, 220) ${demographicData.gender[0].value}% 100%)`
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="text-xs flex gap-2 mb-1">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mr-1"></div>
                        <span>Male</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-400 mr-1"></div>
                        <span>Female</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second row of charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="mb-3">
            <h4 className="text-base font-medium">Clinical Risk Factors</h4>
            <p className="text-sm text-gray-500">Key clinical indicators at Acme Corporation</p>
          </div>
          <div className="h-64">
            <div className="h-full w-full flex flex-col justify-between">
              {clinicalFactorsData.map((item, index) => (
                <div key={index} className="flex items-center mb-3">
                  <div className="w-40 text-sm">{item.name}</div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-100 rounded-md overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 rounded-md" 
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-10 text-sm text-right ml-2">{item.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="mb-3">
            <h4 className="text-base font-medium">Behavioral Risk Factors</h4>
            <p className="text-sm text-gray-500">Key behavioral indicators at Acme Corporation</p>
          </div>
          <div className="h-64">
            <div className="h-full w-full flex flex-col justify-between">
              {behavioralFactorsData.map((item, index) => (
                <div key={index} className="flex items-center mb-3">
                  <div className="w-40 text-sm">{item.name}</div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-100 rounded-md overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-md" 
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-10 text-sm text-right ml-2">{item.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Care Gap Analysis Card */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="mb-3">
          <h4 className="text-base font-medium">Care Gap Analysis</h4>
          <p className="text-sm text-gray-500">Percentage of Acme Corporation members with care gaps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {careGapData.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4 border rounded-md">
              <div className="w-20 h-20 relative mb-2">
                <svg viewBox="0 0 36 36" className="w-20 h-20">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeDasharray={`${item.value}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{item.value}%</span>
                </div>
              </div>
              <p className="text-sm text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Employer Group Table */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="mb-3">
          <h4 className="text-base font-medium">All Employer Groups Comparison</h4>
          <p className="text-sm text-gray-500">Population insights across employer groups</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Employer</th>
                <th className="py-2 px-4 text-left">Members</th>
                <th className="py-2 px-4 text-left">Growth</th>
                <th className="py-2 px-4 text-left">Top Conditions</th>
                <th className="py-2 px-4 text-left">Data Completeness</th>
                <th className="py-2 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {employerData.map((employer, index) => (
                <tr key={index} className={index < employerData.length - 1 ? "border-b" : ""}>
                  <td className="py-3 px-4 font-medium">{employer.name}</td>
                  <td className="py-3 px-4">{employer.members.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={employer.growth >= 0 ? "text-green-600" : "text-red-600"}>
                      {employer.growth >= 0 ? "+" : ""}{employer.growth}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {employer.topConditions.map((condition, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full" 
                          style={{ width: `${employer.dataCompleteness}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{employer.dataCompleteness}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="mb-3">
          <h4 className="text-base font-medium">Action Recommendations</h4>
          <p className="text-sm text-gray-500">Suggested interventions based on population analysis</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-md">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h5 className="font-medium">High-Risk Care Management</h5>
            </div>
            <p className="text-sm text-gray-600">Target 320 members with multiple chronic conditions for enhanced care management program.</p>
          </div>
          
          <div className="p-4 border rounded-md">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h5 className="font-medium">Diabetes Management Program</h5>
            </div>
            <p className="text-sm text-gray-600">Implement targeted diabetes program for 940 members with uncontrolled A1C levels.</p>
          </div>
          
          <div className="p-4 border rounded-md">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                </svg>
              </div>
              <h5 className="font-medium">Preventive Screening Campaign</h5>
            </div>
            <p className="text-sm text-gray-600">Launch targeted outreach for 1,850 members overdue for preventive screenings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}