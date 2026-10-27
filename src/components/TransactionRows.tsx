import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
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

/** Versão mobile da lista: linhas zebradas. Para desktop use TransactionTable. */
export function TransactionRows({ transactions, onEdit, onDelete }: Props) {
  if (transactions.length === 0) return <TransactionsEmpty />

  return (
    <ul>
      {transactions.map((t) => {
        const cat = t.categories
        const isIncome = t.type === 'income'
        const title = t.description || 'Sem descrição'

        return (
          <li
            key={t.id}
            className="flex items-center
            gap-[12px] py-[16px] pl-[16px]
            pr-[4px] odd:bg-brown_light/10"
          >
            {/* Categoria */}
            <div className="w-[40px] h-[40px] rounded-full bg-brown_light flex items-center justify-center shrink-0">
              <CategoryIcon name={cat?.icon ?? null} size={20} color="#fff" />
            </div>

            {/* Descrição, categoria e data */}
            <div className="min-w-0 flex-1">
              <p className="font-medium truncate">{title}</p>
              <p className="text-xs text-brown/70 truncate mt-[1px]">
                {cat?.name ?? 'Sem categoria'} · {fmtDate(t.date)}
              </p>
            </div>

            {/* Valor: seta + cor mostram se é entrada ou saída */}
            <div className={`flex items-center gap-[6px] font-medium
              whitespace-nowrap ${isIncome ? 'text-olive' : 'text-rust'}`}>
              {isIncome ? <ArrowUpRight size={12} strokeWidth={2.5} aria-hidden="true" /> : <ArrowDownLeft size={12} strokeWidth={2.5} aria-hidden="true" />}
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
