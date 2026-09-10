import { useAuth } from '../hooks/useAuth'

type View = 'dashboard' | 'categories'

interface Props {
  view: View
  onChangeView: (v: View) => void
}

export function Sidebar({ view, onChangeView }: Props) {
  const { session, signOut } = useAuth()

  return (
    <aside className="w-56 shrink-0 flex flex-col justify-between py-6 px-4 bg-surface border-r border-border min-h-screen">
      <div>
        {/* Logo */}
        <div className="mb-8 px-2">
          <span className="font-display italic text-2xl text-income">grana.</span>
        </div>

        {/* Nav */}
        <nav className="space-y-1">
          <NavItem
            icon="📊"
            label="Dashboard"
            active={view === 'dashboard'}
            onClick={() => onChangeView('dashboard')}
          />
          <NavItem
            icon="🏷️"
            label="Categorias"
            active={view === 'categories'}
            onClick={() => onChangeView('categories')}
          />
        </nav>
      </div>

      {/* Footer */}
      <div className="px-2">
        <p className="text-xs text-text-secondary truncate mb-3">{session?.user.email}</p>
        <button
          onClick={signOut}
          className="w-full text-left text-sm text-text-secondary hover:text-expense transition-colors"
        >
          Sair
        </button>
      </div>
    </aside>
  )
}

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
        active
          ? 'bg-income/10 text-income'
          : 'text-text-secondary hover:bg-border/40 hover:text-text-primary'
      }`}
    >
      <span>{icon}</span>
      {label}
    </button>
  )
}
