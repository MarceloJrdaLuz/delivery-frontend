import { useAtomValue, useSetAtom } from "jotai"
import { useContext, useEffect } from "react"
import { valorFrete, valorTotalPedido } from "../../atoms/atoms"
import { CartContext } from "../../context/CartContext"
import HeaderSimples from "../HeaderSimples"


export default function FinalizarCompra() {

    const { carrinhoGlobal, somarCarrinho, enderecoEntrega } = useContext(CartContext)
    const atomValorFrete = useAtomValue(valorFrete)
    console.log(enderecoEntrega)
    const atomSetValorTotalPedido = useSetAtom(valorTotalPedido)
    const atomValorTotal = useAtomValue(valorTotalPedido)

    useEffect(()=>{
        const atualiza = async()=>{
            await atomSetValorTotalPedido(somarCarrinho() + atomValorFrete)
        }
        atualiza()
    },[])

    function renderizarPedido() {
        return carrinhoGlobal?.map((item, index) =>
        (
            <span key={item.code} className="p-3">
                {`Item ${index + 1} - ${item.quantidade} ${item.nome}`}
            </span>
        ))
    }

    return (
        <main>
            <section>
                <HeaderSimples titulo="Finalizar Compra" />
                <div className={`flex flex-col w-screen`}>
                    <h2 className={`p-4 font-bold text-xl text-principais-primary`}>Revisão do Pedido</h2>
                    <div className="flex w-full justify-between">
                        <span className="p-4">{`Subtotal:`}</span>
                        <span className="p-4 font-medium text-principais-primary">{`R$ ${somarCarrinho()}`}</span>
                    </div>
                    <div className="flex w-full justify-between">
                        <span className="px-4 py-2">{`Valor da entrega:`}</span>
                        <span className="px-4 py-2 font-medium text-principais-primary">{`R$ ${atomValorFrete?.toFixed(2)}`}</span>
                    </div>
                    <div className="flex w-full justify-between">
                        <span className="px-4 py-2 font-bold">{`Total`}</span>
                        <span className="px-4 py-2 font-bold text-principais-primary" >{`R$ ${(atomValorTotal + atomValorFrete).toFixed(2)}`}</span>
                    </div>
                </div>
            </section>
            <section className="mt-4">
                <div>
                    <h2 className="p-4 text-xl font-bold text-principais-primary">Pedido</h2>
                    <div className="flex flex-col p-4">
                        {renderizarPedido()}
                    </div>
                </div>
            </section>
        </main>
    )
}