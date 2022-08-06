import banner from '../../assets/images/lanchesbgremove.png'
import { iconeAdd } from '../../assets/images/icones'

interface BoxItemProps {
    titulo: string
    code: string
    descricao?: string
    valor: string
    onClick: () => void
}

export default function BoxItem(props: BoxItemProps) {
    return (
        <div onClick={props.onClick} className={`flex-col items-center justify-center h-60 w-36 bg-modals-primary rounded-[30px] m-2`}>
            <div className={`flex h-1/2 w-full justify-center items-center`}>
                <img className={`w-2/3 h-2/3`} src={banner} alt="Lanche" />
            </div>
            <div className="flex flex-wrap h-1/2 p-1 justify-center items-center">
                <h1 className="text-center text-lg font-bold text-white m-auto">{props.titulo}</h1>
                {/* <span className="text-center text-white ">{props.descricao}</span> */}
                <div className={`flex w-11/12 h-10 text-modals-primary font-bold text-lg justify-center items-center bg-[#fafafa] rounded-2xl m-auto`}>
                    {`R$ ${props.valor}`}
                    <span className='ml-3'>{iconeAdd(`#302F3C`, 6, 6)}</span>
                </div>
            </div>
        </div>
    )
}