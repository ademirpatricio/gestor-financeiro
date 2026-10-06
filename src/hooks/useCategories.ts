import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Category, TransactionType } from '../types'

const DEFAULT_CATEGORIES: { name: string; type: TransactionType; icon: string }[] = [
  { name: 'Salário', type: 'income', icon: 'Wallet' },
  { name: 'Extras', type: 'income', icon: 'TrendingUp' },
  { name: 'Alimentação', type: 'expense', icon: 'UtensilsCrossed' },
  { name: 'Casa', type: 'expense', icon: 'Home' },
  { name: 'Transporte', type: 'expense', icon: 'Fuel' },
  { name: 'Saúde', type: 'expense', icon: 'Hospital' },
  { name: 'Educação', type: 'expense', icon: 'BookOpen' },
  { name: 'Lazer', type: 'expense', icon: 'Gamepad2' },
  { name: 'Compras', type: 'expense', icon: 'ShoppingCart' },
  { name: 'Serviços', type: 'expense', icon: 'Smartphone' },
  { name: 'Economias', type: 'expense', icon: 'PiggyBank' },
]

// Evita criar as categorias duas vezes quando o React monta o hook em duplicidade.
const seedingByUser = new Map<string, Promise<void>>()

// Conta nova começa com um conjunto padrão de categorias, uma única vez.
// A marca fica no perfil do usuário, então apagar tudo depois não recria nada.
async function seedDefaultsOnce(existingCount: number): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.user_metadata?.categories_seeded === true) return false

  let task = seedingByUser.get(user.id)
  if (!task) {
    task = (async () => {
      if (existingCount === 0) {
        const { error } = await supabase
          .from('categories')
          .insert(DEFAULT_CATEGORIES.map((c) => ({ ...c, user_id: user.id })))
        if (error) throw error
      }
      await supabase.auth.updateUser({ data: { categories_seeded: true } })
    })().finally(() => seedingByUser.delete(user.id))
    seedingByUser.set(user.id, task)
    await task
    return existingCount === 0
  }
  await task
  return false
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (!error && data) {
      setCategories(data)
      try {
        if (await seedDefaultsOnce(data.length)) {
          const { data: seeded } = await supabase.from('categories').select('*').order('name')
          if (seeded) setCategories(seeded)
        }
      } catch {
        // Sem categorias padrão o app continua funcionando.
      }
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  async function addCategory(name: string, type: TransactionType, icon: string | null = null) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase.from('categories').insert({
      name,
      type,
      icon,
      user_id: user.id,
    })

    if (error) throw error
    await fetchCategories()
  }

  async function deleteCategory(id: string) {
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) throw error
    await fetchCategories()
  }

  async function updateCategory(id: string, name: string, icon: string | null) {
    const { error } = await supabase
      .from('categories')
      .update({ name, icon })
      .eq('id', id)
    if (error) throw error
    await fetchCategories()
  }

  return { categories, loading, addCategory, deleteCategory, updateCategory, refetch: fetchCategories }
}
