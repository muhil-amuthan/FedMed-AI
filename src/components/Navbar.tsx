import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Platform', href: '#platform' },
  { name: 'Technology', href: '#technology' },
  { name: 'Privacy', href: '#privacy' },
  { name: 'Research', href: '#research' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isLanding = location.pathname === '/'

  const handleNavClick = (href: string) => {
    if (isLanding) {
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/' + href)
    }
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="flex h-[64px] items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900">
              <Shield className="h-4 w-4" />
            </div>
            <span className="text-[17px] font-semibold tracking-tight">FedMed AI</span>
            <span className="hidden sm:inline-flex ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium tracking-widest text-slate-600 dark:bg-slate-800 dark:text-slate-400">RESEARCH PREVIEW</span>
          </Link>

          {isLanding && (
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-3">
            {isLanding ? (
              <>
                <Link to="/login" className="hidden md:block text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400">Sign In</Link>
                <Button onClick={() => navigate('/dashboard')} className="hidden md:inline-flex">
                  Launch Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/dashboard')} variant="secondary" size="sm" className="hidden md:inline-flex">Dashboard</Button>
            )}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map(link => (
                <button key={link.name} onClick={() => handleNavClick(link.href)} className="block w-full text-left text-[15px] font-medium py-2">
                  {link.name}
                </button>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Button onClick={() => { navigate('/login'); setMobileOpen(false) }} variant="outline" className="w-full">Sign In</Button>
                <Button onClick={() => { navigate('/dashboard'); setMobileOpen(false) }} className="w-full">Launch Dashboard <ArrowRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
