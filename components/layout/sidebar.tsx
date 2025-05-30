"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { 
  Database, 
  Activity, 
  BarChart3, 
  UserCheck, 
  Brain,
  ClipboardList, 
  PlusCircle, 
  Library, 
  FlaskConical, 
  LineChart, 
  Mic, 
  PhoneCall, 
  Settings, 
  Shield,
  ChevronDown,
  ChevronRight,
  Home
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isExpanded?: boolean;
}

export function Sidebar({ className, isExpanded }: SidebarProps) {
  // Default to expanded if not explicitly set
  isExpanded = isExpanded === undefined ? true : isExpanded;
  const pathname = usePathname()
  
  // Define which sections are expanded by default
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    healthDataEngine: true,
    journeyOrchestration: false,
    voiceStudio: false,
    platformManagement: false
  })
  
  // Collapse all sections when sidebar is collapsed
  useEffect(() => {
    if (!isExpanded) {
      setExpandedSections({
        healthDataEngine: false,
        journeyOrchestration: false,
        voiceStudio: false,
        platformManagement: false
      })
    }
  }, [isExpanded])
  
  // Toggle section expansion
  const toggleSection = (section: string) => {
    // Only allow toggling if sidebar is expanded
    if (!isExpanded) return
    
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Check if current path matches section or subsection
  const isActiveSection = (section: any) => {
    if (pathname === section.href) return true
    return section.subsections?.some((sub: any) => pathname === sub.href) || false
  }

  // Define navigation structure with sections and subsections
  const navigationSections = [
    {
      id: "healthDataEngine",
      label: "Health Data Engine",
      icon: Database,
      href: "/hde",
      subsections: [
        { label: "HDE Status", href: "/hde/status" },
        { label: "Population Insights", href: "/hde/population" },
        { label: "Member Profiles", href: "/hde/profiles" },
        { label: "Smart Cohorts", href: "/hde/smart-cohorts", badge: 2 }
      ]
    },
    {
      id: "journeyOrchestration",
      label: "Journey Orchestration",
      icon: Activity,
      href: "/journey",
      subsections: [
        { label: "Campaigns Overview", href: "/orchestration", badge: 5 },
        { label: "Campaign Builder", href: "/orchestration/builder/new"},
        { label: "Content Library", href: "/orchestration/content-creator" },
        { label: "Spend Optimization", href: "/orchestration/spend" }
      ]
    },
    {
      id: "voiceStudio",
      label: "Voice Studio",
      icon: Mic,
      href: "/voice",
      subsections: [
        { label: "Voice AI Campaigns", href: "/voice/campaigns" },
        { label: "Voice Agent Configuration", href: "/voice/config" },
        { label: "Pre-call Summaries", href: "/voice/pre-call" }
      ]
    },
    {
      id: "platformManagement",
      label: "Platform Management",
      icon: Settings,
      href: "/platform",
      subsections: [
        { label: "Reports", href: "/platform/reports" },
        { label: "Integrations", href: "/platform/integrations" },
        { label: "Data Security", href: "/platform/security" },
        { label: "Settings", href: "/platform/settings" }
      ]
    }
  ]

  return (
    <div className={cn(
      "h-screen bg-white border-r border-gray-200 flex flex-col", 
      className, 
      !isExpanded && "w-16"
    )}>
      {/* Header */}
      <div className={cn("p-6 border-b border-gray-100", !isExpanded && "p-4")}>
        <div className="flex items-center justify-center">
          {isExpanded ? (
            <div className="flex items-center">
              <img 
                src="/logo-icon.png" 
                alt="HealthAI Logo" 
                className="w-8 h-8 mr-3"
              />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">RadiantGraph</h1>
        
              </div>
            </div>
          ) : (
            <img 
              src="/logo-icon.png" 
              alt="HealthAI Logo" 
              className="w-8 h-8 flex-shrink-0"
            />
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {navigationSections.map((section) => {
            const isActive = isActiveSection(section)
            const isExpanded = expandedSections[section.id]
            
            return (
              <div key={section.id}>
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className={cn(
                    "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-blue-50 text-blue-700 border border-blue-200" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                    !isExpanded && "justify-center"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center rounded-md",
                    isActive ? "text-blue-600" : "text-gray-500"
                  )}>
                    <section.icon className="w-5 h-5" />
                  </div>
                  
                  {isExpanded && (
                    <>
                      <span className="ml-3 flex-1 text-left">{section.label}</span>
                      {section.subsections.length > 0 && (
                        <ChevronRight className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          expandedSections[section.id] && "rotate-90"
                        )} />
                      )}
                    </>
                  )}
                </button>
                
                {/* Subsections */}
                {isExpanded && expandedSections[section.id] && section.subsections.length > 0 && (
                  <div className="mt-2 ml-4 space-y-1">
                    {section.subsections.map((subsection) => {
                      const isSubActive = pathname === subsection.href
                      
                      return (
                        <Link 
                          key={subsection.href} 
                          href={subsection.href} 
                          className={cn(
                            "flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200",
                            isSubActive
                              ? "bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-600" 
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-2 border-transparent"
                          )}
                        >
                          <span className="flex-1">{subsection.label}</span>
                          {subsection.badge && (
                            <Badge 
                              variant={subsection.badge > 4 ? "default" : "secondary"}
                              className="ml-2 h-5 px-2 text-xs"
                            >
                              {subsection.badge}
                            </Badge>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </ScrollArea>
      
      {/* Footer */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center px-3 py-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">AD</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Aidana D</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}