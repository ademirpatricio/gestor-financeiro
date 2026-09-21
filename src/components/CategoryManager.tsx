import { useState } from 'react'
import type { Category, TransactionType } from '../types'
import { CategoryIcon, ICON_LIST } from '../utils/categoryIcons'

interface Props {
  categories: Category[]
  onAdd: (name: string, type: TransactionType, icon: string | null) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onUpdate: (id: string, name: string, icon: string | null) => Promise<void>
}

function IconPicker({
  selected,
  onSelect,
  onClear,
}: {
  selected: string | null
  onSelect: (icon: string) => void
  onClear: () => void
}) {
  return (
    <div className="border border-border rounded p-3 bg-surface mt-1">
      <div className="grid grid-cols-8 gap-1">
        {ICON_LIST.map((name) => (
          <button
            key={name}
            type="button"
            title={name}
            onClick={() => onSelect(name)}
            className={`p-2 rounded flex items-center justify-center hover:bg-border/40 transition-colors ${
              selected === name ? 'bg-border/60 ring-1 ring-income/40' : ''
            }`}
          >
            <CategoryIcon name={name} size={16} className="text-text-primary" />
          </button>
        ))}
      </div>
      {selected && (
        <button
          type="button"
          onClick={onClear}
          className="mt-2 text-xs text-text-secondary underline"
        >
          Remover ícone
        </button>
      )}
    </div>
  )
}

export function CategoryManager({ categories, onAdd, onDelete, onUpdate }: Props) {
  const [name, setName] = useState('')
  const [type, setType] = useState<TransactionType>('expense')
  const [icon, setIcon] = useState<string | null>(null)
  const [showIconPicker, setShowIconPicker] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editIcon, setEditIcon] = useState<string | null>(null)
  const [showEditIconPicker, setShowEditIconPicker] = useState(false)
  const [editSaving, setEditSaving] = useState(false)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    setError('')
    try {
      await onAdd(name.trim(), type, icon)
      setName('')
      setIcon(null)
      setShowIconPicker(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar categoria.')
    } finally {
      setSaving(false)
    }
  }

  function startEdit(c: Category) {
    setEditingId(c.id)
    setEditName(c.name)
    setEditIcon(c.icon ?? null)
    setShowEditIconPicker(false)
  }

  function cancelEdit() {
    setEditingId(null)
    setShowEditIconPicker(false)
  }

  async function handleUpdate(id: string) {
    if (!editName.trim()) return
    setEditSaving(true)
    try {
      await onUpdate(id, editName.trim(), editIcon)
      setEditingId(null)
      setShowEditIconPicker(false)
    } catch {
      // ignore
    } finally {
      setEditSaving(false)
    }
  }

  const income = categories.filter((c) => c.type === 'income')
  const expense = categories.filter((c) => c.type === 'expense')

  return (
    <div>
      <h2 className="text-lg font-semibold text-text-primary mb-4">Categorias</h2>

      {/* Add form */}
      <form onSubmit={handleAdd} className="mb-6">
        <div className="flex gap-2 mb-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            className="border border-border rounded px-3 py-2 text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-income/30"
          >
            <option value="expense">Saída</option>
            <option value="income">Entrada</option>
          </select>

          <button
            type="button"
            onClick={() => setShowIconPicker(!showIconPicker)}
            className="w-10 h-10 flex items-center justify-center border border-border rounded bg-surface hover:border-income/50 transition-colors"
            title="Escolher ícone"
          >
            <CategoryIcon name={icon} size={16} className="text-text-secondary" />
          </button>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome da categoria"
            className="flex-1 border border-border rounded px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-income/30"
          />

          <button
            type="submit"
            disabled={saving || !name.trim()}
            className="px-4 py-2 rounded text-sm font-medium text-white bg-income hover:bg-income/90 disabled:opacity-50 transition-colors"
          >
            {saving ? '...' : 'Adicionar'}
          </button>
        </div>

        {showIconPicker && (
          <IconPicker
            selected={icon}
            onSelect={(i) => { setIcon(i); setShowIconPicker(false) }}
            onClear={() => { setIcon(null); setShowIconPicker(false) }}
          />
        )}
      </form>

      {error && <p className="text-expense text-sm mb-4">{error}</p>}

      {[
        { label: 'Entradas', items: income, color: 'text-income' },
        { label: 'Saídas', items: expense, color: 'text-expense' },
      ].map(({ label, items, color }) => (
        <div key={label} className="mb-6">
          <h3 className={`text-xs uppercase tracking-widest font-medium mb-2 ${color}`}>{label}</h3>
          {items.length === 0 ? (
            <p className="text-sm text-text-secondary py-3">Nenhuma categoria.</p>
          ) : (
            <ul>
              {items.map((c) => (
                <li key={c.id} className="py-3 flex items-center gap-3 px-2 rounded transition-colors [&:nth-child(even)]:bg-border/30 hover:bg-border/60">
                  {editingId === c.id ? (
                    <div
                      className="flex flex-1 items-center gap-2 relative"
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                          handleUpdate(c.id)
                        }
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setShowEditIconPicker(!showEditIconPicker)}
                        className="w-8 h-8 flex items-center justify-center border border-border rounded bg-surface hover:border-income/50 transition-colors shrink-0"
                      >
                        <CategoryIcon name={editIcon} size={14} className="text-text-secondary" />
                      </button>

                      <div className="flex-1">
                        <input
                          autoFocus
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleUpdate(c.id)
                            if (e.key === 'Escape') cancelEdit()
                          }}
                          className="w-full border border-border rounded px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-income/30"
                        />
                        {showEditIconPicker && (
                          <div className="absolute z-10 w-72 mt-1">
                            <IconPicker
                              selected={editIcon}
                              onSelect={(i) => { setEditIcon(i); setShowEditIconPicker(false) }}
                              onClear={() => { setEditIcon(null); setShowEditIconPicker(false) }}
                            />
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleUpdate(c.id)}
                        disabled={editSaving || !editName.trim()}
                        className="px-3 py-1.5 rounded text-xs font-medium text-white bg-income hover:bg-income/90 disabled:opacity-50 transition-colors shrink-0"
                      >
                        {editSaving ? '...' : 'Salvar'}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="text-text-secondary hover:text-text-primary transition-colors text-xs shrink-0"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-7 h-7 flex items-center justify-center shrink-0">
                        <CategoryIcon name={c.icon} size={16} className="text-text-secondary" />
                      </div>
                      <span className="flex-1 text-sm text-text-primary">{c.name}</span>
                      <button
                        onClick={() => startEdit(c)}
                        className="text-text-secondary hover:text-text-primary transition-colors"
                        title="Editar"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(c.id)}
                        className="text-text-secondary hover:text-expense transition-colors"
                        title="Excluir"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          <path d="M10 11v6"/><path d="M14 11v6"/>
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                        </svg>
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
