import { Link, Navigate } from 'react-router-dom'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useAdminUsers } from '../hooks/useAdminUsers'
import { useAuth } from '../hooks/useAuth'

function formatDateTime(value: string | null) {
  if (!value) return 'Nunca'
  return new Date(value).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}

export function Admin() {
  const { session, loading: authLoading } = useAuth()
  const isAdmin = session?.user.app_metadata?.role === 'admin'
  const { users, loading, error } = useAdminUsers(isAdmin)

  if (authLoading) return <LoadingSpinner />
  if (!session) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1000px] mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-h4 font-bold">Usuários</h1>
            {!loading && !error && (
              <p className="text-small text-brown_light mt-1">
                {users.length} {users.length === 1 ? 'conta' : 'contas'}
              </p>
            )}
          </div>
          <Link to="/" className="text-small uppercase tracking-widest text-brown_light hover:text-rust transition-colors">
            Voltar ao app
          </Link>
        </div>

        {loading && <LoadingSpinner />}

        {error && (
          <p className="text-body text-terracotta">Não consegui carregar os usuários: {error}</p>
        )}

        {!loading && !error && (
          <div className="bg-white rounded shadow-sm border border-brown_light/30 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-brown_light/30">
                  <Th>Nome</Th>
                  <Th>E-mail</Th>
                  <Th>Cadastro</Th>
                  <Th>Último acesso</Th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-brown_light/15 last:border-b-0">
                    <td className="px-4 py-3 font-medium">{user.name || 'Sem nome'}</td>
                    <td className="px-4 py-3 text-brown_light">{user.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatDateTime(user.created_at)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatDateTime(user.last_sign_in_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-small uppercase font-medium text-brown_light">
      {children}
    </th>
  )
}
