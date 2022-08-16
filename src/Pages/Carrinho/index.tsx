import Carrinho from "../../components/Carrinho"
import Menu from "../../components/Menu"

export default function PaginaCarrinho() {
    document.title = 'Sacola'
    return (
        <main>
            <Carrinho/>
            <Menu/>
        </main>
    )
}