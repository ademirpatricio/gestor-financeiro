import { ChevronDown, SquarePen, Trash2 } from 'lucide-react'
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

/** Versão desktop da lista: tabela. Para celular use TransactionRows. */
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
          <ChevronDown size={10} strokeWidth={2.5} />
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
              <span className="text-brown/80">{fmtDate(t.date)}</span>

              {/* Descrição */}
              <span className="text-brown font-medium truncate pr-4">
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
                <span className="text-brown truncate">
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
                  className="p-1.5 rounded text-brown/80 hover:text-brown hover:bg-brown_light/15 transition-colors"
                  title="Editar"
                >
                  <SquarePen size={14} strokeWidth={2} />
                </button>
                <button
                  onClick={() => onDelete(t.id)}
                  className="p-1.5 rounded text-brown/80 hover:text-terracotta hover:bg-terracotta/10 transition-colors"
                  title="Excluir"
                >
                  <Trash2 size={14} strokeWidth={2} />
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
