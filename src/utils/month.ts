/** Mês no formato "AAAA-MM", o mesmo prefixo das datas das transações ("AAAA-MM-DD"). */
export type MonthKey = string

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function currentMonthKey(): MonthKey {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`
}

/** Anda `delta` meses para frente (positivo) ou para trás (negativo). */
export function shiftMonth(key: MonthKey, delta: number): MonthKey {
  const [y, m] = key.split('-').map(Number)
  const index = y * 12 + (m - 1) + delta
  return `${Math.floor(index / 12)}-${pad((index % 12) + 1)}`
}

export function monthName(key: MonthKey): string {
  const m = Number(key.split('-')[1])
  return MONTH_NAMES[m - 1]
}

export function monthYear(key: MonthKey): string {
  return key.split('-')[0]
}

/** Compara texto, sem passar por Date, para não ter problema de fuso horário. */
export function isInMonth(dateStr: string, key: MonthKey): boolean {
  return dateStr.startsWith(key)
}
