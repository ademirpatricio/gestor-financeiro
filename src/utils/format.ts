export function fmtCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

/** "2026-10-15" vira "15/10/2026". */
export function fmtDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

/** Tem saldo anterior para mostrar? Esconde quando não buscou (null) ou quando é zero. */
export function hasPrevious(value: number | null): value is number {
  return value !== null && Math.abs(value) >= 0.005
}
