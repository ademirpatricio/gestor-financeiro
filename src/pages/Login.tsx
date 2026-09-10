import { FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Login() {
  const { session, loading, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (loading) return null
  if (session) return <Navigate to="/" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signIn(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao entrar.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-display italic text-4xl text-income">grana.</span>
          <p className="text-text-secondary text-sm mt-2">Seu gestor financeiro pessoal</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-border rounded-3xl p-8 space-y-4"
        >
          <div>
            <label className="block text-sm text-text-secondary mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-income/30"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-income/30"
            />
          </div>

          {error && <p className="text-expense text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl font-medium text-white bg-income hover:bg-income/90 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-xs text-text-secondary mt-6">
          Crie sua conta pelo{' '}
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-text-primary"
          >
            Supabase Dashboard
          </a>
          .
        </p>
      </div>
    </div>
  )
}
