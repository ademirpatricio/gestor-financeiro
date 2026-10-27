import type { FilterType, SortOption } from '../types'

interface Props {
  filter: FilterType
  onFilterChange: (f: FilterType) => void
  sort: SortOption
  onSortChange: (s: SortOption) => void
  /** Empilha os controles e estica as abas na largura toda (mobile). */
  stacked?: boolean
}

/** Abas Todos/Entradas/Saídas e ordenação. Usado nas duas telas. */
export function TransactionFilters({ filter, onFilterChange, sort, onSortChange, stacked = false }: Props) {
  return (
    <div className={stacked ? 'flex flex-col gap-3' : 'flex flex-wrap items-center justify-between gap-3 mb-4'}>
      <div className={`flex gap-1 p-1 rounded bg-white border border-brown_light/30 shadow-sm ${stacked ? 'w-full' : ''}`}>
        {(['all', 'income', 'expense'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-4 rounded text-small font-semibold uppercase tracking-wide transition-all ${
              stacked ? 'flex-1 py-2.5' : 'py-1.5'
            }`}
            style={filter === f ? {
              backgroundColor: f === 'income' ? '#8A9B6A' : f === 'expense' ? '#C4604A' : '#2D1F17',
              color: '#FBF8F5',
            } : { color: '#8A7A70', backgroundColor: 'transparent' }}
          >
            {f === 'all' ? 'Todos' : f === 'income' ? 'Entradas' : 'Saídas'}
          </button>
        ))}
      </div>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className={`text-small border border-brown_light/30 rounded px-3 bg-white text-brown focus:outline-none focus:ring-2 focus:ring-olive/30 shadow-sm ${
          stacked ? 'self-start py-2.5' : 'py-2'
        }`}
      >
        <option value="date_desc">Data (mais recente)</option>
        <option value="date_asc">Data (mais antiga)</option>
        <option value="amount_desc">Valor (maior)</option>
        <option value="amount_asc">Valor (menor)</option>
        <option value="category_asc">Categoria (A–Z)</option>
      </select>
    </div>
  )
}
