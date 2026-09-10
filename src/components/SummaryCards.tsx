import type { Transaction } from '../types'

interface Props {
  transactions: Transaction[]
}

function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function SummaryCards({ transactions }: Props) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)

  const balance = income - expense

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-surface rounded-2xl p-5 border border-border">
        <p className="text-sm text-text-secondary mb-1">Saldo atual</p>
        <p className={`text-2xl font-semibold ${balance >= 0 ? 'text-income' : 'text-expense'}`}>
          {fmt(balance)}
        </p>
      </div>

      <div className="bg-surface rounded-2xl p-5 border border-border">
        <p className="text-sm text-text-secondary mb-1">Entradas</p>
        <p className="text-2xl font-semibold text-income">{fmt(income)}</p>
      </div>

      <div className="bg-surface rounded-2xl p-5 border border-border">
        <p className="text-sm text-text-secondary mb-1">Saídas</p>
        <p className="text-2xl font-semibold text-expense">{fmt(expense)}</p>
      </div>
    </div>
  )
}
