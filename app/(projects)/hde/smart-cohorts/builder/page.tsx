"use client";

import { useState, useEffect } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Heart, 
  Activity, 
  Calendar, 
  Users, 
  Mail, 
  Phone, 
  Wallet,
  Home,
  FileText, 
  Plus,
  X,
  Filter,
  Zap,
  Sparkles,
  ChevronRight,
  Download,
  Save,
  Clock,
  Info,
  LucideIcon
} from "lucide-react";

// Define Progress component (missing in original code)
const Progress = ({ value, className }: { value: number, className?: string }) => {
  return (
    <div className={`bg-gray-200 rounded-full ${className}`}>
      <div 
        className="bg-primary rounded-full h-full" 
        style={{ width: `${value}%` }} 
      />
    </div>
  );
};

// Define type interfaces
interface FilterItem {
  id: number;
  category: string;
  field: string;
  operator: string;
  value: string | number | string[] | number[] | boolean;
  display: string;
}

interface SubCategory {
  id: string;
  name: string;
  type: "range" | "select" | "select-multiple" | "text";
  dataElement: string;
  completeness: number;
}

interface FilterOption {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  subCategories: SubCategory[];
}

interface SuggestedAudience {
  name: string;
  description: string;
  estimatedSize: number;
  filters: FilterItem[];
}

interface AiSuggestedAudiences {
  engagement: SuggestedAudience[];
  retention: SuggestedAudience[];
  [key: string]: SuggestedAudience[];
}

interface MetricData {
  estimatedEngagementRate: string;
  estimatedConversionRate: string;
  estimatedResponse: string[];
}

interface FilterOptionProps {
  category: FilterOption;
  subCategory: SubCategory;
  onAdd: (category: string, field: string, operator: string, value: any, display: string) => void;
}

