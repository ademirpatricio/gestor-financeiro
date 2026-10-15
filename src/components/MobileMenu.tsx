import { useEffect } from 'react'
import { Sidebar } from './Sidebar'

type View = 'dashboard' | 'categories' | 'settings'

interface Props {
  open: boolean
  onClose: () => void
  view: View
  onChangeView: (v: View) => void
}

/** Menu lateral do mobile. Reaproveita a Sidebar inteira dentro de uma gaveta. */
export function MobileMenu({ open, onClose, view, onChangeView }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 shadow-2xl">
        <Sidebar
          view={view}
          onChangeView={(v) => { onChangeView(v); onClose() }}
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="absolute top-4 right-3 w-11 h-11 flex items-center justify-center rounded text-brown_light hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
