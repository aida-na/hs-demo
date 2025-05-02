'use client';

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Data Completeness by Source Chart
export function DataCompletenessBySourceChart(): JSX.Element {
  const dataQualityBySourceData = [
    { name: "Demographics", complete: 95, incomplete: 5 },
    { name: "Claims", complete: 85, incomplete: 15 },
    { name: "Clinical", complete: 72, incomplete: 28 },
    { name: "Engagement", complete: 65, incomplete: 35 },
    { name: "SDOH", complete: 58, incomplete: 42 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={dataQualityBySourceData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis dataKey="name" type="category" />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Bar dataKey="complete" stackId="a" fill="#86efac" name="Complete" />
        <Bar dataKey="incomplete" stackId="a" fill="#fca5a5" name="Incomplete" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

// Identity Resolution Chart
export function IdentityResolutionChart(): JSX.Element {
  const identityResolutionData = [
    { name: "Exact Match", value: 75 },
    { name: "Fuzzy Match", value: 18 },
    { name: "Partial Match", value: 5 },
    { name: "No Match", value: 2 },
  ];

  const COLORS = ['#86efac', '#93c5fd', '#fde68a', '#fca5a5'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={identityResolutionData}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {identityResolutionData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

// Condition Prevalence Chart
export function ConditionPrevalenceChart(): JSX.Element {
  const conditionPrevalenceData = [
    { name: "Type 2 Diabetes", value: 18 },
    { name: "Hypertension", value: 28 },
    { name: "Hyperlipidemia", value: 22 },
    { name: "Obesity", value: 20 },
    { name: "Depression", value: 15 },
    { name: "Asthma", value: 12 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={conditionPrevalenceData}
        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          angle={-45} 
          textAnchor="end" 
          height={70} 
        />
        <YAxis label={{ value: 'Prevalence (%)', angle: -90, position: 'insideLeft' }} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Bar dataKey="value" fill="#8884d8" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

// Demographics Chart
export function DemographicsChart(): JSX.Element {
  // Sample data for age and gender distribution
  const demographicsData = [
    { name: "18-24", male: 3.2, female: 3.8 },
    { name: "25-34", male: 7.1, female: 7.5 },
    { name: "35-44", male: 10.2, female: 10.6 },
    { name: "45-54", male: 13.5, female: 14.1 },
    { name: "55-64", male: 17.8, female: 18.3 },
    { name: "65-74", male: 11.3, female: 12.5 },
    { name: "75+", male: 8.2, female: 9.7 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={demographicsData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Bar dataKey="male" fill="#60a5fa" name="Male" />
        <Bar dataKey="female" fill="#f472b6" name="Female" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

// This component is for demonstration purposes - shows all four charts
export default function ChartDashboard(): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="h-80 border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Data Completeness by Source</h3>
        <DataCompletenessBySourceChart />
      </div>
      <div className="h-80 border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Identity Resolution</h3>
        <IdentityResolutionChart />
      </div>
      <div className="h-80 border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Condition Prevalence</h3>
        <ConditionPrevalenceChart />
      </div>
      <div className="h-80 border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Demographics</h3>
        <DemographicsChart />
      </div>
    </div>
  );
}