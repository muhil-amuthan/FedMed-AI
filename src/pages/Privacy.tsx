import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, Lock, Eye, EyeOff, Database, Server, AlertTriangle, CheckCircle2, Cpu, FileX, Key, Brain } from 'lucide-react'
import { motion } from 'framer-motion'

export function Privacy() {
  const [privacyOn, setPrivacyOn] = useState(true)

  return (
    <div className="p-6 lg:p-8 max-w-[1280px] mx-auto space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <Badge variant="secondary" className="mb-4 px-3 py-1"><Shield className="h-3 w-3 mr-1" />Privacy Center</Badge>
        <h1 className="text-[36px] font-bold tracking-tight">Privacy by Architecture</h1>
        <p className="mt-4 text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">Three layers of protection ensure patient data remains secure while enabling collaborative AI training across hospitals. Raw patient data never leaves the hospital.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { num: '01', title: 'Federated Learning', icon: Database, desc: 'Patient data remains inside the hospital. No raw CT scans are ever transmitted to central servers or other hospitals. Training happens on-premise.', metric: '100% Local', color: 'bg-slate-900 text-white' },
          { num: '02', title: 'Secure Aggregation', icon: Lock, desc: 'Only encrypted model updates are aggregated. Individual hospital updates remain hidden even from the central server via cryptographic protocols.', metric: 'Encrypted', color: 'bg-teal-600 text-white' },
          { num: '03', title: 'Differential Privacy', icon: Key, desc: 'Additional mathematical privacy protection with calibrated noise (ε=2.3, δ=1e-5). Reduces membership inference attack risk by 75%.', metric: 'ε=2.3', color: 'bg-blue-600 text-white' },
        ].map(card => (
          <Card key={card.num} className="p-6 hover:shadow-medium transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">{card.num}</span>
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${card.color}`}><card.icon className="h-5 w-5" /></div>
            </div>
            <h3 className="mt-4 text-[18px] font-semibold">{card.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400">{card.desc}</p>
            <div className="mt-6 inline-flex rounded-full bg-slate-900 text-white px-3 py-1 text-[11px] font-semibold dark:bg-white dark:text-slate-900">{card.metric}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 border-red-200 bg-red-50/30 dark:bg-red-950/10 dark:border-red-900">
          <div className="flex items-center gap-2 mb-4"><div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center dark:bg-red-900/50"><Server className="h-4 w-4 text-red-600" /></div><h3 className="font-semibold">Traditional Centralized AI</h3><Badge variant="danger" className="ml-auto">Risky</Badge></div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[13px]"><div className="h-10 w-10 rounded-xl bg-white border flex items-center justify-center"><Database className="h-5 w-5" /></div><span>Hospital</span><span className="flex-1 h-px bg-red-300 border-dashed border-t" /><span className="text-red-600 font-medium">Patient Data →</span><span className="flex-1 h-px bg-red-300" /><div className="h-10 w-10 rounded-xl bg-red-600 text-white flex items-center justify-center"><Server className="h-5 w-5" /></div></div>
            <div className="rounded-xl bg-white p-3 border border-red-200 dark:bg-slate-900 text-[12px]"><div className="flex items-center gap-2 text-red-700 dark:text-red-300"><AlertTriangle className="h-4 w-4" />Raw CT scans, patient identifiers, and metadata exposed to central server</div></div>
            <div className="grid grid-cols-3 gap-2 text-[11px]"><div className="rounded-lg bg-white p-2 border text-center dark:bg-slate-900">Single point of failure</div><div className="rounded-lg bg-white p-2 border text-center dark:bg-slate-900">Data residency violation</div><div className="rounded-lg bg-white p-2 border text-center dark:bg-slate-900">Privacy breach risk</div></div>
          </div>
        </Card>

        <Card className="p-6 border-emerald-200 bg-emerald-50/30 dark:bg-emerald-950/10 dark:border-emerald-900">
          <div className="flex items-center gap-2 mb-4"><div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center dark:bg-emerald-900/50"><Shield className="h-4 w-4 text-emerald-600" /></div><h3 className="font-semibold">FedMed AI • Privacy-Preserving</h3><Badge variant="success" className="ml-auto">Protected</Badge></div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[13px] flex-wrap"><div className="h-10 w-10 rounded-xl bg-white border flex items-center justify-center"><Database className="h-5 w-5" /></div><span>Hospital</span><span className="h-px w-6 bg-slate-300" /><div className="rounded-full bg-slate-900 text-white px-2.5 py-1 text-[10px] flex items-center gap-1"><Cpu className="h-3 w-3" />Local Training</div><span className="h-px w-6 bg-slate-300" /><div className="rounded-full bg-teal-600 text-white px-2.5 py-1 text-[10px] flex items-center gap-1"><Lock className="h-3 w-3" />Encrypted Update</div><span className="h-px w-6 bg-slate-300" /><div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center dark:bg-white dark:text-slate-900"><Shield className="h-5 w-5" /></div></div>
            <div className="rounded-xl bg-white p-3 border border-emerald-200 dark:bg-slate-900 text-[12px]"><div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-4 w-4" />Only encrypted gradients shared. Raw data never leaves hospital premises.</div></div>
            <div className="grid grid-cols-3 gap-2 text-[11px]"><div className="rounded-lg bg-white p-2 border text-center dark:bg-slate-900">On-premise training</div><div className="rounded-lg bg-white p-2 border text-center dark:bg-slate-900">Secure aggregation</div><div className="rounded-lg bg-white p-2 border text-center dark:bg-slate-900">DP protection</div></div>
          </div>
        </Card>
      </div>

      <Card className="p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h3 className="text-[18px] font-semibold flex items-center gap-2"><Eye className="h-5 w-5" />Membership Inference Attack Simulation</h3>
            <p className="text-[13px] text-slate-500 mt-2 max-w-[500px]">Simulates an adversary trying to determine if a specific patient's data was used in training. Clearly labeled as simulation/demo and not a validated security benchmark.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-medium">Privacy OFF</span>
            <button onClick={() => setPrivacyOn(!privacyOn)} className={`relative h-7 w-12 rounded-full transition-colors ${privacyOn ? 'bg-slate-900 dark:bg-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
              <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${privacyOn ? 'translate-x-5 dark:bg-slate-900' : 'translate-x-0.5'}`} />
            </button>
            <span className="text-[12px] font-medium">Privacy ON</span>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border p-6 dark:border-slate-800">
            <div className="flex items-center justify-between"><h4 className="text-[13px] font-semibold">Attack Risk Before Privacy Protection</h4><Badge variant={privacyOn ? 'secondary' : 'danger'}>{privacyOn ? '72% (baseline)' : '72% ACTIVE'}</Badge></div>
            <div className="mt-4">
              <div className="flex justify-between text-[12px] mb-2"><span>Risk</span><span className="font-mono font-bold">72%</span></div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800"><motion.div initial={{ width: '72%' }} animate={{ width: privacyOn ? '72%' : '72%' }} className="h-3 bg-red-500 rounded-full" /></div>
              <div className="mt-3 text-[11px] text-slate-500 flex items-center gap-1.5"><AlertTriangle className="h-3 w-3 text-red-500" />Without DP, model memorizes training data patterns</div>
            </div>
          </div>

          <div className="rounded-2xl border p-6 border-emerald-200 bg-emerald-50/30 dark:border-emerald-900 dark:bg-emerald-950/20">
            <div className="flex items-center justify-between"><h4 className="text-[13px] font-semibold">Attack Risk After Differential Privacy</h4><Badge variant="success">{privacyOn ? '18% Protected' : '72% if OFF'}</Badge></div>
            <div className="mt-4">
              <div className="flex justify-between text-[12px] mb-2"><span>Risk</span><span className="font-mono font-bold">{privacyOn ? '18%' : '72%'}</span></div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800"><motion.div animate={{ width: privacyOn ? '18%' : '72%' }} transition={{ duration: 0.8 }} className={`h-3 rounded-full ${privacyOn ? 'bg-emerald-500' : 'bg-red-500'}`} /></div>
              <div className="mt-3 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-emerald-600" />With DP (ε=2.3), 75% risk reduction • Accuracy preserved at 94.7%</div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-slate-900 text-white p-4 flex gap-3 dark:bg-white dark:text-slate-900">
          <Shield className="h-5 w-5 shrink-0" />
          <div className="text-[12px] leading-relaxed"><span className="font-semibold">How it works:</span> Differential privacy adds calibrated Gaussian noise to model updates. Even if adversary obtains model, they cannot confidently determine if a specific CT scan was in training set. Trade-off: slight accuracy cost for strong privacy guarantee.</div>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Data Minimization', desc: 'Only model gradients shared, never raw pixels. 99.7% less data transferred vs centralized.', icon: FileX },
          { title: 'End-to-End Encryption', desc: 'TLS 1.3 in transit, AES-256 at rest, homomorphic encryption for aggregation.', icon: Key },
          { title: 'No Central Data Lake', desc: 'No single repository of patient scans. Eliminates mass breach risk by design.', icon: Brain },
        ].map(c => (
          <Card key={c.title} className="p-5"><div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center dark:bg-slate-800"><c.icon className="h-4 w-4" /></div><h4 className="mt-3 text-[14px] font-semibold">{c.title}</h4><p className="mt-1 text-[12.5px] text-slate-600 dark:text-slate-400 leading-relaxed">{c.desc}</p></Card>
        ))}
      </div>
    </div>
  )
}
