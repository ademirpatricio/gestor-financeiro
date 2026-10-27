import { useEffect, useRef, useState } from 'react'
import { EllipsisVertical } from 'lucide-react'

interface Props {
  label: string
  onEdit: () => void
  onDelete: () => void
}

/** Botão de três pontos com Editar e Excluir. Área de toque de 44px. */
export function ActionMenu({ label, onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function run(action: () => void) {
    setOpen(false)
    action()
  }

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Ações de ${label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        className="w-[44px] h-[44px] flex items-center justify-center rounded text-brown/60 hover:bg-brown_light/10 transition-colors"
      >
        <EllipsisVertical size={18} strokeWidth={2} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1 z-20 w-[144px] py-[4px] rounded bg-white shadow-lg border border-brown_light/20"
        >
          <button
            role="menuitem"
            onClick={() => run(onEdit)}
            className="w-full text-left px-4 py-3 hover:bg-brown_light/10"
          >
            Editar
          </button>
          <button
            role="menuitem"
            onClick={() => run(onDelete)}
            className="w-full text-left px-4 py-3 text-rust hover:bg-rust/10"
          >
            Excluir
          </button>
        </div>
      )}
    </div>
  )
}
