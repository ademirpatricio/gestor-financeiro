import { useState } from 'react'
import { SquarePen, Trash2 } from 'lucide-react'
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
    <div className="border border-brown_light/30 rounded p-3 bg-white mt-1">
      <div className="grid grid-cols-8 gap-1">
        {ICON_LIST.map((name) => (
          <button
            key={name}
            type="button"
            title={name}
            onClick={() => onSelect(name)}
            className={`p-2 rounded flex items-center justify-center hover:bg-brown_light/15 transition-colors ${
              selected === name ? 'bg-brown_light/40 ring-1 ring-olive/40' : ''
            }`}
          >
            <CategoryIcon name={name} size={16} className="text-brown" />
          </button>
        ))}
      </div>
      {selected && (
        <button
          type="button"
          onClick={onClear}
          className="mt-2 text-small text-brown/80 underline"
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
    setError('')
    try {
      await onUpdate(id, editName.trim(), editIcon)
      setEditingId(null)
      setShowEditIconPicker(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não deu para salvar a categoria.')
    } finally {
      setEditSaving(false)
    }
  }

  const income = categories.filter((c) => c.type === 'income')
  const expense = categories.filter((c) => c.type === 'expense')

  return (
    <div>
      <h2 className="font-semibold text-brown mb-4">Categorias</h2>

      {/* Add form */}
      <form onSubmit={handleAdd} className="mb-6">
        <div className="flex gap-2 mb-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            className="border border-brown_light/30 rounded px-3 py-2 text-brown bg-white focus:outline-none focus:ring-2 focus:ring-olive/30"
          >
            <option value="expense">Saída</option>
            <option value="income">Entrada</option>
          </select>

          <button
            type="button"
            onClick={() => setShowIconPicker(!showIconPicker)}
            className="w-10 h-10 flex items-center justify-center border border-brown_light/30 rounded bg-white hover:border-olive/50 transition-colors"
            title="Escolher ícone"
          >
            <CategoryIcon name={icon} size={16} className="text-brown/80" />
          </button>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome da categoria"
            className="flex-1 border border-brown_light/30 rounded px-4 py-2 text-brown focus:outline-none focus:ring-2 focus:ring-olive/30"
          />

          <button
            type="submit"
            disabled={saving || !name.trim()}
            className="px-4 py-2 rounded font-medium text-white bg-olive hover:bg-olive/90 disabled:opacity-50 transition-colors"
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

      {error && <p className="text-terracotta mb-4">{error}</p>}

      {[
        { label: 'Entradas', items: income, color: 'text-olive' },
        { label: 'Saídas', items: expense, color: 'text-terracotta' },
      ].map(({ label, items, color }) => (
        <div key={label} className="mb-6">
          <h3 className={`text-small uppercase tracking-widest font-medium mb-2 ${color}`}>{label}</h3>
          {items.length === 0 ? (
            <p className="text-brown/80 py-3">Nenhuma categoria.</p>
          ) : (
            <ul>
              {items.map((c) => (
                <li key={c.id} className="py-3 flex items-center gap-3 px-2 rounded transition-colors [&:nth-child(even)]:bg-brown_light/10 hover:bg-brown_light/20">
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
                        className="w-8 h-8 flex items-center justify-center border border-brown_light/30 rounded bg-white hover:border-olive/50 transition-colors shrink-0"
                      >
                        <CategoryIcon name={editIcon} size={14} className="text-brown/80" />
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
                          className="w-full border border-brown_light/30 rounded px-3 py-1.5 text-brown focus:outline-none focus:ring-2 focus:ring-olive/30"
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
                        className="px-3 py-1.5 rounded text-small font-medium text-white bg-olive hover:bg-olive/90 disabled:opacity-50 transition-colors shrink-0"
                      >
                        {editSaving ? '...' : 'Salvar'}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="text-brown/80 hover:text-brown transition-colors text-small shrink-0"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-7 h-7 flex items-center justify-center shrink-0">
                        <CategoryIcon name={c.icon} size={16} className="text-brown/80" />
                      </div>
                      <span className="flex-1 text-brown">{c.name}</span>
                      <button
                        onClick={() => startEdit(c)}
                        className="text-brown/80 hover:text-brown transition-colors"
                        title="Editar"
                      >
                        <SquarePen size={13} strokeWidth={2} />
                      </button>
                      <button
                        onClick={() => onDelete(c.id)}
                        className="text-brown/80 hover:text-terracotta transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={13} strokeWidth={2} />
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
