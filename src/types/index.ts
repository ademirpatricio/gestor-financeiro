export type TransactionType = 'income' | 'expense'

export interface Category {
  id: string
  user_id: string
  name: string
  type: TransactionType
  icon: string | null
  created_at: string
}

export interface Transaction {
  id: string
  user_id: string
  amount: number
  description: string | null
  date: string
  type: TransactionType
  category_id: string | null
  created_at: string
  categories?: Category | null
}

export type SortOption =
  | 'date_desc'
  | 'date_asc'
  | 'amount_desc'
  | 'amount_asc'
  | 'category_asc'

export type FilterType = 'all' | 'income' | 'expense'
