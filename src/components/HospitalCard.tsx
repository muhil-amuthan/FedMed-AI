import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Hospital } from '@/types'
import { MapPin, Database, Activity, Wifi } from 'lucide-react'

export function HospitalCard({ hospital }: { hospital: Hospital }) {
  const statusMap = {
    active: { label: 'Active', color: 'bg-emerald-500', badge: 'success' as const },
    training: { label: 'Training', color: 'bg-amber-500', badge: 'warning' as const },
    syncing: { label: 'Synchronizing', color: 'bg-blue-500', badge: 'secondary' as const },
    offline: { label: 'Offline', color: 'bg-slate-300', badge: 'secondary' as const },
  }
  const s = statusMap[hospital.status]

  return (
    <Card className="p-5 hover:shadow-medium transition-all hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-mono text-[11px] font-bold dark:bg-slate-800">{hospital.id}</div>
          <div>
            <div className="text-[14px] font-semibold leading-tight">{hospital.name}</div>
            <div className="text-[12px] text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" />{hospital.location}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${s.color} ${hospital.status !== 'offline' ? 'animate-pulse' : ''}`} />
          <Badge variant={s.badge as any} className="text-[10px]">{s.label}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
          <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase tracking-wide"><Database className="h-3 w-3" />Dataset</div>
          <div className="text-[14px] font-semibold mt-1">{hospital.datasetSize.toLocaleString()}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
          <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase tracking-wide"><Activity className="h-3 w-3" />Accuracy</div>
          <div className="text-[14px] font-semibold mt-1">{hospital.localAccuracy}%</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
          <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase tracking-wide"><Wifi className="h-3 w-3" />Conn</div>
          <div className="text-[14px] font-semibold mt-1">{hospital.connectionQuality}%</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
        <span>Last round: {hospital.lastTrainingRound}</span>
        <span>{hospital.scansContributed} scans contributed</span>
      </div>
      <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
        <div className="h-1 bg-slate-900 rounded-full dark:bg-white" style={{ width: `${hospital.connectionQuality}%` }} />
      </div>
    </Card>
  )
}
