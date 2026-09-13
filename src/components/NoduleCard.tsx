import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Nodule } from '@/types'
import { MapPin, Activity, AlertTriangle } from 'lucide-react'

export function NoduleCard({ nodule, index }: { nodule: Nodule; index: number }) {
  const riskColor = {
    low: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-950 dark:text-emerald-300',
    moderate: 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-950 dark:text-amber-300',
    high: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-950 dark:text-red-300',
  }[nodule.risk]

  return (
    <Card className="p-5 hover:shadow-medium transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white text-[12px] font-mono font-semibold dark:bg-white dark:text-slate-900">
            #{index + 1}
          </div>
          <div>
            <div className="text-[14px] font-semibold">{nodule.location}</div>
            <div className="text-[12px] text-slate-500 flex items-center gap-1"><MapPin className="h-3 w-3" />{nodule.lobe} • {nodule.diameter}mm</div>
          </div>
        </div>
        <Badge className={`${riskColor} ring-1 border-0`}>{nodule.risk.toUpperCase()} RISK</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
          <div className="text-[11px] text-slate-500 uppercase tracking-wide font-medium">Diameter</div>
          <div className="text-[16px] font-semibold mt-1">{nodule.diameter} mm</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Vol: {nodule.volume} cm³</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
          <div className="text-[11px] text-slate-500 uppercase tracking-wide font-medium">Confidence</div>
          <div className="text-[16px] font-semibold mt-1">{nodule.confidence}%</div>
          <div className="w-full h-1 bg-slate-200 rounded-full mt-1.5 dark:bg-slate-700">
            <div className="h-1 bg-slate-900 rounded-full dark:bg-white" style={{ width: `${nodule.confidence}%` }} />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5"><Activity className="h-3.5 w-3.5" />Malignancy Probability</span>
          <span className="text-[13px] font-semibold">{nodule.malignancyProbability}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
          <div
            className={`h-2 rounded-full transition-all ${nodule.risk === 'high' ? 'bg-red-500' : nodule.risk === 'moderate' ? 'bg-amber-500' : 'bg-emerald-500'}`}
            style={{ width: `${nodule.malignancyProbability}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {nodule.characteristics.map(c => (
          <span key={c} className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{c}</span>
        ))}
      </div>

      {nodule.risk === 'high' && (
        <div className="mt-4 flex gap-2 rounded-xl bg-red-50 p-3 text-[12px] text-red-800 dark:bg-red-950/30 dark:text-red-300">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>High-risk features: spiculated margins and pleural tagging suggest further evaluation.</span>
        </div>
      )}
    </Card>
  )
}
