import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Layers, Maximize2, Crosshair } from 'lucide-react'

export function ScanViewer() {
  const [activeView, setActiveView] = useState<'axial' | 'coronal' | 'sagittal'>('axial')
  const [slice, setSlice] = useState(142)

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white"><Layers className="h-4 w-4" /></div>
          <div>
            <div className="text-[13px] font-semibold">CT Viewer • Demo Mode</div>
            <div className="text-[11px] text-slate-500">Slice {slice}/312 • 1.25mm thickness</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono text-[11px]">512×512</Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Maximize2 className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-3 border-b border-slate-200 dark:border-slate-800">
        {(['axial', 'coronal', 'sagittal'] as const).map(v => (
          <button
            key={v}
            onClick={() => setActiveView(v)}
            className={`py-2.5 text-[12px] font-medium capitalize border-b-2 transition-colors ${activeView === v ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="relative aspect-[4/3] bg-[#0a0f1e] overflow-hidden">
        {/* Simulated CT */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Lung shape simulation with CSS */}
            <div className="w-[280px] h-[320px] relative">
              <div className="absolute inset-0 rounded-[60%_40%_50%_50%] bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/50" />
              <div className="absolute top-[15%] left-[12%] right-[12%] bottom-[15%] rounded-[50%_50%_40%_40%] bg-[#0f172a] overflow-hidden">
                <div className="absolute inset-0 opacity-40" style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(148,163,184,0.1) 2px, rgba(148,163,184,0.1) 3px)`
                }} />
                {/* Nodules */}
                <div className="absolute top-[30%] left-[35%] h-3 w-3 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.8)] animate-pulse" />
                <div className="absolute top-[62%] right-[28%] h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.6)]" />
                {/* Vessels */}
                <div className="absolute top-[20%] left-[50%] w-px h-[60%] bg-slate-600/50" />
                <div className="absolute top-[45%] left-[20%] right-[20%] h-px bg-slate-600/30" />
              </div>
              {/* Ribs simulation */}
              <div className="absolute inset-0 rounded-[60%_40%_50%_50%] border border-slate-600/20" style={{ transform: 'scale(0.92)' }} />
              <div className="absolute inset-0 rounded-[60%_40%_50%_50%] border border-slate-600/20" style={{ transform: 'scale(0.85)' }} />
            </div>
            
            <div className="absolute -top-2 -right-2 flex items-center gap-1.5 rounded-full bg-red-500 px-2 py-1 text-[10px] font-medium text-white shadow-lg">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> AI DETECTED
            </div>
          </div>
        </div>

        {/* Crosshair */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-400/20 pointer-events-none" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-400/20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Crosshair className="h-6 w-6 text-cyan-400/60" />
        </div>

        {/* HU scale */}
        <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 backdrop-blur px-2.5 py-1.5 text-[10px] font-mono text-white/70">
          WW: 1500 WL: -600
        </div>
        <div className="absolute bottom-3 right-3 rounded-lg bg-black/60 backdrop-blur px-2.5 py-1.5 text-[10px] font-mono text-white/70">
          Slice: {slice}
        </div>
      </div>

      <div className="p-3 bg-slate-50 dark:bg-slate-900/50">
        <input
          type="range"
          min={1}
          max={312}
          value={slice}
          onChange={e => setSlice(Number(e.target.value))}
          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:bg-slate-800"
        />
        <div className="mt-2 flex justify-between text-[10px] text-slate-500 font-mono">
          <span>Superior</span><span>Axial Stack</span><span>Inferior</span>
        </div>
      </div>
    </Card>
  )
}
