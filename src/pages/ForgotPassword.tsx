import { FormEvent, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthShell } from '../components/AuthShell'
import { useAuth } from '../hooks/useAuth'

const inputClass =
  'w-full border border-[#E2D9D0] rounded px-4 py-2.5 bg-white text-[#2D1F17] focus:outline-none focus:ring-2 focus:ring-[#8A9B6A]/40 focus:border-[#8A9B6A] transition-colors'
const labelClass = 'block text-[#8A7A70] mb-1.5'

export function ForgotPassword() {
  const { session, loading, sendPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  if (loading) return null
  if (session) return <Navigate to="/" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await sendPasswordReset(email.trim())
      setSent(true)
    } catch {
      setError('Não deu para enviar agora. Espere um minuto e tente de novo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell>
      {sent ? (
        <div role="status">
          <h2 className="text-h4 font-bold text-[#2D1F17] mb-1.5">Confira seu e-mail</h2>
          {/* Mesma resposta exista a conta ou não, para não revelar quem tem cadastro. */}
          <p className="text-[#8A7A70] leading-relaxed mb-6">
            Se existe uma conta com <strong>{email}</strong>, mandamos um link para criar uma nova senha.
            Olhe também o spam.
          </p>
          <Link to="/login" className="underline" style={{ color: '#5A6B3A' }}>
            Voltar para o login
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-7">
            <h2 className="text-h4 font-bold text-[#2D1F17] mb-1.5">Esqueceu a senha?</h2>
            <p className="text-[#8A7A70] leading-relaxed">
              Sem problema. Diga seu e-mail e a gente manda um link para você criar outra.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="forgot-email">E-mail</label>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                autoComplete="email"
                className={inputClass}
              />
            </div>

            {error && <p style={{ color: '#C4604A' }} role="alert">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded font-semibold text-white transition-all disabled:opacity-50 hover:opacity-90 mt-2"
              style={{ backgroundColor: '#5A6B3A' }}
            >
              {submitting ? 'Enviando...' : 'Enviar link'}
            </button>
          </form>

          <p className="text-center text-small text-[#8A7A70] mt-6">
            Lembrou?{' '}
            <Link to="/login" className="underline font-semibold" style={{ color: '#5A6B3A' }}>
              Entrar
            </Link>
          </p>
        </>
      )}
    </AuthShell>
  )
}
