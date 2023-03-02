import { useParams } from "react-router-dom";
import { carrinho } from "../../atoms/atoms";
import Menu from "../../components/Menu";
import ModalProduto from "../../components/ModalProduto";
import { Produto } from "../../entities/types";
import { useFetch } from "../../hooks/useFetch";
import { useAtomValue } from 'jotai'


export default function PaginaDetalhesProduto(){
    document.title = 'Descrição do Produto'

    const params = useParams()
    const { data } = useFetch<Produto>(`/products/${params.nomeProduto}`)
    const qtdCarrinho = useAtomValue(carrinho)
    console.log(data)
    return(
        <main className={`w-screen h-screen`}>
            <ModalProduto nomeProduto={data?.productName} valor={data?.price} qtd={qtdCarrinho} description={data?.description} code={data?.code}/>
            <div>{data?.description}</div>
            <Menu/>
        </main>
    )
}