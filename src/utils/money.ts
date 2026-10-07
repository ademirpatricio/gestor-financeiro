/**
 * Máscara para campo de valor em reais: aceita só números e uma vírgula,
 * com no máximo 2 casas decimais.
 * Ponto digitado vira vírgula. Se vier vírgula e ponto juntos (ex.: "1.234,56"),
 * os pontos são tratados como separador de milhar e removidos.
 */
export function maskMoneyInput(raw: string): string {
  let v = raw.includes(',') ? raw.replace(/\./g, '') : raw.replace(/\./g, ',')
  v = v.replace(/[^\d,]/g, '')

  const commaAt = v.indexOf(',')
  if (commaAt === -1) return v.replace(/^0+(?=\d)/, '')

  const intPart = v.slice(0, commaAt).replace(/^0+(?=\d)/, '') || '0'
  const decimals = v.slice(commaAt + 1).replace(/,/g, '').slice(0, 2)
  return `${intPart},${decimals}`
}

/** Converte o texto da máscara ("1234,56") em número (1234.56). */
export function parseMoney(masked: string): number {
  return parseFloat(masked.replace(',', '.'))
}
