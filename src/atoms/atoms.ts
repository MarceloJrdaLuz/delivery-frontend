import {atom} from 'jotai'

// Estados relacionados ao carrinho de compras

export const carrinho = atom(0)

export const addCarrinho = atom(null, (get, set) => {
    set(carrinho, get(carrinho) +1)
})
export const decCarrinho = atom(null, (get, set) => {
    set(carrinho, get(carrinho) -1)
})
export const zerarCarrinho = atom(null, (get, set) => {
    set(carrinho, 0)
})

// Estados categoria ativa

export const categoriaEscolhida = atom('Todos')