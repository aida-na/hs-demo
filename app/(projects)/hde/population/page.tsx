"use client";

import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Users, TrendingUp, Activity, Building, Globe, UserMinus, Search, ChevronDown, MapPin, Mail, MessageSquare, Phone, FileText, Home, DollarSign, GraduationCap, Car, Calendar, Filter } from 'lucide-react';

// Simplified current quarter data only
const currentQuarterData = {
  populationData: [
    { month: 'Jan', targetSize: 15500, acquired: 4200, activated: 2800, retained: 2400 },
    { month: 'Feb', targetSize: 15650, acquired: 4500, activated: 3000, retained: 2600 },
    { month: 'Mar', targetSize: 15850, acquired: 4800, activated: 3200, retained: 2800 }
  ],
  funnelData: [
    { stage: 'Target Population', value: 15850, percentage: 100, conversionRate: 30, color: '#e5e7eb', textColor: '#6b7280' },
    { stage: 'Acquired Members', value: 4800, percentage: 30, conversionRate: 67, color: '#3b82f6', textColor: '#ffffff' },
    { stage: 'Activated Members', value: 3200, percentage: 67, conversionRate: 88, color: '#10b981', textColor: '#ffffff' },
    { stage: 'Retained Members', value: 2800, percentage: 88, conversionRate: null, color: '#f59e0b', textColor: '#ffffff' }
  ]
};

// Simplified SDOH data (current only)
const sdohData = [
  { factor: 'Food Insecurity', prevalence: 18, risk: 'High', color: '#ef4444' },
  { factor: 'Transportation Barriers', prevalence: 22, risk: 'High', color: '#f97316' },
  { factor: 'Housing Instability', prevalence: 15, risk: 'Medium', color: '#eab308' },
  { factor: 'Social Isolation', prevalence: 28, risk: 'High', color: '#8b5cf6' },
  { factor: 'Economic Hardship', prevalence: 25, risk: 'High', color: '#ec4899' },
  { factor: 'Educational Barriers', prevalence: 12, risk: 'Medium', color: '#06b6d4' }
];

// Simplified engagement channels data (current only) - more realistic conversion ratios
const engagementChannelsData = [
  { 
    channel: 'Email', 
    sent: 125000, 
    delivered: 118750, 
    opened: 47500, 
    clicked: 3800, 
    conversionRatio: 3.0, // clicked/sent percentage - more realistic
    icon: Mail,
    color: '#3b82f6'
  },
  { 
    channel: 'Text Message', 
    sent: 95000, 
    delivered: 92150, 
    opened: 73720, 
    clicked: 4750, 
    conversionRatio: 5.0, // clicked/sent percentage - more realistic  
    icon: MessageSquare,
    color: '#10b981'
  },
  { 
    channel: 'Direct Mail', 
    sent: 45000, 
    delivered: 43200, 
    opened: 12960, 
    clicked: 1350, 
    conversionRatio: 3.0, // clicked/sent percentage - more realistic
    icon: FileText,
    color: '#f59e0b'
  },
  { 
    channel: 'Phone Calls', 
    sent: 25000, 
    delivered: 18750, 
    opened: 15000, 
    clicked: 3750, 
    conversionRatio: 15.0, // clicked/sent percentage - more realistic
    icon: Phone,
    color: '#8b5cf6'
  }
];

// Top 10 most popular locations
const popularLocations = [
  { location: 'Los Angeles, CA', members: 1240, rank: 1, growth: 6.2 },
  { location: 'Houston, TX', members: 980, rank: 2, growth: 4.8 },
  { location: 'Miami, FL', members: 850, rank: 3, growth: 8.1 },
  { location: 'Chicago, IL', members: 720, rank: 4, growth: 2.5 },
  { location: 'Phoenix, AZ', members: 680, rank: 5, growth: 7.3 },
  { location: 'Philadelphia, PA', members: 620, rank: 6, growth: 3.9 },
  { location: 'San Antonio, TX', members: 580, rank: 7, growth: 5.1 },
  { location: 'San Diego, CA', members: 540, rank: 8, growth: 6.8 },
  { location: 'Dallas, TX', members: 520, rank: 9, growth: 4.2 },
  { location: 'San Jose, CA', members: 480, rank: 10, growth: 9.1 }
];

// Simplified condition prevalence data (current only)
const conditionPrevalenceData = [
  { name: "Hypertension", value: 28, color: '#ef4444' },
  { name: "Hyperlipidemia", value: 22, color: '#f97316' },
  { name: "Obesity", value: 20, color: '#eab308' },
  { name: "Type 2 Diabetes", value: 18, color: '#22c55e' },
  { name: "Depression", value: 15, color: '#3b82f6' },
  { name: "Asthma", value: 12, color: '#8b5cf6' }
];

