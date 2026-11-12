import { ChevronDown, MessageCircle } from 'lucide-react'
import { Button } from '../../components/Button'
import { Reveal } from '../../components/Reveal'
import { container } from './estilos'
import { suporteWhatsapp, perguntas } from './conteudo'

export function Faq() {
  return (
    <section aria-labelledby="titulo-faq" className="bg-salmon_light py-20">
      <div
        className={`${container} grid gap-[40px] lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-[64px]`}
      >
        <Reveal>
          <h2 id="titulo-faq" className="text-h3 font-bold text-brown_dark">
            Perguntas rápidas
          </h2>
          <p className="mt-[16px] max-w-[360px] text-[18px] leading-[1.5] text-brown/80">
            Não achou a sua dúvida? Fale com a gente pelo WhatsApp.
          </p>
          <Button
            href={suporteWhatsapp}
            variant="outline"
            aria-label="Falar com o suporte pelo WhatsApp (abre em outra aba)"
            className="mt-[24px]"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Falar no WhatsApp
          </Button>
        </Reveal>

        <Reveal delay={100}>
          {perguntas.map(({ pergunta, resposta }, i) => (
            <details
              key={pergunta}
              open={i === 0}
              className="group border-b border-brown/20 first:border-t"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-[16px] rounded py-[20px] text-[18px] font-bold text-brown_dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust [&::-webkit-details-marker]:hidden">
                {pergunta}
                <ChevronDown
                  size={24}
                  aria-hidden="true"
                  className="shrink-0 text-terracotta transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="max-w-[640px] pb-[20px] pr-[40px] text-body leading-[1.5] text-brown/80">
                {resposta}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
