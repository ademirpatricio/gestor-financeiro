import bgDark from '../assets/images/background1.png'
import { WhatsappFloat } from '../components/WhatsappFloat'
import { ComoFunciona } from './landing/ComoFunciona'
import { Cofre } from './landing/Cofre'
import { Dores } from './landing/Dores'
import { Faq } from './landing/Faq'
import { Fechamento } from './landing/Fechamento'
import { Header } from './landing/Header'
import { Hero } from './landing/Hero'
import { Recursos } from './landing/Recursos'
import { Rodape } from './landing/Rodape'
import { suporteWhatsapp } from './landing/conteudo'

export function Landing() {
  return (
    <div className="relative bg-white text-brown">
      <Header />

      <main>
        <Hero />
        <Dores />
        <ComoFunciona />
        <Cofre />
        <Recursos />
        <Faq />
      </main>

      {/* Fechamento e rodapé: um fundo só. */}
      <div
        style={{ backgroundImage: `url(${bgDark})` }}
        className="overflow-hidden bg-brown_dark bg-cover bg-center text-white"
      >
        <Fechamento />
        <Rodape />
      </div>

      <WhatsappFloat href={suporteWhatsapp} />
    </div>
  )
}
