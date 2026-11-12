import bgDark from '../../assets/images/background1.png'
import cofrePensando from '../../assets/images/cofre-pensando.webp'
import { Button } from '../../components/Button'
import { InstagramIcon } from '../../components/InstagramIcon'
import { Reveal } from '../../components/Reveal'
import { container } from './estilos'
import { instagramGrana } from './conteudo'

export function Cofre() {
  /* O Cofre encosta na borda de baixo, sem espaço embaixo. */
  return (
    <section
      aria-labelledby="titulo-cofre"
      className="bg-brown_dark bg-cover bg-center pt-20 text-white"
      style={{ backgroundImage: `url(${bgDark})` }}
    >
      <div
        className={`${container} grid items-end gap-[48px] lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-[64px]`}
      >
        <Reveal className="order-2 mx-auto w-full max-w-[440px]">
          <img
            src={cofrePensando}
            alt="Cofre, o porquinho mascote do Grana, sorrindo de olhos fechados com a mão no rosto"
            width={880}
            height={616}
            loading="lazy"
            className="block h-auto w-full -scale-x-100"
          />
        </Reveal>
        <Reveal delay={150} className="order-1 lg:self-center lg:pb-[80px]">
          <h2 id="titulo-cofre" className="mb-4 text-h3 font-bold">
            Conheça o <span className="text-rust">Cofre</span>, seu guia por aqui.
          </h2>
          <p className="max-w-[600px] text-xl text-salmon_light mb-6">
            O Cofre é um porquinho confiante e prático. É aquele amigo que entende de
            dinheiro e explica sem fazer você se sentir mal. É ele quem dá o tom do
            Grana: papo reto e sem julgamento.
          </p>
          <div className="mt-[32px]">
            <p className="mb-[12px] text-small text-salmon_light">
              Passa lá para acompanhar as novidades do Grana.
            </p>
            <Button
              href={instagramGrana}
              variant="ghost"
              aria-label="Siga @grana.malabares no Instagram (abre em outra aba)"
            >
              <InstagramIcon size={20} />
              Siga @grana.malabares
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
