import { FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import mascotCofre from '../assets/images/img1.png'
import mascotMeta from '../assets/images/img2.png'
import mascotJuros from '../assets/images/img3.png'
import bgDark from '../assets/images/background1.png'
import bgLight from '../assets/images/background2.png'

const mascots = [
  { nome: 'Cofre', papel: 'O principal', frase: '"Dinheiro bem cuidado leva a uma vida melhor."', img: mascotCofre },
  { nome: 'Meta', papel: 'A mais esperta', frase: '"Mais consciência hoje, mais liberdade amanhã."', img: mascotMeta },
  { nome: 'Juros', papel: 'O mais paciente', frase: '"Disciplina hoje, liberdade sempre."', img: mascotJuros },
]

export function Login() {
  const { session, loading, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="min-h-screen flex bg-bg">

      {/* ── Coluna esquerda ── */}
      <div
        className="hidden lg:flex flex-col w-1/2 p-12 relative overflow-hidden"
        style={{ backgroundImage: `url(${bgDark})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Logo — centralizado vertical e horizontalmente */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <img src="/logo-dark.svg" alt="Grana" className="h-32 w-auto" />
          <p className="text-xs uppercase tracking-widest mt-3 text-center" style={{ color: '#8A7A70' }}>
            Pequenas escolhas.{' '}
            <span style={{ color: '#C4604A' }}>Grandes conquistas.</span>
          </p>
        </div>

        {/* Área dos mascotes */}
        <div className="relative flex items-end justify-center mb-6">


          <div className="flex items-end gap-20">
            {mascots.map((m) => (

              <div key={m.nome} className="flex items-start">

                {/* Coluna do mascote*/}
                <div className="flex flex-col gap-2">
                  {/* Foto do mascote*/}
                  <img
                    src={m.img}
                    alt={m.nome}
                    className="w-32 h-32 object-cover rounded-full"
                  />
                  {/* Infos do mascote*/}
                  <div>
                    <p className="font-bold uppercase text-md mt-0.5" style={{ color: '#FBF8F5' }}>{m.nome}</p>
                    <p className="text-sm" style={{ color: '#E8A898' }}>{m.papel}</p>
                    <p className="text-xs italic mt-0.5" style={{ color: '#8A7A70' }}>{m.frase}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        

        {/* Rodapé */}
        <div>
          

          <p className="mt-6 text-xs text-center text-base leading-snug" style={{ color: '#8A7A70' }}>
            Criado por 
            <a className="font-bold" style={{ color: '#E8A898' }} href="https://ademirpatricio.com.br" target="_blank"> Ademir Patrício</a> / 
            <a className="font-bold" style={{ color: '#E8A898' }} href="https://malabares.com.br" target="_blank"> Malabares MKT & TEC</a> 
            • Juntos por uma vida financeira mais simples.
          </p>
        </div>
      </div>

      {/* ── Coluna direita ── */}
      <div className="flex flex-1 flex-col items-center justify-center relative px-6 py-12"
      style={{ backgroundImage: `url(${bgLight})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

        {/* Wrapper central — logo mobile + card */}
        <div className="flex flex-col items-center w-full max-w-sm gap-6">

          {/* Logo mobile */}
          <img src="/logo-primary.svg" alt="Grana" className="h-20 w-auto lg:hidden" />

        {/* Card do formulário */}
        <div className="w-full bg-white rounded shadow-xl py-10 px-12">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-text-primary mb-1.5">
              Bem-vindo de volta
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Entre com sua conta para continuar cuidando da sua vida financeira.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* E-mail */}
            <div>
              <label className="block text-md text-text-secondary mb-1.5">E-mail</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full border border-border rounded pl-10 pr-4 py-2.5 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-income/40 focus:border-income transition-colors"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-md text-text-secondary mb-1.5">Senha</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full border border-border rounded pl-10 pr-10 py-2.5 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-income/40 focus:border-income transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  {showPassword ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Lembrar + Esqueceu */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer select-none">
                <input type="checkbox" className="rounded border-border accent-income" />
                Lembrar de mim
              </label>
              <a href="#" className="text-sm text-brand-olive underline hover:text-income transition-colors">
                Esqueceu sua senha?
              </a>
            </div>

            {error && <p className="text-expense text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded font-semibold text-white text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 hover:opacity-90 mt-2"
              style={{ backgroundColor: '#5A6B3A' }}
            >
              {submitting ? 'Entrando...' : <><span>Entrar</span><span>→</span></>}
            </button>
          </form>

          <p className="text-center text-xs text-text-secondary mt-6">
            Conta criada pelo{' '}
            <a href="https://supabase.com" target="_blank" rel="noreferrer" className="underline hover:text-text-primary">
              Supabase Dashboard
            </a>.
          </p>
        </div>

        </div>{/* fim wrapper central */}

      </div>
    </div>
  )
}
