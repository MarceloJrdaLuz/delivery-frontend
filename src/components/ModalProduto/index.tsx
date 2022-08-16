import itemFoto from '../../assets/images/lanchesbgremove.png'
import BotaoCart from '../BotaoCart'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { useAtomValue, useSetAtom, } from 'jotai'
import { carrinho, zerarCarrinho } from '../../atoms/atoms'
import { useNavigate } from 'react-router-dom'
import { iconeFavoritar, iconeVoltar } from '../../assets/images/icones'

interface ModalProdutosProps {
    nomeProduto: string | undefined
    valor?: number | undefined
    qtd: number
    description?: string | undefined
    code: string | undefined
}

export default function ModalProduto(props: ModalProdutosProps) {

    const navigate = useNavigate()
    const zerar = useSetAtom(zerarCarrinho)
    const qtdCarrinho = useAtomValue(carrinho)
    const { atualizarCarrinho } = useContext(CartContext)

    return (
        <main className={`w-screen h-screen flex-col`}>
            <header className={`relative w-screen h-3/6 flex justify-center items-center rounded-b-3xl bg-modals-primary`}>
                <div className={`w-14 h-14 p-4 absolute top-7 left-7 bg-principais-secondary rounded-2xl`} onClick={() => navigate('/')}>
                    {iconeVoltar()}
                </div>
                <div className={`w-14 h-14 p-4 absolute top-7 right-7 bg-principais-secondary rounded-2xl`}>
                    {iconeFavoritar()}
                </div>
                <BotaoCart />
                <img className={`h-3/6 w-8/12`} src={itemFoto} alt="Foto do produto" />
            </header>
            <section className={`h-3/6 flex-col justify-around mb-12`}>
                <>
                    <div className={`flex justify-between items-center mt-8 mb-8 mx-5`}>
                        <h1 className={`flex w-full h-auto text-3xl`}>
                            {props.nomeProduto}
                        </h1>
                        <span className={`text-2xl`}><span className='text-sm text-principais-primary mr-2'>R$</span>{props.valor?.toFixed(2)}</span>
                    </div>
                    <div className={`flex-col justify-between mx-5 h-24`}>
                        <span className='py-4 font-bold text-lg'>Ingredientes</span>
                        <div className='py-4'>
                            {props.description}
                        </div>
                    </div>
                    <button onClick={() => {
                        atualizarCarrinho({ code: props.code, nome: props.nomeProduto, valor: props.valor, quantidade: qtdCarrinho, total: props.valor! * props.qtd })
                        zerar()
                    }} className={`flex justify-center items-center text-white bg-principais-primary rounded-xl w-10/12 p-5 m-auto`}>
                        {`Adicionar ao Carrinho ${props.valor === undefined ? '' : `(R$${(props.valor! * props.qtd).toFixed(2)})`}`}
                    </button>
                </>
            </section>
        </main>
    )
}