import type { Transaction } from '../types'

interface Props {
  transactions: Transaction[]
}

function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function SummaryCards({ transactions }: Props) {
  const income = transactions.filter((t) => t.type === 'income').reduce((acc, t) => acc + t.amount, 0)
  const expense = transactions.filter((t) => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0)
  const balance = income - expense

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {/* Saldo */}
      <div className="bg-white rounded py-5 px-8 shadow-sm border border-border relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full rounded-l bg-blue"/>
        <div className="flex items-start justify-between mb-3">
          <p className="text-small uppercase font-medium">Saldo atual</p>
          <span className="text-blue opacity-70">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </span>
        </div>
        <p className="text-h4 font-bold text-blue">
          {fmt(balance)}
        </p>
        <p className="text-small text-brown_light mt-1">
          {balance >= 0 ? 'Você está no positivo' : 'Atenção: saldo negativo'}
        </p>
      </div>

      {/* Entradas */}
      <div className="bg-white rounded py-5 px-8 shadow-sm border border-border relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full rounded-l bg-olive"/>
        <div className="flex items-start justify-between mb-3">
          <p className="text-small uppercase font-medium">Entradas</p>
          <span className="text-olive opacity-70">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
            </svg>
          </span>
        </div>
        <p className="text-h4 font-bold text-olive">{fmt(income)}</p>
        <p className="text-small text-brown_light mt-1">
          {transactions.filter((t) => t.type === 'income').length} transaç{transactions.filter((t) => t.type === 'income').length === 1 ? 'ão' : 'ões'}
        </p>
      </div>

      {/* Saídas */}
      <div className="bg-white rounded py-5 px-8 shadow-sm border border-border relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full rounded-l bg-rust"/>
        <div className="flex items-start justify-between mb-3">
          <p className="text-small uppercase font-medium">Saídas</p>
          <span className="text-rust opacity-70">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
            </svg>
          </span>
        </div>
        <p className="text-h4 font-bold text-rust">{fmt(expense)}</p>
        <p className="text-small text-brown_light mt-1">
          {transactions.filter((t) => t.type === 'expense').length} transaç{transactions.filter((t) => t.type === 'expense').length === 1 ? 'ão' : 'ões'}
        </p>
      </div>
    </div>
  )
}
