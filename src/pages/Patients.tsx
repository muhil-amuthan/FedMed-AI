import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Shield, FileText, Calendar, AlertTriangle } from 'lucide-react'

export function Patients() {
  return (
    <div className="p-6 lg:p-8 max-w-[1280px] mx-auto space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Patients • Demo Data</h1>
          <p className="text-[13px] text-slate-500 mt-1">De-identified patient records • No real PHI • Research prototype</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1"><Shield className="h-3 w-3 mr-1" />De-identified • On-premise only</Badge>
      </div>

      <Card className="p-4 flex gap-3">
        <div className="relative flex-1 max-w-[320px]"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input placeholder="Search patient ID, scan..." className="pl-9" /></div>
        <Button variant="outline" size="sm"><Calendar className="h-4 w-4" />Date Range</Button>
        <Button variant="outline" size="sm"><FileText className="h-4 w-4" />Export</Button>
      </Card>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-3 dark:bg-amber-950/20 dark:border-amber-900">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
        <div className="text-[12.5px] text-amber-900 dark:text-amber-200"><span className="font-semibold">Privacy Notice:</span> This is simulated demo data. No real patient information is displayed. In production, all patient data remains within hospital premises and is never exposed to central servers.</div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500 dark:bg-slate-800/50">
              <tr><th className="text-left px-4 py-3 font-medium">Patient ID</th><th className="text-left px-4 py-3 font-medium">Age</th><th className="text-left px-4 py-3 font-medium">Last Scan</th><th className="text-left px-4 py-3 font-medium">Scans</th><th className="text-left px-4 py-3 font-medium">Nodules</th><th className="text-left px-4 py-3 font-medium">Risk</th><th className="text-left px-4 py-3 font-medium">Status</th></tr>
            </thead>
            <tbody>
              {[
                { id: 'P-8842', age: 62, lastScan: 'Jan 15, 2024', scans: 3, nodules: 2, risk: 'high', status: 'review' },
                { id: 'P-8841', age: 54, lastScan: 'Jan 14, 2024', scans: 1, nodules: 0, risk: 'low', status: 'completed' },
                { id: 'P-8840', age: 68, lastScan: 'Jan 14, 2024', scans: 2, nodules: 1, risk: 'moderate', status: 'followup' },
                { id: 'P-8839', age: 45, lastScan: 'Jan 13, 2024', scans: 1, nodules: 0, risk: 'low', status: 'completed' },
              ].map(p => (
                <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-mono font-medium">{p.id}</td>
                  <td className="px-4 py-3">{p.age}</td>
                  <td className="px-4 py-3 text-slate-500">{p.lastScan}</td>
                  <td className="px-4 py-3">{p.scans}</td>
                  <td className="px-4 py-3">{p.nodules}</td>
                  <td className="px-4 py-3"><Badge variant={p.risk === 'high' ? 'danger' : p.risk === 'moderate' ? 'warning' : 'success'} className="text-[10px]">{p.risk}</Badge></td>
                  <td className="px-4 py-3"><Badge variant="secondary" className="text-[10px]">{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
