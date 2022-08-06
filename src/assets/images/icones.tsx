export const iconeAdd = (color: string = '#000', altura: number = 4, largura: number = 4) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-${altura} w-${largura}`} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
)

export const iconeDecrement = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="#302F3C" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
)
