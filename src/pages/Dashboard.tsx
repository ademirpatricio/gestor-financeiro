import { useState } from 'react'
import { CategoryManager } from '../components/CategoryManager'
import { Settings } from '../components/Settings'
import { Sidebar } from '../components/Sidebar'
import { SummaryCards } from '../components/SummaryCards'
import { TransactionList } from '../components/TransactionList'
import { TransactionModal } from '../components/TransactionModal'
import { useAuth } from '../hooks/useAuth'
import { useCategories } from '../hooks/useCategories'
import { useTransactions } from '../hooks/useTransactions'
import type { Transaction } from '../types'

type View = 'dashboard' | 'categories' | 'settings'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

export function Dashboard() {
  const { session } = useAuth()
  const { transactions, loading, addTransaction, updateTransaction, deleteTransaction, deleteAllTransactions } = useTransactions()
  const { categories, addCategory, deleteCategory, updateCategory } = useCategories()

  const [view, setView] = useState<View>('dashboard')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)

  const name = (session?.user.user_metadata?.name as string | undefined)?.trim() || (session?.user.email?.split('@')[0] ?? '')

  function openAdd() { setEditing(null); setModalOpen(true) }
  function openEdit(t: Transaction) { setEditing(t); setModalOpen(true) }

  async function handleSave(payload: Parameters<typeof addTransaction>[0]) {
    if (editing) await updateTransaction(editing.id, payload)
    else await addTransaction(payload)
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Excluir esta transação?')) return
    await deleteTransaction(id)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar view={view} onChangeView={setView} />

      <main className="flex-1 p-8 overflow-auto">
        {view === 'dashboard' ? (
          <>
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-text-secondary mb-1">
                  {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
                <h1 className="font-bold text-3xl text-text-primary leading-tight">
                  {greeting()}, <span style={{ color: '#C4604A' }}>{name}.</span>
                </h1>
              </div>
              <button
                onClick={openAdd}
                className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90"
                style={{ backgroundColor: '#5A6B3A' }}
              >
                <span>+</span> Nova transação
              </button>
            </div>

            <SummaryCards transactions={transactions} />

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#8A9B6A', borderTopColor: 'transparent' }} />
              </div>
            ) : (
              <TransactionList transactions={transactions} onEdit={openEdit} onDelete={handleDelete} />
            )}
          </>
        ) : view === 'settings' ? (
          <Settings onResetAll={deleteAllTransactions} />
        ) : (
          <CategoryManager categories={categories} onAdd={addCategory} onDelete={deleteCategory} onUpdate={updateCategory} />
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
