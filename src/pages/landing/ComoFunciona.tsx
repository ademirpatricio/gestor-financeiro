import { Reveal } from '../../components/Reveal'
import { container } from './estilos'
import { passos } from './conteudo'

// Um tom por cartão: claro, destaque e mais fechado.
const fundos = ['bg-salmon_light', 'bg-peach', 'bg-salmon']

export function ComoFunciona() {
  return (
    <section aria-labelledby="titulo-passos" className="bg-white pt-10 pb-20">
      <div className={container}>
        <Reveal
          as="h2"
          id="titulo-passos"
          className="mb-8 text-center text-h3 font-bold text-brown_dark"
        >
          São apenas três passos, sem termo difícil.
        </Reveal>
        <ol className="grid gap-[16px] lg:grid-cols-3 lg:gap-10">
          {passos.map(({ titulo, texto }, i) => (
            <Reveal
              as="li"
              delay={i * 120}
              key={titulo}
              className={`flex min-h-[260px] flex-col rounded-[24px] py-10 px-16 lg:min-h-[340px] ${fundos[i]}`}
            >
              <h3 className="text-h5 font-bold text-brown_dark">{titulo}</h3>
              <p className="mt-[8px] max-w-[280px] text-body text-brown/80">{texto}</p>
              <span
                aria-hidden="true"
                className="mt-auto pt-[32px] text-h1 font-medium leading-none text-brown_dark"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
