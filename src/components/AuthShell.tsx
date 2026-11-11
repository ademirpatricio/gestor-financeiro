import type { ReactNode } from 'react'
import bgLight from '../assets/images/background2.png'

// Moldura das telas de conta (recuperar e redefinir senha): fundo, logo e cartão branco.
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{ backgroundImage: `url(${bgLight})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="flex flex-col items-center w-full max-w-sm gap-6">
        <img src="/logo-primary.svg" alt="Grana" className="h-20 w-auto" />
        <div className="w-full bg-white rounded shadow-xl py-10 px-12">{children}</div>
      </div>
    </div>
  )
}
