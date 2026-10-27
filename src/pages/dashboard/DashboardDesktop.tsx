import { LoadingSpinner } from '../../components/LoadingSpinner'
import { MonthSwitcher } from '../../components/MonthSwitcher'
import { Sidebar } from '../../components/Sidebar'
import { SummaryCards } from '../../components/SummaryCards'
import { TransactionFilters } from '../../components/TransactionFilters'
import { TransactionTable } from '../../components/TransactionTable'
import type { DashboardState } from '../../hooks/useDashboard'
import { ManagementView } from './ManagementView'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

/** Tela desktop: sidebar, resumo em 3 cards e tabela. Só visual. */
export function DashboardDesktop({ dashboard: d }: { dashboard: DashboardState }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar view={d.view} onChangeView={d.setView} />

      <main className="flex-1 p-8 overflow-auto bg-white">
        {d.view === 'dashboard' ? (
          <>
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <p className="text-small uppercase tracking-widest text-brown/80 mb-4">
                  {new Date().toLocaleDateString('pt-BR',
                    { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
                <h4 className="font-bold text-h4">
                  {greeting()}, <span className="text-rust">{d.name}.</span>
                </h4>
              </div>

              <div className="flex items-center gap-4">
                <MonthSwitcher month={d.month} onPrev={d.goPrevMonth} onNext={d.goNextMonth} />
                <button
                  onClick={d.openAdd}
                  className="flex items-center gap-2 px-5 py-3 rounded bg-olive
                  font-medium text-white shadow-sm transition-all hover:opacity-90"
                >
                  <span>+</span> Nova transação
                </button>
              </div>
            </div>

            <SummaryCards transactions={d.monthTransactions} />

            <TransactionFilters
              filter={d.filter}
              onFilterChange={d.setFilter}
              sort={d.sort}
              onSortChange={d.setSort}
            />

            {d.loading ? (
              <LoadingSpinner />
            ) : (
              <TransactionTable
                transactions={d.visible}
                sort={d.sort}
                onSortChange={d.setSort}
                onEdit={d.openEdit}
                onDelete={d.handleDelete}
              />
            )}
          </>
        ) : (
          <ManagementView dashboard={d} />
        )}
      </main>
    </div>
  )
}
