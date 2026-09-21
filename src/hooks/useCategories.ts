import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Category, TransactionType } from '../types'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (!error && data) setCategories(data)
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
