import { motion } from 'framer-motion'
import { Shield, Lock, Cpu, Database, ArrowRight } from 'lucide-react'

export function FederatedNetwork({ animated = true }: { animated?: boolean }) {
  const hospitals = [
    { id: 'H01', name: 'AIIMS Delhi', x: 20, y: 20 },
    { id: 'H02', name: 'Tata Mumbai', x: 80, y: 20 },
    { id: 'H03', name: 'Apollo Chennai', x: 20, y: 80 },
    { id: 'H04', name: 'Fortis Bangalore', x: 80, y: 80 },
  ]

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 overflow-hidden dark:from-slate-900 dark:to-slate-950 dark:border-slate-800">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Central Aggregator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          initial={animated ? { scale: 0 } : undefined}
          animate={animated ? { scale: 1 } : undefined}
          transition={{ delay: 0.5, type: 'spring' }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-teal-500/20 blur-xl" />
            <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-2xl bg-slate-900 text-white shadow-large dark:bg-white dark:text-slate-900">
              <Shield className="h-8 w-8" />
            </div>
            <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Lock className="h-3 w-3" />
            </div>
          </div>
          <div className="mt-3 text-center">
            <div className="text-[13px] font-semibold">Secure Aggregator</div>
            <div className="text-[11px] text-slate-500">Encrypted • DP • No Raw Data</div>
          </div>
          <div className="mt-2 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-medium text-white dark:bg-white dark:text-slate-900 flex items-center gap-1.5">
            <Cpu className="h-3 w-3" /> Global Model v2.4
          </div>
        </motion.div>
      </div>

      {/* Hospitals */}
      {hospitals.map((h, i) => (
        <motion.div
          key={h.id}
          initial={animated ? { opacity: 0, scale: 0.8 } : undefined}
          animate={animated ? { opacity: 1, scale: 1 } : undefined}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="absolute z-10"
          style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-soft dark:bg-slate-800 dark:border-slate-700">
              <Database className="h-6 w-6 text-slate-700 dark:text-slate-300" />
            </div>
            <div className="mt-2 rounded-lg bg-white px-2 py-1 text-[10px] font-medium shadow-soft border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
              {h.name}
            </div>
            <div className="mt-1 flex items-center gap-1 text-[9px] text-emerald-600 font-medium">
              <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" /> Local Training
            </div>
          </div>
        </motion.div>
      ))}

      {/* Connection lines - SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {hospitals.map((h, i) => {
          const isEven = i % 2 === 0
          return (
            <g key={h.id}>
              <motion.line
                initial={animated ? { pathLength: 0 } : undefined}
                animate={animated ? { pathLength: 1 } : undefined}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.8 }}
                x1={`${h.x}%`} y1={`${h.y}%`} x2="50%" y2="50%"
                stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 4"
                className="dark:opacity-30"
              />
              {animated && (
                <motion.circle
                  r="4"
                  fill="#14b8a6"
                  initial={{ offsetDistance: '0%' }}
                  animate={{ offsetDistance: '100%' }}
                  transition={{ delay: 1.5 + i * 0.3, duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  style={{ offsetPath: `path('M ${h.x}% ${h.y}% L 50% 50%')` } as any}
                />
              )}
            </g>
          )
        })}
      </svg>

      {/* Data flow labels */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-[11px] font-medium shadow-soft dark:bg-slate-800 dark:border-slate-700">
        <Lock className="h-3.5 w-3.5 text-teal-600" />
        Encrypted Model Updates Only
        <ArrowRight className="h-3 w-3 text-slate-400" />
        <span className="text-slate-500">Raw CT scans never leave hospital</span>
      </div>
    </div>
  )
}
