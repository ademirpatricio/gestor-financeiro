import { CategoryIcon } from '../utils/categoryIcons'
import { fmtCurrency, fmtDate } from '../utils/format'
import type { SortOption, Transaction } from '../types'
import { TransactionsEmpty } from './TransactionsEmpty'

interface Props {
  /** Já filtradas e ordenadas pelo useDashboard. */
  transactions: Transaction[]
  sort: SortOption
  onSortChange: (s: SortOption) => void
  onEdit: (t: Transaction) => void
  onDelete: (id: string) => void
}

// Mesma grade no cabeçalho e nas linhas, para as colunas não desalinharem.
const GRID = '120px 1fr 180px 120px 80px'

/** Versão desktop da lista: tabela. Para celular use TransactionCards. */
export function TransactionTable({ transactions, sort, onSortChange, onEdit, onDelete }: Props) {
  if (transactions.length === 0) return <TransactionsEmpty />

  return (
    <div className="w-full">
      {/* Header */}
      <div className="grid text-small uppercase font-medium pb-3 px-6 border-b"
        style={{ gridTemplateColumns: GRID }}>
        <span className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => onSortChange(sort === 'date_desc' ? 'date_asc' : 'date_desc')}>
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
        {transactions.map((t) => {
          const cat = t.categories
          const isIncome = t.type === 'income'

          return (
            <li
              key={t.id}
              className="grid items-center py-4 px-6 transition-colors [&:nth-child(even)]:bg-brown_light/10"
              style={{ gridTemplateColumns: GRID }}
            >
              {/* Data */}
              <span className="text-text-secondary">{fmtDate(t.date)}</span>

              {/* Descrição */}
              <span className="text-text-primary font-medium truncate pr-4">
                {t.description || '—'}
              </span>

              {/* Categoria */}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#C4A898', color: '#fff' }}
                >
                  <CategoryIcon name={cat?.icon ?? null} size={15} color="#fff" />
                </div>
                <span className="text-text-primary truncate">
                  {cat?.name ?? 'Sem categoria'}
                </span>
              </div>

              {/* Valor */}
              <span
                className="font-bold text-right"
                style={{ color: isIncome ? '#8A9B6A' : '#C4604A' }}
              >
                {isIncome ? '+' : '-'} {fmtCurrency(t.amount)}
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
  )
}
