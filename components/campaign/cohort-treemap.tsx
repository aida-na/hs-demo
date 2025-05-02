"use client"

import { useState, useEffect } from "react"
import CustomTreemap from "@/components/campaign/custom-treemap"

// Mock data for different journeys
const cohortData = {
  medication: [
    {
      name: "Seniors 65+",
      size: 1200,
      group: "Age",
      subgroups: [
        { name: "Urban", size: 700, group: "Location" },
        { name: "Rural", size: 500, group: "Location" },
      ],
    },
    {
      name: "Chronic Conditions",
      size: 950,
      group: "Health Status",
      subgroups: [
        { name: "Diabetes", size: 450, group: "Condition" },
        { name: "Hypertension", size: 300, group: "Condition" },
        { name: "Heart Disease", size: 200, group: "Condition" },
      ],
    },
    {
      name: "New Prescriptions",
      size: 650,
      group: "Rx Status",
      subgroups: [
        { name: "First-time", size: 350, group: "History" },
        { name: "Switching", size: 300, group: "History" },
      ],
    },
    {
      name: "Non-adherent",
      size: 450,
      group: "Adherence History",
      subgroups: [
        { name: "Cost Barriers", size: 250, group: "Barrier" },
        { name: "Side Effects", size: 200, group: "Barrier" },
      ],
    },
  ],
  caregap: [
    {
      name: "Preventive Screenings",
      size: 980,
      group: "Gap Type",
      subgroups: [
        { name: "Mammogram", size: 420, group: "Screening" },
        { name: "Colonoscopy", size: 360, group: "Screening" },
        { name: "Bone Density", size: 200, group: "Screening" },
      ],
    },
    {
      name: "Vaccinations",
      size: 750,
      group: "Gap Type",
      subgroups: [
        { name: "Flu", size: 400, group: "Vaccine" },
        { name: "Pneumonia", size: 200, group: "Vaccine" },
        { name: "Shingles", size: 150, group: "Vaccine" },
      ],
    },
    {
      name: "Lab Tests",
      size: 450,
      group: "Gap Type",
      subgroups: [
        { name: "A1C", size: 250, group: "Test" },
        { name: "Lipid Panel", size: 200, group: "Test" },
      ],
    },
  ],
  chronic: [
    {
      name: "Diabetes",
      size: 850,
      group: "Condition",
      subgroups: [
        { name: "Newly Diagnosed", size: 300, group: "Stage" },
        { name: "Uncontrolled", size: 350, group: "Control" },
        { name: "Controlled", size: 200, group: "Control" },
      ],
    },
    {
      name: "Hypertension",
      size: 650,
      group: "Condition",
      subgroups: [
        { name: "Stage 1", size: 300, group: "Stage" },
        { name: "Stage 2", size: 350, group: "Stage" },
      ],
    },
    {
      name: "COPD",
      size: 450,
      group: "Condition",
      subgroups: [
        { name: "Mild", size: 150, group: "Severity" },
        { name: "Moderate", size: 200, group: "Severity" },
        { name: "Severe", size: 100, group: "Severity" },
      ],
    },
  ],
  wellness: [
    {
      name: "Medicare",
      size: 1200,
      group: "Plan Type",
      subgroups: [
        { name: "New Members", size: 400, group: "Tenure" },
        { name: "Existing Members", size: 800, group: "Tenure" },
      ],
    },
    {
      name: "Commercial",
      size: 950,
      group: "Plan Type",
      subgroups: [
        { name: "Family Plan", size: 550, group: "Plan" },
        { name: "Individual", size: 400, group: "Plan" },
      ],
    },
    {
      name: "Medicaid",
      size: 650,
      group: "Plan Type",
      subgroups: [
        { name: "Adults", size: 400, group: "Age" },
        { name: "Children", size: 250, group: "Age" },
      ],
    },
    {
      name: "High Risk",
      size: 620,
      group: "Risk Level",
      subgroups: [
        { name: "Multiple Conditions", size: 350, group: "Complexity" },
        { name: "Single Condition", size: 270, group: "Complexity" },
      ],
    },
  ],
  onboarding: [
    {
      name: "Digital Natives",
      size: 580,
      group: "Tech Comfort",
      subgroups: [
        { name: "18-34", size: 320, group: "Age" },
        { name: "35-50", size: 260, group: "Age" },
      ],
    },
    {
      name: "Digital Immigrants",
      size: 420,
      group: "Tech Comfort",
      subgroups: [
        { name: "51-64", size: 250, group: "Age" },
        { name: "65+", size: 170, group: "Age" },
      ],
    },
    {
      name: "New to Insurance",
      size: 240,
      group: "Insurance Experience",
      subgroups: [
        { name: "Previously Uninsured", size: 140, group: "History" },
        { name: "Plan Switchers", size: 100, group: "History" },
      ],
    },
  ],
  highrisk: [
    {
      name: "Multiple Chronic",
      size: 350,
      group: "Complexity",
      subgroups: [
        { name: "3+ Conditions", size: 200, group: "Count" },
        { name: "2 Conditions", size: 150, group: "Count" },
      ],
    },
    {
      name: "Recent Hospitalization",
      size: 280,
      group: "Utilization",
      subgroups: [
        { name: "30 Days", size: 180, group: "Recency" },
        { name: "90 Days", size: 100, group: "Recency" },
      ],
    },
    {
      name: "Polypharmacy",
      size: 260,
      group: "Medication",
      subgroups: [
        { name: "5+ Medications", size: 160, group: "Count" },
        { name: "High-Risk Meds", size: 100, group: "Type" },
      ],
    },
  ],
  discharge: [
    {
      name: "Cardiac",
      size: 280,
      group: "Condition",
      subgroups: [
        { name: "Heart Failure", size: 150, group: "Diagnosis" },
        { name: "Post-MI", size: 130, group: "Diagnosis" },
      ],
    },
    {
      name: "Respiratory",
      size: 240,
      group: "Condition",
      subgroups: [
        { name: "COPD", size: 140, group: "Diagnosis" },
        { name: "Pneumonia", size: 100, group: "Diagnosis" },
      ],
    },
    {
      name: "Surgical",
      size: 240,
      group: "Procedure",
      subgroups: [
        { name: "Orthopedic", size: 140, group: "Type" },
        { name: "General", size: 100, group: "Type" },
      ],
    },
  ],
  sdoh: [
    {
      name: "Transportation",
      size: 420,
      group: "Barrier",
      subgroups: [
        { name: "Rural", size: 250, group: "Location" },
        { name: "Urban No Car", size: 170, group: "Location" },
      ],
    },
    {
      name: "Food Insecurity",
      size: 380,
      group: "Barrier",
      subgroups: [
        { name: "Low Income", size: 230, group: "Factor" },
        { name: "Food Desert", size: 150, group: "Factor" },
      ],
    },
    {
      name: "Housing Instability",
      size: 320,
      group: "Barrier",
      subgroups: [
        { name: "Temporary Housing", size: 180, group: "Status" },
        { name: "Risk of Eviction", size: 140, group: "Status" },
      ],
    },
    {
      name: "Social Isolation",
      size: 200,
      group: "Barrier",
      subgroups: [
        { name: "Seniors", size: 120, group: "Age" },
        { name: "Disabled", size: 80, group: "Status" },
      ],
    },
  ],
  digital: [
    {
      name: "App Users",
      size: 980,
      group: "Channel",
      subgroups: [
        { name: "Active", size: 580, group: "Usage" },
        { name: "Inactive", size: 400, group: "Usage" },
      ],
    },
    {
      name: "Portal Users",
      size: 850,
      group: "Channel",
      subgroups: [
        { name: "Active", size: 450, group: "Usage" },
        { name: "Inactive", size: 400, group: "Usage" },
      ],
    },
    {
      name: "Non-Digital",
      size: 620,
      group: "Channel",
      subgroups: [
        { name: "Tech Averse", size: 320, group: "Reason" },
        { name: "Access Issues", size: 300, group: "Reason" },
      ],
    },
  ],
  benefits: [
    {
      name: "Preventive",
      size: 680,
      group: "Benefit Type",
      subgroups: [
        { name: "Wellness Visits", size: 380, group: "Service" },
        { name: "Screenings", size: 300, group: "Service" },
      ],
    },
    {
      name: "Supplemental",
      size: 580,
      group: "Benefit Type",
      subgroups: [
        { name: "Dental", size: 320, group: "Service" },
        { name: "Vision", size: 260, group: "Service" },
      ],
    },
    {
      name: "Specialty",
      size: 420,
      group: "Benefit Type",
      subgroups: [
        { name: "Mental Health", size: 250, group: "Service" },
        { name: "Physical Therapy", size: 170, group: "Service" },
      ],
    },
    {
      name: "Pharmacy",
      size: 190,
      group: "Benefit Type",
      subgroups: [
        { name: "Mail Order", size: 110, group: "Service" },
        { name: "Specialty Rx", size: 80, group: "Service" },
      ],
    },
  ],
}

