import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Transaction, TransactionType } from '../types'
import type { MonthKey } from '../utils/month'
import { shiftMonth } from '../utils/month'

const SELECT = '*, categories(id, name, type, icon)'

type TransactionPayload = {
  amount: number
  description: string
  date: string
  type: TransactionType
  category_id: string | null
}

// Lançamentos agrupados por mês ("AAAA-MM"). Só os meses visitados ficam aqui.
type ByMonth = Record<MonthKey, Transaction[]>

const monthOf = (date: string): MonthKey => date.slice(0, 7)

function sortByDateDesc(list: Transaction[]) {
  return [...list].sort((a, b) => b.date.localeCompare(a.date))
}

function withoutId(prev: ByMonth, id: string): ByMonth {
  const next: ByMonth = {}
  for (const key of Object.keys(prev)) next[key] = prev[key].filter((t) => t.id !== id)
  return next
}

// Só coloca a linha num mês que já foi carregado. Se o mês ainda não foi
// visitado, ele vem completo do banco quando a pessoa abrir.
function withRow(prev: ByMonth, row: Transaction): ByMonth {
  const key = monthOf(row.date)
  if (!prev[key]) return prev
  return { ...prev, [key]: sortByDateDesc([...prev[key], row]) }
}

/**
 * Busca no banco só o mês pedido e guarda cada mês já visto.
 * Voltar para um mês visitado é instantâneo. Salvar, editar e excluir
 * mexem na lista local, sem buscar tudo de novo.
 */
export function useTransactions(month: MonthKey) {
  const [byMonth, setByMonth] = useState<ByMonth>({})
  // Saldo acumulado antes de cada mês visitado. undefined = ainda buscando.
  // null = a busca falhou (a tela mostra só o saldo do mês, como antes).
  const [openingByMonth, setOpeningByMonth] = useState<Record<MonthKey, number | null>>({})
  // Sobe a cada alteração. Se uma busca começou antes de uma alteração,
  // o resultado dela pode estar velho, então ela roda de novo.
  const changes = useRef(0)

  const loadMonth = useCallback(async (key: MonthKey): Promise<void> => {
    const startedAt = changes.current
    const { data, error } = await supabase
      .from('transactions')
      .select(SELECT)
      .gte('date', `${key}-01`)
      .lt('date', `${shiftMonth(key, 1)}-01`)
      .order('date', { ascending: false })

    if (startedAt !== changes.current) return loadMonth(key)

    // Em caso de erro, mantém o que já estava na tela (ou lista vazia).
    setByMonth((prev) => ({
      ...prev,
      [key]: !error && data ? (data as Transaction[]) : prev[key] ?? [],
    }))
  }, [])

  // Soma de tudo que veio antes do mês. O cálculo é feito no banco (balance_before).
  const loadOpening = useCallback(async (key: MonthKey): Promise<void> => {
    const startedAt = changes.current
    const { data, error } = await supabase.rpc('balance_before', { p_month: `${key}-01` })

    if (startedAt !== changes.current) return loadOpening(key)

    setOpeningByMonth((prev) => ({
      ...prev,
      [key]: error || data === null ? null : Number(data),
    }))
  }, [])

  // Depois de salvar, editar ou excluir, o saldo anterior dos meses seguintes muda.
  // Mantém o valor do mês aberto na tela, descarta os outros e busca de novo.
  const refreshOpening = useCallback(
    (key: MonthKey) => {
      setOpeningByMonth((prev) => (key in prev ? { [key]: prev[key] } : {}))
      void loadOpening(key)
    },
    [loadOpening],
  )

  useEffect(() => {
    loadMonth(month)
    loadOpening(month)
  }, [month, loadMonth, loadOpening])

  const transactions = byMonth[month] ?? []
  const openingBalance = openingByMonth[month] ?? null
  // Só mostra o spinner na primeira visita ao mês.
  const loading = byMonth[month] === undefined || openingByMonth[month] === undefined

  async function addTransaction(payload: TransactionPayload) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('transactions')
      .insert({ ...payload, user_id: user.id })
      .select(SELECT)
      .single()

    if (error) throw error
    changes.current++
    setByMonth((prev) => withRow(prev, data as Transaction))
    refreshOpening(month)
  }

  async function updateTransaction(id: string, payload: TransactionPayload) {
    const { data, error } = await supabase
      .from('transactions')
      .update(payload)
      .eq('id', id)
      .select(SELECT)
      .single()

    if (error) throw error
    changes.current++
    // Tira de onde estava e coloca no mês certo (a data pode ter mudado de mês).
    setByMonth((prev) => withRow(withoutId(prev, id), data as Transaction))
    refreshOpening(month)
  }

  async function deleteTransaction(id: string) {
    const { error } = await supabase.from('transactions').delete().eq('id', id)
    if (error) throw error
    changes.current++
    setByMonth((prev) => withoutId(prev, id))
    refreshOpening(month)
  }

  async function deleteAllTransactions() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase.from('transactions').delete().eq('user_id', user.id)
    if (error) throw error
    changes.current++
    setByMonth({ [month]: [] })
    refreshOpening(month)
  }

  return {
    transactions,
    openingBalance,
    loading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    deleteAllTransactions,
  }
}
