import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  icon: LucideIcon
  gradient: string
  iconBg: string
  iconColor: string
  titleColor: string
  valueColor: string
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  gradient, 
  iconBg, 
  iconColor, 
  titleColor, 
  valueColor 
}: MetricCardProps) {
  return (
    <Card className={`${gradient} border-0 shadow-md`}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 ${iconBg} rounded-full`}>
            <Icon className={`h-8 w-8 ${iconColor}`} />
          </div>
          <div>
            <p className={`text-sm font-medium ${titleColor}`}>{title}</p>
            <h3 className={`text-4xl md:text-5xl font-bold ${valueColor}`}>{value}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface MetricCardsGridProps {
  metrics: MetricCardProps[]
}

export function MetricCardsGrid({ metrics }: MetricCardsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}