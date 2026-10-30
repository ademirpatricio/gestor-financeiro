import { Link } from 'react-router-dom'
import {
  ArrowLeftRight,
  ArrowRight,
  CalendarDays,
  ChartColumn,
  ChevronDown,
  FileText,
  FolderOpen,
  ListFilter,
  Lock,
  Pencil,
  Tags,
} from 'lucide-react'
import bgDark from '../assets/images/background1.png'
import mascotCofre from '../assets/images/img1.png'
import mascoteHero from '../assets/images/mascote-hero.webp'
import dashboardMockup from '../assets/images/dashboard-mockup.webp'
import iconeCafe from '../assets/images/icone-cafe.webp'
import iconeCarteira from '../assets/images/icone-carteira.webp'
import iconeCalendario from '../assets/images/icone-calendario.webp'
import iconeRaio from '../assets/icons/hero-raio.svg'
import iconeCelular from '../assets/icons/hero-celular.svg'
import iconeCadeado from '../assets/icons/hero-cadeado.svg'
import { Reveal } from '../components/Reveal'

// Medidas em px. Sem valores do Figma, escolhi estes. Ajuste aqui se o design pedir outros.
const container = 'mx-auto w-full max-w-[1120px] px-[24px]'
const btnBase =
  'inline-flex items-center justify-center gap-[8px] rounded text-body font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust'
const sizeLg = 'px-[28px] py-[14px]'
const sizeSm = 'px-[20px] py-[10px]'
const sizeHero = 'px-[24px] py-[18px]'
const primary = 'bg-olive text-white hover:brightness-90'
const ghost = 'border border-rust text-white hover:bg-white/10'

const destaques = [
  { icone: iconeRaio, linhas: ['Simples de usar', 'e manter'] },
  { icone: iconeCelular, linhas: ['Funciona', 'no seu ritmo'] },
  { icone: iconeCadeado, linhas: ['Seus dados', 'sempre seguros'] },
]

const cartoes = [
  {
    imagem: iconeCafe,
    titulo: 'Anote até o cafezinho',
    texto: 'O cafezinho de hoje, a assinatura do app, o delivery…',
  },
  {
    imagem: iconeCarteira,
    titulo: 'Deixe tudo organizado',
    texto: 'Tudo isso entra aqui, sem complicação.',
  },
  {
    imagem: iconeCalendario,
    titulo: 'Encontre a sua Grana',
    texto: 'E no final do mês você entende para onde foi a sua grana.',
  },
]

const passos = [
  {
    icone: FileText,
    titulo: '1. Anote',
    texto: 'Gastou ou recebeu? Registre em poucos passos.',
  },
  {
    icone: FolderOpen,
    titulo: '2. Organize',
    texto: 'Escolha a categoria: Alimentação, Transporte, Contas e mais. Quer outra? Crie a sua.',
  },
  {
    icone: ChartColumn,
    titulo: '3. Acompanhe',
    texto: 'Saldo, entradas e saídas ficam juntos, sem fórmula e sem planilha.',
  },
]

const recursos = [
  {
    icone: ArrowLeftRight,
    titulo: 'Entradas e saídas',
    texto: 'Registre o que você recebe e o que gasta.',
  },
  {
    icone: Lock,
    titulo: 'Seus dados protegidos',
    texto: 'Cada conta vê só os próprios lançamentos e categorias.',
  },
  {
    icone: Tags,
    titulo: 'Categorias do seu jeito',
    texto: 'Use as que já vêm prontas ou crie as suas.',
  },
  {
    icone: Pencil,
    titulo: 'Edite sem drama',
    texto: 'Errou o valor? Corrija ou apague quando quiser.',
  },
  {
    icone: ListFilter,
    titulo: 'Ache rápido',
    texto: 'Filtre por entrada ou saída e ordene por data, valor ou categoria.',
  },
  {
    icone: CalendarDays,
    titulo: 'O mês num olhar',
    texto: 'Veja o saldo, o total de entradas e o total de saídas.',
  },
]

const perguntas = [
  {
    pergunta: 'Preciso entender de finanças?',
    resposta:
      'Não. O Grana foi feito para quem nunca se achou bom com dinheiro. Você anota e ele mostra o mês.',
  },
  { pergunta: 'É gratuito?', resposta: 'Hoje, sim.' },
  {
    pergunta: 'Preciso ligar meu banco?',
    resposta:
      'Não. Você registra o que entra e o que sai por conta própria. O Grana também não fala de investimento nem de imposto de renda. Ele faz uma coisa só: ajudar você a entender o seu mês.',
  },
  {
    pergunta: 'Funciona no celular?',
    resposta: 'Sim. Abre no navegador do celular e do computador.',
  },
  {
    pergunta: 'E os meus dados?',
    resposta:
      'Cada conta enxerga apenas os próprios lançamentos e categorias. Outras pessoas que usam o Grana não conseguem ver os seus. Essa regra vale no banco de dados, não só na tela do app. E como o Grana não pede acesso ao seu banco, nenhuma senha bancária passa por aqui.',
  },
  {
    pergunta: 'Quem faz o Grana?',
    resposta: 'Ademir Patrício e a Malabares MKT & TEC.',
  },
]

