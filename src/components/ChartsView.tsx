import { useMemo } from 'react'
import type { Transaction } from '../types'
import { breakdownByCategory } from '../utils/breakdown'
import type { MonthKey } from '../utils/month'
import { currentMonthKey, monthName, monthYear } from '../utils/month'
import { CategoryDonut } from './CategoryDonut'
import { LoadingSpinner } from './LoadingSpinner'
import { MonthSwitcher } from './MonthSwitcher'

interface Props {
  month: MonthKey
  onPrev: () => void
  onNext: () => void
  /** Transações do mês escolhido, sem filtro de lista. */
  transactions: Transaction[]
  loading: boolean
}

/** "este mês" só vale para o mês atual. Nos outros, o título diz qual é. */
function panelTitle(month: MonthKey) {
  if (month === currentMonthKey()) return 'Onde foi parar a sua grana este mês:'
  const year = monthYear(month)
  const suffix = year === monthYear(currentMonthKey()) ? '' : ` de ${year}`
  return `Onde foi parar a sua grana em ${monthName(month).toLowerCase()}${suffix}`
}

/** Tela de gráficos: uma rosca para as saídas e outra para as entradas do mês. */
export function ChartsView({ month, onPrev, onNext, transactions, loading }: Props) {
  const expenses = useMemo(() => breakdownByCategory(transactions, 'expense'), [transactions])
  const incomes = useMemo(() => breakdownByCategory(transactions, 'income'), [transactions])

  return (
    <div>
      <div className="mb-[32px] flex flex-col gap-[16px] lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-h4 font-bold">{panelTitle(month)}</h2>
        <div className="self-center lg:self-auto">
          <MonthSwitcher month={month} onPrev={onPrev} onNext={onNext} />
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col gap-[24px]">
          <CategoryDonut
            key={`expense-${month}`}
            title="Saídas"
            tone="expense"
            data={expenses}
            emptyText="Nenhuma saída registrada neste mês."
          />
          <CategoryDonut
            key={`income-${month}`}
            title="Entradas"
            tone="income"
            data={incomes}
            emptyText="Nenhuma entrada registrada neste mês."
          />
        </div>
      )}
    </div>
  )
}
