import { FormEvent, useState } from 'react'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { FormField } from './FormField'

type LoginFormProps = {
  onSubmit: (email: string, password: string) => Promise<void>
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await onSubmit(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao entrar.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <FormField
        id="login-email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="seu@email.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail size={15} />}
      />

      <FormField
        id="login-password"
        label="Senha"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        placeholder="••••••••"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<Lock size={15} />}
        endAdornment={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            className="hover:text-terracotta transition-colors"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
      />

      {/* Lembrar + Esqueceu */}
      <div className="flex items-center justify-between py-4">
        <label className="flex items-center gap-2 text-text-secondary cursor-pointer select-none">
          <input type="checkbox" className="rounded border-border accent-income" />
          Lembrar de mim
        </label>
        <a href="#" className="text-olive hover:text-olive_light hover:underline transition-colors">
          Esqueceu sua senha?
        </a>
      </div>

      {error && <p className="text-expense">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="
        w-full py-3 rounded font-bold 
        text-white text-body transition-all 
        disabled:opacity-50 flex items-center 
        justify-center gap-2
        bg-gradient-to-r from-olive_light to-olive"   
      >
        {submitting ? 'Entrando...' : <><span>Entrar</span><span>→</span></>}
      </button>
    </form>
  )
}
