import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { MonthKey } from '../utils/month'
import { currentMonthKey, monthName, monthYear } from '../utils/month'

interface Props {
  month: MonthKey
  onPrev: () => void
  onNext: () => void
}

const arrowBtn = 'w-[44px] h-[44px] flex items-center justify-center rounded text-brown/70 hover:bg-brown_light/10 transition-colors'

/** Seletor de mês: < OUTUBRO >. O ano só aparece quando não é o ano atual. */
export function MonthSwitcher({ month, onPrev, onNext }: Props) {
  const year = monthYear(month)
  const showYear = year !== monthYear(currentMonthKey())

  return (
    <div className="flex items-center">
      <button type="button" onClick={onPrev} aria-label="Mês anterior" className={arrowBtn}>
        <ChevronLeft size={16} strokeWidth={2.5} />
      </button>

      <div className="min-w-[96px] text-center" aria-live="polite">
        <p className="font-bold uppercase leading-none">{monthName(month)}</p>
        {showYear && <p className="text-small text-brown/70 mt-[4px]">{year}</p>}
      </div>

      <button type="button" onClick={onNext} aria-label="Próximo mês" className={arrowBtn}>
        <ChevronRight size={16} strokeWidth={2.5} />
      </button>
    </div>
  )
}
