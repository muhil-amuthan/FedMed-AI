import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, Shield, Brain, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

type Message = { id: string; role: 'user' | 'assistant'; content: string }

const knowledgeBase: Record<string, string> = {
  privacy: "FedMed AI keeps patient CT data inside the hospital. Hospitals train the model locally and share only encrypted model updates rather than raw patient information. We use Secure Aggregation and Differential Privacy (ε=2.3) for additional protection.",
  federated: "Federated Learning allows 24 hospitals to collaboratively train a single AI model without centralizing data. Each hospital trains locally, sends encrypted gradients to the Secure Aggregator, which averages them into a global model redistributed to all.",
  '3d unet': "Our 3D U-Net architecture segments lung nodules in volumetric CT scans. It uses encoder-decoder with skip connections, trained on LIDC-IDRI and LUNA16 datasets, achieving 93.1% sensitivity in federated setting.",
  'secure aggregation': "Secure Aggregation combines encrypted model updates without exposing individual hospital contributions. Even the central server cannot see individual updates — only the aggregated result.",
  'differential privacy': "We add calibrated noise (Gaussian mechanism, ε=2.3, δ=1e-5) to model updates. This reduces membership inference attack risk from 72% to 18% while maintaining 94.7% accuracy.",
  report: "Generative AI creates structured clinician-friendly summaries from nodule detections. It includes findings, risk assessment, malignancy probability, and Fleischner guideline recommendations. Supports multilingual output (English, Hindi, Tamil, etc).",
  workflow: "1. Local CT upload → 2. Preprocessing → 3. 3D U-Net segmentation → 4. Nodule detection → 5. Malignancy scoring → 6. AI report generation. All steps happen locally, no data leaves hospital.",
}

function getAnswer(q: string): string {
  const lower = q.toLowerCase()
  for (const [k, v] of Object.entries(knowledgeBase)) {
    if (lower.includes(k)) return v
  }
  if (lower.includes('how') && lower.includes('work')) return knowledgeBase.workflow
  if (lower.includes('protect') || lower.includes('safe')) return knowledgeBase.privacy
  if (lower.includes('hospital') || lower.includes('collaborat')) return knowledgeBase.federated
  return "I'm FedMed Assistant, specialized in FedMed AI's privacy-preserving architecture. I can explain Federated Learning, 3D U-Net, Secure Aggregation, Differential Privacy, CT workflow, and AI reporting. I don't provide medical diagnosis — please consult a qualified clinician for medical advice."
}

export function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hi, I'm FedMed Assistant. Ask me about privacy architecture, federated learning, or CT analysis workflow." }
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTimeout(() => {
      const answer = getAnswer(userMsg.content)
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), role: 'assistant', content: answer }])
    }, 600)
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-large hover:shadow-xl transition-shadow dark:bg-white dark:text-slate-900 ${open ? 'hidden' : 'flex'}`}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-[10px] font-bold text-white">AI</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)]"
          >
            <Card className="overflow-hidden shadow-2xl border-slate-200 dark:border-slate-800 flex flex-col h-[480px]">
              <div className="flex items-center justify-between bg-slate-900 p-4 text-white dark:bg-white dark:text-slate-900">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 dark:bg-slate-900/10"><Sparkles className="h-4 w-4" /></div>
                  <div>
                    <div className="text-[14px] font-semibold">FedMed Assistant</div>
                    <div className="text-[11px] opacity-70 flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />Privacy-aware • Research prototype</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10 dark:text-slate-900" onClick={() => setOpen(false)}><X className="h-4 w-4" /></Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
                {messages.map(m => (
                  <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${m.role === 'user' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800'}`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <div className="border-t border-slate-200 p-3 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex gap-2">
                  <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask about privacy, federated learning..." className="flex-1" />
                  <Button size="icon" onClick={send}><Send className="h-4 w-4" /></Button>
                </div>
                <div className="mt-2 flex gap-1.5">
                  {[
                    { icon: Shield, label: 'Privacy' },
                    { icon: Brain, label: '3D U-Net' },
                    { icon: Lock, label: 'Secure Agg' },
                  ].map(item => (
                    <button key={item.label} onClick={() => { setInput(item.label); setTimeout(send, 100) }} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium hover:bg-slate-200 dark:bg-slate-800">
                      <item.icon className="h-3 w-3" />{item.label}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
