import Cardapio from "../../components/Cardapio"
import Layout from "../../components/Layout"

export default function PaginaHome(){
    document.title = 'Início'

    return(
        <>
            <Layout/>
            <Cardapio/>
        </>
    )
}