import banner from '../../assets/images/lanchesbgremove.png'
import add from '../../assets/images/add.svg'

interface BoxItemProps {
    titulo: string
    descricao?: string
    valor: string
}

export default function BoxItem(props: BoxItemProps) {
    return (
        <div className={`flex-col items-center justify-center h-60 w-36 bg-[#302F3C] rounded-[30px] m-2`}>
            <div className={`flex h-1/2 w-full justify-center items-center`}>
                <img className={`w-2/3 h-2/3`} src={banner} alt="Lanche" />
            </div>
            <div className="flex flex-wrap h-1/2 p-1 justify-center items-center">
                <h1 className="text-center text-lg font-bold text-white m-auto">{props.titulo}</h1>
                {/* <span className="text-center text-white ">{props.descricao}</span> */}
                <div className={`flex w-11/12 h-10 text-[#302F3C] font-bold text-lg justify-center items-center bg-[#fafafa] rounded-2xl m-auto`}>
                    {`R$ ${props.valor}`}
                    <img className='w-5 h-5 ml-2' src={add} alt="" />
                </div>
            </div>
        </div>
    )
}