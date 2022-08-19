import { useAtomValue, useSetAtom } from "jotai";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { carrinho, categoriaEscolhida, setCategoriaEscolhida } from "../../atoms/atoms";
import { Produto } from "../../entities/types";
import { useFetch } from "../../hooks/useFetch";
import BoxItem from "../BoxItem";
import Categorias from "../Categorias";
import StickyBox from "react-sticky-box";
import { CartContext } from "../../context/CartContext";

export default function Cardapio() {

    const navigate = useNavigate()
    const categoriaAtivaAtom = useAtomValue(categoriaEscolhida)
    const atomUpdateCategoriaAtiva = useSetAtom(setCategoriaEscolhida)
    const [categorias, setCategorias] = useState<String[]>(['Todos'])
    const { carrinhoGlobal } = useContext(CartContext)

    const atomCarrinho = useSetAtom(carrinho)


    const { data: dataAll } = useFetch<Produto[]>(`/products-menu/Todos`)
    const { data } = useFetch<Produto[]>(`/products-menu/${categoriaAtivaAtom}`)

    dataAll?.forEach((produto) => {
        if (!categorias.includes(produto.category)) setCategorias([...categorias, produto.category])
    })

    function abrirModalProduto(nomeProduto: string) {
        navigate(`/produto/${nomeProduto}`)
    }

    return (
        <section>
            <StickyBox>
                <nav className={`flex shadow-md bg-principais-secondary mt-16 overflow-x-auto`}>
                    {categorias.map(categoria => (
                        <Categorias key={`${categoria}`} onClick={() => atomUpdateCategoriaAtiva(`${categoria}`)} categoria={`${categoria}`} categoriaAtiva={categoriaAtivaAtom === `${categoria}` ? true : false} />
                    ))}
                </nav>
            </StickyBox>
            <section className={`flex flex-wrap justify-around items-center w-11/12 h-auto overflow-auto m-auto pt-6 mb-12`}>
                {data?.map(produto => <BoxItem onClick={() => {
                    carrinhoGlobal?.forEach(item => {
                        if(item.nome === produto.productName){
                            atomCarrinho(item.quantidade!)
                        }
                    })
                    abrirModalProduto(produto.productName)
                }
                } key={produto._id} titulo={produto.productName} valor={produto.price.toFixed(2).replace('.', ',')} code={produto.code} />)}
            </section>
        </section>
    )
}