import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AIReport } from '@/types'
import { FileText, Copy, Download, Share2, Globe, Clock, Shield } from 'lucide-react'
import { useToast } from '@/components/ui/toast'

export function ReportCard({ report }: { report: AIReport }) {
  const { toast } = useToast()

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-slate-200 p-5 dark:border-slate-800">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900"><FileText className="h-5 w-5" /></div>
            <div>
              <div className="text-[15px] font-semibold">AI-Assisted Clinical Summary</div>
              <div className="text-[12px] text-slate-500 flex items-center gap-2 mt-1"><Clock className="h-3 w-3" />{new Date(report.generatedAt).toLocaleString()} • Confidence {report.confidence}% • <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{report.language.toUpperCase()}</span></div>
            </div>
          </div>
          <Badge variant="secondary" className="font-mono text-[11px]">{report.id}</Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1"><div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Scan ID</div><div className="text-[13px] font-mono font-medium">{report.scanId}</div></div>
          <div className="space-y-1"><div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Hospital</div><div className="text-[13px] font-medium">AIIMS Delhi</div></div>
          <div className="space-y-1"><div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Modality</div><div className="text-[13px] font-medium">CT Chest</div></div>
          <div className="space-y-1"><div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">AI Model</div><div className="text-[13px] font-medium">3D U-Net v2.4</div></div>
        </div>

        <div className="space-y-3">
          <h4 className="text-[13px] font-semibold uppercase tracking-wide text-slate-900 dark:text-white">Findings</h4>
          <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 rounded-xl p-4 dark:bg-slate-800/50">{report.findings}</p>
        </div>

        <div className="space-y-3">
          <h4 className="text-[13px] font-semibold uppercase tracking-wide">Risk Assessment</h4>
          <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300">{report.riskAssessment}</p>
        </div>

        <div className="space-y-3">
          <h4 className="text-[13px] font-semibold uppercase tracking-wide">AI Summary</h4>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300">{report.summary}</p>
          </div>
        </div>

        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 dark:bg-amber-950/20 dark:border-amber-900">
          <div className="text-[12px] font-semibold text-amber-900 dark:text-amber-200 uppercase tracking-wide mb-1">Recommendation</div>
          <p className="text-[13px] leading-relaxed text-amber-800 dark:text-amber-300">{report.recommendation}</p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-slate-900 text-white p-3 text-[11px] dark:bg-white dark:text-slate-900">
          <Shield className="h-4 w-4" />
          <span>This is an AI-assisted research prototype and not a medical diagnosis. Results must be reviewed by a qualified clinician.</span>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4 flex flex-wrap gap-2 dark:border-slate-800 dark:bg-slate-900/50">
        <Button size="sm" onClick={() => toast({ title: 'PDF exported', description: 'Report saved to downloads', variant: 'success' })}><Download className="h-4 w-4" />Export PDF</Button>
        <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(report.summary); toast({ title: 'Copied to clipboard', variant: 'success' }) }}><Copy className="h-4 w-4" />Copy Report</Button>
        <Button size="sm" variant="outline" onClick={() => toast({ title: 'Shared with clinical team', description: 'Report sent to pulmonology', variant: 'success' })}><Share2 className="h-4 w-4" />Share</Button>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => toast({ title: 'Language changed to Hindi', description: 'Report translated', variant: 'success' })}>हिन्दी</Button>
          <Button size="sm" variant="ghost" onClick={() => toast({ title: 'Language changed to Tamil', description: 'Report translated', variant: 'success' })}>தமிழ்</Button>
        </div>
      </div>
    </Card>
  )
}
