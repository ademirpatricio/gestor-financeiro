import type { Transaction, TransactionType } from '../types'

export interface Slice {
  key: string
  name: string
  value: number
  count: number
  /** Fatia do total, de 0 a 100. */
  percent: number
  /** Quantas categorias a fatia junta. Só passa de 1 em "Outras". */
  categories: number
  isOthers: boolean
  /** As transações da fatia, da mais recente para a mais antiga. */
  transactions: Transaction[]
}

export interface Breakdown {
  total: number
  /** Quantas transações do tipo existem no mês. */
  count: number
  slices: Slice[]
}

/** Quantas fatias com nome aparecem. O resto vira "Outras". */
export const MAX_NAMED_SLICES = 8
/** Categoria abaixo disso (em % do total) também vai para "Outras". */
export const MIN_SLICE_PERCENT = 3

const NO_CATEGORY = 'Sem categoria'

type Group = { key: string; name: string; value: number; count: number; transactions: Transaction[] }

function byDateDesc(a: Transaction, b: Transaction) {
  return b.date.localeCompare(a.date) || b.created_at.localeCompare(a.created_at)
}

function toCents(n: number) {
  return Math.round(n * 100) / 100
}

/**
 * Soma as transações de um tipo por categoria e devolve as fatias da rosca.
 * Agrupa pelo id da categoria, não pelo nome, para "Salário" e "SALÁRIO" não se misturarem.
 */
export function breakdownByCategory(
  transactions: Transaction[],
  type: TransactionType,
): Breakdown {
  const groups = new Map<string, Group>()
  let count = 0

  for (const t of transactions) {
    if (t.type !== type) continue
    count++
    const key = t.category_id ?? 'sem-categoria'
    const group = groups.get(key) ?? {
      key,
      name: t.categories?.name ?? NO_CATEGORY,
      value: 0,
      count: 0,
      transactions: [],
    }
    group.value += t.amount
    group.count++
    group.transactions.push(t)
    groups.set(key, group)
  }

  const sorted = [...groups.values()]
    .map((g) => ({ ...g, value: toCents(g.value), transactions: [...g.transactions].sort(byDateDesc) }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name, 'pt-BR'))

  const total = toCents(sorted.reduce((sum, g) => sum + g.value, 0))
  if (total === 0) return { total: 0, count, slices: [] }

  const percentOf = (value: number) => (value / total) * 100

  // Entram até MAX_NAMED_SLICES categorias, da maior para a menor, enquanto passarem de 3% do total.
  // A maior sempre entra, mesmo que o mês tenha categorias demais.
  const named: Group[] = []
  let i = 0
  while (
    i < sorted.length &&
    named.length < MAX_NAMED_SLICES &&
    (named.length === 0 || percentOf(sorted[i].value) >= MIN_SLICE_PERCENT)
  ) {
    named.push(sorted[i])
    i++
  }
  const rest = sorted.slice(i)

  const slices: Slice[] = named.map((g) => ({
    ...g,
    percent: percentOf(g.value),
    categories: 1,
    isOthers: false,
  }))

  if (rest.length === 1) {
    // "Outras" com uma categoria só não ajuda ninguém: mostra a própria categoria.
    const g = rest[0]
    slices.push({ ...g, percent: percentOf(g.value), categories: 1, isOthers: false })
  } else if (rest.length > 1) {
    const value = toCents(rest.reduce((sum, g) => sum + g.value, 0))
    slices.push({
      key: 'outras',
      name: 'Outras',
      value,
      count: rest.reduce((sum, g) => sum + g.count, 0),
      percent: percentOf(value),
      categories: rest.length,
      isOthers: true,
      transactions: rest.flatMap((g) => g.transactions).sort(byDateDesc),
    })
  }

  return { total, count, slices }
}
