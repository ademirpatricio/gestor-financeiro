import { TransactionModal } from '../components/TransactionModal'
import { useDashboard } from '../hooks/useDashboard'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { DashboardDesktop } from './dashboard/DashboardDesktop'
import { DashboardMobile } from './dashboard/DashboardMobile'

// 1024px (lg) e não 768px (md): com a sidebar, a tabela não cabe em tablet na vertical.
const DESKTOP_QUERY = '(min-width: 1024px)'

/**
 * Página do dashboard. Só escolhe qual tela mostrar.
 * Estado e lógica moram no useDashboard, então girar o celular ou
 * redimensionar a janela não perde mês, filtro nem ordenação.
 */
export function Dashboard() {
  const dashboard = useDashboard()
  const isDesktop = useMediaQuery(DESKTOP_QUERY)

  return (
    <>
      {isDesktop
        ? <DashboardDesktop dashboard={dashboard} />
        : <DashboardMobile dashboard={dashboard} />}

      <TransactionModal
        open={dashboard.modalOpen}
        onClose={dashboard.closeModal}
        onSave={dashboard.handleSave}
        categories={dashboard.categories}
        initial={dashboard.editing}
      />
    </>
  )
}