// Reduced to 3 main employer groups with realistic engagement rates
const employerData = [
  { 
    name: "Acme Corporation", 
    members: 5240, 
    growth: 3.2, 
    dataCompleteness: 92, 
    costPerMember: 7845, 
    engagementRate: 48, // More realistic
    industry: "Technology",
    topConditions: ["Hypertension", "Diabetes"] 
  },
  { 
    name: "Global Health Inc", 
    members: 2180, 
    growth: -1.5, 
    dataCompleteness: 85, 
    costPerMember: 8200, 
    engagementRate: 35, // More realistic
    industry: "Healthcare",
    topConditions: ["Hypertension", "Obesity"] 
  },
  { 
    name: "Midwest Manufacturing", 
    members: 4750, 
    growth: 5.4, 
    dataCompleteness: 78, 
    costPerMember: 7200, 
    engagementRate: 52, // More realistic
    industry: "Manufacturing",
    topConditions: ["Diabetes", "COPD"] 
  }
];

const allPopulationData = {
  name: "All Population",
  members: 15850,
  growth: 2.8,
  costPerMember: 7650,
  engagementRate: 42, // Lower, more realistic engagement rate
  topConditions: ["Hypertension", "Diabetes", "Obesity"]
};

const nonEmployerData = {
  name: "Non-Employer Population", 
  members: 3680,
  growth: 8.5,
  costPerMember: 8950,
  engagementRate: 38, // Lower, more realistic engagement rate
  topConditions: ["Hypertension", "Depression", "Diabetes"]
};

const demographicData = {
  age: [
    { name: "18-24", value: 8, color: '#3b82f6' },
    { name: "25-34", value: 22, color: '#10b981' },
    { name: "35-44", value: 27, color: '#f59e0b' },
    { name: "45-54", value: 20, color: '#ef4444' },
    { name: "55-64", value: 18, color: '#8b5cf6' },
    { name: "65+", value: 5, color: '#06b6d4' }
  ]
};

