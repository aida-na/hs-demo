"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  Link as LinkIcon, 
  Shield,
  ChevronDown,
  ChevronUp
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
  
  // Define which sections are expanded
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  
  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
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
        { label: "Campaigns Overview", href: "/orchestration", badge: 5 ,},
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
    <div className={cn("h-screen bg-gray-100 border-r border-gray-200", className, !isExpanded && "w-16")}>
      <div className="p-4">
        <div className="flex items-center justify-start mb-6">
          {isExpanded ? (
            <img 
              src="/logo-full.png" 
              alt="HealthAI Logo" 
              className="h-8" 
            />
          ) : (
            <div style={{ width: '32px', height: '32px' }}>
              <img 
                src="/logo-icon.png" 
                alt="HealthAI Logo" 
                style={{ width: '32px', height: '32px' }}
              />
            </div>
          )}
        </div>
        
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="space-y-1">
            {navigationSections.map((section) => (
              <div key={section.id} className="mb-1">
                {/* Section Header */}
                <div 
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer",
                    pathname === section.href && "bg-white text-black font-medium",
                    expandedSections[section.id] && "mb-1",
                    !isExpanded && "justify-center"
                  )}
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex-shrink-0" style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <section.icon style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px' }} />
                  </div>
                  {isExpanded && (
                    <>
                      <span className="flex-grow ml-3">{section.label}</span>
                      {section.subsections.length > 0 && (
                        expandedSections[section.id] ? 
                          <ChevronUp className="h-4 w-4" /> : 
                          <ChevronDown className="h-4 w-4" />
                      )}
                    </>
                  )}
                </div>
                
                {/* Subsections */}
                {isExpanded && expandedSections[section.id] && (
                  <div className="ml-7 border-l border-gray-200 pl-3 space-y-1">
                    {section.subsections.map((subsection) => (
                      <Link 
                        key={subsection.href} 
                        href={subsection.href} 
                        className={cn(
                          "flex items-center text-gray-500 py-2 px-3 rounded-md hover:bg-gray-200",
                          pathname === subsection.href && "bg-white text-black font-medium"
                        )}
                      >
                        <span className="flex-grow">{subsection.label}</span>
                        {subsection.badge && (
                          <span className={cn(
                            "text-xs font-medium rounded-full h-6 w-6 flex items-center justify-center",
                            subsection.badge > 4 ? "bg-green-200 text-green-800" : "bg-orange-200 text-orange-800"
                          )}>
                            {subsection.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}