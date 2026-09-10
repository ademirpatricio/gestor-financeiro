import { useState } from 'react'
import { CategoryManager } from '../components/CategoryManager'
import { Sidebar } from '../components/Sidebar'
import { SummaryCards } from '../components/SummaryCards'
import { TransactionList } from '../components/TransactionList'
import { TransactionModal } from '../components/TransactionModal'
import { useCategories } from '../hooks/useCategories'
import { useTransactions } from '../hooks/useTransactions'
import type { Transaction } from '../types'

type View = 'dashboard' | 'categories'

export function Dashboard() {
  const { transactions, loading, addTransaction, updateTransaction, deleteTransaction } =
    useTransactions()
  const { categories, addCategory, deleteCategory } = useCategories()

  const [view, setView] = useState<View>('dashboard')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)

  function openAdd() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEdit(t: Transaction) {
    setEditing(t)
    setModalOpen(true)
  }

  async function handleSave(payload: Parameters<typeof addTransaction>[0]) {
    if (editing) {
      await updateTransaction(editing.id, payload)
    } else {
      await addTransaction(payload)
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Excluir esta transação?')) return
    await deleteTransaction(id)
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar view={view} onChangeView={setView} />

      <main className="flex-1 p-8 overflow-auto">
        {view === 'dashboard' ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
              <button
                onClick={openAdd}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-income hover:bg-income/90 transition-colors"
              >
                + Nova transação
              </button>
            </div>

            <SummaryCards transactions={transactions} />

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 border-2 border-income border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <TransactionList
                transactions={transactions}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            )}
          </>
        ) : (
          <CategoryManager
            categories={categories}
            onAdd={addCategory}
            onDelete={deleteCategory}
          />
        )}
      </main>

      <TransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        categories={categories}
        initial={editing}
      />
    </div>
  )
}
