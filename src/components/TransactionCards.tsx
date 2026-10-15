import type { Transaction } from '../types'
import { CategoryIcon } from '../utils/categoryIcons'
import { fmtCurrency, fmtDate } from '../utils/format'
import { ActionMenu } from './ActionMenu'
import { TransactionsEmpty } from './TransactionsEmpty'

interface Props {
  /** Já filtradas e ordenadas pelo useDashboard. */
  transactions: Transaction[]
  onEdit: (t: Transaction) => void
  onDelete: (id: string) => void
}

/** Versão mobile da lista: um card por transação. Para desktop use TransactionTable. */
export function TransactionCards({ transactions, onEdit, onDelete }: Props) {
  if (transactions.length === 0) return <TransactionsEmpty />

  return (
    <ul className="space-y-2">
      {transactions.map((t) => {
        const cat = t.categories
        const isIncome = t.type === 'income'
        const title = t.description || 'Sem descrição'

        return (
          <li key={t.id} className="flex items-center gap-3 bg-white rounded shadow-sm py-3 pl-3 pr-1">
            {/* Categoria */}
            <div className="w-12 h-12 rounded-full bg-salmon flex items-center justify-center shrink-0">
              <CategoryIcon name={cat?.icon ?? null} size={20} color="#fff" />
            </div>

            {/* Descrição, categoria e data */}
            <div className="min-w-0 flex-1">
              <p className="font-bold truncate">{title}</p>
              <p className="text-small text-brown_light truncate mt-1">
                {cat?.name ?? 'Sem categoria'} · {fmtDate(t.date)}
              </p>
            </div>

            {/* Valor: seta + cor mostram se é entrada ou saída */}
            <div className={`flex items-center gap-1.5 font-bold whitespace-nowrap ${isIncome ? 'text-olive' : 'text-rust'}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {isIncome
                  ? <><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></>
                  : <><line x1="17" y1="7" x2="7" y2="17"/><polyline points="17 17 7 17 7 7"/></>}
              </svg>
              <span className="sr-only">{isIncome ? 'Entrada' : 'Saída'}</span>
              {fmtCurrency(t.amount)}
            </div>

            <ActionMenu
              label={title}
              onEdit={() => onEdit(t)}
              onDelete={() => onDelete(t.id)}
            />
          </li>
        )
      })}
    </ul>
  )
}
