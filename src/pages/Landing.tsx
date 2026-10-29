import { Link } from 'react-router-dom'
import {
  ArrowLeftRight,
  ArrowRight,
  CalendarDays,
  ChartColumn,
  ChevronDown,
  Coffee,
  FileText,
  FolderOpen,
  ListFilter,
  Lock,
  Pencil,
  Smartphone,
  Tags,
  Wallet,
  Zap,
} from 'lucide-react'
import bgDark from '../assets/images/background1.png'
import mascotCofre from '../assets/images/img1.png'
import { PhoneMock } from '../components/PhoneMock'

// Medidas em px. Sem valores do Figma, escolhi estes. Ajuste aqui se o design pedir outros.
const container = 'mx-auto w-full max-w-[1120px] px-[24px]'
const btnBase =
  'inline-flex items-center justify-center gap-[8px] rounded text-body font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust'
const sizeLg = 'px-[28px] py-[14px]'
const sizeSm = 'px-[20px] py-[10px]'
const primary = 'bg-olive text-white hover:brightness-90'
const ghost = 'border border-salmon text-salmon_light hover:bg-white/10'

const destaques = [
  { icone: Zap, linhas: ['Simples', 'de usar'] },
  { icone: Smartphone, linhas: ['Funciona', 'no seu ritmo'] },
  { icone: Lock, linhas: ['Seus dados', 'só seus'] },
]

