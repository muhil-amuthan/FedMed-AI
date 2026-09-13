import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: LucideIcon
  description?: string
  variant?: 'default' | 'teal' | 'dark'
  className?: string
}

export function StatCard({ title, value, change, changeType = 'neutral', icon: Icon, description, variant = 'default', className }: StatCardProps) {
  return (
    <Card className={cn("p-5", variant === 'dark' && "bg-slate-900 text-white border-slate-800", variant === 'teal' && "bg-teal-50 border-teal-100 dark:bg-teal-950/30 dark:border-teal-900", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={cn("text-[12px] font-medium tracking-wide uppercase", variant === 'dark' ? "text-slate-400" : "text-slate-500")}>{title}</p>
          <p className="text-[28px] font-semibold tracking-tight leading-none mt-2">{value}</p>
          {description && <p className={cn("text-[12px] mt-1", variant === 'dark' ? "text-slate-400" : "text-slate-500")}>{description}</p>}
        </div>
        {Icon && (
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", variant === 'dark' ? "bg-white/10" : variant === 'teal' ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300" : "bg-slate-100 dark:bg-slate-800")}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      {change && (
        <div className="mt-4 flex items-center gap-1.5">
          <span className={cn("text-[12px] font-medium px-1.5 py-0.5 rounded-md", changeType === 'positive' ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : changeType === 'negative' ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-600")}>{change}</span>
          <span className={cn("text-[12px]", variant === 'dark' ? "text-slate-400" : "text-slate-500")}>vs last round</span>
        </div>
      )}
    </Card>
  )
}
