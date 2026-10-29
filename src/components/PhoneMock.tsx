// Celular de enfeite para a página inicial. Os números são só de exemplo.
const bars = [
  'h-[40%] bg-olive',
  'h-[70%] bg-olive',
  'h-[50%] bg-olive',
  'h-[100%] bg-olive',
  'h-[60%] bg-rust',
  'h-[35%] bg-rust',
]

const gastos = [
  ['Alimentação', '-R$ 200,00'],
  ['Transporte', '-R$ 180,00'],
  ['Lazer', '-R$ 95,00'],
  ['Compras', '-R$ 120,00'],
]

/** Tela do app desenhada em HTML. Fica escondida de leitores de tela, é só visual. */
export function PhoneMock() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[460px] w-[240px] rotate-6 rounded-[36px] border-[6px] border-rust_light bg-white p-[16px] text-brown shadow-2xl"
    >
      <span className="absolute left-1/2 top-[8px] h-[14px] w-[70px] -translate-x-1/2 rounded-full bg-brown_dark" />

      <p className="mt-[20px] text-small font-bold">Olá!</p>
      <p className="mt-[4px] text-small">Seu mês está no controle</p>

      <div className="mt-[14px] rounded bg-salmon_light p-[12px]">
        <p className="text-micro text-brown/80">Saldo do mês</p>
        <p className="mt-[4px] text-h5 font-bold">R$ 1.250,00</p>
        <div className="mt-[12px] flex h-[56px] items-end gap-[6px]">
          {bars.map((cls) => (
            <span key={cls} className={`w-full rounded-t ${cls}`} />
          ))}
        </div>
      </div>

      <ul className="mt-[16px] space-y-[10px]">
        {gastos.map(([nome, valor]) => (
          <li key={nome} className="flex items-center justify-between text-small">
            <span>{nome}</span>
            <span className="font-medium text-terracotta">{valor}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
