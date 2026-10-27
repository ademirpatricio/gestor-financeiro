import { Link } from 'react-router-dom'
import {
  ArrowLeftRight,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ListFilter,
  Pencil,
  Tags,
} from 'lucide-react'
import mascotCofre from '../assets/images/img1.png'

// Medidas em px. Sem valores do Figma, escolhi estes. Ajuste aqui se o design pedir outros.
const container = 'mx-auto w-full max-w-[1120px] px-[24px]'
const sectionSpace = 'py-[72px] lg:py-[96px]'
const btnBase =
  'inline-flex items-center justify-center gap-[8px] rounded text-body font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust'
const sizeLg = 'px-[28px] py-[14px]'
const sizeSm = 'px-[20px] py-[10px]'
const primary = 'bg-olive text-white hover:brightness-90'
const ghost = 'border border-salmon text-salmon_light hover:bg-white/10'

const dores = [
  'Você abre o app do banco, vê o saldo e pensa: foi para onde?',
  'Já montou uma planilha e abandonou na segunda semana.',
  'Tem a impressão de que finanças é coisa para quem entende.',
]

const passos = [
  { titulo: 'Anote', texto: 'Gastou ou recebeu? Registre em poucos passos.' },
  {
    titulo: 'Organize',
    texto:
      'Escolha uma categoria. Alimentação, Transporte, Casa e outras já vêm prontas. Quer outra? Crie a sua.',
  },
  {
    titulo: 'Veja o mês',
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
]

// Gerenciar Receita Agora Não Assusta
const sigla = [
  ['G', 'erenciar'],
  ['R', 'eceita'],
  ['A', 'gora'],
  ['N', 'ão'],
  ['A', 'ssusta'],
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
    resposta: 'Não. Você registra o que entra e o que sai por conta própria.',
  },
  {
    pergunta: 'Funciona no celular?',
    resposta: 'Sim. Abre no navegador do celular e do computador.',
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
        <section
          aria-labelledby="titulo-hero"
          className="bg-brown_dark bg-[radial-gradient(ellipse_at_top_right,rgba(200,90,42,0.28),transparent_60%)] pb-[80px] pt-[136px] text-white lg:pb-[112px] lg:pt-[168px]"
        >
          <div
            className={`${container} grid items-center gap-[48px] lg:grid-cols-[minmax(0,1fr)_360px]`}
          >
            <div>
              <h1 id="titulo-hero" className="text-h1 font-bold">
                Entenda sua grana sem susto.
              </h1>
              <p className="mt-[24px] max-w-[560px] text-h5 leading-[1.5] text-salmon_light">
                O Grana é um controle financeiro leve para quem nunca se achou bom com
                dinheiro. Anote o que entra e o que sai e veja o seu mês num só lugar.
              </p>
              <div className="mt-[40px] flex flex-wrap gap-[16px]">
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
            </div>

            <img
              src={mascotCofre}
              alt="Cofre, o porquinho mascote do Grana"
              width={360}
              height={360}
              loading="lazy"
              className="hidden h-[360px] w-[360px] rounded-full object-cover lg:block"
            />
          </div>
        </section>

        {/* ── Você se reconhece? ── */}
        <section aria-labelledby="titulo-dores" className={`bg-white ${sectionSpace}`}>
          <div className={container}>
            <h2 id="titulo-dores" className="text-h2 font-bold text-brown_dark">
              O dinheiro some. A gente ajuda a achar.
            </h2>
            <ul className="mt-[40px] grid gap-[16px] lg:grid-cols-3">
              {dores.map((dor) => (
                <li key={dor} className="rounded bg-salmon_light p-[24px]">
                  {dor}
                </li>
              ))}
            </ul>
            <p className="mt-[40px] max-w-[720px] text-h4 font-bold text-terracotta">
              Você não precisa entender de finanças para começar. Basta anotar.
            </p>
          </div>
        </section>

        {/* ── Como funciona ── */}
        <section
          aria-labelledby="titulo-passos"
          className={`bg-salmon_light ${sectionSpace}`}
        >
          <div className={container}>
            <h2 id="titulo-passos" className="text-h2 font-bold text-brown_dark">
              Três passos, sem termo difícil.
            </h2>
            <ol className="mt-[40px] grid gap-[24px] lg:grid-cols-3">
              {passos.map((passo, i) => (
                <li key={passo.titulo} className="rounded bg-white p-[24px]">
                  <span
                    aria-hidden="true"
                    className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-terracotta font-bold text-white"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-[16px] text-h5 font-bold text-brown_dark">
                    {passo.titulo}
                  </h3>
                  <p className="mt-[8px]">{passo.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Cofre ── */}
        <section
          aria-labelledby="titulo-cofre"
          className={`bg-brown_dark text-white ${sectionSpace}`}
        >
          <div
            className={`${container} grid items-center gap-[40px] lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-[64px]`}
          >
            <img
              src={mascotCofre}
              alt="Cofre, o porquinho mascote do Grana"
              width={240}
              height={240}
              loading="lazy"
              className="h-[240px] w-[240px] rounded-full object-cover"
            />
            <div>
              <h2 id="titulo-cofre" className="text-h2 font-bold">
                Conheça o Cofre, seu guia por aqui.
              </h2>
              <p className="mt-[24px] max-w-[600px] text-h5 leading-[1.5] text-salmon_light">
                O Cofre é um porquinho confiante e prático. É aquele amigo que entende de
                dinheiro e explica sem fazer você se sentir mal. É ele quem dá o tom do
                Grana: papo reto e sem julgamento.
              </p>
            </div>
          </div>
        </section>

        {/* ── O que você encontra ── */}
        <section aria-labelledby="titulo-recursos" className={`bg-white ${sectionSpace}`}>
          <div className={container}>
            <h2 id="titulo-recursos" className="text-h2 font-bold text-brown_dark">
              O que você encontra no Grana
            </h2>
            <ul className="mt-[40px] grid gap-[24px] md:grid-cols-2 lg:grid-cols-3">
              {recursos.map(({ icone: Icone, titulo, texto }) => (
                <li key={titulo} className="rounded border border-[#E2D9D0] p-[24px]">
                  <span className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-salmon_light text-terracotta">
                    <Icone size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-[16px] text-h5 font-bold text-brown_dark">{titulo}</h3>
                  <p className="mt-[8px]">{texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── O que o Grana não faz ── */}
        <section
          aria-labelledby="titulo-nao-faz"
          className={`bg-salmon_light ${sectionSpace}`}
        >
          <div className={container}>
            <h2 id="titulo-nao-faz" className="text-h2 font-bold text-brown_dark">
              O app é pequeno de propósito.
            </h2>
            <p className="mt-[24px] max-w-[720px] text-h5 leading-[1.5]">
              O Grana não pede acesso ao seu banco e não fala de investimento nem de
              imposto de renda. Ele faz uma coisa só: ajudar você a entender o seu mês.
            </p>
          </div>
        </section>

        {/* ── Dados ── */}
        <section aria-labelledby="titulo-dados" className={`bg-white ${sectionSpace}`}>
          <div className={container}>
            <div className="max-w-[760px] rounded border border-[#E2D9D0] p-[32px]">
              <h2 id="titulo-dados" className="text-h3 font-bold text-brown_dark">
                E os meus dados?
              </h2>
              <p className="mt-[16px]">
                Cada conta enxerga apenas os próprios lançamentos e categorias. Outras
                pessoas que usam o Grana não conseguem ver os seus. Essa regra vale no
                banco de dados, não só na tela do app. E como o Grana não pede acesso ao
                seu banco, nenhuma senha bancária passa por aqui.
              </p>
            </div>
          </div>
        </section>

        {/* ── Por que Grana? ── */}
        <section
          aria-labelledby="titulo-nome"
          className={`bg-salmon_light ${sectionSpace}`}
        >
          <div className={container}>
            <h2 id="titulo-nome" className="text-h2 font-bold text-brown_dark">
              Porque grana é como a gente chama o dinheiro.
            </h2>
            <p className="mt-[24px] text-h5 leading-[1.5]">
              E porque, no nosso caso, também é uma sigla:
            </p>
            <p className="mt-[24px] text-h3 text-brown_dark">
              {sigla.map(([letra, resto], i) => (
                <span key={i}>
                  <strong className="font-bold text-terracotta">{letra}</strong>
                  {resto}{' '}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* ── Perguntas rápidas ── */}
        <section aria-labelledby="titulo-faq" className={`bg-white ${sectionSpace}`}>
          <div className={container}>
            <h2 id="titulo-faq" className="text-h2 font-bold text-brown_dark">
              Perguntas rápidas
            </h2>
            <div className="mt-[40px] max-w-[760px] divide-y divide-[#E2D9D0] border-y border-[#E2D9D0]">
              {perguntas.map(({ pergunta, resposta }) => (
                <details key={pergunta} className="group py-[20px]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-[16px] font-bold text-brown_dark [&::-webkit-details-marker]:hidden">
                    {pergunta}
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className="shrink-0 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-[12px]">{resposta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Fechamento ── */}
        <section
          aria-labelledby="titulo-fechamento"
          className={`bg-brown_dark text-white ${sectionSpace}`}
        >
          <div className={container}>
            <h2 id="titulo-fechamento" className="text-h2 font-bold">
              Comece pelo dia de hoje.
            </h2>
            <p className="mt-[24px] max-w-[600px] text-h5 leading-[1.5] text-salmon_light">
              Anote o primeiro gasto de hoje. Amanhã, anote o segundo. Pequenas escolhas
              geram grandes conquistas.
            </p>
            <div className="mt-[40px]">
              <Link to="/cadastro" className={`${btnBase} ${sizeLg} ${primary}`}>
                Criar minha conta gratuita
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-[16px] text-salmon_light">
              Já tem conta?{' '}
              <Link to="/login" className="font-bold underline">
                Entrar
              </Link>
            </p>
          </div>
        </section>
      </main>

      {/* ── Rodapé ── */}
      <footer className="border-t border-white/10 bg-brown_dark py-[40px] text-center text-small text-salmon_light">
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
