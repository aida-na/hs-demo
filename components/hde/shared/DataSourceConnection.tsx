'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Database } from "lucide-react"

interface DataSourceProps {
  name: string
  description: string
  status: "connected" | "syncing" | "error"
  lastSync?: string
  records?: string
  progress?: number
  errorMessage?: string
}

export function DataSourceConnection({ 
  name, 
  description, 
  status, 
  lastSync, 
  records, 
  progress,
  errorMessage 
}: DataSourceProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-500">Connected</Badge>
      case "syncing":
        return <Badge className="bg-amber-500">Syncing</Badge>
      case "error":
        return <Badge className="bg-red-500">Error</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getStatusInfo = () => {
    if (status === "error") {
      return (
        <div className="flex items-center justify-between text-sm">
          <span className="text-red-500">{errorMessage}</span>
          <Button variant="outline" size="sm">
            Reconnect
          </Button>
        </div>
      )
    }

    if (status === "syncing" && progress !== undefined) {
      return (
        <>
          <div className="flex items-center justify-between text-sm">
            <span>Sync in progress...</span>
            <span>{records}</span>
          </div>
          <Progress value={progress} className="mt-2 h-1" />
        </>
      )
    }

    return (
      <div className="flex items-center justify-between text-sm">
        <span>Last sync: {lastSync}</span>
        <span>{records}</span>
      </div>
    )
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Database className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        {getStatusBadge()}
      </div>
      <div className="mt-4">
        {getStatusInfo()}
      </div>
    </div>
  )
}

interface DataSourcesGridProps {
  dataSources: DataSourceProps[]
}

export function DataSourcesGrid({ dataSources }: DataSourcesGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Data Sources</CardTitle>
        <CardDescription>Status of data warehouse connections</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dataSources.map((source, index) => (
            <DataSourceConnection key={index} {...source} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}