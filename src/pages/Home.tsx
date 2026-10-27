import { ProtectedRoute } from '../components/ProtectedRoute'
import { useAuth } from '../hooks/useAuth'
import { Dashboard } from './Dashboard'
import { Landing } from './Landing'

// Raiz do site: quem já está logado vai direto para o painel, quem não está vê a página inicial.
export function Home() {
  const { session, loading } = useAuth()

  if (loading) return null

  if (session) {
    return (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  }

  return <Landing />
}
