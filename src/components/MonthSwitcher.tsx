import type { MonthKey } from '../utils/month'
import { monthName, monthYear } from '../utils/month'

interface Props {
  month: MonthKey
  onPrev: () => void
  onNext: () => void
}

const arrowBtn = 'w-11 h-11 flex items-center justify-center rounded text-brown hover:bg-brown_light/10 transition-colors'

/** Seletor de mês: < OUTUBRO >. Usado nas duas telas. */
export function MonthSwitcher({ month, onPrev, onNext }: Props) {
  return (
    <div className="flex items-center">
      <button type="button" onClick={onPrev} aria-label="Mês anterior" className={arrowBtn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      <div className="min-w-24 text-center" aria-live="polite">
        <p className="font-bold uppercase leading-none">{monthName(month)}</p>
        <p className="text-small text-brown_light mt-1">{monthYear(month)}</p>
      </div>

      <button type="button" onClick={onNext} aria-label="Próximo mês" className={arrowBtn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  )
}