// Sidebar Component for Employer Selection
const EmployerSidebar = ({ 
  selectedPopulation, 
  setSelectedPopulation 
}: {
  selectedPopulation: string;
  setSelectedPopulation: (population: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  const industries = useMemo(() => {
    const uniqueIndustries = Array.from(
      new Set(employerData.map(emp => emp.industry))
    );
    return ['All', ...uniqueIndustries];
  }, []);
  
  const filteredEmployers = useMemo(() => {
    return employerData.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = selectedIndustry === 'All' || emp.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [searchTerm, selectedIndustry]);

  const handleSelect = (value: string) => {
    setSelectedPopulation(value);
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Population Groups</h2>
        <p className="text-sm text-gray-600">Select a population group to analyze</p>
      </div>

      {/* Search and Filter */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search employers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1"
          >
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Population Options */}
      <div className="p-2">
        {/* All Population */}
        <div
          onClick={() => handleSelect('All Population')}
          className={`p-4 rounded-lg cursor-pointer mb-2 transition-all duration-200 hover:bg-gray-50 ${
            selectedPopulation === 'All Population' 
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-sm' 
              : 'border-2 border-transparent'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              selectedPopulation === 'All Population' ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <Globe className={`h-5 w-5 ${
                selectedPopulation === 'All Population' ? 'text-blue-600' : 'text-gray-600'
              }`} />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">All Population</div>
              <div className="text-sm text-gray-500">Complete member base</div>
            </div>
            {selectedPopulation === 'All Population' && (
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            )}
          </div>
        </div>

        {/* Non-Employer Population */}
        <div
          onClick={() => handleSelect('Non-Employer Population')}
          className={`p-4 rounded-lg cursor-pointer mb-2 transition-all duration-200 hover:bg-gray-50 ${
            selectedPopulation === 'Non-Employer Population' 
              ? 'bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-200 shadow-sm' 
              : 'border-2 border-transparent'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              selectedPopulation === 'Non-Employer Population' ? 'bg-purple-100' : 'bg-gray-100'
            }`}>
              <UserMinus className={`h-5 w-5 ${
                selectedPopulation === 'Non-Employer Population' ? 'text-purple-600' : 'text-gray-600'
              }`} />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Non-Employer Population</div>
              <div className="text-sm text-gray-500">Individual members</div>
            </div>
            {selectedPopulation === 'Non-Employer Population' && (
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            )}
          </div>
        </div>

        {/* Employers */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 px-2 py-1">Employers</h3>
          {filteredEmployers.map(emp => (
            <div
              key={emp.name}
              onClick={() => handleSelect(emp.name)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                selectedPopulation === emp.name 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 shadow-sm' 
                  : 'border-2 border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  selectedPopulation === emp.name ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Building className={`h-5 w-5 ${
                    selectedPopulation === emp.name ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">{emp.name}</div>
                  <div className="text-sm text-gray-500">{emp.industry}</div>
                  <div className="text-xs text-gray-400">{emp.members.toLocaleString()} members</div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  {selectedPopulation === emp.name && (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    emp.growth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {emp.growth >= 0 ? '+' : ''}{emp.growth}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Quarter selector component (UI only, no actual data switching)
const QuarterSelector = ({ 
  selectedQuarter, 
  setSelectedQuarter
}: {
  selectedQuarter: string;
  setSelectedQuarter: (quarter: string) => void;
}) => {
  const quarters = ['Q1 2025', 'Q4 2024', 'Q3 2024'];
  
  return (
    <div className="flex items-center space-x-2">
      <Calendar className="h-4 w-4 text-gray-500" />
      <span className="text-sm text-gray-600">Quarter:</span>
      <select
        value={selectedQuarter}
        onChange={(e) => setSelectedQuarter(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {quarters.map(quarter => (
          <option key={quarter} value={quarter}>{quarter}</option>
        ))}
      </select>
    </div>
  );
};
const EmployerDropdown = ({ 
  selectedPopulation, 
  setSelectedPopulation 
}: {
  selectedPopulation: string;
  setSelectedPopulation: (population: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedPopulation(value);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white shadow-sm hover:border-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-64 relative z-50"
      >
        <span className="truncate">{selectedPopulation}</span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-12 left-0 w-96 bg-white border border-gray-200 rounded-lg shadow-2xl z-[9999] max-h-96">
            <div className="max-h-64 overflow-y-auto">
              <div
                onClick={() => handleSelect('All Population')}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${selectedPopulation === 'All Population' ? 'bg-indigo-50 text-indigo-700' : ''}`}
              >
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span className="font-medium">All Population</span>
                </div>
              </div>
              
              <div
                onClick={() => handleSelect('Non-Employer Population')}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${selectedPopulation === 'Non-Employer Population' ? 'bg-indigo-50 text-indigo-700' : ''}`}
              >
                <div className="flex items-center space-x-2">
                  <UserMinus className="h-4 w-4" />
                  <span className="font-medium">Non-Employer Population</span>
                </div>
              </div>
              
              {employerData.map(emp => (
                <div
                  key={emp.name}
                  onClick={() => handleSelect(emp.name)}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${selectedPopulation === emp.name ? 'bg-indigo-50 text-indigo-700' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{emp.name}</div>
                        <div className="text-xs text-gray-500">{emp.industry} • {emp.members.toLocaleString()} members</div>
                      </div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${emp.growth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {emp.growth >= 0 ? '+' : ''}{emp.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Simplified Funnel Component (no quarter comparison)
const FunnelChart = () => {
  return (
    <div className="space-y-4">
      {currentQuarterData.funnelData.map((stage, index) => (
        <div key={stage.stage} className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{stage.value.toLocaleString()} people</span>
              {stage.conversionRate && index > 0 && (
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {stage.conversionRate}% conversion
                </span>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="h-12 bg-gray-100 rounded-lg overflow-hidden">
              <div 
                className="h-full rounded-lg transition-all duration-1000 ease-out flex items-center justify-between px-4"
                style={{ 
                  width: `${stage.percentage}%`,
                  backgroundColor: stage.color,
                  color: stage.textColor
                }}
              >
                <span className="font-semibold">{stage.percentage}%</span>
                <span className="text-sm">{stage.value.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const PopulationInsights = () => {
  const [selectedPopulation, setSelectedPopulation] = useState('All Population');
  const [selectedQuarter, setSelectedQuarter] = useState('Q1 2025');
  
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
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b backdrop-blur-sm bg-white/95">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Population Insights
              </h1>
              <div className="mt-4 sm:mt-0">
                <QuarterSelector 
                  selectedQuarter={selectedQuarter}
                  setSelectedQuarter={setSelectedQuarter}
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          
          {/* Overview Metrics */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-6">
              {getPopulationIcon()}
              <h2 className="text-2xl font-bold text-gray-900">{selectedPopulation} Overview</h2>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Population</p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">{selectedData?.members.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium flex items-center px-3 py-1 rounded-full ${
                  selectedData?.growth && selectedData.growth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {selectedData?.growth && selectedData.growth >= 0 ? '+' : ''}{selectedData?.growth || 0}% growth
                </span>
              </div>
            </div>
        
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cost per Member</p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">${selectedData?.costPerMember.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-xl shadow-lg">
                  <Activity className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">{selectedData?.engagementRate}%</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl shadow-lg">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Population Funnel Analysis */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Population Funnel Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Conversion Funnel</h3>
              <FunnelChart />
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Monthly Trends</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentQuarterData.populationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
                      }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="acquired" stroke="#3b82f6" strokeWidth={3} name="Acquired" />
                    <Line type="monotone" dataKey="activated" stroke="#10b981" strokeWidth={3} name="Activated" />
                    <Line type="monotone" dataKey="retained" stroke="#f59e0b" strokeWidth={3} name="Retained" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Channels Analysis */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Engagement Channels Performance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Channel Effectiveness</h3>
              <div className="space-y-4">
                {engagementChannelsData.map((channel, index) => {
                  const Icon = channel.icon;
                  return (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: `${channel.color}20` }}>
                            <Icon className="h-5 w-5" style={{ color: channel.color }} />
                          </div>
                          <h4 className="font-medium text-gray-900">{channel.channel}</h4>
                        </div>
                        <span className="text-sm text-gray-500">{channel.sent.toLocaleString()} sent</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Conversion Rate</span>
                            <span className="text-sm font-medium">{channel.conversionRatio}%</span>
                          </div>
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-1000 ease-out"
                              style={{ 
                                width: `${(channel.conversionRatio / 50) * 100}%`,
                                backgroundColor: channel.color
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <div className="text-2xl font-bold text-gray-900">{channel.clicked.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">conversions</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Conversion Rate Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementChannelsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="channel" stroke="#64748b" />
                    <YAxis stroke="#64748b" label={{ value: 'Conversion Rate (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
                      }}
                      formatter={(value) => [`${value}%`, 'Conversion Rate']}
                    />
                    <Bar 
                      dataKey="conversionRatio" 
                      fill="#3b82f6" 
                      name="Conversion Rate %" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* SDOH and Geographic Distribution */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Social Determinants of Health</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={sdohData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="factor" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis tick={{ fontSize: 10 }} />
                    <Radar 
                      name="Prevalence" 
                      dataKey="prevalence" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
                      }} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
              <div className="flex items-center space-x-2 mb-6">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Top 10 Most Popular Locations</h3>
              </div>
              <div className="space-y-3">
                {popularLocations.map((location, index) => (
                  <div key={location.location} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                        location.rank <= 3 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                        location.rank <= 6 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                        'bg-gradient-to-r from-orange-400 to-orange-600'
                      }`}>
                        {location.rank}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{location.location}</div>
                        <div className="text-sm text-gray-500">{location.members.toLocaleString()} members</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        location.growth >= 7 ? 'bg-green-100 text-green-700' :
                        location.growth >= 4 ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        +{location.growth}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Demographics & Health Profile */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Demographics & Health Profile</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Age Distribution</h3>
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
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Top Health Conditions</h3>
              <div className="space-y-4">
                {conditionPrevalenceData.map((item, index) => (
                  <div key={index} className="flex items-center p-2 rounded-lg transition-colors">
                    <div className="w-36 text-sm font-medium text-gray-700">{item.name}</div>
                    <div className="flex-1 mx-4">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${(item.value / 30) * 100}%`,
                            backgroundColor: item.color
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Growth Opportunity</h3>
              </div>
              <p className="text-blue-100 text-sm mb-4">
                30% acquisition rate shows good market penetration. Focus on activation improvements.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold">+12%</div>
                <div className="text-xs text-blue-200">Potential activation increase</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white shadow-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Activity className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Health Focus</h3>
              </div>
              <p className="text-green-100 text-sm mb-4">
                Hypertension affects 28% of population. Targeted programs could reduce costs significantly.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold">$1.2M</div>
                <div className="text-xs text-green-200">Potential annual savings</div>
              </div>
            </div>
          </div>
        </div>
        </main>
      </div>
      
      {/* Sidebar - Right Side */}
      <EmployerSidebar 
        selectedPopulation={selectedPopulation}
        setSelectedPopulation={setSelectedPopulation}
      />
    </div>
  );
};

export default PopulationInsights;