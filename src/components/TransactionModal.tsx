import { useEffect, useState } from 'react'
import type { Category, Transaction, TransactionType } from '../types'

interface Props {
  open: boolean
  onClose: () => void
  onSave: (payload: {
    amount: number
    description: string
    date: string
    type: TransactionType
    category_id: string | null
  }) => Promise<void>
  categories: Category[]
  initial?: Transaction | null
}

export function TransactionModal({ open, onClose, onSave, categories, initial }: Props) {
  const [type, setType] = useState<TransactionType>('expense')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [categoryId, setCategoryId] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initial) {
      setType(initial.type)
      setAmount(String(initial.amount))
      setDescription(initial.description ?? '')
      setDate(initial.date)
      setCategoryId(initial.category_id ?? '')
    } else {
      setType('expense')
      setAmount('')
      setDescription('')
      setDate(new Date().toISOString().split('T')[0])
      setCategoryId('')
    }
    setError('')
  }, [initial, open])

  const filteredCategories = categories.filter((c) => c.type === type)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const parsed = parseFloat(amount.replace(',', '.'))
    if (isNaN(parsed) || parsed <= 0) {
      setError('Informe um valor válido.')
      return
    }

    setSaving(true)
    try {
      await onSave({
        amount: parsed,
        description,
        date,
        type,
        category_id: categoryId || null,
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.')
    } finally {
      setSaving(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-surface w-full max-w-md rounded-3xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-text-primary">
            {initial ? 'Editar transação' : 'Nova transação'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-border/40 text-text-secondary transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type toggle */}
          <div className="flex gap-2">
            {(['income', 'expense'] as TransactionType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setType(t); setCategoryId('') }}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors border ${
                  type === t
                    ? t === 'income'
                      ? 'bg-income text-brand-brown border-income'
                      : 'bg-expense text-white border-expense'
                    : 'bg-transparent text-text-secondary border-border hover:border-text-secondary'
                }`}
              >
                {t === 'income' ? 'Entrada' : 'Saída'}
              </button>
            ))}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm text-text-secondary mb-1">Valor (R$)</label>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              className="w-full border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-income/30"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-text-secondary mb-1">Descrição</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex.: Aluguel, Freelance..."
              className="w-full border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-income/30"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm text-text-secondary mb-1">Data</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-income/30"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-text-secondary mb-1">Categoria</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-income/30"
            >
              <option value="">Sem categoria</option>
              {filteredCategories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {error && <p className="text-expense text-sm">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-xl font-medium text-brand-brown bg-income hover:bg-income/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </form>
      </div>
    </div>
  )
}
