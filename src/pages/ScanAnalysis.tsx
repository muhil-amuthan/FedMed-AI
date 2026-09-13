import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScanViewer } from '@/components/ScanViewer'
import { NoduleCard } from '@/components/NoduleCard'
import { ReportCard } from '@/components/ReportCard'
import { api } from '@/services/api'
import { Nodule } from '@/types'
import { sampleReport, sampleNodules } from '@/services/mockData'
import { Upload, Shield, File, X, CheckCircle2, Loader2, Brain, Activity, Lock, AlertTriangle } from 'lucide-react'
import { useToast } from '@/components/ui/toast'

export function ScanAnalysis() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState('')
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<{ nodules: Nodule[] } | null>(null)
  const { toast } = useToast()

  const handleUpload = async () => {
    if (!file) return
    setProcessing(true)
    setResults(null)
    setProgress(0)
    try {
      const res = await api.analyzeScan(file, (step, prog) => {
        setCurrentStep(step)
        setProgress(prog)
      })
      setResults(res)
      toast({ title: 'Analysis complete', description: `Found ${res.nodules.length} nodules • Demo data`, variant: 'success' })
    } catch (e) {
      toast({ title: 'Analysis failed', description: 'Please try again', variant: 'error' })
    } finally {
      setProcessing(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) setFile(f)
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">CT Scan Analysis</h1>
          <p className="text-[13px] text-slate-500 mt-1 flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-emerald-600" />Privacy Protected • Scan analysis occurs locally. Patient data is not uploaded to a central server.</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1"><Lock className="h-3 w-3 mr-1" />Local Processing Only</Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {!results && (
            <Card className="p-8">
              <div
                onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative rounded-2xl border-2 border-dashed p-10 text-center transition-all ${isDragging ? 'border-slate-900 bg-slate-50 dark:border-white dark:bg-slate-900' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                  <Upload className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-[18px] font-semibold">Upload CT Scan for Local AI Analysis</h3>
                <p className="mt-2 text-[13px] text-slate-500 max-w-[400px] mx-auto">Supported demo formats: DICOM (.dcm), ZIP, NIfTI (.nii.gz). All processing happens on-premise.</p>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {['DICOM', 'ZIP', 'NIfTI'].map(f => (
                    <span key={f} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium dark:bg-slate-800">{f}</span>
                  ))}
                </div>

                <div className="mt-8">
                  <input type="file" id="ct-upload" className="hidden" accept=".dcm,.zip,.nii,.nii.gz" onChange={e => setFile(e.target.files?.[0] || null)} />
                  <label htmlFor="ct-upload"><Button variant="outline" className="rounded-xl" asChild><span><File className="h-4 w-4" />Choose File</span></Button></label>
                </div>

                {file && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 mx-auto max-w-[360px] rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-3 dark:border-slate-800 dark:bg-slate-900 text-left">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center dark:bg-slate-800"><File className="h-5 w-5" /></div>
                    <div className="flex-1 min-w-0"><div className="text-[13px] font-medium truncate">{file.name}</div><div className="text-[11px] text-slate-500">{(file.size / 1024 / 1024).toFixed(1)} MB • Ready for local analysis</div></div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFile(null)}><X className="h-4 w-4" /></Button>
                  </motion.div>
                )}

                {file && !processing && (
                  <div className="mt-6">
                    <Button size="lg" className="rounded-xl px-8" onClick={handleUpload}><Brain className="h-4 w-4" />Start Local AI Analysis</Button>
                    <p className="mt-3 text-[11px] text-slate-500">Demo mode • Uses simulated data • No real patient data leaves hospital</p>
                  </div>
                )}

                <AnimatePresence>
                  {processing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-left max-w-[420px] mx-auto rounded-2xl bg-slate-900 p-5 text-white dark:bg-white dark:text-slate-900">
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <div className="text-[14px] font-medium">Processing CT Volume Locally...</div>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="flex justify-between text-[12px]"><span className="text-slate-300 dark:text-slate-500">{currentStep}</span><span className="font-mono">{Math.round(progress)}%</span></div>
                        <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden dark:bg-slate-200"><div className="h-1.5 bg-white rounded-full transition-all duration-500 dark:bg-slate-900" style={{ width: `${progress}%` }} /></div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5"><Lock className="h-3 w-3" />Encrypted processing • No data exfiltration</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-3">
                {[
                  { title: '3D U-Net Segmentation', desc: 'Volumetric nodule detection' },
                  { title: 'Malignancy Scoring', desc: 'AI risk probability 0-100%' },
                  { title: 'Structured Report', desc: 'Fleischner guideline compliant' },
                ].map(c => (
                  <div key={c.title} className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50"><div className="text-[13px] font-semibold">{c.title}</div><div className="text-[11.5px] text-slate-500 mt-1">{c.desc}</div></div>
                ))}
              </div>
            </Card>
          )}

          {results && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-[18px] font-semibold">Detection Results • Demo Data</h2>
                <Button variant="outline" size="sm" onClick={() => { setResults(null); setFile(null) }}>Analyze Another Scan</Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {results.nodules.map((n, i) => <NoduleCard key={n.id} nodule={n} index={i} />)}
              </div>
            </>
          )}

          {results && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-3 dark:bg-amber-950/20 dark:border-amber-900">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
              <div className="text-[12.5px] leading-relaxed text-amber-900 dark:text-amber-200"><span className="font-semibold">Research Prototype Disclaimer:</span> This is an AI-assisted research prototype and not a medical diagnosis. Results must be reviewed by a qualified clinician. All data shown is simulated.</div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <ScanViewer />

          <Card className="p-5">
            <h3 className="text-[14px] font-semibold flex items-center gap-2"><Activity className="h-4 w-4" />Analysis Pipeline</h3>
            <div className="mt-4 space-y-3">
              {[
                { name: 'Loading CT volume', status: results || processing ? 'done' : 'pending' },
                { name: 'Preprocessing', status: results || (processing && progress > 20) ? 'done' : processing ? 'active' : 'pending' },
                { name: '3D U-Net segmentation', status: results || (processing && progress > 40) ? 'done' : processing && progress > 20 ? 'active' : 'pending' },
                { name: 'Nodule detection', status: results || (processing && progress > 60) ? 'done' : processing && progress > 40 ? 'active' : 'pending' },
                { name: 'Risk scoring', status: results || (processing && progress > 80) ? 'done' : processing && progress > 60 ? 'active' : 'pending' },
                { name: 'Generating summary', status: results ? 'done' : processing && progress > 80 ? 'active' : 'pending' },
              ].map(s => (
                <div key={s.name} className="flex items-center gap-3 text-[12.5px]">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${s.status === 'done' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : s.status === 'active' ? 'bg-blue-100 text-blue-700 animate-pulse dark:bg-blue-900' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                    {s.status === 'done' ? <CheckCircle2 className="h-4 w-4" /> : s.status === 'active' ? <Loader2 className="h-3 w-3 animate-spin" /> : <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />}
                  </div>
                  <span className={s.status === 'done' ? 'font-medium' : s.status === 'active' ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-500'}>{s.name}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 bg-slate-900 text-white dark:bg-white dark:text-slate-900">
            <h3 className="text-[13px] font-semibold">Privacy Guarantee</h3>
            <p className="mt-2 text-[12px] leading-relaxed text-slate-300 dark:text-slate-600">This scan is processed entirely within AIIMS Delhi's secure environment. No pixel data, metadata, or patient identifiers leave the hospital network.</p>
            <div className="mt-4 space-y-2 text-[11px]">
              <div className="flex justify-between"><span className="text-slate-400">Data location</span><span className="font-medium">On-premise only</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Encryption</span><span className="font-medium">AES-256 + TLS 1.3</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Audit log</span><span className="font-medium">Immutable • HIPAA</span></div>
            </div>
          </Card>
        </div>
      </div>

      {results && (
        <div className="max-w-[900px]">
          <ReportCard report={{ ...sampleReport, scanId: 'CT-2024-DEMO' }} />
        </div>
      )}
    </div>
  )
}
