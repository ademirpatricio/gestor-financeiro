import { CategoryManager } from '../../components/CategoryManager'
import { ChartsView } from '../../components/ChartsView'
import { Settings } from '../../components/Settings'
import type { DashboardState } from '../../hooks/useDashboard'

/** Telas de Gráficos, Configurações e Categorias. Iguais nas duas versões. */
export function ManagementView({ dashboard: d }: { dashboard: DashboardState }) {
  if (d.view === 'charts') {
    return (
      <ChartsView
        month={d.month}
        onPrev={d.goPrevMonth}
        onNext={d.goNextMonth}
        transactions={d.monthTransactions}
        loading={d.loading}
      />
    )
  }

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
