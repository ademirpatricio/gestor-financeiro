import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export interface AdminUser {
  id: string
  name: string | null
  email: string
  created_at: string
  last_sign_in_at: string | null
}

// Busca a lista de usuários pela função admin_users do banco.
// O banco recusa a chamada de quem não é admin, então a segurança não depende da tela.
export function useAdminUsers(enabled: boolean) {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    let cancelled = false

    supabase.rpc('admin_users').then(({ data, error }) => {
      if (cancelled) return
      if (error) setError(error.message)
      else setUsers((data ?? []) as AdminUser[])
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [enabled])

  return { users, loading, error }
}
