import {useAtomValue, useSetAtom} from 'jotai'
import { iconeAdd, iconeDecrement } from "../../assets/images/icones";
import { addCarrinho, carrinho, decCarrinho } from "../../atoms/atoms";

export default function BotaoCart() {
    const qtdCarrinho = useAtomValue(carrinho)
    const carrinhoAdd = useSetAtom(addCarrinho)
    const carrinhoDec = useSetAtom(decCarrinho)
    return (
        <div className={`absolute -bottom-7 shadow-lg flex justify-between items-center w-36 h-16 rounded-2xl bg-white`}>
            <span onClick={() => qtdCarrinho !== 0 && carrinhoDec()} className={`px-2`}>{iconeDecrement()}</span>
            <span className={`text-2xl`}>{qtdCarrinho}</span>
            <span onClick={carrinhoAdd} className={`px-2`}>{iconeAdd("#FF6838", 6, 6)}</span>
        </div>
    )
}