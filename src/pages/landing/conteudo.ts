import {
  ArrowLeftRight,
  CalendarDays,
  ListFilter,
  Lock,
  Pencil,
  Tags,
} from 'lucide-react'
import iconeCafe from '../../assets/images/icone-cafe.webp'
import iconeCarteira from '../../assets/images/icone-carteira.webp'
import iconeCalendario from '../../assets/images/icone-calendario.webp'
import iconeRaio from '../../assets/icons/hero-raio.svg'
import iconeCelular from '../../assets/icons/hero-celular.svg'
import iconeCadeado from '../../assets/icons/hero-cadeado.svg'
import type { Pessoa } from '../../components/AvatarStack'

export const instagramGrana = 'https://www.instagram.com/grana.malabares/'
// WhatsApp da Malabares, já com a mensagem inicial.
export const suporteWhatsapp =
  'https://wa.me/5581997278234?text=Ol%C3%A1!%20Vim%20pelo%20GRANA%20e%20preciso%20de%20ajuda%20com%20o%20aplicativo.'


// Pessoas reais que autorizaram aparecer. Coloque as fotos em public/usuarios/.
// Enquanto a lista estiver vazia, o avatar stack não aparece na versão publicada.
export const pessoas: Pessoa[] = [
  { nome: 'Thayná', foto: '/usuarios/thayna.jpg' },
  { nome: 'Ademir', foto: '/usuarios/ademir.jpg' },
  { nome: 'Vanda', foto: '/usuarios/vanda.jpg' },
  { nome: 'Neto', foto: '/usuarios/neto.jpg' },
  { nome: 'Malabares', foto: '/usuarios/malabares.jpg' },
]

// Número real de usuários. Se ficar em branco, conta as pessoas da lista acima.
export const totalUsuarios: number | undefined = 8

export const destaques = [
  { icone: iconeRaio, linhas: ['Simples de usar', 'e manter'] },
  { icone: iconeCelular, linhas: ['Funciona', 'no seu ritmo'] },
  { icone: iconeCadeado, linhas: ['Seus dados', 'sempre seguros'] },
]

export const cartoes = [
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

export const passos = [
  {
    titulo: 'Anote',
    texto: 'Gastou ou recebeu? Registre em poucos passos.',
  },
  {
    titulo: 'Organize',
    texto: 'Escolha a categoria: Alimentação, Transporte, Contas e mais. Quer outra? Crie a sua.',
  },
  {
    titulo: 'Acompanhe',
    texto: 'Saldo, entradas e saídas ficam juntos, sem fórmula e sem planilha.',
  },
]

export const recursos = [
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

export const perguntas = [
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
    resposta: 'Ademir Patrício, Thayná Aguiar e a Malabares MKT & TEC.',
  },
]