const cartoes = [
  {
    icone: Coffee,
    texto: 'O cafezinho de hoje, a assinatura do app, o delivery…',
    classe: 'sm:-rotate-6',
  },
  {
    icone: Wallet,
    texto: 'Tudo isso entra aqui, sem complicação.',
    classe: 'sm:mt-[24px]',
  },
  {
    icone: CalendarDays,
    texto: 'E no final do mês você entende para onde foi a sua grana.',
    classe: 'sm:mt-[48px] sm:rotate-6',
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
    icone: Tags,
    titulo: 'Categorias do seu jeito',
    texto: 'Use as que já vêm prontas ou crie as suas.',
  },
  {
    icone: CalendarDays,
    titulo: 'O mês num olhar',
    texto: 'Veja o saldo, o total de entradas e o total de saídas.',
  },
  {
    icone: ListFilter,
    titulo: 'Ache rápido',
    texto: 'Filtre por entrada ou saída e ordene por data, valor ou categoria.',
  },
  {
    icone: Pencil,
    titulo: 'Edite sem drama',
    texto: 'Errou o valor? Corrija ou apague quando quiser.',
  },
  {
    icone: Lock,
    titulo: 'Seus dados protegidos',
    texto: 'Cada conta vê só os próprios lançamentos e categorias.',
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
        {/* A borda de baixo é curva: o raio "50% / 40px" faz uma elipse suave. */}
        <section
          aria-labelledby="titulo-hero"
          style={{ backgroundImage: `url(${bgDark})` }}
          className="overflow-hidden rounded-b-[50%_40px] bg-brown_dark bg-cover bg-center pb-[96px] pt-[136px] text-white lg:pb-[120px] lg:pt-[160px]"
        >
          <div
            className={`${container} grid items-center gap-[48px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]`}
          >
            <div>
              <h1 id="titulo-hero" className="text-h1 font-bold">
                Entenda sua grana <span className="text-rust_light">sem susto.</span>
              </h1>
              <p className="mt-[24px] max-w-[520px] text-h5 leading-[1.5] text-salmon_light">
                O Grana é um controle financeiro leve para quem nunca se achou bom com
                dinheiro. Anote o que entra e o que sai e veja o seu mês num só lugar.
              </p>
              <div className="mt-[32px] flex flex-wrap gap-[16px]">
                <Link to="/cadastro" className={`${btnBase} ${sizeLg} ${primary}`}>
                  Criar minha conta
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link to="/login" className={`${btnBase} ${sizeLg} ${ghost}`}>
                  Já tenho conta
                </Link>
              </div>
              <p className="mt-[16px] text-small text-salmon">
                Gratuito e sem cartão de crédito.
              </p>

              <ul className="mt-[40px] flex flex-wrap gap-x-[32px] gap-y-[16px]">
                {destaques.map(({ icone: Icone, linhas }) => (
                  <li key={linhas[0]} className="flex items-center gap-[10px]">
                    <Icone size={24} aria-hidden="true" className="text-salmon" />
                    <span className="text-small leading-[1.3] text-salmon_light">
                      {linhas[0]}
                      <br />
                      {linhas[1]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Celular com o Cofre na frente. Só aparece em telas grandes. */}
            <div className="relative mx-auto hidden h-[500px] w-[440px] lg:block">
              <div className="absolute right-[16px] top-0">
                <PhoneMock />
              </div>
              <img
                src={mascotCofre}
                alt="Cofre, o porquinho mascote do Grana"
                width={240}
                height={240}
                className="absolute bottom-0 left-0 h-[240px] w-[240px] rounded-full object-cover shadow-2xl ring-4 ring-salmon/50"
              />
            </div>
          </div>
        </section>

        {/* ── Você se reconhece? ──======================================== */}
        <section aria-labelledby="titulo-dores" className="bg-white py-16">
          <div
            className={`${container} grid items-center gap-[48px]
            lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]`}
          >
            <div>
              <h2 
                id="titulo-dores"
                className="text-h2 font-bold text-brown_dark mb-6"
              >
                Se o seu dinheiro some, a gente te ajuda a 
                <span className="text-terracotta"> encontrar.</span>
              </h2>
              <p className="max-w-[400px] mb-6 text-md">
                Você sabe que o dinheiro some, vê o saldo e pensa: “Foi para onde?”. Já
                montou uma planilha e abandonou na segunda semana. Tem a impressão de que
                finanças é coisa para quem entende.
              </p>
              <div className="flex max-w-[400px] items-center gap-[20px] rounded">
                <img
                  src={mascotCofre}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-[64px] w-[64px] shrink-0 rounded-full object-cover"
                />
                <p className="font-medium text-xl text-terracotta">
                  Você não precisa entender de finanças
                  para começar. Basta anotar direitinho.
                </p>
              </div>
            </div>

            <ul className="grid gap-[16px] sm:grid-cols-3 sm:gap-[20px]">
              {cartoes.map(({ icone: Icone, texto, classe }) => (
                <li
                  key={texto}
                  className={`rounded-[16px] bg-white p-[20px] shadow-lg ring-1 ring-brown_light/15 ${classe}`}
                >
                  <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-salmon_light text-terracotta">
                    <Icone size={28} aria-hidden="true" />
                  </span>
                  <p className="mt-[16px]">{texto}</p>
                </li>
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
            <h2 
              id="titulo-passos" 
              className="text-h3 text-center font-bold text-brown_dark mb-8"
            >São apenas três passos, sem termo difícil.
            </h2>
            <ol className="grid gap-10 lg:grid-cols-3">
              {passos.map(({ icone: Icone, titulo, texto }) => (
                <li key={titulo}
                className="relative rounded-xl bg-salmon_light/60 
                hover:bg-salmon_light py-10 px-12"
                >
                  <Icone size={50} aria-hidden="true" className="text-rust_light mb-4" />
                  <h3 className="text-h5 font-bold text-brown_dark mb-4">{titulo}</h3>
                  <p className="text-md">{texto}</p>
                </li>
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
            <img
              src={mascotCofre}
              alt="Cofre, o porquinho mascote do Grana"
              width={260}
              height={260}
              loading="lazy"
              className="h-[260px] w-[260px] rounded-full object-cover ring-4 ring-rust/60"
            />
            <div>
              <h2 id="titulo-cofre" className="text-h3 font-bold mb-4">
                Conheça o <span className="text-rust">Cofre</span>, seu guia por aqui.
              </h2>
              <p className="max-w-[600px] text-xl text-salmon_light">
                O Cofre é um porquinho confiante e prático. É aquele amigo que entende de
                dinheiro e explica sem fazer você se sentir mal. É ele quem dá o tom do
                Grana: papo reto e sem julgamento.
              </p>
            </div>
          </div>
        </section>

        {/* ── O que você encontra ======================================== */}
        <section aria-labelledby="titulo-recursos" className="bg-white py-20">
          <div className={container}>
            <h2 id="titulo-recursos" 
            className="text-h3 text-center font-bold text-brown_dark mb-12">
              O que você encontra aqui no Grana
            </h2>
            <ul className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
              {recursos.map(({ icone: Icone, titulo, texto }) => (
                <li
                  key={titulo}
                  className="flex items-start gap-6 rounded-lg 
                  "
                >
                  <span className="flex h-14 w-14 shrink-0
                  items-center justify-center rounded-full
                  bg-salmon_light text-terracotta">
                    <Icone size={24} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-h3 text-brown_dark">{titulo}</h3>
                    <p className="text-md leading-[1.4]">{texto}</p>
                  </div>
                </li>
              ))}
            </ul>
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
            <div className="">
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
            </div>
          </div>
        </section>

        {/* ── Fechamento ======================================== */}
        {/* O Cofre aparece espiando pela borda de baixo. O "overflow-hidden" corta a imagem. */}
        <section
          aria-labelledby="titulo-fechamento"
          className="relative overflow-hidden bg-brown_dark text-white py-20"
        >
          <div className={container}>
            <h2 id="titulo-fechamento" className="text-h2 font-bold mb-8 mx-auto max-w-[520px]">
              Comece pelo dia de hoje.
            </h2>
            <p className="mb-8 max-w-[520px] text-h5 text-salmon_light text-center mx-auto">
              Anote o primeiro gasto de hoje. Amanhã, anote o segundo. Pequenas escolhas
              geram grandes conquistas.
            </p>

            <div className="mb-8 flex flex-col items-center gap-6">
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
            </div>

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
