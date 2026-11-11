// Fotos sobrepostas de quem já usa o app, com uma frase ao lado.
// Só mostre pessoas reais, com autorização. Sem pessoas na lista, o bloco não aparece.
export type Pessoa = {
  nome: string
  // Caminho da foto dentro de /public, por exemplo '/usuarios/ana.webp'.
  // Sem foto, aparece a inicial do nome.
  foto?: string
}

type Props = {
  pessoas: Pessoa[]
  // Número real de pessoas que usam. Se faltar, conta as da lista.
  total?: number
  className?: string
}

const MAX_FOTOS = 5

export function AvatarStack({ pessoas, total, className = '' }: Props) {
  if (pessoas.length === 0) return null

  const mostradas = pessoas.slice(0, MAX_FOTOS)
  const quantidade = total ?? pessoas.length

  return (
    <div className={`flex items-center gap-[16px] ${className}`}>
      <ul className="flex">
        {mostradas.map((p, i) => (
          <li key={p.nome} className={i === 0 ? '' : '-ml-[12px]'}>
            {p.foto ? (
              <img
                src={p.foto}
                alt={p.nome}
                width={44}
                height={44}
                loading="lazy"
                className="h-[44px] w-[44px] rounded-full object-cover ring-2 ring-brown_dark"
              />
            ) : (
              <span
                role="img"
                aria-label={p.nome}
                className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-salmon_light text-small font-bold text-terracotta ring-2 ring-brown_dark"
              >
                {p.nome.charAt(0).toUpperCase()}
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="text-small leading-[1.3] text-salmon_light">
        <strong className="font-bold text-white">
          {quantidade} {quantidade === 1 ? 'pessoa' : 'pessoas'}
        </strong>
        <br />
        já organizam o mês no Grana
      </p>
    </div>
  )
}
