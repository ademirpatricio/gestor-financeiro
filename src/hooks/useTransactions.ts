import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Transaction, TransactionType } from '../types'

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTransactions = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('transactions')
      .select('*, categories(id, name, type, icon)')
      .order('date', { ascending: false })

    if (!error && data) setTransactions(data as Transaction[])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  async function addTransaction(payload: {
    amount: number
    description: string
    date: string
    type: TransactionType
    category_id: string | null
  }) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase.from('transactions').insert({
      ...payload,
      user_id: user.id,
    })

    if (error) throw error
    await fetchTransactions()
  }

  async function updateTransaction(
    id: string,
    payload: {
      amount: number
      description: string
      date: string
      type: TransactionType
      category_id: string | null
    }
  ) {
    const { error } = await supabase
      .from('transactions')
      .update(payload)
      .eq('id', id)

    if (error) throw error
    await fetchTransactions()
  }

  async function deleteTransaction(id: string) {
    const { error } = await supabase.from('transactions').delete().eq('id', id)
    if (error) throw error
    await fetchTransactions()
  }

  const totals = transactions.reduce(
    (acc, t) => {
      if (t.type === 'income') acc.income += t.amount
      else acc.expense += t.amount
      return acc
    },
    { income: 0, expense: 0 }
  )

  return {
    transactions,
    loading,
    totals,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    refetch: fetchTransactions,
  }
}
