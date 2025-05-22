"use client";

import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, TrendingUp, Activity, Building, Globe, UserMinus } from 'lucide-react';

// Sample data for charts
const populationData = [
  { month: 'Jan', targetSize: 10000, acquired: 3000, activated: 1800, retained: 1500 },
  { month: 'Feb', targetSize: 10200, acquired: 3200, activated: 2000, retained: 1700 },
  { month: 'Mar', targetSize: 10400, acquired: 3500, activated: 2200, retained: 1900 },
  { month: 'Apr', targetSize: 10600, acquired: 3800, activated: 2400, retained: 2100 },
  { month: 'May', targetSize: 10800, acquired: 4100, activated: 2600, retained: 2300 },
  { month: 'Jun', targetSize: 11000, acquired: 4400, activated: 2900, retained: 2600 }
];

const percentageData = populationData.map(item => ({
  month: item.month,
  acquired: (item.acquired / item.targetSize) * 100,
  activated: (item.activated / item.acquired) * 100,
  retained: (item.retained / item.activated) * 100,
  churned: 100 - ((item.retained / item.activated) * 100)
}));

const employerData = [
  { 
    name: "Acme Corporation", 
    members: 5240, 
    growth: 3.2, 
    dataCompleteness: 92,
    costPerMember: 7845,
    engagementRate: 68,
    topConditions: ["Hypertension", "Diabetes"]
  },
  { 
    name: "Global Health Inc", 
    members: 2180, 
    growth: -1.5,
    dataCompleteness: 85,
    costPerMember: 8200,
    engagementRate: 62,
    topConditions: ["Hypertension", "Obesity"]
  },
  { 
    name: "Midwest Manufacturing", 
    members: 4750, 
    growth: 5.4, 
    dataCompleteness: 78,
    costPerMember: 7200,
    engagementRate: 71,
    topConditions: ["Diabetes", "COPD"]
  }
];

// All population data (aggregated)
const allPopulationData = {
  name: "All Population",
  members: 15850,
  growth: 2.8,
  costPerMember: 7650,
  engagementRate: 67,
  topConditions: ["Hypertension", "Diabetes", "Obesity"]
};

// Non-employer population data
const nonEmployerData = {
  name: "Non-Employer Population", 
  members: 3680,
  growth: 8.5,
  costPerMember: 8950,
  engagementRate: 58,
  topConditions: ["Hypertension", "Depression", "Diabetes"]
};

const conditionPrevalenceData = [
  { name: "Hypertension", value: 28 },
  { name: "Hyperlipidemia", value: 22 },
  { name: "Obesity", value: 20 },
  { name: "Type 2 Diabetes", value: 18 },
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
  { name: "Poor Nutrition", value: 36 },
  { name: "High Stress", value: 29 },
  { name: "Tobacco Use", value: 22 }
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

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const PopulationInsights = () => {
  const [selectedPopulation, setSelectedPopulation] = useState('All Population');
  
  const getSelectedData = () => {
    if (selectedPopulation === 'All Population') {
      return allPopulationData;
    } else if (selectedPopulation === 'Non-Employer Population') {
      return nonEmployerData;
    } else {
      return employerData.find(emp => emp.name === selectedPopulation);
    }
  };

  const selectedData = getSelectedData();

  const getPopulationIcon = () => {
    if (selectedPopulation === 'All Population') {
      return <Globe className="h-5 w-5 text-blue-600" />;
    } else if (selectedPopulation === 'Non-Employer Population') {
      return <UserMinus className="h-5 w-5 text-purple-600" />;
    } else {
      return <Building className="h-5 w-5 text-green-600" />;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Population Insights</h2>
      </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <span className="text-sm text-gray-500">Last updated: May 20, 2025</span>
              <div className="flex items-center space-x-2">
                {getPopulationIcon()}
                <select 
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={selectedPopulation}
                  onChange={(e) => setSelectedPopulation(e.target.value)}
                >
                  <option value="All Population">All Population</option>
                  <option value="Non-Employer Population">Non-Employer Population</option>
                  <optgroup label="Employer Groups">
                    {employerData.map(emp => (
                      <option key={emp.name} value={emp.name}>{emp.name}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Overview Metrics */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            {getPopulationIcon()}
            <h2 className="text-xl font-semibold text-gray-900">{selectedPopulation} Overview</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Population</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{selectedData?.members.toLocaleString()}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {typeof selectedData?.growth === 'number' ? (
                  <span className={`text-sm font-medium flex items-center ${selectedData.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {selectedData.growth >= 0 ? '+' : ''}
                    {selectedData.growth}% vs last year
                  </span>
                ) : (
                  <span className="text-sm font-medium flex items-center text-gray-400">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    N/A vs last year
                  </span>
                )}
              </div>
            </div>
        
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Cost per Member</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">${selectedData?.costPerMember.toLocaleString()}</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <Activity className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm font-medium text-red-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +5.4% vs last year
                </span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Engagement Rate</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{selectedData?.engagementRate}%</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm font-medium text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12% vs industry avg
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Population Funnel Analysis */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Population Funnel Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Current Funnel Performance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={[
                      {name: 'Target Population', value: 11000},
                      {name: 'Acquired Members', value: 4400},
                      {name: 'Activated Members', value: 2900},
                      {name: 'Retained Members', value: 2600}
                    ]}
                    margin={{top: 5, right: 30, left: 100, bottom: 5}}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={90} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Funnel Performance Trends</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={percentageData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="acquired" stroke="#3b82f6" name="% Acquired" strokeWidth={3} dot={{ r: 6 }} />
                    <Line type="monotone" dataKey="activated" stroke="#10b981" name="% Activated" strokeWidth={3} dot={{ r: 6 }} />
                    <Line type="monotone" dataKey="retained" stroke="#f59e0b" name="% Retained" strokeWidth={3} dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Demographics & Health Profile */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Demographics & Health Profile</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Age Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demographicData.age}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {demographicData.age.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Top Health Conditions</h3>
              <div className="space-y-4">
                {conditionPrevalenceData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-36 text-sm font-medium text-gray-700">{item.name}</div>
                    <div className="flex-1 mx-4">
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500" 
                          style={{ width: `${(item.value / 30) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-sm font-semibold text-gray-900 text-right">{item.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Risk Factors Analysis */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Risk Factors Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Clinical Risk Factors</h3>
              <div className="space-y-4">
                {clinicalFactorsData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-44 text-sm font-medium text-gray-700">{item.name}</div>
                    <div className="flex-1 mx-4">
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500" 
                          style={{ width: `${(item.value / 50) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-sm font-semibold text-gray-900 text-right">{item.value}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Behavioral Risk Factors</h3>
              <div className="space-y-4">
                {behavioralFactorsData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-44 text-sm font-medium text-gray-700">{item.name}</div>
                    <div className="flex-1 mx-4">
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500" 
                          style={{ width: `${(item.value / 50) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-sm font-semibold text-gray-900 text-right">{item.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Care Gap Analysis */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Care Gap Analysis</h2>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-6">Percentage of {selectedPopulation} members with care gaps</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {careGapData.map((item, index) => (
                <div key={index} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-24 h-24 relative mb-4">
                    <svg viewBox="0 0 36 36" className="w-24 h-24 transform -rotate-90">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
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
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-900">{item.value}%</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-center text-gray-700">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default PopulationInsights;