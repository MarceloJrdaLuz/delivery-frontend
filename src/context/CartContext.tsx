import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Carrinho } from "../entities/types";

type CartContextTypes = {
    carrinhoGlobal?: Array<Carrinho>
    atualizarCarrinho: (newValues: Carrinho) => void
    deletarItem: (itemDeletar: string) => void 
}

type CartContextProviderProps = {
    children: ReactNode
}



export const CartContext = createContext({} as CartContextTypes)

export function CartProvider(props: CartContextProviderProps) {

    const navigate = useNavigate()

    const [carrinhoGlobal, setCarrinhoGlobal] = useState<Carrinho[]>([])

    useEffect(() => {
        const carrinhoRecuperado = localStorage.getItem('carrinho')
        if (carrinhoRecuperado) {
            setCarrinhoGlobal(JSON.parse(carrinhoRecuperado))
        }
    }, [])

    useEffect(()=> {
        localStorage.setItem('carrinho', JSON.stringify(carrinhoGlobal))
    }, [carrinhoGlobal])

    function atualizarCarrinho(newValues: Carrinho) {
        const carrinhoCopia = [...carrinhoGlobal]
        if (carrinhoGlobal.length < 1) {
            setCarrinhoGlobal([newValues])
            toast.success('Item adicionado ao sacola!')
        }  
        if(carrinhoGlobal.length >= 1) {
            const novosValores = newValues
            const filtrado = carrinhoCopia.filter(function(item){
                return item.code !== novosValores.code
            })
            if(filtrado.length === carrinhoCopia.length){
                toast.success('Item adicionado ao sacola!', {
                    autoClose: 2000,
                })
            }else{
                toast.success('Sacola atualizado!', {
                    autoClose: 2000
                })
            }
            filtrado.push(newValues)
            setCarrinhoGlobal(filtrado)
            navigate('/carrinho')
        }
        navigate('/')
    }

    function deletarItem(itemDeletar: string){
        const carrinhoCopia = [...carrinhoGlobal]
        const valorADeletar = itemDeletar
        const filtrado = carrinhoCopia.filter(function(item){
            return item.nome !== valorADeletar
        })
        setCarrinhoGlobal(filtrado)
    }

    return (
        <CartContext.Provider value={{
            carrinhoGlobal, atualizarCarrinho, deletarItem
        }}>
            {props.children}
        </CartContext.Provider>
    )
}