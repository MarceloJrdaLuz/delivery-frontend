import { createContext, ReactNode,  useEffect,  useState } from "react";
import { Carrinho } from "../entities/types";

type CartContextTypes = {
    carrinhoGlobal?: Array<Carrinho>
    atualizarCarrinho: (newValues: Carrinho) => void
}

type CartContextProviderProps = {
    children: ReactNode
}


export const CartContext = createContext({} as CartContextTypes)

export function CartProvider(props: CartContextProviderProps) {

    const [carrinhoGlobal, setCarrinhoGlobal] = useState<Carrinho[]>([])

    useEffect(()=> {
        const carrinhoRecuperado = localStorage.getItem('carrinho')
        if(carrinhoRecuperado){
            setCarrinhoGlobal(JSON.parse(carrinhoRecuperado))
        }
    },[])

    function atualizarCarrinho(newValues: Carrinho){
        carrinhoGlobal.map((produto) => {
            if(produto.code === newValues.code){
              carrinhoGlobal.pop()
            }
        })
        setCarrinhoGlobal([...carrinhoGlobal, newValues])
        localStorage.setItem('carrinho', JSON.stringify(carrinhoGlobal))
    }

    return (
        <CartContext.Provider value={{
            carrinhoGlobal, atualizarCarrinho
        }}>
            {props.children}
        </CartContext.Provider>
    )
}