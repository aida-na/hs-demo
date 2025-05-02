"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type TreemapItem = {
  id: string
  name: string
  size: number
  group: string
  color?: string
}

type CustomTreemapProps = {
  data: TreemapItem[]
  onItemClick: (itemId: string | null) => void
  selectedItemId: string | null
  colors?: string[]
  className?: string
}

export default function CustomTreemap({
  data,
  onItemClick,
  selectedItemId,
  colors = [
    "#38bdf8", // sky-400
    "#22d3ee", // cyan-400
    "#2dd4bf", // teal-400
    "#4ade80", // green-400
    "#a3e635", // lime-400
    "#facc15", // yellow-400
    "#fb923c", // orange-400
    "#f87171", // red-400
    "#f472b6", // pink-400
    "#c084fc", // purple-400
  ],
  className = "",
}: CustomTreemapProps) {
  // Calculate total size for proportions
  const totalSize = data.reduce((sum, item) => sum + item.size, 0)

  // Sort data by size (largest first) for better layout
  const sortedData = [...data].sort((a, b) => b.size - a.size)

  return (
    <div className={`w-full h-full grid grid-cols-12 gap-2 p-2 ${className}`}>
      <TooltipProvider>
        {sortedData.map((item, index) => {
          // Calculate size proportion (1-12 for grid columns)
          // Minimum size is 2 columns to ensure visibility
          const sizeProportion = Math.max(2, Math.round((item.size / totalSize) * 12))
          const isSelected = selectedItemId === item.id

          return (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <div
                  className={`
                    col-span-${sizeProportion} 
                    row-span-${Math.ceil(sizeProportion / 2)}
                    rounded-md 
                    flex 
                    items-center 
                    justify-center 
                    text-white 
                    font-medium 
                    cursor-pointer
                    transition-all
                    hover:opacity-90
                    relative
                    overflow-hidden
                  `}
                  style={{
                    backgroundColor: item.color || colors[index % colors.length],
                    border: isSelected ? "2px solid black" : "1px solid white",
                  }}
                  onClick={() => onItemClick(isSelected ? null : item.id)}
                >
                  <div className="p-2 text-center">
                    <div className="text-sm md:text-base truncate">{item.name}</div>
                    {sizeProportion > 3 && (
                      <div className="text-xs opacity-80 mt-1">{item.size.toLocaleString()} members</div>
                    )}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs">{item.group}</div>
                <div className="text-xs font-medium mt-1">{item.size.toLocaleString()} members</div>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </TooltipProvider>
    </div>
  )
}
