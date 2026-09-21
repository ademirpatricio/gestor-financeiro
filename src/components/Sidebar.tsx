import { useAuth } from '../hooks/useAuth'

type View = 'dashboard' | 'categories'

interface Props {
  view: View
  onChangeView: (v: View) => void
}

export function Sidebar({ view, onChangeView }: Props) {
  const { session, signOut } = useAuth()
  const email = session?.user.email ?? ''
  const initials = email.charAt(0).toUpperCase()

  return (
    <aside
      className="w-56 shrink-0 flex flex-col justify-between py-8 px-5 h-screen sticky top-0 overflow-y-auto"
      style={{ backgroundColor: '#2D1F17' }}
    >
      <div>
        {/* Logo */}
        <div className="mb-10 px-1">
          <img src="/logo-dark.svg" alt="Grana" className="h-10 w-auto" />
        </div>

        {/* Nav */}
        <nav className="space-y-1">
          <NavItem
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            }
            label="Dashboard"
            active={view === 'dashboard'}
            onClick={() => onChangeView('dashboard')}
          />
          <NavItem
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
            }
            label="Categorias"
            active={view === 'categories'}
            onClick={() => onChangeView('categories')}
          />
        </nav>
      </div>

      {/* Footer */}
      <div className="px-1">
        <div className="flex items-center gap-2.5 mb-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: '#C4604A', color: '#FBF8F5' }}
          >
            {initials}
          </div>
          <p className="text-xs truncate" style={{ color: '#8A7A70' }}>{email}</p>
        </div>
        <div className="h-px mb-4" style={{ backgroundColor: '#3D2B1F' }} />
        <button
          onClick={signOut}
          className="text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
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
      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-sm font-medium transition-all text-left"
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
