import { useState } from 'react'
import type { Category, TransactionType } from '../types'

interface Props {
  categories: Category[]
  onAdd: (name: string, type: TransactionType) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function CategoryManager({ categories, onAdd, onDelete }: Props) {
  const [name, setName] = useState('')
  const [type, setType] = useState<TransactionType>('expense')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    setError('')
    try {
      await onAdd(name.trim(), type)
      setName('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar categoria.')
    } finally {
      setSaving(false)
    }
  }

  const income = categories.filter((c) => c.type === 'income')
  const expense = categories.filter((c) => c.type === 'expense')

  return (
    <div>
      <h2 className="text-lg font-semibold text-text-primary mb-4">Categorias</h2>

      {/* Add form */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          className="border border-border rounded-xl px-3 py-2 text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-income/30"
        >
          <option value="expense">Saída</option>
          <option value="income">Entrada</option>
        </select>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome da categoria"
          className="flex-1 border border-border rounded-xl px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-income/30"
        />

        <button
          type="submit"
          disabled={saving || !name.trim()}
          className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-income hover:bg-income/90 disabled:opacity-50 transition-colors"
        >
          {saving ? '...' : 'Adicionar'}
        </button>
      </form>

      {error && <p className="text-expense text-sm mb-4">{error}</p>}

      {/* Lists */}
      {[
        { label: 'Entradas', items: income, color: 'text-income' },
        { label: 'Saídas', items: expense, color: 'text-expense' },
      ].map(({ label, items, color }) => (
        <div key={label} className="mb-6">
          <h3 className={`text-sm font-medium mb-2 ${color}`}>{label}</h3>
          {items.length === 0 ? (
            <p className="text-sm text-text-secondary">Nenhuma categoria.</p>
          ) : (
            <ul className="space-y-1.5">
              {items.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between bg-surface border border-border rounded-xl px-4 py-2.5"
                >
                  <span className="text-sm text-text-primary">{c.name}</span>
                  <button
                    onClick={() => onDelete(c.id)}
                    className="text-text-secondary hover:text-expense transition-colors text-xs"
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
