import { InstagramIcon } from '../../components/InstagramIcon'
import { container } from './estilos'
import { instagramGrana } from './conteudo'

export function Rodape() {
  
  return (
    <footer
      className={`${container} py-[32px] text-center text-small text-salmon_light`}
    >
    <a
      href={instagramGrana}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram do Grana (abre em outra aba)"
      className="mx-auto mb-[8px] flex h-[44px] w-[44px] items-center justify-center rounded text-salmon_light transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
    >
      <InstagramIcon size={24} />
    </a>
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
  )
}