export function Landing() {
  return (
    <div className="relative bg-white text-brown">
      {/* ── Topo ── */}
      <header className="absolute inset-x-0 top-0 z-10">
        <div className={`${container} flex items-center justify-between py-[24px]`}>
          <Link to="/">
            <img src="/logo-dark.svg" alt="Grana" className="h-[40px] w-auto" />
          </Link>
          <nav aria-label="Acesso" className="flex items-center gap-[20px]">
            <Link to="/login" className="font-medium text-salmon_light hover:underline">
              Entrar
            </Link>
            <Link to="/cadastro" className={`${btnBase} ${sizeSm} ${primary}`}>
              Criar conta
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        {/* A borda de baixo é curva: o raio "50% / 40px" faz uma elipse suave.
            O mascote encosta na borda de baixo, sem espaço embaixo. */}
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
                <Link to="/cadastro" className={`${btnBase} ${sizeHero} ${primary}`}>
                  Criar minha conta
                </Link>
                <Link to="/login" className={`${btnBase} ${sizeHero} ${ghost}`}>
                  Já tenho conta
                </Link>
              </div>

              <ul className="mt-[48px] flex flex-wrap gap-x-[32px] gap-y-[16px]">
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

        {/* ── Você se reconhece? ──======================================== */}
        <section aria-labelledby="titulo-dores" className="bg-white py-16">
          <div
            className={`${container} grid items-center gap-[48px]
            lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]`}
          >
            <Reveal>
              <h2 
                id="titulo-dores"
                className="text-h2 font-bold text-brown_dark mb-6"
              >
                Se o seu dinheiro some, a gente{' '}
                <span className="text-terracotta">te ajuda a encontrar.</span>
              </h2>
              <p className="mb-8 max-w-[400px] text-[18px] leading-[1.5] text-brown/80">
                Você sabe que o dinheiro some, vê o saldo e pensa: “Foi para onde?”. Já
                montou uma planilha e abandonou na segunda semana. Tem a impressão de que
                finanças é coisa para quem entende.
              </p>
              <div className="flex max-w-[400px] items-center gap-[20px] rounded">
                <img
                  src={mascotCofre}
                  alt=""
                  width={104}
                  height={104}
                  loading="lazy"
                  className="h-[104px] w-[104px] shrink-0 rounded-full object-cover"
                />
                <p className="text-[18px] font-bold leading-[1.4] text-rust">
                  Você não precisa entender de finanças
                  para começar. Basta anotar direitinho.
                </p>
              </div>
            </Reveal>

            <ul className="grid gap-[32px] lg:justify-self-end lg:gap-[30px]">
              {cartoes.map(({ imagem, titulo, texto }, i) => (
                <Reveal
                  as="li"
                  delay={i * 120}
                  key={titulo}
                  className="flex items-center gap-[24px] lg:gap-[32px]"
                >
                  <img
                    src={imagem}
                    alt=""
                    width={160}
                    height={160}
                    loading="lazy"
                    className="h-[104px] w-[104px] shrink-0 object-contain lg:h-[136px] lg:w-[136px]"
                  />
                  <div>
                    <h3 className="text-h5 font-bold text-brown_dark">{titulo}</h3>
                    <p className="mt-[4px] max-w-[280px] text-[18px] leading-[1.4] text-brown/80">
                      {texto}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Como funciona ======================================== */}
        <section
          aria-labelledby="titulo-passos"
          className="bg-white pt-10 pb-20"
        >
          <div className={container}>
            <Reveal
              as="h2"
              id="titulo-passos"
              className="text-h3 text-center font-bold text-brown_dark mb-8"
            >São apenas três passos, sem termo difícil.
            </Reveal>
            <ol className="grid gap-10 lg:grid-cols-3">
              {passos.map(({ icone: Icone, titulo, texto }, i) => (
                <Reveal as="li" delay={i * 120} key={titulo}
                className="relative rounded-xl bg-salmon_light/60 
                hover:bg-salmon_light py-10 px-12"
                >
                  <Icone size={50} aria-hidden="true" className="text-rust_light mb-4" />
                  <h3 className="text-h5 font-bold text-brown_dark mb-4">{titulo}</h3>
                  <p className="text-md">{texto}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Cofre ======================================== */}
        <section
          aria-labelledby="titulo-cofre"
          className="bg-brown_dark text-white py-20 items-center bg-brown_dark bg-cover bg-center"
          style={{ backgroundImage: `url(${bgDark})` }}
        >
          <div
            className={`${container} grid items-center gap-20
            lg:grid-cols-[260px_minmax(0,1fr)]`}
          >
            <Reveal>
              <img
                src={mascotCofre}
                alt="Cofre, o porquinho mascote do Grana"
                width={260}
                height={260}
                loading="lazy"
                className="h-[260px] w-[260px] rounded-full object-cover ring-4 ring-rust/60"
              />
            </Reveal>
            <Reveal delay={150}>
              <h2 id="titulo-cofre" className="text-h3 font-bold mb-4">
                Conheça o <span className="text-rust">Cofre</span>, seu guia por aqui.
              </h2>
              <p className="max-w-[600px] text-xl text-salmon_light">
                O Cofre é um porquinho confiante e prático. É aquele amigo que entende de
                dinheiro e explica sem fazer você se sentir mal. É ele quem dá o tom do
                Grana: papo reto e sem julgamento.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── O que você encontra ======================================== */}
        <section aria-labelledby="titulo-recursos" className="bg-white py-20">
          <div
            className={`${container} grid items-start gap-[40px] lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-[64px]`}
          >
            <Reveal className="flex justify-center lg:justify-start">
              <img
                src={dashboardMockup}
                alt="Tela do Grana mostrando o saldo do mês, as entradas, as saídas e a lista de lançamentos"
                width={406}
                height={308}
                loading="lazy"
                className="h-auto w-full max-w-[406px]"
              />
            </Reveal>

            <div>
              <Reveal
                as="h2"
                id="titulo-recursos"
                className="mb-[48px] text-h3 font-bold text-brown_dark"
              >
                O que você encontra aqui no Grana
              </Reveal>
              <ul className="grid gap-x-[32px] gap-y-[40px] sm:grid-cols-2 lg:gap-y-[56px]">
                {recursos.map(({ icone: Icone, titulo, texto }, i) => (
                  <Reveal
                    as="li"
                    delay={(i % 2) * 100}
                    key={titulo}
                    className="flex items-start gap-[20px]"
                  >
                    <span className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-salmon_light text-terracotta">
                      <Icone size={24} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-h5 font-bold text-brown_dark">{titulo}</h3>
                      <p className="mt-[4px] text-[18px] leading-[1.4]">{texto}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Perguntas rápidas ======================================== */}
        <section
          aria-labelledby="titulo-faq"
          className="bg-salmon_light py-14"
        >
          <div
            className={`${container}`}
          >
            <h2 id="titulo-faq" className="text-h4 mb-4 font-bold text-brown_dark">
              Perguntas rápidas
            </h2>
            <Reveal>
              {perguntas.map(({ pergunta, resposta }) => (
                <details key={pergunta} className="group py-5 border-b border-salmon/20">
                  <summary className="flex cursor-pointer
                  list-none items-center justify-between
                  gap-4 font-bold text-brown_dark [&::-webkit-details-marker]:hidden">
                    {pergunta}
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className="shrink-0 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-2">{resposta}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ── Fechamento ======================================== */}
        {/* O Cofre aparece espiando pela borda de baixo. O "overflow-hidden" corta a imagem. */}
        <section
          aria-labelledby="titulo-fechamento"
          className="relative overflow-hidden bg-brown_dark text-white py-20"
        >
          <div className={container}>
            <Reveal
              as="h2"
              id="titulo-fechamento"
              className="text-h2 font-bold mb-8 mx-auto max-w-[520px]"
            >
              Comece pelo dia de hoje.
            </Reveal>
            <Reveal
              as="p"
              delay={100}
              className="mb-8 max-w-[520px] text-h5 text-salmon_light text-center mx-auto"
            >
              Anote o primeiro gasto de hoje. Amanhã, anote o segundo. Pequenas escolhas
              geram grandes conquistas.
            </Reveal>

            <Reveal delay={200} className="mb-8 flex flex-col items-center gap-6">
              <Link to="/cadastro" className={`${btnBase} ${sizeLg} ${primary}`}>
                Criar minha conta gratuita
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <p className="text-small text-salmon_light">
                Já tem conta?{' '}
                <Link to="/login" className="font-bold underline">
                  Entrar
                </Link>
              </p>
            </Reveal>

          </div>
        </section>
      </main>

      {/* ── Rodapé ── */}
      <footer className="bg-brown_dark pb-[40px] text-center text-small text-salmon_light">
        <p>Grana. Sua vida financeira mais simples.</p>
        <p className="mt-[8px]">
          Criado por{' '}
          <a
            className="font-bold text-salmon hover:underline"
            href="https://ademirpatricio.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ademir Patrício
          </a>{' '}
          /{' '}
          <a
            className="font-bold text-salmon hover:underline"
            href="https://malabares.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            Malabares MKT & TEC
          </a>
        </p>
      </footer>
    </div>
  )
}
