import { useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Menu, Search } from 'lucide-react'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { MobileMenu } from '../../components/MobileMenu'
import { MonthSwitcher } from '../../components/MonthSwitcher'
import { TransactionFilters } from '../../components/TransactionFilters'
import { TransactionRows } from '../../components/TransactionRows'
import type { DashboardState } from '../../hooks/useDashboard'
import { fmtCurrency } from '../../utils/format'
import { ManagementView } from './ManagementView'

/** Bolinha com seta que acompanha os totais de Entradas e Saídas. */
function FlowBadge({ type }: { type: 'income' | 'expense' }) {
  const isIncome = type === 'income'
  return (
    <span
      aria-hidden="true"
      className={`w-[20px] h-[20px] rounded-full flex items-center justify-center shrink-0 text-white ${isIncome ? 'bg-olive' : 'bg-rust'}`}
    >
      {isIncome ? <ArrowUpRight size={12} strokeWidth={3} /> : <ArrowDownLeft size={12} strokeWidth={3} />}
    </span>
  )
}

/** Tela mobile: topo verde com saldo, folha branca com mês, totais e lista. Só visual. */
export function DashboardMobile({ dashboard: d }: { dashboard: DashboardState }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isDashboard = d.view === 'dashboard'

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Topo verde: logo, saldo do mês e menu. O env() deixa o conteúdo abaixo do notch. */}
      <header className="bg-olive text-white px-[16px] pt-[calc(16px+env(safe-area-inset-top))] pb-[48px]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <img 
            src="/logo-mobile-dark.svg" alt="Grana" 
            className="h-[65px] w-auto justify-self-start"
          />

          {isDashboard ? (
            <div className="text-center">
              <p className="text-h4 font-medium mt-2">{fmtCurrency(d.summary.balance)}</p>
              <p className="text-small text-white/60 mt-1">Saldo atual</p>
            </div>
          ) : <span />}

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="w-[44px] h-[44px] flex items-center justify-center justify-self-end"
          >
            <Menu size={28} strokeWidth={3} />
          </button>
        </div>
      </header>

      {/* Folha branca que sobe por cima do topo verde */}
      <div className="relative flex-1 -mt-[24px] rounded-t-[24px] bg-white">
        {isDashboard ? (
          <>
            {/* Mês */}
            <div className="flex justify-center pt-[12px]">
              <MonthSwitcher month={d.month} onPrev={d.goPrevMonth} onNext={d.goNextMonth} />
            </div>

            {/* Entradas e Saídas do mês */}
            <section className="grid grid-cols-[1fr_1px_1fr] items-center px-[16px] pt-[8px] pb-[20px]">
              <div className="text-center">
                <p className="text-small text-brown/70">Entradas</p>
                <p className="flex items-center justify-center
                gap-[8px] text-h5 font-medium text-olive mt-[4px]">
                  <FlowBadge type="income" />
                  {fmtCurrency(d.summary.income)}
                </p>
              </div>

              <div className="w-[1px] h-[40px] bg-brown_light/30" />

              <div className="text-center">
                <p className="text-small text-brown/70">Saídas</p>
                <p className="flex items-center
                justify-center gap-[8px] text-h5 font-medium text-rust mt-[4px]">
                  <FlowBadge type="expense" />
                  {fmtCurrency(d.summary.expense)}
                </p>
              </div>
            </section>

            {/* Filtros: escondidos por enquanto. O novo desenho entra depois. */}
            <div className="hidden px-[16px] pb-[12px]">
              <TransactionFilters
                stacked
                filter={d.filter}
                onFilterChange={d.setFilter}
                sort={d.sort}
                onSortChange={d.setSort}
              />
            </div>

            {/* Lista. O padding de baixo abre espaço para a barra fixa. */}
            <main className="pb-[120px]">
              {d.loading ? (
                <LoadingSpinner />
              ) : (
                <TransactionRows
                  transactions={d.visible}
                  onEdit={d.openEdit}
                  onDelete={d.handleDelete}
                />
              )}
            </main>

            {/* Barra fixa: nova transação e busca. O env() respeita a barra do iPhone. */}
            <div className="fixed bottom-0 inset-x-0 z-30 flex gap-[16px] bg-white border-t border-brown_light/30 px-[20px] pt-[18px] pb-[calc(18px+env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={d.openAdd}
                className="flex-1 h-[60px] rounded bg-olive font-bold uppercase tracking-wide text-white transition-all hover:opacity-90"
              >
                + Nova transação
              </button>

              {/* TODO: busca ainda não existe. O botão está só na tela. */}
              <button
                type="button"
                aria-label="Buscar transações"
                className="w-[62px] h-[60px] shrink-0 flex items-center justify-center rounded bg-olive text-white transition-all hover:opacity-90"
              >
                <Search size={26} strokeWidth={2.5} />
              </button>
            </div>
          </>
        ) : (
          <main className="p-[16px]">
            <ManagementView dashboard={d} />
          </main>
        )}
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        view={d.view}
        onChangeView={d.setView}
      />
    </div>
  )
}
