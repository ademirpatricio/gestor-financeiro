import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthShell } from '../components/AuthShell'
import { useAuth } from '../hooks/useAuth'

const inputClass =
  'w-full border border-[#E2D9D0] rounded px-4 py-2.5 bg-white text-[#2D1F17] focus:outline-none focus:ring-2 focus:ring-[#8A9B6A]/40 focus:border-[#8A9B6A] transition-colors'
const labelClass = 'block text-[#8A7A70] mb-1.5'

// Destino do link do e-mail de recuperação. O supabase-js lê o link e abre uma sessão
// temporária; sem sessão, o link venceu ou já foi usado.
export function ResetPassword() {
  const { session, loading, updatePassword } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (loading) return null

  if (!session) {
    return (
      <AuthShell>
        <div role="alert">
          <h2 className="text-h4 font-bold text-[#2D1F17] mb-1.5">Esse link não vale mais</h2>
          <p className="text-[#8A7A70] leading-relaxed mb-6">
            Ele pode ter vencido ou já ter sido usado. Peça um novo, leva um minuto.
          </p>
          <Link to="/esqueci-senha" className="underline font-semibold" style={{ color: '#5A6B3A' }}>
            Pedir novo link
          </Link>
        </div>
      </AuthShell>
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('A senha precisa ter pelo menos 6 caracteres.')
      return
    }
    if (password !== confirm) {
      setError('As senhas não são iguais.')
      return
    }

    setSubmitting(true)
    try {
      await updatePassword(password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não deu para salvar a nova senha.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell>
      <div className="mb-7">
        <h2 className="text-h4 font-bold text-[#2D1F17] mb-1.5">Crie sua nova senha</h2>
        <p className="text-[#8A7A70] leading-relaxed">Escolha uma senha que você consiga lembrar.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass} htmlFor="reset-password">Nova senha</label>
          <div className="relative">
            <input
              id="reset-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo de 6 caracteres"
              required
              autoComplete="new-password"
              className={`${inputClass} pr-16`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-small text-[#8A7A70] hover:text-[#2D1F17] transition-colors"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="reset-confirm">Repita a senha</label>
          <input
            id="reset-confirm"
            type={showPassword ? 'text' : 'password'}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
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
          {submitting ? 'Salvando...' : 'Salvar nova senha'}
        </button>
      </form>
    </AuthShell>
  )
}
