import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { HospitalCard } from '@/components/HospitalCard'
import { api } from '@/services/api'
import { Hospital } from '@/types'
import { Search, Map, Filter, Building2, Activity, Database, Wifi, Globe } from 'lucide-react'

export function Hospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [filter, setFilter] = useState<'all' | Hospital['status']>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.getHospitals().then(setHospitals)
  }, [])

  const filtered = hospitals.filter(h => {
    const matchesFilter = filter === 'all' || h.status === filter
    const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase()) || h.location.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const statusCounts = {
    all: hospitals.length,
    active: hospitals.filter(h => h.status === 'active').length,
    training: hospitals.filter(h => h.status === 'training').length,
    syncing: hospitals.filter(h => h.status === 'syncing').length,
    offline: hospitals.filter(h => h.status === 'offline').length,
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Hospital Network</h1>
          <p className="text-[13px] text-slate-500 mt-1">24 participating institutions • Federated learning nodes • No patient data exposed</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="success" className="px-3 py-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block mr-1.5" />22 Active</Badge>
          <Badge variant="secondary" className="px-3 py-1"><Globe className="h-3 w-3 mr-1" />Pan-India Network</Badge>
        </div>
      </div>

      <Card className="p-5">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-[360px]"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input placeholder="Search hospitals, cities..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} /></div>
          <div className="flex flex-wrap gap-2">
            {(['all', 'active', 'training', 'syncing', 'offline'] as const).map(s => (
              <Button key={s} variant={filter === s ? 'default' : 'outline'} size="sm" className="rounded-full capitalize text-[12px]" onClick={() => setFilter(s)}>
                {s === 'all' ? 'All' : s} <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 rounded-full text-[10px]">{statusCounts[s]}</span>
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4"><div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-slate-500"><Building2 className="h-3.5 w-3.5" />Total Hospitals</div><div className="text-[22px] font-bold mt-1">{hospitals.length}</div><div className="text-[11px] text-slate-500">Across 12 states</div></Card>
        <Card className="p-4"><div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-slate-500"><Database className="h-3.5 w-3.5" />Total Scans Pool</div><div className="text-[22px] font-bold mt-1">78.4k</div><div className="text-[11px] text-slate-500">On-premise only</div></Card>
        <Card className="p-4"><div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-slate-500"><Activity className="h-3.5 w-3.5" />Avg Accuracy</div><div className="text-[22px] font-bold mt-1">90.4%</div><div className="text-[11px] text-slate-500">Local models</div></Card>
        <Card className="p-4"><div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-slate-500"><Wifi className="h-3.5 w-3.5" />Network Health</div><div className="text-[22px] font-bold mt-1">94%</div><div className="text-[11px] text-slate-500">Uptime last 30d</div></Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(h => <HospitalCard key={h.id} hospital={h} />)}
      </div>

      <Card className="p-6 bg-slate-900 text-white dark:bg-white dark:text-slate-900">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h3 className="text-[15px] font-semibold flex items-center gap-2"><Map className="h-4 w-4" />Network Map • Conceptual</h3>
            <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-1 max-w-[400px]">Hospitals shown are fictional demo institutions. No real patient data or hospital affiliations displayed. Map illustrates federated topology, not geographic precision.</p>
          </div>
          <div className="flex gap-6 text-[12px]">
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" />Active</div>
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500" />Training</div>
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-500" />Syncing</div>
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-slate-400" />Offline</div>
          </div>
        </div>
        <div className="mt-6 h-[200px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden dark:bg-slate-100 dark:border-slate-200">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative grid grid-cols-6 gap-8">
            {hospitals.slice(0, 12).map(h => (
              <div key={h.id} className="flex flex-col items-center gap-1">
                <div className={`h-3 w-3 rounded-full ${h.status === 'active' ? 'bg-emerald-400' : h.status === 'training' ? 'bg-amber-400' : h.status === 'syncing' ? 'bg-blue-400' : 'bg-slate-500'}`} />
                <span className="text-[9px] font-mono text-white/60 dark:text-slate-500">{h.id}</span>
              </div>
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-2xl bg-white text-slate-900 flex items-center justify-center font-bold text-[10px] shadow-large dark:bg-slate-900 dark:text-white">AGGREGATOR</div>
        </div>
      </Card>
    </div>
  )
}
