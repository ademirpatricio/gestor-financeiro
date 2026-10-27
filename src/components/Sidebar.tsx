import { ChartPie, LayoutGrid, Settings, Tag } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

type View = 'dashboard' | 'charts' | 'categories' | 'settings'

interface Props {
  view: View
  onChangeView: (v: View) => void
}

export function Sidebar({ view, onChangeView }: Props) {
  const { session, signOut } = useAuth()
  const email = session?.user.email ?? ''
  const name = (session?.user.user_metadata?.name as string | undefined) ?? ''
  const initials = (name || email).charAt(0).toUpperCase()

  return (
    <aside
      className="w-56 shrink-0 flex flex-col justify-between py-8 px-5
      h-screen sticky top-0 overflow-y-auto"
      style={{ backgroundColor: '#2D1F17' }}
    >
      <div>
        {/* Logo */}
        <div className="mb-10 px-1">
          <img src="/logo-dark.svg" alt="Grana" className="h-10 w-auto hidden md:block" />
        </div>

        {/* Nav */}
        <nav className="space-y-1">
          <NavItem
            icon={
              <LayoutGrid size={16} strokeWidth={2} />
            }
            label="Dashboard"
            active={view === 'dashboard'}
            onClick={() => onChangeView('dashboard')}
          />
          <NavItem
            icon={
              <ChartPie size={16} strokeWidth={2} />
            }
            label="Raio-x do mês"
            active={view === 'charts'}
            onClick={() => onChangeView('charts')}
          />
          <NavItem
            icon={
              <Tag size={16} strokeWidth={2} />
            }
            label="Categorias"
            active={view === 'categories'}
            onClick={() => onChangeView('categories')}
          />
          <NavItem
            icon={
              <Settings size={16} strokeWidth={2} />
            }
            label="Configurações"
            active={view === 'settings'}
            onClick={() => onChangeView('settings')}
          />
        </nav>
      </div>

      {/* Footer */}
      <div className="px-1">
        <div className="flex items-center gap-2.5 mb-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0"
            style={{ backgroundColor: '#C4604A', color: '#FBF8F5' }}
          >
            {initials}
          </div>
          <p className="text-small truncate" style={{ color: '#8A7A70' }}>{name || email}</p>
        </div>
        <div className="h-px mb-4" style={{ backgroundColor: '#3D2B1F' }} />
        <button
          onClick={signOut}
          className="text-small uppercase tracking-widest transition-colors flex items-center gap-2"
          style={{ color: '#8A7A70' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#C4604A')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#8A7A70')}
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
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded font-medium transition-all text-left"
      style={{
        backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
        color: active ? '#FBF8F5' : '#8A7A70',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
          e.currentTarget.style.color = '#FBF8F5'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent'
          e.currentTarget.style.color = '#8A7A70'
        }
      }}
    >
      <span>{icon}</span>
      {label}
    </button>
  )
}
