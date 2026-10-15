import { CategoryManager } from '../../components/CategoryManager'
import { Settings } from '../../components/Settings'
import type { DashboardState } from '../../hooks/useDashboard'

/** Telas de Configurações e Categorias. Iguais nas duas versões. */
export function ManagementView({ dashboard: d }: { dashboard: DashboardState }) {
  if (d.view === 'settings') return <Settings onResetAll={d.deleteAllTransactions} />

  return (
    <CategoryManager
      categories={d.categories}
      onAdd={d.addCategory}
      onDelete={d.deleteCategory}
      onUpdate={d.updateCategory}
    />
  )
}
