import { useAtomValue, useSetAtom } from "jotai"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { iconeOptions, iconeSetaBaixo, imageBagEmpty } from "../../assets/images/icones"
import { carrinho, mostrarOpcoesCarrinho, setMostrarOpcoesCarrinho } from "../../atoms/atoms"
import { CartContext } from "../../context/CartContext"
import imageItem from "../../assets/images/lanchesbgremove.png"
import Botao from "../Botao/Botao"
import { AuthContext } from "../../context/AuthContext"
import HeaderSimples from "../HeaderSimples"

export default function Carrinho() {

    const { carrinhoGlobal, deletarItem, somarCarrinho, finalizarCompra } = useContext(CartContext)
    const { authenticated } = useContext(AuthContext)

    const [show, setShow] = useState(false)
    const [opcoesFinalizacao, setOpcaoFinalizacao] = useState(false)

    const navigate = useNavigate()
    const atomCarrinho = useSetAtom(carrinho)
    const atomMostrarOpcoes = useAtomValue(mostrarOpcoesCarrinho)
    const atomSetMostrarOpcoes = useSetAtom(setMostrarOpcoesCarrinho)

    const renderizarOpcoes = () => {
        carrinhoGlobal?.forEach(produto => {
            if (produto.nome === atomMostrarOpcoes) {
                atomCarrinho(produto.quantidade!)
                atomSetMostrarOpcoes(produto.nome!)
            }
        })
        return (
            <div className={`flex flex-col justify-center items-center bg-principais-secondary fixed bottom-0 z-50 w-screen h-auto p-4 `}>
                <div className="flex w-full items-center justify-between">
                    <span className=" border-b border-b-gray-200 w-full text-center p-2 font-bold">{atomMostrarOpcoes}</span>
                    <span onClick={() => setShow(false)}>{iconeSetaBaixo()}</span>
                </div>
                <span onClick={() => navigate(`/produto/${atomMostrarOpcoes}`)} className="border-b border-b-gray-200  w-full text-center p-2 text-red-600 font-semibold">Editar item</span>
                <span onClick={() => {
                    deletarItem(atomMostrarOpcoes)
                    setShow(false)
                    atomCarrinho(1)
                }} className="border-b border-b-gray-200  w-full text-center p-2 text-red-600 font-semibold">Excluir item</span>
            </div>
        )
    }

    function renderizarOpcoesFinalizar() {
        return (
            <div className="flex flex-col justify-center items-center absolute top-0 h-screen w-screen bg-white">
                <Botao onClick={() => {
                    finalizarCompra()
                    navigate('/opcoes-entrega')
                }} title="Prosseguir sem logar" color="bg-principais-primary" hoverColor="bg-button-hover" />
                <Botao onClick={() => { navigate('/login') }} title="Prosseguir autenticado" color="bg-principais-primary" hoverColor="bg-button-hover" />
                <ul>Comprar autenticado tem algumas vantagens como:</ul>
                <li>Você terá acesso ao seu histórico de compras!</li>
                <li>Você terá a possibilidade de pagar diretamente pelo sistema!</li>
            </div>
        )
    }

    function renderizarCarrinhoEmpty() {
        return (
            <>
                <div>
                    {imageBagEmpty}
                </div>
                <span className="text-center m-2 p-4">Seu carrinho está vazio. Clique no botão abaixo para ir a página de lanches!</span>
            </>
        )
    }

    return (

        <section className={`flex-col w-screen mb-16 relative`}>
            <HeaderSimples titulo="Sacola" />
            <ul className={`flex flex-wrap mt-6 w-screen px-1`}>
                {carrinhoGlobal?.map(item => (
                    <li key={item.code} className={`flex w-screen h-fit justify-center items-center my-4 border border-gray-300 rounded-2xl shadow-lg`}>
                        <div className="w-28 h-24 p-3">
                            <img className="w-full h-full" src={imageItem} alt="Imagem Item" />
                        </div>
                        <div className="flex-col flex-1 h-full">
                            <div className="flex justify-center">
                                <div className={`flex flex-col justify-center items-center px-1`}>
                                    {/* <span className="pb-4 text-principais-primary font-bold text-xs">Produto</span> */}
                                    <span className="py-4 font-bold">{item.nome}</span>
                                </div>
                            </div>
                            <div className="flex justify-between px-4 ">
                                <div className={`flex min-w-[62px] flex-col justify-center items-center`}>
                                    <span className="pb-1 text-principais-primary font-bold text-xs">Quantidade</span>
                                    <span>{item.quantidade} x</span>
                                </div>
                                <div className={`flex flex-col justify-center items-center px-1`}>
                                    <span className="pb-1 text-principais-primary font-bold text-xs">Valor Un.</span>
                                    <span>R$ {item.valor?.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between py-6 px-4">
                                <div className={`flex flex-col justify-center items-center px-1`}>
                                    <span className="pb-1 text-principais-primary font-bold text-xs">Total Item</span>
                                    <span className="font-bold">R$ {item.total?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="p-1" onClick={() => {
                                        atomSetMostrarOpcoes(item.nome!)
                                        setShow(!show)
                                    }}>
                                        {iconeOptions()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {somarCarrinho() !== 0 && (
                <div className="flex justify-end py-5 px-2 font-bold">
                    {`Total: R$ ${somarCarrinho().toFixed(2)}`}
                </div>
            )}
            {carrinhoGlobal?.length! < 1 && (
                <div className="flex flex-col justify-center items-center">
                    {renderizarCarrinhoEmpty()}
                </div>
            )}
            <div className="flex w-8/12 m-auto items-center justify-center">
                {!opcoesFinalizacao && carrinhoGlobal?.length! >= 1 ? (
                    <Botao onClick={() => {
                        !authenticated ? setOpcaoFinalizacao(true) : navigate('/opcoes-entrega')
                    }} title="Finalizar compra" color="bg-principais-primary" hoverColor="bg-button-hover" />
                ) : (
                    <Botao onClick={() => {
                        navigate('/')
                    }} title="Ir para a página de compras" color="bg-principais-primary" hoverColor="bg-button-hover" />
                )}
            </div>
            {opcoesFinalizacao && renderizarOpcoesFinalizar()}
            {show && renderizarOpcoes()}
        </section>
    )
}