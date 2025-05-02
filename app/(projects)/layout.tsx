'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex h-screen">
      <div 
        className={cn(
          "fixed top-0 left-0 h-full bg-background border-r transition-all duration-300 ease-in-out z-50",
          isExpanded ? "w-64" : "w-16"
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <Sidebar className={cn(
          "h-full",
          isExpanded ? "w-64" : "w-16"
        )} isExpanded={isExpanded} />
      </div>
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isExpanded ? "ml-64" : "ml-16"
      )}>
        {children}
      </div>
    </div>
  );
}