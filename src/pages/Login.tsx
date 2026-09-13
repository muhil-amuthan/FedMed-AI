import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, EyeOff, Building2, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'

export function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    toast({ title: 'Welcome back', description: 'Signed in as AIIMS Delhi • Demo mode', variant: 'success' })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-between p-8 lg:p-12 bg-white dark:bg-slate-950">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-white dark:bg-white dark:text-slate-900"><Shield className="h-4 w-4" /></div>
            <span className="font-semibold">FedMed AI</span>
          </Link>
        </div>

        <div className="max-w-[420px] mx-auto w-full py-12">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-[28px] font-bold tracking-tight">Secure Healthcare AI Platform</h1>
            <p className="mt-2 text-[14px] text-slate-600 dark:text-slate-400">Sign in to your hospital's federated learning node. Patient data stays local.</p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[13px] font-medium">Hospital ID / Email</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="aiims.delhi@fedmed.ai" className="pl-10 h-11" defaultValue="aiims.delhi@fedmed.ai" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between"><label className="text-[13px] font-medium">Password</label><span className="text-[12px] text-slate-500">Demo: any password</span></div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pl-10 pr-10 h-11" defaultValue="demo123" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-11 rounded-xl" disabled={loading}>
                {loading ? 'Authenticating...' : 'Sign In'} {!loading && <ArrowRight className="h-4 w-4" />}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200 dark:border-slate-800" /></div>
                <div className="relative flex justify-center text-[11px] uppercase tracking-widest"><span className="bg-white px-3 text-slate-500 dark:bg-slate-950">Or</span></div>
              </div>

              <Button type="button" variant="outline" className="w-full h-11 rounded-xl" onClick={() => navigate('/dashboard')}>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />Demo Login • No credentials required
              </Button>
            </form>

            <div className="mt-8 rounded-xl bg-slate-50 border border-slate-200 p-4 dark:bg-slate-900 dark:border-slate-800">
              <div className="text-[12px] font-semibold flex items-center gap-2"><Shield className="h-4 w-4" />Privacy Protected Demo</div>
              <div className="mt-2 space-y-1.5 text-[12px] text-slate-600 dark:text-slate-400">
                <div className="flex gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5" />No real patient data used</div>
                <div className="flex gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5" />All scans are simulated/demo</div>
                <div className="flex gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5" />Local processing only</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="text-[11px] text-slate-500">© 2024 FedMed AI • Research prototype • Not a medical device</div>
      </div>

      <div className="hidden lg:flex relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[100px]" />
        <div className="relative flex flex-col justify-between p-12 w-full">
          <div />
          <div className="max-w-[480px]">
            <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] tracking-widest">FEDERATED NETWORK LIVE</div>
            <h2 className="mt-6 text-[32px] font-bold leading-tight">24 hospitals training one AI without sharing patient data.</h2>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <Card className="bg-white/5 border-white/10 p-4 text-white"><div className="text-[20px] font-bold">94.7%</div><div className="text-[11px] text-slate-400">Federated accuracy</div></Card>
              <Card className="bg-white/5 border-white/10 p-4 text-white"><div className="text-[20px] font-bold">100%</div><div className="text-[11px] text-slate-400">Local processing</div></Card>
              <Card className="bg-white/5 border-white/10 p-4 text-white"><div className="text-[20px] font-bold">18%</div><div className="text-[11px] text-slate-400">Attack risk after DP</div></Card>
            </div>
          </div>
          <div className="text-[12px] text-slate-400">Trusted by AIIMS, Tata Memorial, Apollo Hospitals • Demo data only</div>
        </div>
      </div>
    </div>
  )
}
