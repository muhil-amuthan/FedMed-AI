import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { datasets } from '@/services/mockData'
import { Database, Users, FileText, Shield, ExternalLink, CheckCircle2, Lock } from 'lucide-react'

export function Datasets() {
  return (
    <div className="p-6 lg:p-8 max-w-[1280px] mx-auto space-y-6">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">Datasets</h1>
        <p className="text-[13px] text-slate-500 mt-1">Public research datasets and federated hospital data pools • All patient data stays on-premise</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {datasets.map(ds => (
          <Card key={ds.name} className="p-6 hover:shadow-medium transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center dark:bg-white dark:text-slate-900"><Database className="h-5 w-5" /></div>
              <Badge variant={ds.status === 'active' ? 'success' : ds.status === 'federated' ? 'secondary' : 'outline'} className="text-[10px]">{ds.status}</Badge>
            </div>
            <h3 className="text-[16px] font-semibold">{ds.name}</h3>
            <p className="text-[12px] text-slate-500 mt-1">{ds.purpose}</p>
            <p className="text-[12.5px] text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">{ds.description}</p>
            
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50"><div className="text-[16px] font-bold">{ds.scans.toLocaleString()}</div><div className="text-[10px] text-slate-500 uppercase">Scans</div></div>
              <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50"><div className="text-[16px] font-bold">{ds.patients.toLocaleString()}</div><div className="text-[10px] text-slate-500 uppercase">Patients</div></div>
              <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50"><div className="text-[16px] font-bold">{ds.nodules.toLocaleString()}</div><div className="text-[10px] text-slate-500 uppercase">Nodules</div></div>
            </div>

            <div className="mt-5 space-y-2 text-[12px]">
              <div className="flex justify-between"><span className="text-slate-500">Usage</span><span className="font-medium">{ds.usage}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Privacy</span><span className="font-medium flex items-center gap-1"><Lock className="h-3 w-3" />{ds.status === 'federated' ? 'On-premise only' : 'De-identified public'}</span></div>
            </div>

            <div className="mt-5 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1"><FileText className="h-4 w-4" />Docs</Button>
              <Button variant="ghost" size="sm" className="flex-1"><ExternalLink className="h-4 w-4" />Source</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-[15px] font-semibold flex items-center gap-2"><Shield className="h-4 w-4" />Data Governance & Privacy</h3>
        <div className="mt-4 grid md:grid-cols-3 gap-6 text-[13px]">
          <div className="space-y-3">
            <h4 className="font-semibold text-[12px] uppercase tracking-wide text-slate-500">Public Datasets</h4>
            <div className="space-y-2">
              <div className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /><span>LIDC-IDRI and LUNA16 are de-identified public research datasets with IRB approval</span></div>
              <div className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /><span>Used for initial model training and benchmarking only</span></div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-[12px] uppercase tracking-wide text-slate-500">Hospital Data</h4>
            <div className="space-y-2">
              <div className="flex gap-2"><Lock className="h-4 w-4 text-slate-700 shrink-0" /><span>De-identified hospital CT data stays on-premise, never centralized</span></div>
              <div className="flex gap-2"><Shield className="h-4 w-4 text-slate-700 shrink-0" /><span>Federated learning ensures no raw patient data leaves hospital</span></div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-[12px] uppercase tracking-wide text-slate-500">Compliance</h4>
            <div className="space-y-2">
              <div className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /><span>Architecture aligns with HIPAA, GDPR, and India's DISHA principles</span></div>
              <div className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /><span>Audit logs and differential privacy for accountability</span></div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-slate-900 text-white dark:bg-white dark:text-slate-900">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-[14px] font-semibold">Future Scaling: From Pilot to National Infrastructure</h3>
            <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-1 max-w-[500px]">Project plans to use public datasets initially, followed by de-identified hospital CT data while keeping data on-premise. Designed to scale from 24 pilot hospitals to 1,000+ institutions.</p>
          </div>
          <div className="flex items-center gap-2 text-[12px]"><span>Pilot</span><span className="h-px w-8 bg-white/20 dark:bg-slate-300" /><span>Regional</span><span className="h-px w-8 bg-white/20 dark:bg-slate-300" /><span>National</span></div>
        </div>
      </Card>
    </div>
  )
}
