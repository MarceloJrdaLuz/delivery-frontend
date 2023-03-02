import { useAtomValue } from "jotai"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { valorFrete } from "../../atoms/atoms"
import { CartContext } from "../../context/CartContext"
import FormEndereco from "../FormEndereco"

export default function CaixaOpcaoEntrega() {

    const navigate = useNavigate()
    const { opcaoDeEntrega, carrinhoGlobal } = useContext(CartContext)
    const [showForm, setShowForm] = useState(false)
    const atomValorFrete = useAtomValue(valorFrete)

    useEffect(()=>{
        if(carrinhoGlobal?.length! < 1){
            navigate('/carrinho')
        }
    },[carrinhoGlobal, navigate])

    function renderizarFormEndereco() {
        return (
            <section className={`flex flex-col w-screen h-auto`}>
                <FormEndereco/>
            </section>
        )
    }

    return (
        <section>
            <div>
                <h1 className="p-4 font-bold text-xl text-principais-primary">Opções de entrega
                </h1>
                <div className="flex w-full justify-between">
                    <span className="p-4">{`Valor da Entrega:`}</span>
                    <span className="p-4 font-medium text-principais-primary">{`R$ ${atomValorFrete.toFixed(2)}`}</span>
                </div>
                <ul className="flex flex-col justify-center items-center">
                    <li onClick={() => {
                        opcaoDeEntrega(true)
                        navigate('/finalizar-compra')
                    }} className="flex justify-center p-4 bg-principais-primary rounded-lg m-2 min-w-[250px]">Retirar no balcão</li>
                    <li onClick={() => {
                        setShowForm(!showForm)
                        renderizarFormEndereco()
                    }} className="flex justify-center p-4 bg-principais-primary rounded-lg  min-w-[250px]">Entregar no meu endereço</li>
                </ul>
                {showForm && renderizarFormEndereco()}
            </div>
        </section>
    )
}