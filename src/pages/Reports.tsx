import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ReportCard } from '@/components/ReportCard'
import { sampleReport } from '@/services/mockData'
import { FileText, Search, Filter, Calendar, User, Building2 } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function Reports() {
  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">AI Reports</h1>
          <p className="text-[13px] text-slate-500 mt-1">Generated clinical summaries • Multilingual • Demo data</p>
        </div>
        <div className="flex gap-2">
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input placeholder="Search reports..." className="pl-9 w-[240px]" /></div>
          <Button variant="outline" size="sm"><Filter className="h-4 w-4" />Filter</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-[13px] font-semibold uppercase tracking-wide text-slate-500">Recent Reports • 12 total</h3>
          {[
            { id: 'RPT-1284', scan: 'CT-1284', date: 'Jan 15', risk: 'high', hospital: 'AIIMS Delhi' },
            { id: 'RPT-1283', scan: 'CT-1283', date: 'Jan 14', risk: 'low', hospital: 'Tata Mumbai' },
            { id: 'RPT-1282', scan: 'CT-1282', date: 'Jan 14', risk: 'moderate', hospital: 'Apollo Chennai' },
            { id: 'RPT-1281', scan: 'CT-1281', date: 'Jan 13', risk: 'low', hospital: 'Fortis BLR' },
          ].map(r => (
            <Card key={r.id} className="p-4 hover:shadow-medium cursor-pointer border-slate-900 dark:border-white">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2"><div className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center dark:bg-white dark:text-slate-900"><FileText className="h-4 w-4" /></div><div><div className="text-[13px] font-semibold font-mono">{r.id}</div><div className="text-[11px] text-slate-500">{r.scan} • {r.date}</div></div></div>
                <Badge variant={r.risk === 'high' ? 'danger' : r.risk === 'moderate' ? 'warning' : 'success'} className="text-[10px]">{r.risk}</Badge>
              </div>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500"><Building2 className="h-3 w-3" />{r.hospital}</div>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-2">
          <ReportCard report={sampleReport} />
        </div>
      </div>
    </div>
  )
}
