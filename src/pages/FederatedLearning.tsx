import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FederatedNetwork } from '@/components/FederatedNetwork'
import { api } from '@/services/api'
import { FederatedRound, Hospital } from '@/types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Cpu, Lock, Shield, Building2, Activity, Clock, CheckCircle2, Loader2, ArrowRight, Zap } from 'lucide-react'

export function FederatedLearning() {
  const [rounds, setRounds] = useState<FederatedRound[]>([])
  const [hospitals, setHospitals] = useState<Hospital[]>([])

  useEffect(() => {
    api.getFederatedRounds().then(setRounds)
    api.getHospitals().then(setHospitals)
  }, [])

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Federated Learning Dashboard</h1>
          <p className="text-[13px] text-slate-500 mt-1">Collaborative training without sharing patient data • Live network visualization</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="success" className="px-3 py-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block mr-1.5" />Round 18 Live</Badge>
          <Badge variant="secondary" className="px-3 py-1">72% • 18/25</Badge>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[15px] font-semibold">Federated Network Topology</h3>
          <div className="flex items-center gap-2 text-[11px] text-slate-500"><Lock className="h-3 w-3" />Encrypted model updates only • Raw CT scans never transferred</div>
        </div>
        <FederatedNetwork />
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {[
            { label: 'Hospitals', value: '24', sub: '22 active' },
            { label: 'Current Round', value: '18 / 25', sub: '72% progress' },
            { label: 'Updates Received', value: '22', sub: 'of 24 expected' },
            { label: 'Global Accuracy', value: '94.7%', sub: '+1.1% vs R17' },
            { label: 'Privacy', value: 'ε=2.3', sub: 'DP enabled' },
          ].map(s => (
            <div key={s.label} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50"><div className="text-[11px] uppercase tracking-wide text-slate-500">{s.label}</div><div className="text-[18px] font-bold mt-1">{s.value}</div><div className="text-[11px] text-slate-500">{s.sub}</div></div>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-[14px] font-semibold mb-6">Training Progress • Accuracy & Loss</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rounds}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                  <XAxis dataKey="round" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="accuracy" stroke="#0f172a" strokeWidth={2.5} dot={{ r: 3 }} name="Accuracy %" />
                  <Line type="monotone" dataKey="loss" stroke="#14b8a6" strokeWidth={2} dot={{ r: 3 }} name="Loss" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex gap-2 text-[11px]"><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-900" />Accuracy</span><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-teal-500" />Loss</span><span className="ml-auto text-slate-500">Demo values • Not validated benchmark</span></div>
          </Card>

          <Card className="p-6">
            <h3 className="text-[14px] font-semibold mb-4">Training Timeline</h3>
            <div className="space-y-3">
              {rounds.slice().reverse().map(r => (
                <div key={r.round} className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-mono text-[12px] dark:bg-white dark:text-slate-900">R{r.round}</div>
                  <div className="flex-1 grid grid-cols-4 gap-4 text-[12px]">
                    <div><div className="text-[11px] text-slate-500 uppercase">Accuracy</div><div className="font-semibold">{r.accuracy}%</div></div>
                    <div><div className="text-[11px] text-slate-500 uppercase">Loss</div><div className="font-semibold">{r.loss}</div></div>
                    <div><div className="text-[11px] text-slate-500 uppercase">Hospitals</div><div className="font-semibold">{r.participatingHospitals}</div></div>
                    <div><div className="text-[11px] text-slate-500 uppercase">Duration</div><div className="font-semibold">{r.duration} min</div></div>
                  </div>
                  <Badge variant={r.round === 18 ? 'success' : 'secondary'} className="text-[10px]">{r.round === 18 ? 'Current' : 'Completed'}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="text-[14px] font-semibold flex items-center gap-2"><Activity className="h-4 w-4" />Aggregation Status</h3>
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-[12px] mb-2"><span>Progress</span><span className="font-mono font-medium">72% • 18/25 rounds</span></div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800"><div className="h-2 bg-slate-900 rounded-full dark:bg-white" style={{ width: '72%' }} /></div>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Local training', status: 'completed', count: '24/24' },
                  { name: 'Encrypted upload', status: 'completed', count: '22/24' },
                  { name: 'Secure aggregation', status: 'active', count: 'In progress' },
                  { name: 'Global redistribution', status: 'pending', count: 'Queued' },
                ].map(s => (
                  <div key={s.name} className="flex items-center justify-between text-[12px]">
                    <div className="flex items-center gap-2"><div className={`h-5 w-5 rounded-full flex items-center justify-center ${s.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : s.status === 'active' ? 'bg-blue-100 text-blue-700 animate-pulse' : 'bg-slate-100 text-slate-400'}`}>{s.status === 'completed' ? <CheckCircle2 className="h-3.5 w-3.5" /> : s.status === 'active' ? <Loader2 className="h-3 w-3 animate-spin" /> : <Clock className="h-3 w-3" />}</div><span className={s.status === 'completed' ? '' : s.status === 'active' ? 'font-medium' : 'text-slate-500'}>{s.name}</span></div>
                    <span className="text-[11px] text-slate-500">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-[14px] font-semibold flex items-center gap-2"><Building2 className="h-4 w-4" />Participating Hospitals</h3>
            <div className="mt-4 space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {hospitals.slice(0, 8).map(h => (
                <div key={h.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
                  <div className="flex items-center gap-2.5"><span className={`h-2 w-2 rounded-full ${h.status === 'active' ? 'bg-emerald-500' : h.status === 'training' ? 'bg-amber-500 animate-pulse' : h.status === 'syncing' ? 'bg-blue-500' : 'bg-slate-300'}`} /><div><div className="text-[12px] font-medium">{h.name}</div><div className="text-[10px] text-slate-500">{h.datasetSize.toLocaleString()} scans • {h.localAccuracy}%</div></div></div>
                  <Badge variant="secondary" className="text-[10px] font-mono">{h.id}</Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3">View all 24 <ArrowRight className="h-3 w-3" /></Button>
          </Card>

          <Card className="p-5 bg-slate-900 text-white dark:bg-white dark:text-slate-900">
            <h3 className="text-[13px] font-semibold flex items-center gap-2"><Shield className="h-4 w-4" />Security Model</h3>
            <div className="mt-3 space-y-2.5 text-[12px] leading-relaxed">
              <div className="flex gap-2"><Lock className="h-4 w-4 text-teal-400 shrink-0" /><span className="text-slate-300 dark:text-slate-600">Model updates encrypted with homomorphic encryption before transmission.</span></div>
              <div className="flex gap-2"><Cpu className="h-4 w-4 text-teal-400 shrink-0" /><span className="text-slate-300 dark:text-slate-600">Aggregator cannot inspect individual hospital contributions.</span></div>
              <div className="flex gap-2"><Zap className="h-4 w-4 text-teal-400 shrink-0" /><span className="text-slate-300 dark:text-slate-600">Differential privacy noise added: ε=2.3, δ=1e-5.</span></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
