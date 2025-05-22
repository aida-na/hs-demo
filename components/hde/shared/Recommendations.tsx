import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Recommendation {
  title: string
  description: string
  icon: React.ReactNode
  bgColor: string
  potentialSavings?: string
}

interface RecommendationsProps {
  title: string
  description: string
  recommendations: Recommendation[]
}

export function ActionRecommendations({ title, description, recommendations }: RecommendationsProps) {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="mb-3">
        <h4 className="text-base font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="p-4 border rounded-md">
            <div className="flex items-center mb-2">
              <div className={`w-8 h-8 rounded-full ${rec.bgColor} flex items-center justify-center mr-2`}>
                {rec.icon}
              </div>
              <h5 className="font-medium">{rec.title}</h5>
            </div>
            <p className="text-sm text-gray-600">{rec.description}</p>
            {rec.potentialSavings && (
              <div className="mt-4">
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Potential savings: {rec.potentialSavings}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Missing Insights Component for Data Quality tab
interface MissingInsight {
  title: string
  memberCount: number
  description: string
  actionText: string
  severity: "high" | "medium" | "low"
}

interface MissingInsightsProps {
  atRiskMembers: number
  careGapsPercentage: number
  insights: MissingInsight[]
}

export function MissingMemberInsights({ atRiskMembers, careGapsPercentage, insights }: MissingInsightsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-50 border-red-200"
      case "medium":
        return "bg-amber-50 border-amber-200"
      case "low":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getBadgeColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-200 text-red-800"
      case "medium":
        return "bg-amber-200 text-amber-800"
      case "low":
        return "bg-blue-200 text-blue-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  return (
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
            <div className="text-3xl font-bold text-amber-500">{atRiskMembers}</div>
            <p className="text-sm font-medium mt-1">Members at Risk</p>
            <p className="text-xs text-muted-foreground mt-1">
              Due to fragmented profiles
            </p>
          </div>
          
          <div className="p-4 border rounded-lg text-center">
            <div className="text-3xl font-bold text-amber-500">{careGapsPercentage}%</div>
            <p className="text-sm font-medium mt-1">Care Gaps</p>
            <p className="text-xs text-muted-foreground mt-1">
              Currently invisible in your system
            </p>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">Impact on High-Priority Members</h3>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className={`p-3 border rounded-lg ${getSeverityColor(insight.severity)}`}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{insight.title}</span>
                  <span className={`px-2 py-1 rounded text-xs ${getBadgeColor(insight.severity)}`}>
                    {insight.memberCount} members
                  </span>
                </div>
                <p className="text-sm">{insight.description}</p>
                <button className="mt-2 px-3 py-1 text-sm border rounded hover:bg-gray-50">
                  {insight.actionText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}