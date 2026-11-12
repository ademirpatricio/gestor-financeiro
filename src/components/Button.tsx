import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'ghost' | 'outline'
type Size = 'sm' | 'lg' | 'hero'

type Props = {
  variant?: Variant
  size?: Size
  /** Classes extras, só para posição e largura (margem, w-full). */
  className?: string
  children: ReactNode
  'aria-label'?: string
} & ({ to: string; href?: never } | { href: string; to?: never })

// No celular, lg e hero ocupam a largura toda. Em sm+ voltam ao tamanho do texto.
// Medidas em px. Sem valores do Figma, escolhi estes. Ajuste aqui se o design pedir outros.
const base =
  'inline-flex items-center justify-center gap-[8px] rounded text-body font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust'

const variants: Record<Variant, string> = {
  primary: 'bg-olive text-white hover:brightness-90',
  ghost: 'border border-rust text-white hover:bg-white/10',
  outline: 'border border-terracotta text-terracotta hover:bg-terracotta hover:text-white',
}

const sizes: Record<Size, string> = {
  sm: 'whitespace-nowrap px-[16px] py-[10px] sm:px-[20px]',
  lg: 'w-full px-[28px] py-[14px] sm:w-auto',
  hero: 'w-full px-[24px] py-[18px] sm:w-auto',
}

/**
 * Botão em forma de link. Com `to` vai para uma página do app.
 * Com `href` abre um endereço de fora em outra aba.
 */
export function Button({
  variant = 'primary',
  size = 'lg',
  className = '',
  children,
  to,
  href,
  ...rest
}: Props) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim()

  if (to !== undefined) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
      {children}
    </a>
  )
}
