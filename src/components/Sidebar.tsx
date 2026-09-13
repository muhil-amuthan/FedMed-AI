import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { LayoutDashboard, ScanSearch, FileText, Network, Building2, BarChart3, ShieldCheck, Database, Settings, Users, Bell, LogOut, Stethoscope } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'CT Scan Analysis', href: '/scan-analysis', icon: ScanSearch, badge: 'AI' },
  { name: 'Patients', href: '/patients', icon: Users },
  { name: 'AI Reports', href: '/reports', icon: FileText, count: 12 },
  { name: 'Federated Training', href: '/federated-learning', icon: Network, badge: 'Live' },
  { name: 'Hospitals', href: '/hospitals', icon: Building2, count: 24 },
  { name: 'Model Performance', href: '/performance', icon: BarChart3 },
  { name: 'Privacy Center', href: '/privacy', icon: ShieldCheck },
  { name: 'Datasets', href: '/datasets', icon: Database },
]

const bottomNav = [
  { name: 'Notifications', href: '#', icon: Bell, count: 3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  const location = useLocation()

  return (
    <div className={cn("flex h-full flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-all", collapsed ? "w-[72px]" : "w-[280px]")}>
      <div className="flex h-[64px] items-center gap-3 border-b border-slate-200 px-5 dark:border-slate-800">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900">
          <Stethoscope className="h-4 w-4" />
        </div>
        {!collapsed && (
          <div className="flex-1">
            <div className="text-[14px] font-semibold">AIIMS Delhi</div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />Online • Round 18</div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        <div>
          {!collapsed && <div className="px-3 mb-2 text-[11px] font-semibold tracking-widest text-slate-400 uppercase">Clinical</div>}
          <nav className="space-y-1">
            {navigation.map(item => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all",
                    isActive ? "bg-slate-900 text-white shadow-soft dark:bg-white dark:text-slate-900" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && <Badge variant={item.badge === 'Live' ? 'success' : 'secondary'} className="text-[10px] px-1.5 py-0">{item.badge}</Badge>}
                      {item.count && <span className="text-[11px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">{item.count}</span>}
                    </>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        <div>
          {!collapsed && <div className="px-3 mb-2 text-[11px] font-semibold tracking-widest text-slate-400 uppercase">System</div>}
          <nav className="space-y-1">
            {bottomNav.map(item => (
              <Link key={item.name} to={item.href} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800", collapsed && "justify-center")}>
                <item.icon className="h-[18px] w-[18px]" />
                {!collapsed && <><span className="flex-1">{item.name}</span>{item.count && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{item.count}</span>}</>}
              </Link>
            ))}
          </nav>
        </div>

        {!collapsed && (
          <div className="mx-2 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-white dark:from-slate-800 dark:to-slate-900">
            <div className="text-[13px] font-semibold">Privacy Protected</div>
            <div className="mt-1 text-[12px] leading-relaxed text-slate-300">Patient data never leaves this hospital. Only encrypted model updates are shared.</div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-teal-300"><ShieldCheck className="h-3.5 w-3.5" /> Differential Privacy ON</div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <img src="https://i.pravatar.cc/100?img=33" alt="Dr" className="h-8 w-8 rounded-full" />
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium truncate">Dr. Priya Sharma</div>
                <div className="text-[11px] text-slate-500 truncate">Radiologist</div>
              </div>
              <LogOut className="h-4 w-4 text-slate-400" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
