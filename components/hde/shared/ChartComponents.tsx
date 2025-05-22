import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartData {
  name: string
  value: number
}

interface BarChartProps {
  title: string
  description?: string
  data: ChartData[]
  color?: string
  showPercentage?: boolean
}

export function HorizontalBarChart({ title, description, data, color = "bg-blue-500", showPercentage = true }: BarChartProps) {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="mb-3">
        <h4 className="text-base font-medium">{title}</h4>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <div className="h-64">
        <div className="h-full w-full flex flex-col justify-between">
          {data.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="w-32 text-sm">{item.name}</div>
              <div className="flex-1">
                <div className="h-6 bg-gray-100 rounded-md overflow-hidden">
                  <div 
                    className={`h-full ${color} rounded-md`} 
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
              <div className="w-10 text-sm text-right ml-2">
                {showPercentage ? `${item.value}%` : item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface CircularProgressProps {
  title: string
  value: number
  color?: string
}

export function CircularProgress({ title, value, color = "#f59e0b" }: CircularProgressProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 border rounded-md">
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
            stroke={color}
            strokeWidth="3"
            strokeDasharray={`${value}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{value}%</span>
        </div>
      </div>
      <p className="text-sm text-center">{title}</p>
    </div>
  )
}

interface DemographicsPieChartProps {
  malePercentage: number
  femalePercentage: number
}

export function DemographicsPieChart({ malePercentage, femalePercentage }: DemographicsPieChartProps) {
  return (
    <div className="h-32 flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-gray-100 relative">
        <div 
          className="absolute top-0 left-0 w-32 h-32 rounded-full overflow-hidden"
          style={{ 
            clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
            background: `conic-gradient(#3b82f6 0% ${malePercentage}%,rgb(245, 204, 220) ${malePercentage}% 100%)`
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <div className="text-xs flex gap-2 mb-1">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-400 mr-1" />
              <span>Male</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-400 mr-1" />
              <span>Female</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MetricWithTrendProps {
  title: string
  value: string
  trend: number
  isPositive: boolean
  subtitle?: string
}

export function MetricWithTrend({ title, value, trend, isPositive, subtitle }: MetricWithTrendProps) {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <div className="flex items-end gap-2 mt-1">
        <span className="text-2xl font-bold">{value}</span>
        <span className={`text-sm flex items-center ${isPositive ? "text-green-600" : "text-red-600"}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isPositive ? (
              <polyline points="18 15 12 9 6 15" />
            ) : (
              <polyline points="6 9 12 15 18 9" />
            )}
          </svg>
          {Math.abs(trend)}%
        </span>
      </div>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  )
}

interface CareGapAnalysisProps {
  data: ChartData[]
}

export function CareGapAnalysis({ data }: CareGapAnalysisProps) {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="mb-3">
        <h4 className="text-base font-medium">Care Gap Analysis</h4>
        <p className="text-sm text-gray-500">Percentage of members with care gaps</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <CircularProgress 
            key={index}
            title={item.name}
            value={item.value}
          />
        ))}
      </div>
    </div>
  )
}