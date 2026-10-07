import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import mascotCofre from '../assets/images/img1.png'
import mascotMeta from '../assets/images/img2.png'
import mascotJuros from '../assets/images/img3.png'
import bgDark from '../assets/images/background1.png'
import { LoginForm } from '../components/LoginForm'

const mascots = [
  { nome: 'Cofre', papel: 'O principal', frase: '"Cuide bem do seu dinheiro."', img: mascotCofre },
  { nome: 'Meta', papel: 'A esperta', frase: '"Aprenda a ter mais consciência."', img: mascotMeta },
  { nome: 'Juros', papel: 'O paciente', frase: '"Tenha disciplina hoje e sempre."', img: mascotJuros },
]

export function Login() {
  const { session, loading, signIn } = useAuth()
  if (loading) return null
  if (session) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen flex">

      {/* ── Coluna esquerda ── */}
      <div
        className="hidden lg:flex flex-col w-1/2 p-12 relative overflow-hidden"
        style={{ 
          backgroundImage: `url(${bgDark})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        {/* Logo — centralizado vertical e horizontalmente */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <img src="/logo-dark.svg" alt="Grana" className="h-36 w-auto mb-12" />
          <p className="text-brown_light text-left max-w-[480px] hidden"> 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
            consequat. Duis aute irure dolor. 
            <span className="text-rust font-bold"> Pequenas escolhas e grandes conquistas.</span>
          </p>
        </div>

        {/* Área dos mascotes */}
        <div className="relative flex items-end justify-center mb-6">

          <div className="flex gap-20">
            {mascots.map((m) => (

              <div key={m.nome} className="flex items-start">

                {/* Coluna do mascote*/}
                <div className="flex flex-col gap-2 max-w-[120px]">
                  {/* Foto do mascote*/}
                  <img
                    src={m.img}
                    alt={m.nome}
                    className="w-30 h-30 object-cover rounded-full mb-2"
                  />
                  {/* Infos do mascote*/}
                  <div className="text-center">
                    <h5 className="text-h4 font-bold text-white mb-1">{m.nome}</h5>
                    <p className="font-medium text-salmon mb-2"> {m.papel}</p>
                    <p className="text-micro italic text-brown_light">{m.frase}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ── Rodapé ── */}
        <div>
          <p className="mt-6 text-small text-center text-brown_light">
            Criado por 
            <a className="font-bold text-rust hover:underline" href="https://ademirpatricio.com.br" target="_blank"> Ademir Patrício</a> / 
            <a className="font-bold text-rust hover:underline" href="https://malabares.com.br" target="_blank"> Malabares MKT & TEC</a> 
            • Juntos por uma vida financeira mais simples.
          </p>
        </div>

      </div>

      {/* ── Coluna direita ── */}
      <div className="flex flex-1 flex-col items-center 
      justify-center relative px-6 py-12
      bg-gradient-to-tl from-salmon_light to-white">

        {/* Wrapper central — logo mobile + card */}
        <div className="flex flex-col w-full max-w-sm text-left gap-6">

          {/* Logo mobile */}
          <img src="/logo-primary.svg" alt="Grana" className="h-20 w-auto lg:hidden" />

          <h3 className="text-h3 font-bold text-brown_dark">
            Bem vindo ao <span className="text-terracotta">Grana</span>
          </h3>
          <p className="text-brown_light">
            Entre com sua conta para continuar cuidando da sua vida financeira com a gente.
          </p>

          <LoginForm onSubmit={signIn} />

          <p className="text-small text-center text-olive mt-2">
            Ainda não tem conta?{' '}
            <Link to="/cadastro" className="font-bold hover:underline hover:text-olive_light">
              Crie gratuitamente
            </Link>
          </p>
        </div>{/* fim wrapper central */}

      </div>
    </div>
  )
}
