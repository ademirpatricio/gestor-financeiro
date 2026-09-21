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
      <div className="bg-white rounded p-5 shadow-sm border border-border relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ backgroundColor: '#5B7A96' }} />
        <div className="flex items-start justify-between mb-3">
          <p className="text-xs uppercase tracking-widest text-text-secondary">Saldo atual</p>
          <span style={{ color: '#5B7A96', opacity: 0.7 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </span>
        </div>
        <p className="text-2xl font-bold text-brand-blue" style={{ color: '#5B7A96' }}>
          {fmt(balance)}
        </p>
        <p className="text-xs text-text-secondary mt-1">
          {balance >= 0 ? 'Você está no positivo' : 'Atenção: saldo negativo'}
        </p>
      </div>

      {/* Entradas */}
      <div className="bg-white rounded p-5 shadow-sm border border-border relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ backgroundColor: '#8A9B6A' }} />
        <div className="flex items-start justify-between mb-3">
          <p className="text-xs uppercase tracking-widest text-text-secondary">Entradas</p>
          <span style={{ color: '#8A9B6A', opacity: 0.7 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
            </svg>
          </span>
        </div>
        <p className="text-2xl font-bold text-income">{fmt(income)}</p>
        <p className="text-xs text-text-secondary mt-1">
          {transactions.filter((t) => t.type === 'income').length} transaç{transactions.filter((t) => t.type === 'income').length === 1 ? 'ão' : 'ões'}
        </p>
      </div>

      {/* Saídas */}
      <div className="bg-white rounded p-5 shadow-sm border border-border relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ backgroundColor: '#C4604A' }} />
        <div className="flex items-start justify-between mb-3">
          <p className="text-xs uppercase tracking-widest text-text-secondary">Saídas</p>
          <span style={{ color: '#C4604A', opacity: 0.7 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
            </svg>
          </span>
        </div>
        <p className="text-2xl font-bold text-expense">{fmt(expense)}</p>
        <p className="text-xs text-text-secondary mt-1">
          {transactions.filter((t) => t.type === 'expense').length} transaç{transactions.filter((t) => t.type === 'expense').length === 1 ? 'ão' : 'ões'}
        </p>
      </div>
    </div>
  )
}
