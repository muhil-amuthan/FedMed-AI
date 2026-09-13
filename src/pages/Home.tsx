import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FederatedNetwork } from '@/components/FederatedNetwork'
import { ArrowRight, Shield, Lock, Brain, FileText, Globe, Cpu, Database, CheckCircle2, AlertTriangle, Zap, Heart, Building2, BarChart3, Eye } from 'lucide-react'

const stats = [
  { value: '100%', label: 'Local Data Processing', desc: 'Patient CTs never leave hospital' },
  { value: 'Encrypted', label: 'Model Updates', desc: 'Secure aggregation protocol' },
  { value: '24', label: 'Federated Hospitals', desc: 'Pilot network live' },
  { value: 'Differential', label: 'Privacy', desc: 'ε=2.3, δ=1e-5 protection' },
  { value: 'Multilingual', label: 'Reporting', desc: 'EN, HI, TA + more' },
  { value: 'Low-BW', label: 'Ready', desc: 'Optimized for rural clinics' },
]

const workflow = [
  { step: '01', title: 'Local CT Analysis', desc: 'Hospital analyzes CT scans locally using on-premise infrastructure. No cloud upload required.', icon: Database },
  { step: '02', title: 'Nodule Detection', desc: '3D U-Net identifies and segments suspicious lung nodules with 93.1% sensitivity.', icon: Eye },
  { step: '03', title: 'Local Model Training', desc: 'Hospital trains AI model using its local dataset. Improves with each scan.', icon: Cpu },
  { step: '04', title: 'Secure Aggregation', desc: 'Only encrypted model updates sent to secure aggregator. Raw data stays protected.', icon: Lock },
  { step: '05', title: 'Global Model Improvement', desc: 'Improved global model redistributed to all hospitals. Collective intelligence without sharing data.', icon: Zap },
]

const techCards = [
  { title: 'Federated Learning', desc: 'Collaborative AI training without centralizing patient data. Hospitals learn together while data stays local.', icon: Building2, color: 'bg-slate-900 text-white' },
  { title: '3D U-Net', desc: 'Detects and segments lung nodules from volumetric CT scans with high sensitivity and precise boundaries.', icon: Brain, color: 'bg-teal-600 text-white' },
  { title: 'Generative AI', desc: 'Creates structured, clinician-friendly diagnostic summaries with risk scoring and Fleischner recommendations.', icon: FileText, color: 'bg-blue-600 text-white' },
  { title: 'Secure Aggregation', desc: 'Combines encrypted model updates without exposing individual hospital contributions. Cryptographically secure.', icon: Shield, color: 'bg-indigo-600 text-white' },
  { title: 'Differential Privacy', desc: 'Adds mathematical privacy protection with calibrated noise to reduce information leakage and membership inference risk.', icon: Lock, color: 'bg-emerald-600 text-white' },
  { title: 'Multilingual AI', desc: 'Supports accessible medical reporting in multiple Indian languages for equitable healthcare delivery.', icon: Globe, color: 'bg-amber-600 text-white' },
]

