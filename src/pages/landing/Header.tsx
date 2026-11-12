import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '../../components/Button'
import { container } from './estilos'
import { instagramGrana, suporteWhatsapp } from './conteudo'

const linkClasses = 'font-medium text-salmon_light hover:underline'
const itemClasses =
  'block rounded px-[16px] py-[14px] text-right font-medium text-brown_dark hover:bg-salmon_light/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust'

export function Header() {
  const [aberto, setAberto] = useState(false)
  const areaRef = useRef<HTMLElement>(null)
  const botaoRef = useRef<HTMLButtonElement>(null)

  // Fecha com Esc (devolvendo o foco ao botão) e ao tocar fora do menu.
  useEffect(() => {
    if (!aberto) return
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAberto(false)
        botaoRef.current?.focus()
      }
    }
    const aoTocar = (e: PointerEvent) => {
      if (areaRef.current && !areaRef.current.contains(e.target as Node)) setAberto(false)
    }
    document.addEventListener('keydown', aoTeclar)
    document.addEventListener('pointerdown', aoTocar)
    return () => {
      document.removeEventListener('keydown', aoTeclar)
      document.removeEventListener('pointerdown', aoTocar)
    }
  }, [aberto])

  return (
    <header ref={areaRef} className="absolute inset-x-0 top-0 z-20">
      <div className={`${container} flex items-center justify-between py-[24px]`}>
        <Link to="/" aria-label="Grana, página inicial">
          {/* No celular usa a versão compacta, para sobrar espaço no menu. */}
          <img src="/logo-mobile-dark.svg" alt="" className="h-[40px] w-auto sm:hidden" />
          <img src="/logo-dark.svg" alt="Grana" className="hidden h-[40px] w-auto sm:block" />
        </Link>

        <nav aria-label="Acesso" className="flex items-center gap-[12px] sm:gap-[20px]">
          {/* Em telas maiores os links ficam à vista. */}
          <div className="hidden items-center gap-[20px] sm:flex">
            <a
              href={suporteWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suporte pelo WhatsApp (abre em outra aba)"
              className={linkClasses}
            >
              Suporte
            </a>
            <Link to="/login" className={linkClasses}>
              Entrar
            </Link>
          </div>

          {/* Criar conta: à vista só em telas maiores. No celular fica dentro do menu. */}
          <div className="hidden sm:block">
            <Button to="/cadastro" size="sm">
              Criar conta
            </Button>
          </div>

          {/* No celular, Entrar fica à vista. */}
          <div className="sm:hidden">
            <Button to="/login" size="sm" variant="ghost">
              Entrar
            </Button>
          </div>

          <button
            ref={botaoRef}
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            className="flex h-[44px] w-[44px] items-center justify-center rounded text-salmon_light transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust sm:hidden"
          >
            {aberto ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </nav>
      </div>

      {/* O painel fica sempre na página. Fechado, some com opacidade e visibilidade,
          assim os links não recebem foco. A animação respeita "reduzir movimento". */}
      <div
        id="menu-mobile"
        className={`absolute inset-x-[24px] top-[calc(100%-8px)] origin-top-right rounded-lg border border-brown/10 bg-white p-[8px] shadow-lg motion-safe:transition-[opacity,transform,visibility] motion-safe:duration-200 motion-safe:ease-out sm:hidden ${
          aberto
            ? 'visible translate-y-0 scale-100 opacity-100'
            : 'invisible -translate-y-[8px] scale-[0.97] opacity-0'
        }`}
      >
        <Link to="/cadastro" onClick={() => setAberto(false)} className={itemClasses}>
          Crie sua conta
        </Link>
        <a
          href={suporteWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nosso suporte pelo WhatsApp (abre em outra aba)"
          onClick={() => setAberto(false)}
          className={itemClasses}
        >
          Nosso suporte
        </a>
        <a
          href={instagramGrana}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Siga o Grana no Instagram (abre em outra aba)"
          onClick={() => setAberto(false)}
          className={itemClasses}
        >
          Siga no Instagram
        </a>
      </div>
    </header>
  )
}
