'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface DataElement {
  name: string
  category: string
  status: "Active" | "Partial" | "Error"
  completeness: number
  priority: "Required" | "Nice to Have"
}

interface DataTableProps {
  title: string
  description: string
  data: DataElement[]
}

export function DataElementsTable({ title, description, data }: DataTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500">Active</Badge>
      case "Partial":
        return <Badge className="bg-amber-500">Partial</Badge>
      case "Error":
        return <Badge className="bg-red-500">Error</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Required":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Required
          </Badge>
        )
      case "Nice to Have":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Nice to Have
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Data Element</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Completeness</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((element, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{element.name}</TableCell>
                <TableCell>{element.category}</TableCell>
                <TableCell>{getStatusBadge(element.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={element.completeness} className="h-2 w-[100px]" />
                    <span className="text-xs">{element.completeness}%</span>
                  </div>
                </TableCell>
                <TableCell>{getPriorityBadge(element.priority)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

interface EmployerGroup {
  name: string
  members: number
  growth: number
  dataCompleteness: number
  topConditions: string[]
}

interface EmployerTableProps {
  title: string
  description: string
  employers: EmployerGroup[]
}

export function EmployerGroupTable({ title, description, employers }: EmployerTableProps) {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="mb-3">
        <h4 className="text-base font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
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
            {employers.map((employer, index) => (
              <tr key={index} className={index < employers.length - 1 ? "border-b" : ""}>
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
                      />
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
  )
}