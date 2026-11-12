import mascotCofre from '../../assets/images/img1.png'
import { Reveal } from '../../components/Reveal'
import { container } from './estilos'
import { cartoes } from './conteudo'

export function Dores() {
  return (
    <section aria-labelledby="titulo-dores" className="bg-white py-16">
      <div
        className={`${container} grid items-center gap-[48px]
        lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]`}
      >
        <Reveal>
          <h2 
            id="titulo-dores"
            className="text-h2 font-bold text-brown_dark mb-6"
          >
            Se o seu dinheiro some, a gente{' '}
            <span className="text-terracotta">te ajuda a encontrar.</span>
          </h2>
          <p className="mb-8 max-w-[400px] text-[18px] leading-[1.5] text-brown/80">
            Você sabe que o dinheiro some, vê o saldo e pensa: “Foi para onde?”. Já
            montou uma planilha e abandonou na segunda semana. Tem a impressão de que
            finanças é coisa para quem entende.
          </p>
          <div className="flex max-w-[400px] items-center gap-[20px] rounded">
            <img
              src={mascotCofre}
              alt=""
              width={104}
              height={104}
              loading="lazy"
              className="h-[104px] w-[104px] shrink-0 rounded-full object-cover"
            />
            <p className="text-[18px] font-bold leading-[1.4] text-rust">
              Você não precisa entender de finanças
              para começar. Basta anotar direitinho.
            </p>
          </div>
        </Reveal>

        <ul className="grid gap-[32px] lg:justify-self-end lg:gap-[30px]">
          {cartoes.map(({ imagem, titulo, texto }, i) => (
            <Reveal
              as="li"
              delay={i * 120}
              key={titulo}
              className="flex items-center gap-[24px] lg:gap-[32px]"
            >
              <img
                src={imagem}
                alt=""
                width={160}
                height={160}
                loading="lazy"
                className="h-[104px] w-[104px] shrink-0 object-contain lg:h-[136px] lg:w-[136px]"
              />
              <div>
                <h3 className="text-h5 font-bold text-brown_dark">{titulo}</h3>
                <p className="mt-[4px] max-w-[280px] text-[18px] leading-[1.4] text-brown/80">
                  {texto}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
