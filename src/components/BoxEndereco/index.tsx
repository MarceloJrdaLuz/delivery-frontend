import { BoxEnderecoProps } from "./types"

export default function BoxEndereco(props: BoxEnderecoProps){
    return(
        <div className={`flex flex-col w-full h-fit justify-center items-center my-4 border border-gray-300 rounded-2xl shadow-lg py-5`}>
                <div className="flex w-full justify-around ">
                    <span>{`Rua: ${props.rua}`}</span>
                    <span>{`Número: ${props.numero}`}</span>
                </div>
                <span>{`Bairro: ${props.bairro}`}</span>
                <span>{`Ponto de referência: ${props.pontoReferencia ? `${props.pontoReferencia}` : 'Não informado'}`}</span>
                <span>{`Complemento: ${props.complemento ? `${props.complemento}` : 'Não informado'}`}</span>
            </div>
    )
}