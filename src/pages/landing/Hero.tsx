import bgDark from '../../assets/images/background1.png'
import mascoteHero from '../../assets/images/mascote-hero.webp'
import { AvatarStack } from '../../components/AvatarStack'
import { Button } from '../../components/Button'
import { Reveal } from '../../components/Reveal'
import { container } from './estilos'
import { pessoas, totalUsuarios, destaques } from './conteudo'

export function Hero() {
  /* A borda de baixo é curva: o raio "50% / 40px" faz uma elipse suave.
   O mascote encosta na borda de baixo, sem espaço embaixo. */
  return (
    <section
      aria-labelledby="titulo-hero"
      style={{ backgroundImage: `url(${bgDark})` }}
      className="overflow-hidden rounded-b-[50%_40px] bg-brown_dark bg-cover bg-center pt-[136px] text-white lg:pt-[160px]"
    >
      <div
        className={`${container} grid items-center gap-[32px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]`}
      >
        <Reveal className="lg:pb-[80px]">
          <h1 id="titulo-hero" className="text-h1 font-bold">
            Entenda sua grana <span className="text-peach">sem susto.</span>
          </h1>
          <p className="mt-[24px] max-w-[460px] text-h5 leading-[1.5] text-salmon_light">
            O <strong className="font-bold">Grana</strong> é um controle financeiro leve
            para quem nunca se achou bom com dinheiro. Anote o que entra e o que sai e
            veja o seu mês num só lugar.
          </p>
          <div className="mt-[40px] flex flex-wrap gap-[16px]">
            <Button to="/cadastro" size="hero">
              Criar minha conta
            </Button>
            <Button to="/login" size="hero" variant="ghost">
              Já tenho conta
            </Button>
          </div>

          <AvatarStack pessoas={pessoas} total={totalUsuarios} className="mt-[48px]" />

          {/* Tópicos escondidos por enquanto (display: none). */}
          <ul className="mt-[48px] hidden flex-wrap gap-x-[32px] gap-y-[16px]">
            {destaques.map(({ icone, linhas }) => (
              <li key={linhas[0]} className="flex items-center">
                <img
                  src={icone}
                  alt=""
                  width={50}
                  height={50}
                  aria-hidden="true"
                  className="h-[50px] w-[50px] shrink-0"
                />
                <span className="text-small leading-[1.3] text-salmon_light">
                  {linhas[0]}
                  <br />
                  {linhas[1]}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Mascote colado embaixo. Passa um pouco da área central em telas grandes. */}
        <Reveal
          delay={150}
          className="flex justify-center lg:-mr-[40px] lg:justify-end lg:self-end xl:-mr-[100px] min-[1400px]:-mr-[140px]"
        >
          <img
            src={mascoteHero}
            alt="Cofre, o porquinho mascote do Grana, olhando o celular"
            width={743}
            height={619}
            className="block h-auto w-[300px] max-w-none sm:w-[400px] lg:w-[460px] xl:w-[600px] min-[1400px]:w-[743px]"
          />
        </Reveal>
      </div>
    </section>
  )
}
