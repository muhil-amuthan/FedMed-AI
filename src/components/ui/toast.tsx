import * as React from "react"

type Toast = { id: string; title: string; description?: string; variant?: 'default' | 'success' | 'error' }

const ToastContext = React.createContext<{
  toasts: Toast[]
  toast: (t: Omit<Toast, 'id'>) => void
}>({ toasts: [], toast: () => {} })

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback((t: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { ...t, id }])
    setTimeout(() => {
      setToasts(prev => prev.filter(x => x.id !== id))
    }, 3500)
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-80">
        {toasts.map(t => (
          <div key={t.id} className={`rounded-xl border p-4 shadow-large backdrop-blur-xl animate-in slide-in-from-bottom-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 ${t.variant === 'success' ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/50' : ''} ${t.variant === 'error' ? 'border-red-200 bg-red-50 dark:bg-red-950/50' : ''}`}>
            <div className="text-sm font-medium">{t.title}</div>
            {t.description && <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => React.useContext(ToastContext)
