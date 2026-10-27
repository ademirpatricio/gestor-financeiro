import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import type { Breakdown, Slice } from '../utils/breakdown'
import { fmtCurrency, fmtDate } from '../utils/format'

interface Props {
  title: string
  tone: 'income' | 'expense'
  data: Breakdown
  emptyText: string
}

// Só cores que já existem no tailwind.config. As classes ficam escritas por extenso
// para o Tailwind encontrar. A cor segue a posição da fatia (1ª, 2ª...), não a categoria.
// Precisa de pelo menos MAX_NAMED_SLICES cores (hoje 8). A ordem alterna os tons
// (vermelho, verde, azul, rosa...) para fatias vizinhas não ficarem parecidas.
const PALETTE = [
  { stroke: 'stroke-terracotta', bg: 'bg-terracotta' },
  { stroke: 'stroke-olive', bg: 'bg-olive' },
  { stroke: 'stroke-blue', bg: 'bg-blue' },
  { stroke: 'stroke-salmon', bg: 'bg-salmon' },
  { stroke: 'stroke-brown', bg: 'bg-brown' },
  { stroke: 'stroke-olive_light', bg: 'bg-olive_light' },
  { stroke: 'stroke-blue_light', bg: 'bg-blue_light' },
  { stroke: 'stroke-rust_light', bg: 'bg-rust_light' },
]
const OTHERS_COLOR = { stroke: 'stroke-brown_light', bg: 'bg-brown_light' }

// Medidas do desenho (viewBox 120 x 120). O furo do meio fica com uns 143px no mobile e 250px no desktop grande.
const CENTER = 60
const RADIUS = 48
const STROKE = 18
const GAP = 2

function colorFor(slice: Slice, index: number) {
  if (slice.isOthers) return OTHERS_COLOR
  return PALETTE[index] ?? OTHERS_COLOR
}

function fmtPercent(percent: number) {
  return percent < 1 ? '<1%' : `${Math.round(percent)}%`
}

function plural(n: number, singular: string, pluralForm: string) {
  return `${n} ${n === 1 ? singular : pluralForm}`
}

/** Rosca de categorias em SVG, com legenda. Sem biblioteca de gráfico. */
export function CategoryDonut({ title, tone, data, emptyText }: Props) {
  const { slices, total, count } = data
  const titleColor = tone === 'expense' ? 'text-rust' : 'text-olive'
  const circumference = 2 * Math.PI * RADIUS
  // Só uma fatia fica aberta por vez. O pai troca a "key" ao mudar de mês, e isso fecha tudo.
  const [openKey, setOpenKey] = useState<string | null>(null)
  const idBase = useId()

  let offset = 0
  const arcs = slices.map((slice, i) => {
    const full = (slice.percent / 100) * circumference
    // Um respiro entre as fatias. Com uma fatia só, o anel fica inteiro.
    const length = slices.length > 1 ? Math.max(full - GAP, 0.5) : full
    const arc = { slice, color: colorFor(slice, i), length, offset }
    offset += full
    return arc
  })

  const top = slices[0]

  return (
    <section
      aria-label={title}
      className="rounded border border-brown_light/30 bg-white py-12 px-16 shadow-sm"
    >
      <div className="flex items-baseline justify-between gap-[16px]">
        <h3 className={`text-h5 font-bold ${titleColor}`}>{title}</h3>
        <p className="text-small text-brown/80">{plural(count, 'transação', 'transações')}</p>
      </div>

      {!top ? (
        <p className="py-[80px] text-center text-brown/80">{emptyText}</p>
      ) : (
        <div className="mt-[24px] flex flex-col items-center gap-[24px] md:flex-row md:items-start md:gap-[40px]">
          {/* Coluna da esquerda (rosca). Tamanho fixo: 220px no celular, 300px no md e 380px no lg. */}
          <div className="relative h-[220px] w-[220px] shrink-0 md:h-[350px] md:w-[350px] lg:h-[450px] lg:w-[450px]">
            <svg
              viewBox="0 0 120 120"
              role="img"
              aria-label={`${title} por categoria. A maior é ${top.name}, com ${fmtPercent(top.percent)} de ${fmtCurrency(total)}.`}
              className="h-full w-full"
            >
              {arcs.map(({ slice, color, length, offset: start }) => (
                <circle
                  key={slice.key}
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS}
                  fill="none"
                  strokeWidth={STROKE}
                  strokeDasharray={`${length} ${circumference - length}`}
                  strokeDashoffset={-start}
                  transform={`rotate(-90 ${CENTER} ${CENTER})`}
                  className={color.stroke}
                >
                  <title>{`${slice.name}: ${fmtCurrency(slice.value)} (${fmtPercent(slice.percent)})`}</title>
                </circle>
              ))}
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-small text-brown/80">Total</p>
              <p className="whitespace-nowrap text-body font-bold">{fmtCurrency(total)}</p>
            </div>
          </div>

          {/* Coluna da direita (legenda). Não tem largura fixa: o "md:flex-1" faz ela ocupar só o que sobra
              ao lado da rosca. Para deixá-la mais estreita, aumente a rosca (h/w acima).
              Para travar a largura, troque "md:flex-1" por algo como "md:w-[360px] md:flex-none". */}
          <ul className="w-full space-y-[12px] md:min-w-0 md:flex-1">
            {arcs.map(({ slice, color }) => {
              const open = openKey === slice.key
              const panelId = `${idBase}-${slice.key}`
              return (
                <li key={slice.key}>
                  <div className="flex items-center gap-[12px]">
                    <span
                      aria-hidden="true"
                      className={`h-[12px] w-[12px] shrink-0 rounded-full ${color.bg}`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{slice.name}</p>
                      <p className="text-small text-brown/80">
                        {slice.isOthers && <>{plural(slice.categories, 'categoria', 'categorias')} · </>}
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={panelId}
                          onClick={() => setOpenKey(open ? null : slice.key)}
                          className="inline-flex items-center gap-[4px] py-[4px] underline decoration-dotted underline-offset-[3px] hover:text-brown"
                        >
                          {plural(slice.count, 'transação', 'transações')}
                          <ChevronDown
                            size={14}
                            aria-hidden="true"
                            className={`transition-transform ${open ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{fmtCurrency(slice.value)}</p>
                      <p className="text-small text-brown/80">{fmtPercent(slice.percent)}</p>
                    </div>
                  </div>

                  {open && (
                    <ul
                      id={panelId}
                      tabIndex={0}
                      aria-label={`Transações de ${slice.name}`}
                      className="mt-[8px] max-h-[320px] overflow-y-auto rounded bg-brown_light/10"
                    >
                      {slice.transactions.map((t) => (
                        <li
                          key={t.id}
                          className="flex items-center gap-[12px] px-[12px] py-[8px] [&:nth-child(even)]:bg-brown_light/10"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate">{t.description || 'Sem descrição'}</p>
                            <p className="truncate text-small text-brown/80">
                              {fmtDate(t.date)}
                              {slice.isOthers && ` · ${t.categories?.name ?? 'Sem categoria'}`}
                            </p>
                          </div>
                          <p className="whitespace-nowrap font-medium">{fmtCurrency(t.amount)}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </section>
  )
}
