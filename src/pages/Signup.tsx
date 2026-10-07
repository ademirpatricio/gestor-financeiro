import { FormEvent, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import bgLight from '../assets/images/background2.png'

const inputClass =
  'w-full border border-[#E2D9D0] rounded px-4 py-2.5 bg-white text-[#2D1F17] focus:outline-none focus:ring-2 focus:ring-[#8A9B6A]/40 focus:border-[#8A9B6A] transition-colors'
const labelClass = 'block text-[#8A7A70] mb-1.5'

export function Signup() {
  const { session, loading, signUp } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)

  if (loading) return null
  if (session) return <Navigate to="/" replace />

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
      const hasSession = await signUp(name.trim(), email.trim(), password)
      // Sem sessão = o projeto exige confirmar o e-mail antes de entrar.
      if (!hasSession) setNeedsConfirmation(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não deu para criar a conta.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{ backgroundImage: `url(${bgLight})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="flex flex-col items-center w-full max-w-sm gap-6">
        <img src="/logo-primary.svg" alt="Grana" className="h-20 w-auto" />

        <div className="w-full bg-white rounded shadow-xl py-10 px-12">
          {needsConfirmation ? (
            <div role="status">
              <h2 className="text-h4 font-bold text-[#2D1F17] mb-1.5">Confira seu e-mail</h2>
              <p className="text-[#8A7A70] leading-relaxed mb-6">
                Mandamos um link de confirmação para <strong>{email}</strong>. Clique nele e depois é só entrar.
              </p>
              <Link to="/login" className="underline" style={{ color: '#5A6B3A' }}>
                Ir para o login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-7">
                <h2 className="text-h4 font-bold text-[#2D1F17] mb-1.5">Crie sua conta</h2>
                <p className="text-[#8A7A70] leading-relaxed">
                  Leva menos de um minuto. Depois é só começar a organizar sua grana.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={labelClass} htmlFor="signup-name">Nome</label>
                  <input
                    id="signup-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como você quer ser chamado"
                    maxLength={60}
                    required
                    autoComplete="name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="signup-email">E-mail</label>
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    autoComplete="email"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="signup-password">Senha</label>
                  <div className="relative">
                    <input
                      id="signup-password"
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
                  <label className={labelClass} htmlFor="signup-confirm">Repita a senha</label>
                  <input
                    id="signup-confirm"
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
                  {submitting ? 'Criando...' : 'Criar conta'}
                </button>
              </form>

              <p className="text-center text-small text-[#8A7A70] mt-6">
                Já tem conta?{' '}
                <Link to="/login" className="underline font-semibold" style={{ color: '#5A6B3A' }}>
                  Entrar
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
