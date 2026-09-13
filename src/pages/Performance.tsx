import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { api } from '@/services/api'
import { ModelMetrics } from '@/types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { TrendingUp, Target, Shield, Activity, AlertTriangle, BarChart3 } from 'lucide-react'

export function Performance() {
  const [metrics, setMetrics] = useState<{ single: ModelMetrics; federated: ModelMetrics } | null>(null)
  const [rounds, setRounds] = useState<any[]>([])

  useEffect(() => {
    api.getModelMetrics().then(setMetrics)
    api.getFederatedRounds().then(setRounds)
  }, [])

  if (!metrics) return <div className="p-8 animate-pulse">Loading metrics...</div>

  const comparisonData = [
    { metric: 'Sensitivity', single: metrics.single.sensitivity, federated: metrics.federated.sensitivity },
    { metric: 'Specificity', single: metrics.single.specificity, federated: metrics.federated.specificity },
    { metric: 'Accuracy', single: metrics.single.accuracy, federated: metrics.federated.accuracy },
    { metric: 'F1 Score', single: metrics.single.f1Score * 100, federated: metrics.federated.f1Score * 100 },
    { metric: 'Precision', single: metrics.single.precision, federated: metrics.federated.precision },
  ]

  const radarData = [
    { subject: 'Sensitivity', A: metrics.single.sensitivity, B: metrics.federated.sensitivity },
    { subject: 'Specificity', A: metrics.single.specificity, B: metrics.federated.specificity },
    { subject: 'ROC-AUC', A: metrics.single.rocAuc * 100, B: metrics.federated.rocAuc * 100 },
    { subject: 'F1', A: metrics.single.f1Score * 100, B: metrics.federated.f1Score * 100 },
    { subject: 'Precision', A: metrics.single.precision, B: metrics.federated.precision },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Model Performance</h1>
          <p className="text-[13px] text-slate-500 mt-1">Evaluation metrics • Federated vs Single-Hospital • Demo/simulated values</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1"><AlertTriangle className="h-3 w-3 mr-1" />Demo data • Not clinically validated</Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-red-200 dark:border-red-900/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold">Single Hospital Model</h3>
            <Badge variant="secondary" className="text-[11px]">Baseline</Badge>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div><div className="text-[11px] text-slate-500 uppercase">Sensitivity</div><div className="text-[20px] font-bold mt-1">{metrics.single.sensitivity}%</div></div>
            <div><div className="text-[11px] text-slate-500 uppercase">Specificity</div><div className="text-[20px] font-bold mt-1">{metrics.single.specificity}%</div></div>
            <div><div className="text-[11px] text-slate-500 uppercase">ROC-AUC</div><div className="text-[20px] font-bold mt-1">{metrics.single.rocAuc}</div></div>
            <div><div className="text-[11px] text-slate-500 uppercase">F1 Score</div><div className="text-[20px] font-bold mt-1">{metrics.single.f1Score}</div></div>
            <div><div className="text-[11px] text-slate-500 uppercase">Accuracy</div><div className="text-[20px] font-bold mt-1">{metrics.single.accuracy}%</div></div>
            <div><div className="text-[11px] text-slate-500 uppercase">Precision</div><div className="text-[20px] font-bold mt-1">{metrics.single.precision}%</div></div>
          </div>
        </Card>

        <Card className="p-6 border-emerald-200 bg-emerald-50/30 dark:bg-emerald-950/10 dark:border-emerald-900">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-emerald-600" />Federated Model • 24 Hospitals</h3>
            <Badge variant="success" className="text-[11px]">+6.8% improvement</Badge>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div><div className="text-[11px] text-slate-500 uppercase">Sensitivity</div><div className="text-[20px] font-bold mt-1 text-emerald-700 dark:text-emerald-300">{metrics.federated.sensitivity}%</div><div className="text-[10px] text-emerald-600">+4.7%</div></div>
            <div><div className="text-[11px] text-slate-500 uppercase">Specificity</div><div className="text-[20px] font-bold mt-1 text-emerald-700 dark:text-emerald-300">{metrics.federated.specificity}%</div><div className="text-[10px] text-emerald-600">+5.1%</div></div>
            <div><div className="text-[11px] text-slate-500 uppercase">ROC-AUC</div><div className="text-[20px] font-bold mt-1 text-emerald-700 dark:text-emerald-300">{metrics.federated.rocAuc}</div><div className="text-[10px] text-emerald-600">+0.05</div></div>
            <div><div className="text-[11px] text-slate-500 uppercase">F1 Score</div><div className="text-[20px] font-bold mt-1 text-emerald-700 dark:text-emerald-300">{metrics.federated.f1Score}</div><div className="text-[10px] text-emerald-600">+0.05</div></div>
            <div><div className="text-[11px] text-slate-500 uppercase">Accuracy</div><div className="text-[20px] font-bold mt-1 text-emerald-700 dark:text-emerald-300">{metrics.federated.accuracy}%</div><div className="text-[10px] text-emerald-600">+6.8%</div></div>
            <div><div className="text-[11px] text-slate-500 uppercase">Precision</div><div className="text-[20px] font-bold mt-1 text-emerald-700 dark:text-emerald-300">{metrics.federated.precision}%</div><div className="text-[10px] text-emerald-600">+6.2%</div></div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-[14px] font-semibold mb-4 flex items-center gap-2"><BarChart3 className="h-4 w-4" />Federated vs Local</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="metric" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="single" fill="#94a3b8" name="Single Hospital" radius={[4, 4, 0, 0]} />
                <Bar dataKey="federated" fill="#0f172a" name="Federated" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-[14px] font-semibold mb-4 flex items-center gap-2"><Target className="h-4 w-4" />Radar Comparison</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} />
                <Radar name="Single" dataKey="A" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} />
                <Radar name="Federated" dataKey="B" stroke="#0f172a" fill="#0f172a" fillOpacity={0.2} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-[14px] font-semibold mb-4 flex items-center gap-2"><Activity className="h-4 w-4" />Training Accuracy Over Rounds</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rounds}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="round" tick={{ fontSize: 11 }} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="accuracy" stroke="#0f172a" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-[14px] font-semibold mb-4">ROC Curve • Demo Simulation</h3>
        <div className="h-[260px] max-w-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { fpr: 0, tpr: 0 },
              { fpr: 0.05, tpr: 0.72 },
              { fpr: 0.1, tpr: 0.84 },
              { fpr: 0.2, tpr: 0.91 },
              { fpr: 0.3, tpr: 0.94 },
              { fpr: 0.5, tpr: 0.97 },
              { fpr: 1, tpr: 1 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="fpr" label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5, fontSize: 11 }} tick={{ fontSize: 11 }} />
              <YAxis label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', fontSize: 11 }} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="tpr" stroke="#0f172a" strokeWidth={2} dot={false} name="Federated AUC 0.96" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-[11px] text-slate-500">ROC-AUC 0.96 federated vs 0.91 single-hospital • Demonstrates benefit of collaborative learning without data sharing • Simulated data</div>
      </Card>
    </div>
  )
}
