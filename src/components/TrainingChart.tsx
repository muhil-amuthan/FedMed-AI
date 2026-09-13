import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Card } from '@/components/ui/card'
import { FederatedRound } from '@/types'

export function TrainingChart({ data }: { data: FederatedRound[] }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[14px] font-semibold">Federated Training Progress</h3>
          <p className="text-[12px] text-slate-500 mt-1">Model accuracy across rounds • Demo data</p>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-900 dark:bg-white" />Accuracy</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-teal-500" />Loss</span>
        </div>
      </div>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis dataKey="round" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis domain={[80, 100]} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
            />
            <Line type="monotone" dataKey="accuracy" stroke="#0f172a" strokeWidth={2.5} dot={{ r: 3, fill: '#0f172a' }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export function ScansChart({ data }: { data: { date: string; scans: number; suspicious: number }[] }) {
  return (
    <Card className="p-6">
      <h3 className="text-[14px] font-semibold mb-6">CT Scans Analyzed • Last 8 Days</h3>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="scans" stackId="1" stroke="#0f172a" fill="#0f172a" fillOpacity={0.08} strokeWidth={2} />
            <Area type="monotone" dataKey="suspicious" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.15} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
