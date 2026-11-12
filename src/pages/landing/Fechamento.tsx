import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '../../components/Button'
import { Reveal } from '../../components/Reveal'
import { container } from './estilos'

export function Fechamento() {
  
  return (
    <section aria-labelledby="titulo-fechamento" className="py-20">
      <div className={container}>
        <Reveal
          as="h2"
          id="titulo-fechamento"
          className="mx-auto mb-8 max-w-[520px] text-center text-h2 font-bold"
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
          <Button to="/cadastro">
            Criar minha conta gratuita
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
          <p className="text-small text-salmon_light">
            Já tem conta?{' '}
            <Link to="/login" className="font-bold underline">
              Entrar
            </Link>
          </p>
        </Reveal>

      </div>
    </section>
  )
}
