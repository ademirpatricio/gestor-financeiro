export function TransactionsEmpty() {
  return (
    <div className="text-center py-20">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-h4 font-black mx-auto mb-4"
        style={{ backgroundColor: '#C4604A', color: '#FBF8F5' }}
      >C</div>
      <p className="font-semibold text-brown/80 mb-1">Nada por aqui neste mês.</p>
      <p className="text-brown/80">Adicione uma transação ou troque o mês.</p>
    </div>
  )
}
