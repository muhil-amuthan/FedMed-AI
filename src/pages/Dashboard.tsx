import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { StatCard } from '@/components/StatCard'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrainingChart, ScansChart } from '@/components/TrainingChart'
import { api } from '@/services/api'
import { DashboardStats } from '@/types'
import { ScanSearch, Users, AlertTriangle, Building2, Cpu, TrendingUp, ArrowRight, Shield, Activity, Clock, Database } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    api.getDashboard().then(setStats)
  }, [])

  if (!stats) {
    return (
      <div className="p-6 lg:p-8 space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3 dark:bg-slate-800" />
        <div className="grid grid-cols-4 gap-4">{[1,2,3,4].map(i => <div key={i} className="h-28 bg-slate-200 rounded-2xl dark:bg-slate-800" />)}</div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Clinical Overview</h1>
          <p className="text-[13px] text-slate-500 mt-1 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />Live federated network • Round 18 • Demo data • Not a medical diagnosis</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="px-3 py-1"><Shield className="h-3 w-3 mr-1" />Privacy ON</Badge>
          <Link to="/scan-analysis"><Button size="sm"><ScanSearch className="h-4 w-4" />Analyze CT Scan</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <StatCard title="Total CT Scans" value={stats.totalScans.toLocaleString()} change="+12% this week" changeType="positive" icon={Database} />
        <StatCard title="Scans Analyzed" value={stats.scansAnalyzed.toLocaleString()} description="91.3% of total" icon={Activity} />
        <StatCard title="Suspicious Cases" value={stats.suspiciousCases} change="+3 flagged today" changeType="negative" icon={AlertTriangle} variant="teal" />
        <StatCard title="Federated Hospitals" value={stats.federatedHospitals} description="22 active now" icon={Building2} />
        <StatCard title="Current Round" value={`Round ${stats.currentRound}`} description="72% progress • 18/25" icon={Cpu} />
        <StatCard title="Model Accuracy" value={`${stats.modelAccuracy}%`} change="+1.1% vs R17" changeType="positive" icon={TrendingUp} variant="dark" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TrainingChart data={stats.trainingProgress} />
          <ScansChart data={stats.dailyScans} />
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="text-[14px] font-semibold flex items-center gap-2"><Activity className="h-4 w-4" />Recent Activity</h3>
            <div className="mt-4 space-y-3">
              {[
                { time: '2h ago', title: 'Round 18 completed', desc: '94.7% accuracy • 22 updates', type: 'success' },
                { time: '5h ago', title: 'New nodule detected', desc: 'CT-2024-1284 • RUL 12.4mm high risk', type: 'warning' },
                { time: '1d ago', title: 'Model v2.4.1 deployed', desc: 'Global model redistributed', type: 'info' },
                { time: '1d ago', title: 'Privacy audit passed', desc: 'ε=2.3 within budget', type: 'success' },
              ].map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${a.type === 'success' ? 'bg-emerald-500' : a.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium">{a.title}</div>
                    <div className="text-[11.5px] text-slate-500">{a.desc}</div>
                  </div>
                  <div className="text-[10px] text-slate-400">{a.time}</div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">View all activity <ArrowRight className="h-3 w-3" /></Button>
          </Card>

          <Card className="p-5 bg-slate-900 text-white dark:bg-white dark:text-slate-900">
            <h3 className="text-[14px] font-semibold flex items-center gap-2"><Shield className="h-4 w-4" />Privacy Status</h3>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-[12px]"><span className="text-slate-400 dark:text-slate-500">Local Processing</span><span className="font-medium text-emerald-400 dark:text-emerald-600">100% ✓</span></div>
              <div className="flex justify-between text-[12px]"><span className="text-slate-400 dark:text-slate-500">Encrypted Updates</span><span className="font-medium">22/24 received</span></div>
              <div className="flex justify-between text-[12px]"><span className="text-slate-400 dark:text-slate-500">Differential Privacy</span><span className="font-medium">ε=2.3 ON</span></div>
              <div className="flex justify-between text-[12px]"><span className="text-slate-400 dark:text-slate-500">Attack Risk</span><span className="font-medium text-emerald-400">18% low</span></div>
            </div>
            <div className="mt-4 rounded-xl bg-white/10 p-3 text-[11px] leading-relaxed dark:bg-slate-100">Raw patient CT scans never leave this hospital. Only encrypted gradients shared.</div>
          </Card>

          <Card className="p-5">
            <h3 className="text-[14px] font-semibold">Quick Actions</h3>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link to="/scan-analysis"><Button variant="outline" size="sm" className="w-full justify-start"><ScanSearch className="h-4 w-4" />Analyze</Button></Link>
              <Link to="/reports"><Button variant="outline" size="sm" className="w-full justify-start"><Users className="h-4 w-4" />Reports</Button></Link>
              <Link to="/federated-learning"><Button variant="outline" size="sm" className="w-full justify-start"><Cpu className="h-4 w-4" />Federated</Button></Link>
              <Link to="/privacy"><Button variant="outline" size="sm" className="w-full justify-start"><Shield className="h-4 w-4" />Privacy</Button></Link>
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-semibold flex items-center gap-2"><Clock className="h-4 w-4" />Recent CT Scans • Demo Data</h3>
          <Link to="/scan-analysis"><Button variant="ghost" size="sm">View all <ArrowRight className="h-3 w-3" /></Button></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr><th className="text-left py-2 font-medium">Scan ID</th><th className="text-left py-2 font-medium">Patient</th><th className="text-left py-2 font-medium">Date</th><th className="text-left py-2 font-medium">Status</th><th className="text-left py-2 font-medium">Nodules</th><th className="text-left py-2 font-medium">Risk</th></tr>
            </thead>
            <tbody>
              {[
                { id: 'CT-2024-1284', patient: 'P-8842', date: 'Jan 15', status: 'completed', nodules: 2, risk: 'high' },
                { id: 'CT-2024-1283', patient: 'P-8841', date: 'Jan 14', status: 'completed', nodules: 0, risk: 'low' },
                { id: 'CT-2024-1282', patient: 'P-8840', date: 'Jan 14', status: 'completed', nodules: 1, risk: 'moderate' },
              ].map(r => (
                <tr key={r.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="py-3 font-mono text-[12px] font-medium">{r.id}</td>
                  <td className="py-3 font-mono text-[12px]">{r.patient}</td>
                  <td className="py-3 text-[12px] text-slate-500">{r.date}</td>
                  <td className="py-3"><Badge variant={r.status === 'completed' ? 'success' : 'secondary'} className="text-[10px]">{r.status}</Badge></td>
                  <td className="py-3">{r.nodules}</td>
                  <td className="py-3"><Badge variant={r.risk === 'high' ? 'danger' : r.risk === 'moderate' ? 'warning' : 'success'} className="text-[10px]">{r.risk}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