// Function to flatten the nested data for treemap
const flattenData = (data: any[]) => {
  return data.map((item) => ({
    id: item.name.toLowerCase().replace(/\s+/g, "-"),
    name: item.name,
    size: item.size,
    group: item.group,
  }))
}

// Custom colors for the treemap
const COLORS = [
  "#38bdf8", // sky-400
  "#22d3ee", // cyan-400
  "#2dd4bf", // teal-400
  "#4ade80", // green-400
  "#a3e635", // lime-400
  "#facc15", // yellow-400
  "#fb923c", // orange-400
  "#f87171", // red-400
  "#f472b6", // pink-400
  "#c084fc", // purple-400
]

type CohortTreemapProps = {
  journeyId: string
  onCohortSelect: (cohortId: string | null) => void
  selectedCohort: string | null
}

export default function CohortTreemap({ journeyId, onCohortSelect, selectedCohort }: CohortTreemapProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Get data for the selected journey
    const journeyData = cohortData[journeyId as keyof typeof cohortData] || []
    setData(flattenData(journeyData))
  }, [journeyId])

  return (
    <div className="w-full h-[400px] overflow-hidden">
      <CustomTreemap
        data={data}
        onItemClick={onCohortSelect}
        selectedItemId={selectedCohort}
        colors={COLORS}
        className="h-full"
      />
    </div>
  )
}
