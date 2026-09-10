import { useState } from 'react'
import type { FilterType, SortOption, Transaction } from '../types'

interface Props {
  transactions: Transaction[]
  onEdit: (t: Transaction) => void
  onDelete: (id: string) => void
}

function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function fmtDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

export function TransactionList({ transactions, onEdit, onDelete }: Props) {
  const [filter, setFilter] = useState<FilterType>('all')
  const [sort, setSort] = useState<SortOption>('date_desc')

  const filtered = transactions.filter((t) => {
    if (filter === 'all') return true
    return t.type === filter
  })

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'date_desc':
        return b.date.localeCompare(a.date)
      case 'date_asc':
        return a.date.localeCompare(b.date)
      case 'amount_desc':
        return b.amount - a.amount
      case 'amount_asc':
        return a.amount - b.amount
      case 'category_asc':
        return (a.categories?.name ?? '').localeCompare(b.categories?.name ?? '')
      default:
        return 0
    }
  })

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-1 bg-border/30 rounded-xl p-1">
          {(['all', 'income', 'expense'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-surface text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'income' ? 'Entradas' : 'Saídas'}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="text-sm border border-border rounded-xl px-3 py-2 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-income/30"
        >
          <option value="date_desc">Data (mais recente)</option>
          <option value="date_asc">Data (mais antiga)</option>
          <option value="amount_desc">Valor (maior)</option>
          <option value="amount_asc">Valor (menor)</option>
          <option value="category_asc">Categoria (A–Z)</option>
        </select>
      </div>

      {/* List */}
      {sorted.length === 0 ? (
        <div className="text-center py-16 text-text-secondary">
          <p className="text-4xl mb-3">📭</p>
          <p>Nenhuma transação encontrada.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {sorted.map((t) => (
            <li
              key={t.id}
              className="bg-surface border border-border rounded-2xl px-5 py-4 flex items-center justify-between gap-4 hover:border-income/30 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    t.type === 'income' ? 'bg-income' : 'bg-expense'
                  }`}
                />
                <div className="min-w-0">
                  <p className="font-medium text-text-primary truncate">
                    {t.description || '—'}
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {t.categories?.name ?? 'Sem categoria'} · {fmtDate(t.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`font-semibold ${
                    t.type === 'income' ? 'text-income' : 'text-expense'
                  }`}
                >
                  {t.type === 'income' ? '+' : '-'} {fmt(t.amount)}
                </span>

                <div className="flex gap-1">
                  <button
                    onClick={() => onEdit(t)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-border/40 transition-colors"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-expense hover:bg-expense/10 transition-colors"
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
