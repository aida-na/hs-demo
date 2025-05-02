// Population Metrics Configuration
export interface PopulationMetric {
  id: number;
  name: string;
  value: string;
  change: string;
}

export interface EnterpriseClient {
  id: string;
  name: string;
  metrics: PopulationMetric[];
  healthFactors: ClinicalFactor[];
  demographics: DemographicData[];
  stateDistribution: StateDistribution;
}

export const enterpriseClients: EnterpriseClient[] = [
  {
    id: 'all',
    name: 'All Clients',
    metrics: [
      { id: 1, name: 'Total Population', value: '125,000', change: '+5.2%' },
      { id: 2, name: 'Average Age', value: '42', change: '+0.8%' },
      { id: 3, name: 'Female', value: '52%', change: '+0.3%' },
      { id: 4, name: 'Male', value: '48%', change: '-0.3%' },
    ],
    healthFactors: [
      { id: 1, name: 'Type 2 Diabetes', count: 15000, trend: '+2.1%', category: 'clinical' },
      { id: 2, name: 'Hypertension', count: 28000, trend: '+1.8%', category: 'clinical' },
      { id: 3, name: 'Heart Disease', count: 18000, trend: '+1.5%', category: 'clinical' },
      { id: 4, name: 'COPD', count: 9000, trend: '+1.2%', category: 'clinical' },
      { id: 5, name: 'Chronic Kidney Disease', count: 7500, trend: '+1.7%', category: 'clinical' },
      { id: 6, name: 'Obesity', count: 22000, trend: '+3.2%', category: 'behavioral' },
      { id: 7, name: 'Smoking', count: 16000, trend: '-1.5%', category: 'behavioral' },
      { id: 8, name: 'Physical Inactivity', count: 31000, trend: '+2.8%', category: 'behavioral' },
      { id: 9, name: 'Poor Nutrition', count: 25000, trend: '+2.1%', category: 'behavioral' },
      { id: 10, name: 'Excessive Alcohol Use', count: 8500, trend: '-0.8%', category: 'behavioral' }
    ],
    demographics: [
      { name: '18-30 years', value: 25 },
      { name: '31-50 years', value: 45 },
      { name: '51-70 years', value: 22 },
      { name: '70+ years', value: 8 }
    ],
    stateDistribution: {
      "CA": 0.65, "NY": 0.55, "TX": 0.45, "FL": 0.40, "IL": 0.35,
      "PA": 0.30, "OH": 0.25, "GA": 0.35, "NC": 0.30, "MI": 0.25,
      "NJ": 0.40, "VA": 0.35, "WA": 0.30, "AZ": 0.35, "MA": 0.30,
      "TN": 0.25, "IN": 0.20, "MO": 0.20, "MD": 0.25, "WI": 0.20
    }
  },
  {
    id: 'client1',
    name: 'Healthcare Plus',
    metrics: [
      { id: 1, name: 'Total Population', value: '45,000', change: '+3.8%' },
      { id: 2, name: 'Average Age', value: '39', change: '+0.5%' },
      { id: 3, name: 'Female', value: '54%', change: '+0.6%' },
      { id: 4, name: 'Male', value: '46%', change: '-0.6%' },
    ],
    healthFactors: [
      { id: 1, name: 'Type 2 Diabetes', count: 5200, trend: '+1.8%', category: 'clinical' },
      { id: 2, name: 'Hypertension', count: 9800, trend: '+1.5%', category: 'clinical' },
      { id: 3, name: 'Heart Disease', count: 6200, trend: '+1.2%', category: 'clinical' },
      { id: 4, name: 'COPD', count: 3100, trend: '+1.0%', category: 'clinical' },
      { id: 5, name: 'Chronic Kidney Disease', count: 2600, trend: '+1.4%', category: 'clinical' },
      { id: 6, name: 'Obesity', count: 7800, trend: '+2.8%', category: 'behavioral' },
      { id: 7, name: 'Smoking', count: 5600, trend: '-1.2%', category: 'behavioral' },
      { id: 8, name: 'Physical Inactivity', count: 11000, trend: '+2.5%', category: 'behavioral' },
      { id: 9, name: 'Poor Nutrition', count: 8800, trend: '+1.9%', category: 'behavioral' },
      { id: 10, name: 'Excessive Alcohol Use', count: 2900, trend: '-0.6%', category: 'behavioral' }
    ],
    demographics: [
      { name: '18-30 years', value: 30 },
      { name: '31-50 years', value: 40 },
      { name: '51-70 years', value: 20 },
      { name: '70+ years', value: 10 }
    ],
    stateDistribution: {
      "CA": 0.70, "NY": 0.50, "TX": 0.40, "FL": 0.35, "IL": 0.30
    }
  },
  {
    id: 'client2',
    name: 'MedCare Solutions',
    metrics: [
      { id: 1, name: 'Total Population', value: '28,000', change: '+4.2%' },
      { id: 2, name: 'Average Age', value: '45', change: '+1.1%' },
      { id: 3, name: 'Female', value: '51%', change: '+0.2%' },
      { id: 4, name: 'Male', value: '49%', change: '-0.2%' },
    ],
    healthFactors: [
      { id: 1, name: 'Type 2 Diabetes', count: 3400, trend: '+2.3%', category: 'clinical' },
      { id: 2, name: 'Hypertension', count: 6200, trend: '+1.9%', category: 'clinical' },
      { id: 3, name: 'Heart Disease', count: 4100, trend: '+1.6%', category: 'clinical' },
      { id: 4, name: 'COPD', count: 2000, trend: '+1.3%', category: 'clinical' },
      { id: 5, name: 'Chronic Kidney Disease', count: 1700, trend: '+1.8%', category: 'clinical' },
      { id: 6, name: 'Obesity', count: 4900, trend: '+3.4%', category: 'behavioral' },
      { id: 7, name: 'Smoking', count: 3600, trend: '-1.7%', category: 'behavioral' },
      { id: 8, name: 'Physical Inactivity', count: 7000, trend: '+3.0%', category: 'behavioral' },
      { id: 9, name: 'Poor Nutrition', count: 5600, trend: '+2.3%', category: 'behavioral' },
      { id: 10, name: 'Excessive Alcohol Use', count: 1900, trend: '-0.9%', category: 'behavioral' }
    ],
    demographics: [
      { name: '18-30 years', value: 20 },
      { name: '31-50 years', value: 48 },
      { name: '51-70 years', value: 25 },
      { name: '70+ years', value: 7 }
    ],
    stateDistribution: {
      "NY": 0.60, "NJ": 0.45, "PA": 0.35, "MA": 0.30, "CT": 0.25
    }
  },
  {
    id: 'client3',
    name: 'Wellness Network',
    metrics: [
      { id: 1, name: 'Total Population', value: '32,000', change: '+5.5%' },
      { id: 2, name: 'Average Age', value: '41', change: '+0.7%' },
      { id: 3, name: 'Female', value: '53%', change: '+0.4%' },
      { id: 4, name: 'Male', value: '47%', change: '-0.4%' },
    ],
    healthFactors: [
      { id: 1, name: 'Type 2 Diabetes', count: 3800, trend: '+2.0%', category: 'clinical' },
      { id: 2, name: 'Hypertension', count: 7100, trend: '+1.7%', category: 'clinical' },
      { id: 3, name: 'Heart Disease', count: 4600, trend: '+1.4%', category: 'clinical' },
      { id: 4, name: 'COPD', count: 2300, trend: '+1.1%', category: 'clinical' },
      { id: 5, name: 'Chronic Kidney Disease', count: 1900, trend: '+1.6%', category: 'clinical' },
      { id: 6, name: 'Obesity', count: 5600, trend: '+3.1%', category: 'behavioral' },
      { id: 7, name: 'Smoking', count: 4100, trend: '-1.4%', category: 'behavioral' },
      { id: 8, name: 'Physical Inactivity', count: 7900, trend: '+2.7%', category: 'behavioral' },
      { id: 9, name: 'Poor Nutrition', count: 6400, trend: '+2.0%', category: 'behavioral' },
      { id: 10, name: 'Excessive Alcohol Use', count: 2200, trend: '-0.7%', category: 'behavioral' }
    ],
    demographics: [
      { name: '18-30 years', value: 28 },
      { name: '31-50 years', value: 42 },
      { name: '51-70 years', value: 23 },
      { name: '70+ years', value: 7 }
    ],
    stateDistribution: {
      "TX": 0.55, "FL": 0.45, "GA": 0.40, "NC": 0.35, "TN": 0.30
    }
  },
  {
    id: 'client4',
    name: 'Pacific Health',
    metrics: [
      { id: 1, name: 'Total Population', value: '20,000', change: '+4.8%' },
      { id: 2, name: 'Average Age', value: '43', change: '+0.9%' },
      { id: 3, name: 'Female', value: '50%', change: '+0.1%' },
      { id: 4, name: 'Male', value: '50%', change: '-0.1%' },
    ],
    healthFactors: [
      { id: 1, name: 'Type 2 Diabetes', count: 2600, trend: '+2.2%', category: 'clinical' },
      { id: 2, name: 'Hypertension', count: 4900, trend: '+1.6%', category: 'clinical' },
      { id: 3, name: 'Heart Disease', count: 3100, trend: '+1.3%', category: 'clinical' },
      { id: 4, name: 'COPD', count: 1600, trend: '+1.0%', category: 'clinical' },
      { id: 5, name: 'Chronic Kidney Disease', count: 1300, trend: '+1.5%', category: 'clinical' },
      { id: 6, name: 'Obesity', count: 3700, trend: '+3.3%', category: 'behavioral' },
      { id: 7, name: 'Smoking', count: 2800, trend: '-1.6%', category: 'behavioral' },
      { id: 8, name: 'Physical Inactivity', count: 5100, trend: '+2.9%', category: 'behavioral' },
      { id: 9, name: 'Poor Nutrition', count: 4200, trend: '+2.2%', category: 'behavioral' },
      { id: 10, name: 'Excessive Alcohol Use', count: 1500, trend: '-0.8%', category: 'behavioral' }
    ],
    demographics: [
      { name: '18-30 years', value: 23 },
      { name: '31-50 years', value: 44 },
      { name: '51-70 years', value: 24 },
      { name: '70+ years', value: 9 }
    ],
    stateDistribution: {
      "CA": 0.75, "WA": 0.50, "OR": 0.45, "NV": 0.35, "AZ": 0.30
    }
  }
];

// Clinical Factors Configuration
export interface ClinicalFactor {
  id: number;
  name: string;
  count: number;
  trend: string;
  category: 'clinical' | 'behavioral';
}

// Demographics Configuration
export interface DemographicData {
  name: string;
  value: number;
}

// Geographic Distribution Configuration
export interface StateDistribution {
  [key: string]: number;
}

// Population Trends Configuration
export interface TrendObservation {
  id: number;
  title: string;
  description: string;
}

export const populationTrends: TrendObservation[] = [
  {
    id: 1,
    title: 'Chronic Condition Management',
    description: 'Increasing prevalence of Type 2 Diabetes in younger demographics, with a 15% rise in early-onset cases.'
  },
  {
    id: 2,
    title: 'Preventive Care Adoption',
    description: '32% increase in preventive care program enrollment, particularly in wellness and screening initiatives.'
  },
  {
    id: 3,
    title: 'Virtual Care Utilization',
    description: '78% growth in virtual care service usage, with high satisfaction rates among remote populations.'
  },
  {
    id: 4,
    title: 'Wellness Engagement',
    description: 'Double-digit growth in wellness program participation, especially in nutrition and physical activity tracking.'
  }
];