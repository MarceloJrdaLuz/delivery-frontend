import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import BoxItem from "../BoxItem";
import Categorias from "../Categorias";


interface Produto {
    _id: string,
    code: string,
    price: number,
    category: string,
    productName: string,
}


export default function Cardapio() {

    const [categoriaAtiva, setCategoriaAtiva] = useState('Todos')
    const [categorias, setCategorias] = useState<String[]>(['Todos'])

    const { data } = useFetch<Produto[]>(`/products-menu/${categoriaAtiva}`)

    data?.forEach((produto) => {
        if (!categorias.includes(produto.category)) setCategorias([...categorias, produto.category])
    })

    return (
        <section className={`overflow-auto`}>
            <nav className={`flex mt-16 overflow-x-auto`}>
                {categorias.map(categoria => (
                    <Categorias key={`${categoria}`} onClick={() => setCategoriaAtiva(`${categoria}`)} categoria={`${categoria}`} categoriaAtiva={categoriaAtiva === `${categoria}` ? true : false} />
                ))}
            </nav>
            <section className={`flex flex-wrap justify-between items-center w-11/12 h-auto overflow-auto m-auto pt-6 mb-12`}>
                {data?.map(produto => <BoxItem key={produto._id} titulo={produto.productName} valor={produto.price.toFixed(2).replace('.', ',')} />)}
            </section>
        </section>
    )
}