// Audience builder component
export default function AudienceBuilder() {
  // State for audience name and description
  const [audienceName, setAudienceName] = useState<string>("");
  const [audienceDescription, setAudienceDescription] = useState<string>("");
  const [audienceGoal, setAudienceGoal] = useState<string>("engagement");
  
  // State for audience filters
  const [filters, setFilters] = useState<FilterItem[]>([]);
  
  // State for audience size
  const [audienceSize, setAudienceSize] = useState<number>(0);
  const [totalMembers, setTotalMembers] = useState<number>(4235000);
  
  // State for selected filter panel
  const [selectedFilterType, setSelectedFilterType] = useState<FilterOption | null>(null);
  
  // State for filter panels
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);
  
  // State for AI suggestions
  const [showAiSuggestions, setShowAiSuggestions] = useState<boolean>(false);
  
  // State for preview tab
  const [activeTab, setActiveTab] = useState<string>("builder");
  
  // Mock filter options based on data elements
  const filterOptions: FilterOption[] = [
    { 
      id: "demographics", 
      name: "Demographics", 
      description: "Age, gender, location and more",
      icon: Users,
      subCategories: [
        {
          id: "age",
          name: "Age",
          type: "range",
          dataElement: "Date of Birth",
          completeness: 95
        },
        {
          id: "gender",
          name: "Gender",
          type: "select",
          dataElement: "Gender",
          completeness: 99
        },
        {
          id: "zipCode",
          name: "ZIP Code",
          type: "text",
          dataElement: "ZIP Code",
          completeness: 97
        },
        {
          id: "relationshipStatus",
          name: "Relationship Status",
          type: "select",
          dataElement: "Relationship Status",
          completeness: 92
        },
        {
          id: "raceEthnicity",
          name: "Race/Ethnicity",
          type: "select",
          dataElement: "Race/Ethnicity",
          completeness: 65
        }
      ]
    },
    { 
      id: "eligibility", 
      name: "Eligibility", 
      description: "Enrollment status and plan details",
      icon: Calendar,
      subCategories: [
        {
          id: "memberEligibility",
          name: "Member Status",
          type: "select",
          dataElement: "Member Eligibility",
          completeness: 98
        },
        {
          id: "serviceEligibility",
          name: "Service Eligibility",
          type: "select",
          dataElement: "Service Eligibility",
          completeness: 100
        }
      ]
    },
    { 
      id: "health", 
      name: "Health Profile", 
      description: "Conditions, medications and clinical data",
      icon: Activity,
      subCategories: [
        {
          id: "conditions",
          name: "Health Conditions",
          type: "select-multiple",
          dataElement: "Claims Data",
          completeness: 85
        },
        {
          id: "medications",
          name: "Medications",
          type: "select-multiple",
          dataElement: "Medications",
          completeness: 72
        },
        {
          id: "clinicalSignals",
          name: "Clinical Signals",
          type: "range",
          dataElement: "Clinical Signals (BMI, BP)",
          completeness: 58
        }
      ]
    },
    { 
      id: "engagement", 
      name: "Engagement History", 
      description: "Past campaign responses and preferences",
      icon: Mail,
      subCategories: [
        {
          id: "contactInfo",
          name: "Contact Info",
          type: "select-multiple",
          dataElement: "Email Address",
          completeness: 78
        },
        {
          id: "campaignHistory",
          name: "Campaign History",
          type: "select-multiple",
          dataElement: "Marketing Engagement",
          completeness: 45
        }
      ]
    },
    // Add these new filter categories to your filterOptions array

// 1. Behavioral Insights
{ 
    id: "behavioral", 
    name: "Behavioral Insights", 
    description: "Member behaviors, preferences, and lifestyle choices",
    icon: Zap,
    subCategories: [
      {
        id: "digitalPreference",
        name: "Digital Preference",
        type: "select",
        dataElement: "Digital Engagement Patterns",
        completeness: 88
      },
      {
        id: "appUsage",
        name: "Mobile App Usage",
        type: "select",
        dataElement: "App Interaction Data",
        completeness: 76
      },
      {
        id: "communicationFrequency",
        name: "Communication Frequency",
        type: "select",
        dataElement: "Contact Preferences",
        completeness: 92
      },
      {
        id: "responseTime",
        name: "Typical Response Time",
        type: "select",
        dataElement: "Engagement Timing Data",
        completeness: 68
      },
      {
        id: "lifestyleChoices",
        name: "Lifestyle Indicators",
        type: "select-multiple",
        dataElement: "Lifestyle Survey Data",
        completeness: 55
      }
    ]
  },
  
  // 2. Care Management
  { 
    id: "careManagement", 
    name: "Care Management", 
    description: "Program enrollment, provider relationships, and care plans",
    icon: Heart,
    subCategories: [
      {
        id: "programEnrollment",
        name: "Program Enrollment",
        type: "select-multiple",
        dataElement: "Care Program Data",
        completeness: 96
      },
      {
        id: "careTeam",
        name: "Care Team Assignment",
        type: "select",
        dataElement: "Provider Assignment",
        completeness: 93
      },
      {
        id: "riskScore",
        name: "Risk Score",
        type: "range",
        dataElement: "Clinical Risk Assessment",
        completeness: 82
      },
      {
        id: "careGaps",
        name: "Care Gaps",
        type: "select-multiple",
        dataElement: "Quality Measure Compliance",
        completeness: 87
      },
      {
        id: "providerNetwork",
        name: "Provider Network",
        type: "select",
        dataElement: "Network Utilization",
        completeness: 91
      }
    ]
  },
  
  // 3. Service Utilization
  { 
    id: "utilization", 
    name: "Service Utilization", 
    description: "Healthcare service usage patterns and trends",
    icon: Activity,
    subCategories: [
      {
        id: "visitFrequency",
        name: "Visit Frequency",
        type: "range",
        dataElement: "Claims Data - Visit Count",
        completeness: 94
      },
      {
        id: "serviceType",
        name: "Service Type",
        type: "select-multiple",
        dataElement: "Claims Data - Service Types",
        completeness: 96
      },
      {
        id: "emergencyUse",
        name: "Emergency Department Use",
        type: "select",
        dataElement: "ED Utilization",
        completeness: 98
      },
      {
        id: "preventiveServices",
        name: "Preventive Service Usage",
        type: "select",
        dataElement: "Preventive Care Claims",
        completeness: 89
      },
      {
        id: "specialistReferrals",
        name: "Specialist Referrals",
        type: "select-multiple",
        dataElement: "Referral Data",
        completeness: 78
      }
    ]
  },
  
  // 4. Cost & Financial
  { 
    id: "financial", 
    name: "Cost & Financial", 
    description: "Cost patterns, payment history, and financial metrics",
    icon: Wallet,
    subCategories: [
      {
        id: "costBand",
        name: "Cost Band",
        type: "range",
        dataElement: "Claims - Total Cost",
        completeness: 97
      },
      {
        id: "premiumTier",
        name: "Premium Tier",
        type: "select",
        dataElement: "Enrollment - Plan Level",
        completeness: 99
      },
      {
        id: "paymentHistory",
        name: "Payment History",
        type: "select",
        dataElement: "Financial Records",
        completeness: 96
      },
      {
        id: "subsidyEligibility",
        name: "Subsidy Eligibility",
        type: "select",
        dataElement: "Financial Assistance Data",
        completeness: 88
      },
      {
        id: "outOfPocketSpend",
        name: "Out-of-Pocket Spend",
        type: "range",
        dataElement: "Member Payment Data",
        completeness: 84
      }
    ]
  },
  
  // 5. Social Determinants
  { 
    id: "sdoh", 
    name: "Social Determinants", 
    description: "Social factors affecting health and well-being",
    icon: Home,
    subCategories: [
      {
        id: "geographicArea",
        name: "Geographic Area",
        type: "select",
        dataElement: "Geographic Index",
        completeness: 95
      },
      {
        id: "transportationAccess",
        name: "Transportation Access",
        type: "select",
        dataElement: "Transportation Survey",
        completeness: 62
      },
      {
        id: "foodSecurity",
        name: "Food Security",
        type: "select",
        dataElement: "SDOH Assessment",
        completeness: 58
      },
      {
        id: "housingStability",
        name: "Housing Stability",
        type: "select",
        dataElement: "SDOH Assessment",
        completeness: 56
      },
      {
        id: "socialSupport",
        name: "Social Support",
        type: "select",
        dataElement: "SDOH Assessment",
        completeness: 53
      }
    ]
  },
  
  // 6. Seasonal & Temporal
  { 
    id: "temporal", 
    name: "Seasonal & Temporal", 
    description: "Time-based patterns and seasonal behaviors",
    icon: Clock,
    subCategories: [
      {
        id: "seasonalCare",
        name: "Seasonal Care Patterns",
        type: "select-multiple",
        dataElement: "Visit Timing Data",
        completeness: 79
      },
      {
        id: "timeWithPlan",
        name: "Time With Plan",
        type: "range",
        dataElement: "Enrollment Duration",
        completeness: 100
      },
      {
        id: "lastEngagement",
        name: "Last Engagement",
        type: "range",
        dataElement: "Engagement Timestamp",
        completeness: 94
      },
      {
        id: "careSchedule",
        name: "Care Schedule Adherence",
        type: "select",
        dataElement: "Appointment Data",
        completeness: 72
      },
      {
        id: "cyclicalBehavior",
        name: "Cyclical Behavior",
        type: "select",
        dataElement: "Behavioral Pattern Analysis",
        completeness: 65
      }
    ]
  }
  ];
  
  // AI suggested audiences based on goal
  const aiSuggestedAudiences: AiSuggestedAudiences = {
    engagement: [
      {
        name: "Digital Adopters",
        description: "Members who have used your digital tools in the last 30 days",
        estimatedSize: 1247000,
        filters: [
          { id: Date.now(), category: "engagement", field: "digitalEngagement", operator: "equals", value: "Active", display: "Digital Engagement is Active" },
          { id: Date.now() + 1, category: "demographics", field: "age", operator: "between", value: [18, 65], display: "Age is between 18 and 65" }
        ]
      },
      {
        name: "Care Gap Closure Candidates",
        description: "Members due for preventive screenings who haven't scheduled appointments",
        estimatedSize: 856000,
        filters: [
          { id: Date.now() + 2, category: "health", field: "careGaps", operator: "exists", value: true, display: "Has Open Care Gaps" },
          { id: Date.now() + 3, category: "engagement", field: "lastContactDate", operator: "before", value: "90days", display: "Not contacted in last 90 days" }
        ]
      },
      {
        name: "New Plan Members",
        description: "Recently enrolled members in the last 60 days",
        estimatedSize: 320000,
        filters: [
          { id: Date.now() + 4, category: "eligibility", field: "enrollmentDate", operator: "after", value: "60days", display: "Enrolled in last 60 days" }
        ]
      }
    ],
    retention: [
      {
        name: "High Churn Risk",
        description: "Members with low engagement who may not renew",
        estimatedSize: 540000,
        filters: [
          { id: Date.now() + 5, category: "engagement", field: "engagementScore", operator: "less", value: 30, display: "Engagement Score < 30" },
          { id: Date.now() + 6, category: "eligibility", field: "renewalDate", operator: "within", value: "90days", display: "Renewal within 90 days" }
        ]
      },
      {
        name: "High-Value Chronic Condition",
        description: "Members with chronic conditions who need consistent care",
        estimatedSize: 780000,
        filters: [
          { id: Date.now() + 7, category: "health", field: "chronicConditions", operator: "contains", value: ["Diabetes", "Hypertension"], display: "Has Diabetes or Hypertension" },
          { id: Date.now() + 8, category: "engagement", field: "careManagement", operator: "notEnrolled", value: true, display: "Not in Care Management" }
        ]
      },
      {
        name: "Plan Benefit Underutilizers",
        description: "Members not fully utilizing their plan benefits",
        estimatedSize: 1680000,
        filters: [
          { id: Date.now() + 9, category: "engagement", field: "benefitUtilization", operator: "less", value: 40, display: "Benefit Utilization < 40%" },
          { id: Date.now() + 10, category: "eligibility", field: "memberDuration", operator: "greater", value: "6months", display: "Member for > 6 months" }
        ]
      }
    ]
  };
  
  // Function to calculate audience size based on filters
  useEffect(() => {
    if (filters.length === 0) {
      setAudienceSize(0);
    } else {
      // Simulate audience calculation - in real app this would call an API
      const calculatedSize = Math.floor(totalMembers * (0.8 - (0.15 * filters.length)));
      setAudienceSize(calculatedSize > 0 ? calculatedSize : Math.floor(totalMembers * 0.05));
    }
  }, [filters, totalMembers]);
  
  // Function to add a filter
  const addFilter = (category: string, field: string, operator: string, value: any, display: string) => {
    const newFilter: FilterItem = {
      id: Date.now(),
      category,
      field,
      operator,
      value,
      display
    };
    
    setFilters([...filters, newFilter]);
    setShowFilterPanel(false);  
    setSelectedFilterType(null);
  };
  
  // Function to remove a filter
  const removeFilter = (filterId: number) => {
    setFilters(filters.filter(filter => filter.id !== filterId));
  };
  
  // Function to apply AI suggestion
  const applySuggestion = (suggestion: SuggestedAudience) => {
    setAudienceName(suggestion.name);
    setAudienceDescription(suggestion.description);
    setFilters(suggestion.filters.map(filter => ({
      ...filter,
      id: Date.now() + Math.random()
    })));
    setShowAiSuggestions(false);
  };
  
  // Function to save audience
  const saveAudience = () => {
    console.log("Saving audience:", {
      name: audienceName,
      description: audienceDescription,
      goal: audienceGoal,
      filters,
      size: audienceSize
    });
    // In a real app, this would call an API to save the audience
    alert("Audience saved successfully!");
  };
  
  // Function to simulate audience estimates
  const getEstimatedMetrics = (): MetricData => {
    // Simulate metrics based on audience size and goal
    const baseEngagementRate = audienceGoal === "engagement" ? 0.35 : 0.28;
    const baseConversionRate = audienceGoal === "engagement" ? 0.12 : 0.18;
    
    // Adjust rates based on number of filters (more targeted = better performance)
    const filterBonus = filters.length * 0.03;
    
    return {
      estimatedEngagementRate: Math.min(0.85, baseEngagementRate + filterBonus).toFixed(2),
      estimatedConversionRate: Math.min(0.45, baseConversionRate + filterBonus).toFixed(2),
      estimatedResponse: audienceGoal === "engagement" 
        ? ["Email", "SMS", "Portal"] 
        : ["Call", "Email", "Direct Mail"]
    };
  };
  
  // Get estimated metrics
  const metrics = getEstimatedMetrics();
  
  return (
    <div className="flex flex-col h-full bg-background rounded-lg shadow">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Audience Builder</h1>
            <p className="text-sm text-muted-foreground">Create targeted audiences for personalized communications</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setActiveTab("preview")}>
              Preview Audience
            </Button>
            <Button 
              disabled={!audienceName || filters.length === 0} 
              onClick={saveAudience}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Audience
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel */}
        <div className="w-2/3 p-6 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="builder">Builder</TabsTrigger>
              <TabsTrigger value="preview">Preview & Metrics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="builder" className="space-y-6">
              {/* Basic info card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Audience Information</CardTitle>
                  <CardDescription>Define your audience and its purpose</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="audience-name">Audience Name</Label>
                    <Input
                      id="audience-name"
                      placeholder="Enter a descriptive name"
                      value={audienceName}
                      onChange={(e) => setAudienceName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="audience-description">Description (optional)</Label>
                    <Input
                      id="audience-description"
                      placeholder="What makes this audience special?"
                      value={audienceDescription}
                      onChange={(e) => setAudienceDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Campaign Goal</Label>
                    <RadioGroup 
                      value={audienceGoal} 
                      onValueChange={setAudienceGoal}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="engagement" id="engagement" />
                        <Label htmlFor="engagement" className="cursor-pointer">Engagement</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="retention" id="retention" />
                        <Label htmlFor="retention" className="cursor-pointer">Retention</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
              
              {/* Add filters card */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">Audience Filters</CardTitle>
                      <CardDescription>Define who will be included in this audience</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => setShowAiSuggestions(true)}
                      >
                        <Sparkles className="h-4 w-4" />
                        <span className="hidden sm:inline">AI Suggestions</span>
                        <span className="inline sm:hidden">AI</span>
                      </Button>
                      <Button
                        size="sm"
                        className="gap-1"
                        onClick={() => setShowFilterPanel(true)}
                      >
                        <Plus className="h-4 w-4" />
                        Add Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {filters.length === 0 ? (
                    <div className="text-center p-8 border border-dashed rounded-lg">
                      <p className="text-muted-foreground mb-4">No filters added yet</p>
                      <Button
                        variant="outline"
                        onClick={() => setShowFilterPanel(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Filter
                      </Button>
                      <p className="text-xs text-muted-foreground mt-4">
                        Or use <Button variant="link" className="p-0 h-auto" onClick={() => setShowAiSuggestions(true)}>AI Suggestions</Button> for smart audience recommendations
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filters.map((filter) => (
                        <div 
                          key={filter.id} 
                          className="flex items-center justify-between p-3 border rounded-md"
                        >
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{filter.category}</Badge>
                            <span>{filter.display}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFilter(filter.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex justify-end mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowFilterPanel(true)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Another Filter
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-6">
              {/* Audience preview card */}
              <Card>
                <CardHeader>
                  <CardTitle>{audienceName || "Unnamed Audience"}</CardTitle>
                  <CardDescription>{audienceDescription || "No description provided"}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Campaign Goal</p>
                      <p className="font-medium">
                        {audienceGoal === "engagement" ? "Member Engagement" : "Member Retention"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="font-medium">{new Date().toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge>Draft</Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Audience Filters</h3>
                    {filters.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No filters defined. This audience would include all members.</p>
                    ) : (
                      <div className="space-y-2">
                        {filters.map((filter) => (
                          <div 
                            key={filter.id} 
                            className="flex items-center gap-2 p-2 border rounded-md text-sm"
                          >
                            <Badge variant="outline">{filter.category}</Badge>
                            <span>{filter.display}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Metrics card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Audience Metrics</CardTitle>
                  <CardDescription>Estimated performance based on historical data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Estimated Audience Size</p>
                      <div className="flex items-end gap-2">
                        <p className="text-2xl font-bold">
                          {audienceSize.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          members
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round((audienceSize / totalMembers) * 100)}% of total member population
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Expected Engagement Rate</p>
                      <div className="flex items-end gap-2">
                        <p className="text-2xl font-bold">
                          {(parseFloat(metrics.estimatedEngagementRate) * 100).toFixed(0)}%
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {audienceGoal === "engagement" ? "Opens/views of communications" : "Interactions with outreach"}
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Expected Conversion Rate</p>
                      <div className="flex items-end gap-2">
                        <p className="text-2xl font-bold">
                          {(parseFloat(metrics.estimatedConversionRate) * 100).toFixed(0)}%
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {audienceGoal === "engagement" ? "Taking desired action" : "Renewing membership"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Recommended Channels</h3>
                    <div className="flex flex-wrap gap-2">
                      {metrics.estimatedResponse.map((channel, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg"
                        >
                          {channel === "Email" && <Mail className="h-4 w-4 text-primary" />}
                          {channel === "SMS" && <Phone className="h-4 w-4 text-primary" />}
                          {channel === "Call" && <Phone className="h-4 w-4 text-primary" />}
                          {channel === "Direct Mail" && <FileText className="h-4 w-4 text-primary" />}
                          {channel === "Portal" && <Users className="h-4 w-4 text-primary" />}
                          <span>{channel}</span>
                          {index === 0 && <Badge className="ml-1">Primary</Badge>}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export Report
                    </Button>
                    <Button>
                      Create Campaign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right panel - Filter selection */}
        <div className={`w-1/3 border-l transition-all duration-200 ${showFilterPanel ? 'translate-x-0' : 'translate-x-full'} absolute right-0 top-0 bottom-0 bg-background z-10 overflow-auto shadow-xl`}>
          {showFilterPanel && (
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Add Filter</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setShowFilterPanel(false);
                    setSelectedFilterType(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {!selectedFilterType ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Select a filter category:</p>
                  
                  {filterOptions.map((option) => (
                    <div 
                      key={option.id}
                      className="border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => setSelectedFilterType(option)}
                    >
                      <div className="flex items-center">
                        <div className="mr-3 p-2 bg-primary/10 rounded-full">
                          <option.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{option.name}</h3>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                        <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedFilterType(null)}
                      className="mr-2"
                    >
                      <ChevronRight className="h-4 w-4 rotate-180" />
                    </Button>
                    <h3 className="font-medium">{selectedFilterType.name} Filters</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {selectedFilterType.subCategories.map((subCategory) => (
                      <FilterOption 
                        key={subCategory.id}
                        category={selectedFilterType}
                        subCategory={subCategory}
                        onAdd={addFilter}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* AI Suggestions Panel */}
        <div className={`w-1/2 border-l transition-all duration-200 ${showAiSuggestions ? 'translate-x-0' : 'translate-x-full'} absolute right-0 top-0 bottom-0 bg-background z-20 overflow-auto shadow-xl`}>
          {showAiSuggestions && (
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-primary mr-2" />
                  <h2 className="text-lg font-medium">AI Recommended Audiences</h2>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAiSuggestions(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Here are smart audience suggestions based on your goal of <span className="font-medium">{audienceGoal === "engagement" ? "member engagement" : "member retention"}</span>. These are built using your historical campaign data and member profiles.
              </p>
              
              <div className="space-y-4 flex-1 overflow-auto">
                {audienceGoal && aiSuggestedAudiences[audienceGoal].map((suggestion, index) => (
                  <div 
                    key={index}
                    className="border rounded-lg p-4 hover:border-primary transition-colors"
                  >
                    <h3 className="font-medium text-lg">{suggestion.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                    
                    <div className="mb-3">
                      <Badge variant="outline" className="mb-2">Estimated size: {suggestion.estimatedSize.toLocaleString()} members</Badge>
                      <div className="space-y-2">
                        {suggestion.filters.map((filter, i) => (
                          <div key={i} className="text-sm border rounded-md p-2">
                            {filter.display}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button
                      className="w-full"
                      onClick={() => applySuggestion(suggestion)}
                    >
                      Use This Audience
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="p-3 bg-primary/10 rounded-lg mt-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <span className="font-medium">Pro Tip:</span> AI-suggested audiences are based on patterns in your member data and historical campaign performance. These suggestions are regularly updated as new data becomes available.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Filter option component
function FilterOption({ category, subCategory, onAdd }: FilterOptionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // Initialize filter value based on type
  const [filterValue, setFilterValue] = useState<string | number[] | string[]>(
    subCategory.type === "range" ? [20, 65] : 
    subCategory.type === "select-multiple" ? [] : ""
  );
  
  const [operator, setOperator] = useState<string>("equals");
  
  // Generate display text for filter
  const getDisplayText = (): string => {
    switch (subCategory.type) {
      case "range":
        return `${subCategory.name} is between ${(filterValue as number[])[0]} and ${(filterValue as number[])[1]}`;
      case "select":
        return `${subCategory.name} is ${filterValue}`;
      case "select-multiple":
        return `${subCategory.name} includes ${(filterValue as string[]).join(", ")}`;
      case "text":
        return `${subCategory.name} ${operator === "equals" ? "is" : "contains"} ${filterValue}`;
      default:
        return `${subCategory.name} filter`;
    }
  };
  
  // Handle applying the filter
  const handleApply = () => {
    onAdd(
      category.id,
      subCategory.id,
      operator,
      filterValue,
      getDisplayText()
    );
  };
  
  // The options for select fields
  // Update your getSelectOptions function with these additional options
const getSelectOptions = () => {
    switch (subCategory.id) {
      // Existing options
      case "gender":
        return ["Male", "Female", "Non-binary", "Other"];
      case "relationshipStatus":
        return ["Single", "Married", "Domestic Partner", "Unknown"];
      case "raceEthnicity":
        return ["White", "Black/African American", "Hispanic/Latino", "Asian", "Other", "Multiple", "Unknown"];
      case "memberEligibility":
        return ["Active", "Inactive", "Pending", "Termed"];
      case "serviceEligibility":
        return ["Fully Eligible", "Partially Eligible", "Not Eligible"];
      case "conditions":
        return ["Diabetes", "Hypertension", "Heart Disease", "Asthma", "COPD", "Depression", "Anxiety", "Cancer", "Obesity"];
      case "medications":
        return ["Insulin", "Beta Blockers", "ACE Inhibitors", "Statins", "Antidepressants", "Pain Management", "Inhalers"];
      case "contactInfo":
        return ["Has Email", "Has Phone", "Has Mobile Phone", "No Email", "No Phone", "Opted Out of Email", "Opted Out of SMS"];
      case "campaignHistory":
        return ["Opened Email", "Clicked Email", "Responded to SMS", "Answered Call", "No Response", "Never Contacted"];
      
      // New options for Behavioral Insights
      case "digitalPreference":
        return ["Digital First", "Digital Comfortable", "Digital Reluctant", "Digital Avoider"];
      case "appUsage":
        return ["Power User", "Regular User", "Occasional User", "Downloaded Only", "Never Downloaded"];
      case "communicationFrequency":
        return ["Weekly", "Bi-weekly", "Monthly", "Quarterly", "Annually", "As Needed Only"];
      case "responseTime":
        return ["Same Day", "1-2 Days", "3-7 Days", "Over 7 Days", "Non-responsive"];
      case "lifestyleChoices":
        return ["Active Lifestyle", "Sedentary", "Smoker", "Former Smoker", "Regular Exercise", "Limited Mobility", "Nutritional Focus"];
      
      // Care Management options
      case "programEnrollment":
        return ["Disease Management", "Case Management", "Wellness Program", "Maternity Program", "Behavioral Health", "Not Enrolled"];
      case "careTeam":
        return ["Primary Care", "Specialty Care", "Integrated Care", "Virtual Care", "No Assignment"];
      case "careGaps":
        return ["Annual Physical", "Mammogram", "Colorectal Screening", "Diabetes Eye Exam", "Immunizations", "Blood Pressure Check"];
      case "providerNetwork":
        return ["In-Network Only", "Mostly In-Network", "Mixed Usage", "Mostly Out-of-Network", "Out-of-Network Only"];
      
      // Service Utilization options
      case "serviceType":
        return ["Primary Care", "Specialty Care", "Urgent Care", "Emergency", "Inpatient", "Outpatient", "Telehealth", "Pharmacy"];
      case "emergencyUse":
        return ["Frequent (4+ visits/year)", "Moderate (2-3 visits/year)", "Occasional (1 visit/year)", "Rare (< 1 visit/year)", "None"];
      case "preventiveServices":
        return ["Consistent User", "Occasional User", "Rare User", "Non-User"];
      case "specialistReferrals":
        return ["Cardiology", "Endocrinology", "Oncology", "Orthopedics", "Neurology", "Dermatology", "Gastroenterology", "Pulmonology"];
      
      // Financial options
      case "premiumTier":
        return ["Platinum", "Gold", "Silver", "Bronze", "Catastrophic"];
      case "paymentHistory":
        return ["Always On-Time", "Occasionally Late", "Frequently Late", "On Payment Plan"];
      case "subsidyEligibility":
        return ["Premium Subsidy", "Cost-Sharing Reduction", "Dual Eligible", "No Subsidy"];
      
      // SDOH options
      case "geographicArea":
        return ["Urban", "Suburban", "Rural", "Remote"];
      case "transportationAccess":
        return ["Reliable Personal Transport", "Public Transit Dependent", "Limited Transportation", "Transportation Barrier"];
      case "foodSecurity":
        return ["Food Secure", "Marginally Secure", "Low Food Security", "Very Low Food Security", "Unknown"];
      case "housingStability":
        return ["Stable Housing", "At Risk", "Unstable Housing", "Homeless", "Unknown"];
      case "socialSupport":
        return ["Strong Support Network", "Moderate Support", "Limited Support", "Isolated", "Unknown"];
      
      // Seasonal & Temporal options
      case "seasonalCare":
        return ["Winter Utilizer", "Spring Utilizer", "Summer Utilizer", "Fall Utilizer", "Consistent Year-Round"];
      case "careSchedule":
        return ["Highly Adherent", "Moderately Adherent", "Somewhat Adherent", "Non-Adherent"];
      case "cyclicalBehavior":
        return ["Consistent", "Weekday Only", "Weekend Only", "Monthly Pattern", "Seasonal Pattern"];
      
      default:
        return ["Option 1", "Option 2", "Option 3"];
    }
  };
  
  // Data quality indicator based on completeness
  const getDataQualityBadge = () => {
    if (subCategory.completeness >= 95) {
      return <Badge className="bg-green-500">High Quality</Badge>;
    } else if (subCategory.completeness >= 75) {
      return <Badge className="bg-amber-500">Good Quality</Badge>;
    } else {
      return <Badge className="bg-red-500">Partial Data</Badge>;
    }
  };
  
  return (
    <div className="border rounded-lg">
      <div 
        className="p-3 flex justify-between items-center cursor-pointer hover:bg-accent transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{subCategory.name}</span>
            {getDataQualityBadge()}
          </div>
          <p className="text-xs text-muted-foreground">
            Data Element: {subCategory.dataElement}
          </p>
        </div>
        <div className="flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <Info className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">{subCategory.name}</h4>
                <p className="text-sm">{subCategory.dataElement}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Data Completeness:</span>
                  <Progress value={subCategory.completeness} className="h-2 w-[100px]" />
                  <span className="text-xs">{subCategory.completeness}%</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
        </div>
      </div>
      
      {isOpen && (
        <div className="p-3 border-t">
          {/* Different input types based on the filter type */}
          {subCategory.type === "text" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Select value={operator} onValueChange={setOperator}>
                  <SelectTrigger>
                    <SelectValue placeholder="Operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equals">Equals</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="startsWith">Starts with</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  placeholder={`Enter ${subCategory.name}`}
                  value={filterValue as string}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
              </div>
            </div>
          )}
          
          {subCategory.type === "select" && (
            <div className="space-y-3">
              <Select 
                value={filterValue as string} 
                onValueChange={(value: string) => setFilterValue(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${subCategory.name}`} />
                </SelectTrigger>
                <SelectContent>
                  {getSelectOptions().map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {subCategory.type === "select-multiple" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-2">Select one or more options:</p>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {getSelectOptions().map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`${subCategory.id}-${option}`} 
                      checked={(filterValue as string[]).includes(option)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilterValue([...(filterValue as string[]), option]);
                        } else {
                          setFilterValue((filterValue as string[]).filter(val => val !== option));
                        }
                      }}
                    />
                    <Label htmlFor={`${subCategory.id}-${option}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {subCategory.type === "range" && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Minimum</span>
                  <span>Maximum</span>
                </div>
                <Slider 
                  defaultValue={filterValue as number[]} 
                  min={0} 
                  max={100} 
                  step={1}
                  onValueChange={(value: number[]) => setFilterValue(value)}
                />
                <div className="flex justify-between mt-1">
                  <Badge variant="outline">{(filterValue as number[])[0]}</Badge>
                  <Badge variant="outline">{(filterValue as number[])[1]}</Badge>
                </div>
              </div>
              
              {subCategory.id === "age" && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Age Range: {(filterValue as number[])[0]} to {(filterValue as number[])[1]} years</span>
                  <span className="text-muted-foreground">
                    ~{Math.round(((filterValue as number[])[1] - (filterValue as number[])[0]) / 80 * 100)}% of population
                  </span>
                </div>
              )}
              
              {subCategory.id === "clinicalSignals" && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Select which measurement to filter:</p>
                  <RadioGroup defaultValue="bmi">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bmi" id="bmi" />
                      <Label htmlFor="bmi">BMI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bp" id="bp" />
                      <Label htmlFor="bp">Blood Pressure</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="a1c" id="a1c" />
                      <Label htmlFor="a1c">A1C</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="mr-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              size="sm"
              onClick={handleApply}
              disabled={(subCategory.type === "text" && !filterValue) || 
                (subCategory.type === "select" && !filterValue) ||
                (subCategory.type === "select-multiple" && (filterValue as string[]).length === 0)}
            >
              Apply Filter
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}