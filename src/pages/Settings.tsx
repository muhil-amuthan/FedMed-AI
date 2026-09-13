import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Shield, Bell, Lock, Database, Globe, Cpu, Save } from 'lucide-react'
import { useToast } from '@/components/ui/toast'

export function Settings() {
  const { toast } = useToast()

  return (
    <div className="p-6 lg:p-8 max-w-[900px] mx-auto space-y-6">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">Settings</h1>
        <p className="text-[13px] text-slate-500 mt-1">Hospital node configuration • Privacy controls • Demo settings</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-2">
          {[
            { icon: Database, label: 'General', active: true },
            { icon: Shield, label: 'Privacy & Security', active: false },
            { icon: Cpu, label: 'AI Model', active: false },
            { icon: Bell, label: 'Notifications', active: false },
            { icon: Globe, label: 'Language', active: false },
          ].map(item => (
            <div key={item.label} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium ${item.active ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400'}`}>
              <item.icon className="h-4 w-4" />{item.label}
            </div>
          ))}
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-[14px] font-semibold">Hospital Information</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-2"><label className="text-[12px] font-medium">Hospital Name</label><Input defaultValue="AIIMS Delhi" /></div>
              <div className="space-y-2"><label className="text-[12px] font-medium">Hospital ID</label><Input defaultValue="H001" disabled /></div>
              <div className="space-y-2"><label className="text-[12px] font-medium">Location</label><Input defaultValue="New Delhi, India" /></div>
              <div className="space-y-2"><label className="text-[12px] font-medium">Contact Email</label><Input defaultValue="aiims.delhi@fedmed.ai" /></div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-[14px] font-semibold flex items-center gap-2"><Shield className="h-4 w-4" />Privacy Controls</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div><div className="text-[13px] font-medium">Federated Learning</div><div className="text-[11px] text-slate-500">Participate in global model training</div></div>
                <Badge variant="success">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div><div className="text-[13px] font-medium">Differential Privacy</div><div className="text-[11px] text-slate-500">ε=2.3, δ=1e-5 • Adds noise to updates</div></div>
                <Badge variant="success">ON • Protected</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div><div className="text-[13px] font-medium">Secure Aggregation</div><div className="text-[11px] text-slate-500">Encrypted model updates only</div></div>
                <Badge variant="success">Enabled</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-[14px] font-semibold flex items-center gap-2"><Cpu className="h-4 w-4" />AI Model Configuration</h3>
            <div className="mt-4 space-y-3 text-[12px]">
              <div className="flex justify-between"><span className="text-slate-500">Model</span><span className="font-medium">3D U-Net v2.4.1 • Federated</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Last Updated</span><span className="font-medium">Round 18 • Jan 13, 2024</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Local Dataset</span><span className="font-medium">12,480 scans</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Training Status</span><span className="font-medium text-emerald-600">Active • Synchronized</span></div>
            </div>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={() => toast({ title: 'Settings saved', description: 'Hospital node configuration updated', variant: 'success' })}><Save className="h-4 w-4" />Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
