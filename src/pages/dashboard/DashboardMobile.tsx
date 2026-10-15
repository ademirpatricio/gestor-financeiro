import { useState } from 'react'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { MobileMenu } from '../../components/MobileMenu'
import { MonthSwitcher } from '../../components/MonthSwitcher'
import { TransactionCards } from '../../components/TransactionCards'
import { TransactionFilters } from '../../components/TransactionFilters'
import type { DashboardState } from '../../hooks/useDashboard'
import { fmtCurrency } from '../../utils/format'
import { ManagementView } from './ManagementView'

/** Tela mobile: topo com menu, mês + saldo, filtros, cards e botão fixo. Só visual. */
export function DashboardMobile({ dashboard: d }: { dashboard: DashboardState }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Topo: logo e menu */}
      <header className="flex items-center justify-between h-16 pl-4 pr-2">
        <img src="/logo-primary.svg" alt="Grana" className="h-10 w-auto" />
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          className="w-11 h-11 flex items-center justify-center text-brown"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </header>

      {d.view === 'dashboard' ? (
        <>
          {/* Mês e saldo */}
          <section className="px-4 pb-3">
            <div className="flex items-center justify-between gap-3">
              <MonthSwitcher month={d.month} onPrev={d.goPrevMonth} onNext={d.goNextMonth} />
              <div className="text-right">
                <p className="sr-only">Saldo do mês</p>
                <p className="text-h4 font-bold text-blue">{fmtCurrency(d.summary.balance)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-small mt-2">
              <p className="text-olive font-medium">Entradas {fmtCurrency(d.summary.income)}</p>
              <p className="text-rust font-medium">Saídas {fmtCurrency(d.summary.expense)}</p>
            </div>
          </section>

          {/* Filtros */}
          <div className="px-4 py-3 bg-salmon_light/40">
            <TransactionFilters
              stacked
              filter={d.filter}
              onFilterChange={d.setFilter}
              sort={d.sort}
              onSortChange={d.setSort}
            />
          </div>

          {/* Lista. O padding de baixo abre espaço para o botão fixo. */}
          <main className="flex-1 bg-brown_light/10 px-4 pt-4 pb-28">
            {d.loading ? (
              <LoadingSpinner />
            ) : (
              <TransactionCards
                transactions={d.visible}
                onEdit={d.openEdit}
                onDelete={d.handleDelete}
              />
            )}
          </main>

          {/* Botão fixo. O env() respeita a barra do iPhone. */}
          <div className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-brown_light/20 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <button
              onClick={d.openAdd}
              className="w-full py-4 rounded bg-olive font-bold uppercase tracking-wide text-white transition-all hover:opacity-90"
            >
              Nova transação
            </button>
          </div>
        </>
      ) : (
        <main className="flex-1 p-4">
          <ManagementView dashboard={d} />
        </main>
      )}

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        view={d.view}
        onChangeView={d.setView}
      />
    </div>
  )
}
