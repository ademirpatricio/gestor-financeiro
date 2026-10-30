import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  // Atraso em ms. Use para escalonar itens de uma lista.
  delay?: number
  children?: ReactNode
}

// Entrada suave: sobe 24px e aparece. Anima só opacity e transform.
// Com "reduzir movimento" ligado no sistema, as classes motion-safe não valem e tudo aparece parado.
export function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }: RevealProps) {
  const [ref, visible] = useInView<HTMLElement>()

  const estado = visible
    ? 'motion-safe:translate-y-0 motion-safe:opacity-100'
    : 'motion-safe:translate-y-[24px] motion-safe:opacity-0'

  return (
    <Tag
      ref={ref}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      className={`motion-safe:transition-[opacity,transform] motion-safe:duration-[600ms] motion-safe:ease-out ${estado} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
