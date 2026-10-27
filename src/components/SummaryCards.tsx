import { ArrowDown, ArrowUp, DollarSign } from 'lucide-react'
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
      
      {/* Saldo ============================================= */}
      <div className="bg-white rounded py-5 px-8 shadow-sm border border-brown_light/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full rounded-l bg-blue"/>
        <div className="flex items-start justify-between mb-3">
          <p className="text-small uppercase font-medium">Saldo atual</p>
          <span className="text-blue opacity-70 hidden md:block">
            <DollarSign size={16} strokeWidth={2} />
          </span>
        </div>
        <p className="text-h4 font-bold text-blue">
          {fmt(balance)}
        </p>
        <p className="text-small text-brown_light mt-1">
          {balance >= 0 ? 'Você está no positivo' : 'Atenção: saldo negativo'}
        </p>
      </div>{/* ============================================= */}

      {/* Entradas ============================================= */}
      <div className="bg-white rounded py-5 px-8 shadow-sm border border-brown_light/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full rounded-l bg-olive"/>
        <div className="flex items-start justify-between mb-3">
          <p className="text-small uppercase font-medium">Entradas</p>
          <span className="text-olive opacity-70">
            <ArrowUp size={16} strokeWidth={2.5} />
          </span>
        </div>
        <p className="text-h4 font-bold text-olive ">{fmt(income)}</p>
        <p className="text-small text-brown_light mt-1">
          {transactions.filter((t) => t.type === 'income').length} transaç{transactions.filter((t) => t.type === 'income').length === 1 ? 'ão' : 'ões'}
        </p>
      </div>{/* ============================================= */}

      {/* Saídas ============================================= */}
      <div className="bg-white rounded py-5 px-8 shadow-sm border border-brown_light/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full rounded-l bg-rust"/>
        <div className="flex items-start justify-between mb-3">
          <p className="text-small uppercase font-medium">Saídas</p>
          <span className="text-rust opacity-70">
            <ArrowDown size={16} strokeWidth={2.5} />
          </span>
        </div>
        <p className="text-h4 font-bold text-rust">{fmt(expense)}</p>
        <p className="text-small text-brown_light mt-1">
          {transactions.filter((t) => t.type === 'expense').length} transaç{transactions.filter((t) => t.type === 'expense').length === 1 ? 'ão' : 'ões'}
        </p>
      </div>{/* ============================================= */}

    </div>
  )
}
