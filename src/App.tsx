import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { AIChat } from '@/components/AIChat'
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { Dashboard } from '@/pages/Dashboard'
import { ScanAnalysis } from '@/pages/ScanAnalysis'
import { Reports } from '@/pages/Reports'
import { FederatedLearning } from '@/pages/FederatedLearning'
import { Hospitals } from '@/pages/Hospitals'
import { Performance } from '@/pages/Performance'
import { Privacy } from '@/pages/Privacy'
import { Datasets } from '@/pages/Datasets'
import { Settings } from '@/pages/Settings'
import { Patients } from '@/pages/Patients'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)} />
      <div className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex h-[64px] items-center gap-3 border-b border-slate-200 bg-white px-4 lg:px-6 dark:border-slate-800 dark:bg-slate-900">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex-1 lg:hidden font-semibold text-[14px]">FedMed AI</div>
          <div className="hidden lg:flex items-center gap-2 text-[12px] text-slate-500">
            <span>AIIMS Delhi</span><span className="h-1 w-1 rounded-full bg-slate-300" /><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />Federated Round 18</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[11px] text-amber-800 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-200">Demo Mode • Not a medical device</div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <AIChat />
    </div>
  )
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <main>{children}</main>
      <AIChat />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/scan-analysis" element={<DashboardLayout><ScanAnalysis /></DashboardLayout>} />
        <Route path="/reports" element={<DashboardLayout><Reports /></DashboardLayout>} />
        <Route path="/federated-learning" element={<DashboardLayout><FederatedLearning /></DashboardLayout>} />
        <Route path="/hospitals" element={<DashboardLayout><Hospitals /></DashboardLayout>} />
        <Route path="/performance" element={<DashboardLayout><Performance /></DashboardLayout>} />
        <Route path="/privacy" element={<DashboardLayout><Privacy /></DashboardLayout>} />
        <Route path="/datasets" element={<DashboardLayout><Datasets /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
        <Route path="/patients" element={<DashboardLayout><Patients /></DashboardLayout>} />
        {/* Redirects for spec routes */}
        <Route path="/scan-analysis" element={<DashboardLayout><ScanAnalysis /></DashboardLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
