import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

interface Props {
  onResetAll: () => Promise<void>
}

const CONFIRM_WORD = 'ZERAR'

const inputClass =
  'w-full border border-[#E2D9D0] rounded px-3 py-2.5 text-[#2D1F17] bg-[#FBF8F5] focus:outline-none focus:ring-2 focus:ring-[#8A9B6A]/40'
const labelClass = 'block text-small uppercase tracking-widest text-[#8A7A70] mb-1.5'
const cardClass = 'bg-[#FBF8F5] rounded border border-[#E2D9D0] shadow-sm p-6 mb-6 max-w-xl'

type Feedback = { kind: 'ok' | 'error'; text: string } | null

function Message({ feedback }: { feedback: Feedback }) {
  if (!feedback) return null
  const color = feedback.kind === 'ok' ? '#5A6B3A' : '#C4604A'
  return (
    <p className="mt-3" style={{ color }} role={feedback.kind === 'error' ? 'alert' : 'status'}>
      {feedback.text}
    </p>
  )
}

export function Settings({ onResetAll }: Props) {
  const { session, updateName, updatePassword } = useAuth()
  const email = session?.user.email ?? ''
  const currentName = (session?.user.user_metadata?.name as string | undefined) ?? ''

  const [name, setName] = useState(currentName)
  useEffect(() => {
    setName(currentName)
  }, [currentName])
  const [savingName, setSavingName] = useState(false)
  const [nameFeedback, setNameFeedback] = useState<Feedback>(null)

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [savingPassword, setSavingPassword] = useState(false)
  const [passwordFeedback, setPasswordFeedback] = useState<Feedback>(null)

  const [confirmText, setConfirmText] = useState('')
  const [resetting, setResetting] = useState(false)
  const [resetFeedback, setResetFeedback] = useState<Feedback>(null)

  async function handleName(e: FormEvent) {
    e.preventDefault()
    const clean = name.trim()
    if (!clean) {
      setNameFeedback({ kind: 'error', text: 'Digite um nome.' })
      return
    }
    setSavingName(true)
    setNameFeedback(null)
    try {
      await updateName(clean)
      setNameFeedback({ kind: 'ok', text: 'Nome atualizado.' })
    } catch (err) {
      setNameFeedback({ kind: 'error', text: err instanceof Error ? err.message : 'Não deu para salvar o nome.' })
    } finally {
      setSavingName(false)
    }
  }

  async function handlePassword(e: FormEvent) {
    e.preventDefault()
    setPasswordFeedback(null)
    if (password.length < 6) {
      setPasswordFeedback({ kind: 'error', text: 'A senha precisa ter pelo menos 6 caracteres.' })
      return
    }
    if (password !== confirm) {
      setPasswordFeedback({ kind: 'error', text: 'As senhas não são iguais.' })
      return
    }
    setSavingPassword(true)
    try {
      await updatePassword(password)
      setPassword('')
      setConfirm('')
      setPasswordFeedback({ kind: 'ok', text: 'Senha alterada.' })
    } catch (err) {
      setPasswordFeedback({ kind: 'error', text: err instanceof Error ? err.message : 'Não deu para alterar a senha.' })
    } finally {
      setSavingPassword(false)
    }
  }

  async function handleReset(e: FormEvent) {
    e.preventDefault()
    if (confirmText !== CONFIRM_WORD) return
    setResetting(true)
    setResetFeedback(null)
    try {
      await onResetAll()
      setConfirmText('')
      setResetFeedback({ kind: 'ok', text: 'Pronto. Sua conta está zerada.' })
    } catch (err) {
      setResetFeedback({ kind: 'error', text: err instanceof Error ? err.message : 'Não deu para apagar as movimentações.' })
    } finally {
      setResetting(false)
    }
  }

  return (
    <div>
      <h2 className="font-semibold text-[#2D1F17] mb-1">Configurações</h2>
      <p className="text-[#8A7A70] mb-6">Seus dados e sua conta.</p>

      <form onSubmit={handleName} className={cardClass}>
        <h3 className="font-semibold text-[#2D1F17] mb-4">Seu nome</h3>
        <div className="mb-4">
          <label className={labelClass} htmlFor="settings-email">E-mail</label>
          <input id="settings-email" className={`${inputClass} opacity-60`} value={email} disabled readOnly />
        </div>
        <div className="mb-4">
          <label className={labelClass} htmlFor="settings-name">Nome</label>
          <input
            id="settings-name"
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Como você quer ser chamado"
            maxLength={60}
          />
        </div>
        <button
          type="submit"
          disabled={savingName || name.trim() === currentName}
          className="px-5 py-2.5 rounded font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#5A6B3A' }}
        >
          {savingName ? 'Salvando...' : 'Salvar nome'}
        </button>
        <Message feedback={nameFeedback} />
      </form>

      <form onSubmit={handlePassword} className={cardClass}>
        <h3 className="font-semibold text-[#2D1F17] mb-4">Alterar senha</h3>
        <div className="mb-4">
          <label className={labelClass} htmlFor="settings-password">Nova senha</label>
          <input
            id="settings-password"
            type="password"
            autoComplete="new-password"
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className={labelClass} htmlFor="settings-confirm">Repita a nova senha</label>
          <input
            id="settings-confirm"
            type="password"
            autoComplete="new-password"
            className={inputClass}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={savingPassword || !password || !confirm}
          className="px-5 py-2.5 rounded font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#5A6B3A' }}
        >
          {savingPassword ? 'Salvando...' : 'Alterar senha'}
        </button>
        <Message feedback={passwordFeedback} />
      </form>

      <form onSubmit={handleReset} className={`${cardClass} border-[#C4604A]/50`}>
        <h3 className="font-semibold mb-1" style={{ color: '#C4604A' }}>Começar do zero</h3>
        <p className="text-[#8A7A70] mb-4 leading-relaxed">
          Apaga todas as suas entradas e saídas. Suas categorias continuam como estão.
          Não dá para desfazer.
        </p>
        <label className={labelClass} htmlFor="settings-reset">
          Digite {CONFIRM_WORD} para liberar o botão
        </label>
        <input
          id="settings-reset"
          className={`${inputClass} mb-4`}
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={resetting || confirmText !== CONFIRM_WORD}
          className="px-5 py-2.5 rounded font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#C4604A' }}
        >
          {resetting ? 'Apagando...' : 'Apagar todas as movimentações'}
        </button>
        <Message feedback={resetFeedback} />
      </form>
    </div>
  )
}
