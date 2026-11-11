import { MessageCircle } from 'lucide-react'

// Botão redondo fixo no canto da tela, que abre a conversa no WhatsApp.
// O "env(safe-area-inset-bottom)" mantém o botão acima da barra do iPhone.
export function WhatsappFloat({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o suporte pelo WhatsApp (abre em outra aba)"
      className="group fixed bg-olive bottom-[calc(16px+env(safe-area-inset-bottom))] 
      right-[16px] z-20 flex h-[56px] w-[56px] items-center 
      justify-center rounded-full bg-whatsapp text-white shadow-lg 
      transition hover:brightness-110 focus-visible:outline 
      focus-visible:outline-2 focus-visible:outline-offset-2 
      focus-visible:outline-white sm:bottom-[calc(24px+env(safe-area-inset-bottom))]
      sm:right-[24px] sm:h-[64px] sm:w-[64px] motion-safe:hover:scale-105"
    >
      <MessageCircle size={30} fill="currentColor" aria-hidden="true" />
      {/* Etiqueta que aparece ao passar o mouse (só em telas com mouse) */}
      <span className="pointer-events-none absolute right-[calc(100%+12px)] hidden whitespace-nowrap rounded bg-brown_dark px-[12px] py-[8px] text-small font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 lg:block">
        Precisa de ajuda?
      </span>
    </a>
  )
}
