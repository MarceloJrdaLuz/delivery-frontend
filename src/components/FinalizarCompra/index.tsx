import { Button, Radio } from "@material-tailwind/react"
import { useAtomValue } from "jotai"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { valorFrete } from "../../atoms/atoms"
import { AuthContext } from "../../context/AuthContext"
import { CartContext } from "../../context/CartContext"
import Botao from "../Botao/Botao"
import BoxEndereco from "../BoxEndereco"
import HeaderSimples from "../HeaderSimples"
import Input from "../Input"


export default function FinalizarCompra() {

    const { carrinhoGlobal, somarCarrinho, enderecoEntrega, retirar } = useContext(CartContext)
    const { authenticated } = useContext(AuthContext)
    const atomValorFrete = useAtomValue(valorFrete)
    const navigate = useNavigate()
    const [metodoPagamento, setMetodoPagamento] = useState("")
    const [valorTroco, setValorTroco] = useState(0)

    useEffect(() => {
        if (!retirar && !enderecoEntrega) {
            navigate('/opcoes-entrega')
        }
    }, [retirar, enderecoEntrega, navigate])


    function renderizarPedido() {
        return carrinhoGlobal?.map((item, index) =>
        (
            <span key={item.code} className="p-3">
                {`Item ${index + 1} - ${item.quantidade} ${item.nome}`}
            </span>
        ))
    }

    function renderizarEndereco() {
        return (
            <BoxEndereco rua={enderecoEntrega?.billingStreet!} numero={enderecoEntrega?.billingNumber!} bairro={'Jardim Andreia'} />
        )
    }

    return (
        <main>
            <section>
                <HeaderSimples titulo="Finalizar Compra" />
                <div className={`flex flex-col w-screen`}>
                    <h2 className={`p-4 font-bold text-lg text-principais-primary`}>Revisão do Pedido</h2>
                    <div className="flex w-full justify-between">
                        <span className="p-4">{`Subtotal:`}</span>
                        <span className="p-4 font-medium text-principais-primary">{`R$ ${somarCarrinho().toFixed(2)}`}</span>
                    </div>
                    <div className="flex w-full justify-between">
                        <span className="px-4 py-2">{`Valor da entrega:`}</span>
                        <span className="px-4 py-2 font-medium text-principais-primary">{`R$ ${atomValorFrete?.toFixed(2)}`}</span>
                    </div>
                    <div className="flex w-full justify-between">
                        <span className="px-4 py-2 font-bold">{`Total`}</span>
                        <span className="px-4 py-2 font-bold text-principais-primary" >{`R$ ${(somarCarrinho() + atomValorFrete).toFixed(2)}`}</span>
                    </div>
                </div>
            </section>
            <section className="mt-4">
                <div>
                    <h2 className="p-4 text-lg font-bold text-principais-primary">Pedido</h2>
                    <div className="flex flex-col p-4">
                        {renderizarPedido()}
                    </div>
                </div>
            </section>
            {!retirar && <section className="mt-4">
                <div>
                    <h2 className="p-4 text-lg font-bold text-principais-primary">Confirmar endereço de entrega</h2>
                    <div className="flex flex-col p-4">
                        {renderizarEndereco()}
                    </div>
                </div>
            </section>}
            <section className="mt-4">
                <form>
                    <h2 className="p-4 text-lg font-bold text-principais-primary">Escolha a forma de Pagamento</h2>
                    <div className="flex flex-col p-1">
                        <div className="border border-gray-300 bg-gray-200">
                            <Radio onClick={() => setMetodoPagamento("Dinheiro")} id="Dinheiro" name="type" label="Dinheiro" />
                            {metodoPagamento === 'Dinheiro' &&
                                <div className="px-10 py-4 flex items-center">
                                    <span className="w-fit">Troco para:</span>
                                    {/* <input onChange={(e)=> setValorTroco(+e.target.value)} className=" ml-2 w-14 h-8 p-2 focus-within:outline-principais-primary focus-within:shadow-xl" type="number" min={somarCarrinho() + atomValorFrete} />  */}
                                    <div className="ml-2 w-20 h-fit rounded-lg bg-principais-secondary" >
                                        <Input className="my-0" onChange={(e) => setValorTroco(+e.target.value)} type="number" placeholder="" min={somarCarrinho() + atomValorFrete} />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="border border-gray-300 bg-gray-200">
                            <Radio id="CartãoEntrega" name="type" label="Cartão no momemento da entrega" />
                        </div>
                        {authenticated && <div className="border border-gray-300 bg-gray-200">
                            <Radio id="Cartão" name="type" label="Cartão" />
                        </div>}
                    </div>
                        <Botao className="my-0" type="submit" title="Comprar" />
                </form>
            </section>
        </main>
    )
}