export function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-br from-teal-100/40 to-blue-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 dark:from-teal-900/20 dark:to-blue-900/20" />
        
        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="secondary" className="mb-6 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block mr-2" />RESEARCH PROTOTYPE • NOT A MEDICAL DEVICE</Badge>
              <h1 className="text-[40px] lg:text-[56px] font-bold tracking-tight leading-[1.05] text-balance">
                Train Healthcare AI.<br />
                <span className="text-slate-500 dark:text-slate-400">Protect Patient Privacy.</span>
              </h1>
              <p className="mt-6 text-[17px] leading-relaxed text-slate-600 dark:text-slate-400 max-w-[520px] text-balance">
                FedMed AI enables hospitals to collaboratively improve lung cancer detection without sharing sensitive patient data. Federated learning meets clinical precision.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/dashboard"><Button size="lg" className="rounded-xl">Launch Clinical Dashboard <ArrowRight className="h-4 w-4" /></Button></Link>
                <Button size="lg" variant="outline" className="rounded-xl" onClick={() => document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' })}>Explore Technology</Button>
              </div>

              <div className="mt-10 flex items-center gap-6 text-[13px]">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span className="font-medium">HIPAA-aligned architecture</span></div>
                <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-slate-700" /><span className="font-medium">Patient data never leaves hospital</span></div>
              </div>

              <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-4 flex gap-3 dark:bg-amber-950/20 dark:border-amber-900">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[12.5px] leading-relaxed text-amber-900 dark:text-amber-200">
                  <span className="font-semibold">Research Prototype Disclaimer:</span> FedMed AI is an AI-assisted research prototype. It is not intended to replace professional medical diagnosis or clinical judgment. All results shown are simulated/demo data.
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative lg:pl-8">
              <FederatedNetwork />
              <div className="mt-4 grid grid-cols-3 gap-3">
                <Card className="p-3 text-center"><div className="text-[18px] font-bold">24</div><div className="text-[10px] text-slate-500 uppercase tracking-wide">Hospitals</div></Card>
                <Card className="p-3 text-center"><div className="text-[18px] font-bold">94.7%</div><div className="text-[10px] text-slate-500 uppercase tracking-wide">Accuracy</div></Card>
                <Card className="p-3 text-center"><div className="text-[18px] font-bold">1,284</div><div className="text-[10px] text-slate-500 uppercase tracking-wide">CT Scans</div></Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="text-[22px] font-bold tracking-tight">{s.value}</div>
                <div className="text-[13px] font-semibold mt-1">{s.label}</div>
                <div className="text-[11.5px] text-slate-500 mt-1 leading-snug">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section id="platform" className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8 border-red-200 bg-red-50/50 dark:bg-red-950/10 dark:border-red-900">
              <div className="flex items-center gap-2 mb-4"><div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center dark:bg-red-900/50"><AlertTriangle className="h-4 w-4 text-red-600" /></div><h3 className="font-semibold">Traditional Centralized AI</h3></div>
              <div className="space-y-3 text-[14px] leading-relaxed text-slate-700 dark:text-slate-300">
                <div className="flex gap-3"><span className="text-red-500">✕</span> Hospitals must upload raw patient CT scans to central server</div>
                <div className="flex gap-3"><span className="text-red-500">✕</span> Single point of failure for sensitive health data</div>
                <div className="flex gap-3"><span className="text-red-500">✕</span> Violates data residency and patient privacy expectations</div>
                <div className="flex gap-3"><span className="text-red-500">✕</span> Low-resource hospitals excluded due to bandwidth</div>
              </div>
              <div className="mt-6 rounded-xl bg-white p-4 border border-red-200 dark:bg-slate-900 dark:border-red-900 font-mono text-[12px]">Hospital → Patient Data → Central Server ⚠️</div>
            </Card>

            <Card className="p-8 border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/10 dark:border-emerald-900">
              <div className="flex items-center gap-2 mb-4"><div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center dark:bg-emerald-900/50"><Shield className="h-4 w-4 text-emerald-600" /></div><h3 className="font-semibold">FedMed AI Approach</h3></div>
              <div className="space-y-3 text-[14px] leading-relaxed text-slate-700 dark:text-slate-300">
                <div className="flex gap-3"><span className="text-emerald-600">✓</span> CT scans analyzed locally, never leave hospital premises</div>
                <div className="flex gap-3"><span className="text-emerald-600">✓</span> Only encrypted model updates shared via secure aggregation</div>
                <div className="flex gap-3"><span className="text-emerald-600">✓</span> Differential privacy adds mathematical privacy guarantee</div>
                <div className="flex gap-3"><span className="text-emerald-600">✓</span> Low-bandwidth optimized for rural and resource-limited hospitals</div>
              </div>
              <div className="mt-6 rounded-xl bg-white p-4 border border-emerald-200 dark:bg-slate-900 dark:border-emerald-900 font-mono text-[12px]">Hospital → Local Training → Encrypted Update → Secure Aggregator ✓</div>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-[32px] font-bold tracking-tight">Privacy by Architecture, Not Just Policy</h2>
            <p className="mt-3 text-[15px] text-slate-600 dark:text-slate-400">Five steps from local CT analysis to global model improvement — without moving patient data.</p>
          </div>

          <div className="mt-12 grid md:grid-cols-5 gap-6 relative">
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-px bg-slate-200 dark:bg-slate-800" />
            {workflow.map((w, i) => (
              <motion.div key={w.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-soft dark:bg-slate-900 dark:border-slate-800 mx-auto md:mx-0">
                  <w.icon className="h-6 w-6" />
                </div>
                <div className="mt-4 text-center md:text-left">
                  <div className="text-[11px] font-mono font-medium text-slate-500">{w.step}</div>
                  <div className="text-[15px] font-semibold mt-1">{w.title}</div>
                  <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{w.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-[13px] font-medium text-white dark:bg-white dark:text-slate-900"><Lock className="h-4 w-4" /> Patient CT scans never leave the hospital.</div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section id="technology" className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl"><Badge variant="secondary" className="mb-4">Technology Stack</Badge><h2 className="text-[32px] font-bold tracking-tight">Built for Clinical Trust and Scale</h2><p className="mt-3 text-slate-600 dark:text-slate-400">Combining federated learning, 3D vision, generative AI, and privacy-preserving cryptography.</p></div>
            <Link to="/dashboard"><Button variant="outline">View Live Demo <ArrowRight className="h-4 w-4" /></Button></Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techCards.map((t, i) => (
              <motion.div key={t.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="p-6 h-full hover:shadow-medium transition-shadow">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${t.color}`}><t.icon className="h-5 w-5" /></div>
                  <h3 className="mt-4 text-[16px] font-semibold">{t.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400">{t.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/10 text-white border-white/10 mb-6">Privacy Center</Badge>
            <h2 className="text-[36px] font-bold tracking-tight">Privacy by Architecture</h2>
            <p className="mt-4 text-[15px] text-slate-400">Three layers of protection ensure patient data remains secure while enabling collaborative AI.</p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Federated Learning', desc: 'Patient data remains inside the hospital. No raw CT scans are ever transmitted to central servers or other hospitals.', metric: '100% local' },
              { num: '02', title: 'Secure Aggregation', desc: 'Only encrypted model updates are aggregated. Individual hospital updates remain hidden even from the central server.', metric: 'Encrypted' },
              { num: '03', title: 'Differential Privacy', desc: 'Additional mathematical privacy protection with ε=2.3, δ=1e-5. Reduces membership inference risk by 75%.', metric: 'ε=2.3' },
            ].map(card => (
              <Card key={card.num} className="p-6 bg-white/[0.04] border-white/10 backdrop-blur text-white">
                <div className="text-[12px] font-mono text-slate-400">{card.num}</div>
                <h3 className="mt-2 text-[18px] font-semibold">{card.title}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-400">{card.desc}</p>
                <div className="mt-6 inline-flex rounded-full bg-white text-slate-900 px-3 py-1 text-[11px] font-semibold">{card.metric}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* India scaling */}
      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 lg:p-12 dark:from-slate-900 dark:to-slate-950 dark:border-slate-800">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <Badge variant="teal" className="mb-4">Built for India's Healthcare Network</Badge>
                <h2 className="text-[30px] font-bold tracking-tight leading-tight">From Pilot Hospitals to National AI Infrastructure</h2>
                <p className="mt-4 text-[14px] leading-relaxed text-slate-600 dark:text-slate-400">Designed for low-resource settings, multilingual reporting, and low-bandwidth environments. Scales from 24 pilot hospitals to 1,000+ institutions without compromising privacy.</p>
                <div className="mt-8 flex items-center gap-3 text-[13px] font-medium">
                  <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-slate-900 dark:bg-white" />Pilot Hospitals</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                  <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-teal-600" />Regional Network</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                  <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-600" />National AI Infra</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-5 text-center"><div className="text-[28px] font-bold">24</div><div className="text-[12px] text-slate-500 mt-1">Pilot Hospitals</div><div className="mt-3 h-1 bg-slate-900 rounded-full dark:bg-white" /></Card>
                <Card className="p-5 text-center"><div className="text-[28px] font-bold">250</div><div className="text-[12px] text-slate-500 mt-1">Regional Target</div><div className="mt-3 h-1 bg-teal-600 rounded-full" /></Card>
                <Card className="p-5 text-center"><div className="text-[28px] font-bold">1000+</div><div className="text-[12px] text-slate-500 mt-1">National Scale</div><div className="mt-3 h-1 bg-blue-600 rounded-full" /></Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research metrics */}
      <section id="research" className="py-16 border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div><div className="text-[12px] font-medium uppercase tracking-widest text-slate-500">Model Performance</div><div className="mt-3 text-[28px] font-bold">94.7% <span className="text-[14px] font-medium text-slate-500">accuracy</span></div><div className="text-[12px] text-slate-500 mt-1">Federated vs 87.9% single-hospital • Demo values</div></div>
            <div><div className="text-[12px] font-medium uppercase tracking-widest text-slate-500">Privacy Protection</div><div className="mt-3 text-[28px] font-bold">75% <span className="text-[14px] font-medium text-slate-500">risk reduction</span></div><div className="text-[12px] text-slate-500 mt-1">72% → 18% attack risk after DP</div></div>
            <div><div className="text-[12px] font-medium uppercase tracking-widest text-slate-500">Dataset</div><div className="mt-3 text-[28px] font-bold">1,018 <span className="text-[14px] font-medium text-slate-500">scans</span></div><div className="text-[12px] text-slate-500 mt-1">LIDC-IDRI + LUNA16 + hospital data</div></div>
            <div><div className="text-[12px] font-medium uppercase tracking-widest text-slate-500">Clinical Impact</div><div className="mt-3 text-[28px] font-bold">86 <span className="text-[14px] font-medium text-slate-500">suspicious</span></div><div className="text-[12px] text-slate-500 mt-1">Cases flagged for review this week</div></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="rounded-[24px] bg-slate-900 p-10 lg:p-14 text-white relative overflow-hidden dark:bg-white dark:text-slate-900">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-[32px] font-bold tracking-tight leading-tight">Better AI through collaboration, without sharing patient data.</h2>
                <p className="mt-4 text-[15px] text-slate-300 dark:text-slate-600">Experience the full clinical dashboard with simulated CT analysis, federated training visualization, and privacy center.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <Link to="/dashboard"><Button size="lg" variant="secondary" className="rounded-xl dark:bg-slate-900 dark:text-white">Launch Dashboard <ArrowRight className="h-4 w-4" /></Button></Link>
                <Link to="/privacy"><Button size="lg" variant="ghost" className="rounded-xl text-white hover:bg-white/10 dark:text-slate-900 dark:hover:bg-slate-100"><Shield className="h-4 w-4" />Privacy Architecture</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 dark:border-slate-800">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2"><div className="h-7 w-7 rounded-lg bg-slate-900 flex items-center justify-center text-white dark:bg-white dark:text-slate-900"><Shield className="h-4 w-4" /></div><span className="font-semibold">FedMed AI</span></div>
              <p className="mt-3 text-[13px] text-slate-600 dark:text-slate-400 max-w-[360px] leading-relaxed">Privacy-preserving AI for early cancer detection. Collaborative learning without compromising patient trust.</p>
              <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-3 text-[11.5px] text-amber-900 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-200 max-w-[420px]">FedMed AI is an AI-assisted research prototype. It is not intended to replace professional medical diagnosis or clinical judgment.</div>
            </div>
            <div><div className="text-[12px] font-semibold uppercase tracking-widest">Platform</div><div className="mt-3 space-y-2 text-[13px] text-slate-600 dark:text-slate-400"><div>Technology</div><div>Privacy</div><div>Research</div><div>Dashboard</div></div></div>
            <div><div className="text-[12px] font-semibold uppercase tracking-widest">Resources</div><div className="mt-3 space-y-2 text-[13px] text-slate-600 dark:text-slate-400"><div>Documentation</div><div>GitHub</div><div>Datasets</div><div>Contact</div></div></div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between gap-4 text-[12px] text-slate-500 dark:border-slate-800"><span>© 2024 FedMed AI Research Consortium. Demo prototype.</span><span className="flex items-center gap-1.5"><Heart className="h-3 w-3" />Built for equitable healthcare</span></div>
        </div>
      </footer>
    </div>
  )
}
