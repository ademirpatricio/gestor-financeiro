import { useMemo, useState } from 'react'
import type { FilterType, SortOption, Transaction } from '../types'
import { currentMonthKey, shiftMonth } from '../utils/month'
import { useAuth } from './useAuth'
import { useCategories } from './useCategories'
import { useTransactions } from './useTransactions'

export type DashboardView = 'dashboard' | 'charts' | 'categories' | 'settings'

type SavePayload = Parameters<ReturnType<typeof useTransactions>['addTransaction']>[0]

function sortTransactions(list: Transaction[], sort: SortOption) {
  return [...list].sort((a, b) => {
    switch (sort) {
      case 'date_desc': return b.date.localeCompare(a.date)
      case 'date_asc': return a.date.localeCompare(b.date)
      case 'amount_desc': return b.amount - a.amount
      case 'amount_asc': return a.amount - b.amount
      case 'category_asc': return (a.categories?.name ?? '').localeCompare(b.categories?.name ?? '')
      default: return 0
    }
  })
}

/**
 * Todo o estado e a lógica do dashboard ficam aqui.
 * As telas (desktop e mobile) só desenham o que este hook entrega.
 */
export function useDashboard() {
  const { session } = useAuth()
  const [month, setMonth] = useState(currentMonthKey)
  // O hook já traz só o mês escolhido.
  const {
    transactions: monthTransactions, loading,
    addTransaction, updateTransaction, deleteTransaction, deleteAllTransactions,
  } = useTransactions(month)
  const { categories, addCategory, deleteCategory, updateCategory } = useCategories()

  const [view, setView] = useState<DashboardView>('dashboard')
  const [filter, setFilter] = useState<FilterType>('all')
  const [sort, setSort] = useState<SortOption>('date_desc')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)

  const name =
    (session?.user.user_metadata?.name as string | undefined)?.trim() ||
    (session?.user.email?.split('@')[0] ?? '')

  const summary = useMemo(() => {
    const s = { income: 0, expense: 0, incomeCount: 0, expenseCount: 0 }
    for (const t of monthTransactions) {
      if (t.type === 'income') { s.income += t.amount; s.incomeCount++ }
      else { s.expense += t.amount; s.expenseCount++ }
    }
    return { ...s, balance: s.income - s.expense }
  }, [monthTransactions])

  // O que aparece na lista: mês + aba (todos, entradas, saídas) + ordem.
  const visible = useMemo(
    () => sortTransactions(
      monthTransactions.filter((t) => filter === 'all' || t.type === filter),
      sort,
    ),
    [monthTransactions, filter, sort],
  )

  function goPrevMonth() { setMonth((m) => shiftMonth(m, -1)) }
  function goNextMonth() { setMonth((m) => shiftMonth(m, 1)) }

  function openAdd() { setEditing(null); setModalOpen(true) }
  function openEdit(t: Transaction) { setEditing(t); setModalOpen(true) }
  function closeModal() { setModalOpen(false) }

  async function handleSave(payload: SavePayload) {
    if (editing) await updateTransaction(editing.id, payload)
    else await addTransaction(payload)
    // Se a data caiu em outro mês, vai para ele. Senão a transação "some" da lista.
    setMonth(payload.date.slice(0, 7))
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Excluir esta transação?')) return
    await deleteTransaction(id)
  }

  return {
    // dados
    name, loading, categories, month, monthTransactions, summary, visible,
    // estado de tela
    view, filter, sort, modalOpen, editing,
    // ações
    setView, setFilter, setSort, goPrevMonth, goNextMonth,
    openAdd, openEdit, closeModal, handleSave, handleDelete,
    // repassadas para Configurações e Categorias
    deleteAllTransactions, addCategory, deleteCategory, updateCategory,
  }
}

export type DashboardState = ReturnType<typeof useDashboard>
