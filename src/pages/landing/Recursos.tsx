import celularApp from '../../assets/images/celular-app.webp'
import { Reveal } from '../../components/Reveal'
import { recursos } from './conteudo'

export function Recursos() {
  return (
    <section aria-labelledby="titulo-recursos" className="bg-white py-20">
      <div
        className="mx-auto grid w-full max-w-[1240px] items-center gap-[48px] px-[24px] lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-[64px]"
      >
        {/* Celular com um círculo atrás. O círculo é só decoração. */}
        <Reveal className="relative mx-auto h-[520px] w-full max-w-[420px]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[90px] aspect-square w-[min(100%,415px)] -translate-x-1/2 rounded-full bg-olive_light/50"
          />
          <img
            src={celularApp}
            alt="Tela do Grana no celular, com o saldo do mês, as entradas, as saídas e a lista de lançamentos"
            width={560}
            height={1128}
            loading="lazy"
            className="absolute left-1/2 top-0 h-[520px] w-auto max-w-none -translate-x-1/2"
          />
        </Reveal>

        <div>
          <Reveal
            as="h2"
            id="titulo-recursos"
            className="mb-[48px] max-w-[500px] text-h2 font-bold text-brown_dark"
          >
            O que você encontra aqui no Grana
          </Reveal>
          <ul className="grid gap-x-[32px] gap-y-[40px] sm:grid-cols-2 lg:gap-y-[56px]">
            {recursos.map(({ icone: Icone, titulo, texto }, i) => (
              <Reveal
                as="li"
                delay={(i % 2) * 100}
                key={titulo}
                className="flex items-start gap-[24px]"
              >
                <span className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-salmon_light text-terracotta">
                  <Icone size={24} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[18px] font-bold text-brown_dark">{titulo}</h3>
                  <p className="mt-[4px] text-body leading-[1.4]">{texto}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
