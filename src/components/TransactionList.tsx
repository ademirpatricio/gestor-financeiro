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

  const filtered = transactions.filter((t) => filter === 'all' || t.type === filter)

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'date_desc': return b.date.localeCompare(a.date)
      case 'date_asc': return a.date.localeCompare(b.date)
      case 'amount_desc': return b.amount - a.amount
      case 'amount_asc': return a.amount - b.amount
      case 'category_asc': return (a.categories?.name ?? '').localeCompare(b.categories?.name ?? '')
      default: return 0
    }
  })

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-1 p-1 rounded-xl bg-white border border-border shadow-sm">
          {(['all', 'income', 'expense'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all"
              style={filter === f ? {
                backgroundColor: f === 'income' ? '#8A9B6A' : f === 'expense' ? '#C4604A' : '#2D1F17',
                color: '#FBF8F5',
              } : { color: '#8A7A70', backgroundColor: 'transparent' }}
            >
              {f === 'all' ? 'Todos' : f === 'income' ? 'Entradas' : 'Saídas'}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="text-xs border border-border rounded-xl px-3 py-2 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-income/30 shadow-sm"
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
        <div className="text-center py-20">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4"
            style={{ backgroundColor: '#C4604A', color: '#FBF8F5' }}
          >C</div>
          <p className="font-display italic text-lg text-text-secondary mb-1">Nada por aqui ainda.</p>
          <p className="text-sm text-text-secondary">Adicione sua primeira transação!</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {sorted.map((t) => (
            <li
              key={t.id}
              className="bg-white border border-border rounded-2xl px-5 py-4 flex items-center justify-between gap-4 shadow-sm transition-all hover:shadow-md hover:border-income/20"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: t.type === 'income' ? '#8A9B6A20' : '#C4604A20',
                    color: t.type === 'income' ? '#8A9B6A' : '#C4604A',
                  }}
                >
                  {t.type === 'income' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
                    </svg>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm text-text-primary truncate">{t.description || '—'}</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {t.categories?.name ?? 'Sem categoria'} · {fmtDate(t.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span
                  className="font-bold text-sm"
                  style={{ color: t.type === 'income' ? '#8A9B6A' : '#C4604A' }}
                >
                  {t.type === 'income' ? '+' : '-'} {fmt(t.amount)}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => onEdit(t)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-border/40 transition-colors text-xs"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-expense hover:bg-expense/10 transition-colors text-xs"
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
