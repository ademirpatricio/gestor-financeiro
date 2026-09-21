import { CategoryIcon } from '../utils/categoryIcons'
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
        <div className="flex gap-1 p-1 rounded bg-white border border-border shadow-sm">
          {(['all', 'income', 'expense'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wide transition-all"
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
          className="text-xs border border-border rounded px-3 py-2 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-income/30 shadow-sm"
        >
          <option value="date_desc">Data (mais recente)</option>
          <option value="date_asc">Data (mais antiga)</option>
          <option value="amount_desc">Valor (maior)</option>
          <option value="amount_asc">Valor (menor)</option>
          <option value="category_asc">Categoria (A–Z)</option>
        </select>
      </div>

      {/* Empty state */}
      {sorted.length === 0 ? (
        <div className="text-center py-20">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4"
            style={{ backgroundColor: '#C4604A', color: '#FBF8F5' }}
          >C</div>
          <p className="font-semibold text-lg text-text-secondary mb-1">Nada por aqui ainda.</p>
          <p className="text-sm text-text-secondary">Adicione sua primeira transação!</p>
        </div>
      ) : (
        <div className="w-full">
          {/* Header */}
          <div className="grid text-xs uppercase tracking-widest text-text-secondary font-medium pb-3"
            style={{ gridTemplateColumns: '120px 1fr 180px 120px 80px' }}>
            <span className="flex items-center gap-1 cursor-pointer select-none"
              onClick={() => setSort(sort === 'date_desc' ? 'date_asc' : 'date_desc')}>
              Data
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </span>
            <span>Descrição</span>
            <span>Categoria</span>
            <span className="text-right">Valor</span>
            <span className="text-right">Ações</span>
          </div>

          {/* Rows */}
          <ul>
            {sorted.map((t) => {
              const cat = t.categories
              const catIcon = cat?.icon
              const isIncome = t.type === 'income'

              return (
                <li
                  key={t.id}
                  className="grid items-center py-4 transition-colors [&:nth-child(even)]:bg-border/30 hover:bg-border/60"
                  style={{ gridTemplateColumns: '120px 1fr 180px 120px 80px' }}
                >
                  {/* Data */}
                  <span className="text-sm text-text-secondary">{fmtDate(t.date)}</span>

                  {/* Descrição */}
                  <span className="text-sm text-text-primary font-medium truncate pr-4">
                    {t.description || '—'}
                  </span>

                  {/* Categoria */}
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#C4A898', color: '#fff' }}
                    >
                      <CategoryIcon name={catIcon ?? null} size={15} color="#fff" />
                    </div>
                    <span className="text-sm text-text-primary truncate">
                      {cat?.name ?? 'Sem categoria'}
                    </span>
                  </div>

                  {/* Valor */}
                  <span
                    className="text-sm font-bold text-right"
                    style={{ color: isIncome ? '#8A9B6A' : '#C4604A' }}
                  >
                    {isIncome ? '+' : '-'} {fmt(t.amount)}
                  </span>

                  {/* Ações */}
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(t)}
                      className="p-1.5 rounded text-text-secondary hover:text-text-primary hover:bg-border/40 transition-colors"
                      title="Editar"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(t.id)}
                      className="p-1.5 rounded text-text-secondary hover:text-expense hover:bg-expense/10 transition-colors"
                      title="Excluir"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6"/><path d="M14 11v6"/>
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
