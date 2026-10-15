export function LoadingSpinner() {
  return (
    <div className="flex justify-center py-16">
      <div
        className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: '#8A9B6A', borderTopColor: 'transparent' }}
      />
    </div>
  )
}
